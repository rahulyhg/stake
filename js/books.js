angular.module('books.services', [])

/**
 * A simple example service that returns some data.
 */
.service('Books', function() {
  // Might use a resource here that returns a JSON array
	this.books=[
	{"id":"1","name":"name1","status":"true"},
	{"id":"2","name":"name1","status":"true"},
	{"id":"3","name":"name1","status":"true"}
	];
	
  
});
