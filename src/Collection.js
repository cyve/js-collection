/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

/**
 * @return Collection
 */
var Collection = function(elements){
	this.elements = elements || [];
	this.index = this.elements.length ? 0 : null;
	this.length = this.elements.length;
}

/**
 * Return true if collection  has element
 *
 * @param mixed element
 *
 * @return boolean
 * @throw Error if argument is invalid
 * @throw Error if collection is empty
 */
Collection.prototype.has = function(element){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}
	
	for(var i in this.elements){
		if(this.elements[i] === element){
			return true;
		}
	}
	
	return false;
}

/**
 * Get or set current element
 *
 * @param int index
 * 
 * @return Object
 * @throw Error if argument is invalid
 * @throw Error if collection is empty
 */
Collection.prototype.current = function(index){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}
	
	if(typeof index !== 'undefined'){
		if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
			throw new Error("Invalid argument index (" + index + ")");
		}
		this.index = index;
	}

	if(this.index === null) this.index = 0;

	return this.elements[this.index];
}

/**
 * Return element
 *
 * @param int index
 *
 * @return Object
 * @throw Error if argument is invalid
 * @throw Error if collection is empty
 */
Collection.prototype.get = function(index){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}
	
	if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
		throw new Error("Invalid argument index (" + index + ")");
	}
	
	return this.elements[index];
}

/**
 * Get the first element and set it as current
 * 
 * @return Object
 * @throw Error if collection is empty
 */
Collection.prototype.first = function(){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}
	
	this.index = 0;

	return this.elements[this.index];
}

/**
 * Get the last element and set it as current
 * 
 * @return Object
 * @throw Error if collection is empty
 */
Collection.prototype.last = function(){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}
	
	this.index = this.elements.length - 1;

	return this.elements[this.index];
}

/**
 * Get the previous element and set it as current
 * 
 * @return Object
 * @throw Error if collection is empty
 */
Collection.prototype.prev = function(){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}

	if(this.index > 0){
		this.index--;
	}

	return this.elements[this.index];
}

/**
 * Get the next element and set it as current
 * 
 * @return Object
 * @throw Error if collection is empty
 */
Collection.prototype.next = function(){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}

	if(this.index < this.elements.length - 1){
		this.index++;
	}

	return this.elements[this.index];
}

/**
 * Add an element
 * 
 * @param object element
 * @param integer position
 * 
 * @return Collection
 * @throw Error if argument is not valid
 */
Collection.prototype.add = function(element, position){
	if(typeof position !== 'undefined' && (typeof position !== 'number' || position < 0 || position > this.elements.length)){
		throw new Error("Invalid argument position (" + position + ")");
	}

	if(element instanceof Array){
		if(typeof position !== 'undefined'){
			this.elements.splice.apply(this.elements, [position, 0].concat(element));
		}
		else{
			this.elements = this.elements.concat(element);
		}
		this.length = this.length + element.length;
	}
	else{
		if(typeof position === 'number'){
			this.elements.splice(position, 0, element);
		}
		else{
			this.elements.push(element);
		}
		this.length++;
	}
	
	if(this.index === null){
		this.index = 0;
	}

	return this;
}

/**
 * Add an element at the end of the collection
 * 
 * @param object element
 * 
 * @return Collection
 * @throw Error if argument is not valid
 */
Collection.prototype.push = function(element){
	return this.add(element);
}

/**
 * Move an element inside the collection
 * 
 * @param integer index
 * @param integer position
 * 
 * @return Collection
 * @throw Error if collection is empty
 * @throw Error if argument is invalid
 */
Collection.prototype.move = function(index, position){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}

	if(typeof position !== 'number' || position < 0 || position >= this.elements.length){
		throw new Error("Invalid argument position (" + position + ")");
	}

	var element = this.elements.splice(index, 1)[0];
	this.elements.splice(position, 0, element);

	if(index === this.index) this.index = position;

	return this;
}

/**
 * Remove an element
 * 
 * @param integer index
 * 
 * @return Collection
 * @throw Error if collection is empty
 * @throw Error if argument is invalid
 */
Collection.prototype.remove = function(index){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}

	if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
		throw new Error("Invalid argument index (" + index + ")");
	}

	this.elements.splice(index, 1);

	if(this.elements.length === 0){
		this.index = null;
	}
	else if(index >= this.elements.length){
		this.index = this.elements.length - 1;
	}
	this.length--;

	return this;
}

/**
 * Remove all elements
 * 
 * @return Collection
 */
Collection.prototype.empty = function(){
	this.elements = [];
	this.index = null;
	this.length = 0;

	return this;
}

/**
 * Call function on each element
 * 
 * @return Collection
 * @throw Error if collection is empty
 * @throw Error if argument is invalid
 */
Collection.prototype.forEach = function(callback){
	if(this.elements.length === 0){
		throw new Error("Collection has no element");
	}

	if(typeof callback !== 'function'){
		throw new Error("Invalid argument callback");
	}

	for(var i in this.elements){
		callback(this.elements[i], i, this.elements);
	}

	return this;
}

/**
 * Stringigy elements
 * 
 * @return string
 */
Collection.prototype.toJSON = function(){
	return JSON.stringify(this.elements);
}

/**
 * Get elements
 * 
 * @return string
 */
Collection.prototype.toArray = function(){
	return this.elements;
}
