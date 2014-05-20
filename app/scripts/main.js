/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'
    }
});

require([
    'backbone'
], function (Backbone) {
	Book = Backbone.Model.extend({
	 // urlRoot: 'http://localhost:8080/books/', //use when not utilizing collections 	  
      initialize: function(){
		  
		   this.on("invalid", function(model, error){
			   console.log("**Validation Error : " + error + "**");
		   });
           this.on("change", function(){
			   console.log('Model Changes Detected:');
			   if(this.hasChanged('name')){
				   console.log('The name has changed from '  + this.previous('name') + ' to ' + this.get('name'));
				   
			   }
			   if(this.hasChanged('year')){
				   console.log('The year has changed')
			   }
			   console.log('Changed attributes: ' + JSON.stringify(this.changed));
			   console.log('Previous attributes: ' + JSON.stringify(this.previousAttributes()));
		   });
		   this.on("change:name", function(){
			   console.log('The name attribute has changed');  
		   });
      }, 
	 
   defaults: {
     name: 'Book Title', 
     author: 'No One'
	}, 
	
	printDetails: function(){
		console.log(this.get('name') + ' by ' + this.get('author'));
	}, 
	
	validate: function(attrs){
		if(attrs.year < 2000){
			return 'Year must be after 2000';
		}
		if(!attrs.name){
			return 'A name must be provided';
		}
	}, 
	parse: function(response, xhr) {
		response.bookType = 'ebook';
		return response;
	  }, 

	
});


var thisBook = new Book({name : 'Beginning Backbone', 
						 author: 'James Sugrue'});

	console.log(thisBook.get('name'));
    Backbone.history.start();
});
