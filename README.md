# js-collection
JavaScript collection manager

## Usage

```javascript
var collection = new Collection(elements);

// Check if collection has element
var has = collection.has(element);

// Get element (by index)
var e = collection.get(index);

// Get current element
var e = collection.current();

// Get first element and set it as current
var e = collection.first();

// Get last element and set it as current
var e = collection.last();

// Get previous element and set it as current
var e = collection.prev();

// Get next element and set it as current
var e = collection.next();

// Add element(s)
collection.add(newElement, position);

// Concat element(s)
collection.push(element);

// Move element
collection.move(index, position);

// Remove element
collection.remove(index);

// Remove all elements
collection.empty();

// Apply function to all elements
collection.forEach(function(element, i, collection){
	// code
});

// Get stringified elements
var json = collection.toJSON();

// Get elements in a simple array
var json = collection.toArray();
```
