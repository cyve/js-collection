/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("new Collection()", function() {
	var collection = new Collection([1,2,3,4]),
		collection2 = new Collection();
	
	it("return Collection", function(){
		expect(collection.elements).toEqual([1,2,3,4]);
		expect(collection.length).toBe(4);
		expect(collection.index).toBe(0);

		expect(collection2.elements).toEqual([]);
		expect(collection2.length).toBe(0);
		expect(collection2.index).toBeNull();
	});
});

describe("Method Collection.prototype.add()", function() {
	var collection = new Collection();

	it("add element", function(){
		var a = collection.add(1);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1]);
		expect(collection.length).toBe(1);
	});

	it("add elements", function(){
		var a = collection.add([5,6]);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1,5,6]);
		expect(collection.length).toBe(3);
	});

	it("insert element", function(){
		var a = collection.add(2, 1);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1,2,5,6]);
		expect(collection.length).toBe(4);
	});

	it("insert elements", function(){
		var a = collection.add([3,4], 2);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1,2,3,4,5,6]);
		expect(collection.length).toBe(6);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.add(9,'a');
		};
		var testNegative = function(){
			collection.add(9,-1);
		};
		var testSuperior = function(){
			collection.add(9,100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("Property Collection.prototype.length", function() {
	var collection = new Collection([1,2,3,4]);

	it("return number of elements", function(){
		expect(collection.length).toBe(4);
	});
});

describe("Method Collection.prototype.has()", function() {
	var collection = new Collection([1,2,3,4]);

	it("has element", function(){
		expect(collection.has(1)).toBe(true);
		expect(collection.has(0)).toBe(false);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.has(1);
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.current()", function() {
	var collection = new Collection([1,2,3,4]);

	it("get current element", function(){
		expect(collection.current()).toBe(1);
	});

	it("set current element", function(){
		collection.current(1);
		expect(collection.index).toBe(1);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.current('a');
		};
		var testNegative = function(){
			collection.current(-1);
		};
		var testSuperior = function(){
			collection.current(100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.current();
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.get()", function() {
	var collection = new Collection([1,2,3,4]);

	it("get element", function(){
		expect(collection.get(1)).toBe(2);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.get(1);
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.first()", function() {
	var collection = new Collection([1,2,3,4]);

	it("get first element", function(){
		expect(collection.first()).toBe(1);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.first();
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.last()", function() {
	var collection = new Collection([1,2,3,4]);

	it("get last element", function(){
		expect(collection.last()).toBe(4);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.last();
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.next()", function() {
	var collection = new Collection([1,2,3,4]);

	it("get next element", function(){
		expect(collection.next()).toBe(2);
	});

	it("set current element", function(){
		expect(collection.index).toBe(1);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.next();
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.prev()", function() {
	var collection = new Collection([1,2,3,4]);
		collection.index = 1;

	it("get previous element", function(){
		expect(collection.prev()).toBe(1);
	});

	it("set current element", function(){
		expect(collection.index).toBe(0);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.prev();
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.move()", function() {
	var collection = new Collection([1,2,3,4]);

	it("remove an element", function(){
		var a = collection.move(1,2);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1,3,2,4]);
		expect(collection.length).toBe(4);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.move(1,'a');
		};
		var testNegative = function(){
			collection.move(1,-1);
		};
		var testSuperior = function(){
			collection.move(1,100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.move(1,2);
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.remove()", function() {
	var collection = new Collection([1,2,3,4]);

	it("remove an element", function(){
		var a = collection.remove(1);
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([1,3,4]);
		expect(collection.length).toBe(3);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.remove(0);
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.empty()", function() {
	var collection = new Collection([1,2,3,4]);

	it("remove all elements", function(){
		var a = collection.empty();
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([]);
		expect(collection.index).toBeNull();
		expect(collection.length).toBe(0);
	});
});

describe("Method Collection.prototype.forEach()", function() {
	var collection = new Collection([1,2,3,4]);

	it("call callback for each elements", function(){
		var a = collection.forEach(function(element,i,elements){
			elements[i] = element + 1;
		});
		expect(a instanceof Collection).toBe(true);
		expect(collection.elements).toEqual([2,3,4,5]);
	});

	it("throw exception if collection is empty", function(){
		var testEmpty = function(){
			collection.empty();
			collection.forEach(function(){
				return true;
			});
		};
		expect(testEmpty).toThrow();
	});
});

describe("Method Collection.prototype.toJSON()", function() {
	var collection = new Collection([1,2,3,4]);

	it("stringify elements", function(){
		expect(collection.toJSON()).toEqual('[1,2,3,4]');
	});
});

describe("Method Collection.prototype.toArray()", function() {
	var collection = new Collection([1,2,3,4]);

	it("return elements", function(){
		expect(collection.toArray()).toEqual([1,2,3,4]);
	});
});
