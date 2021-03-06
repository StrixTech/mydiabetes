import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { FoodLibrary } from '/lib/collections';

if (Meteor.isServer) {
	 
	FoodLibrary.permit(['insert', 'update', 'remove']).ifLoggedIn();
	
  // This code only runs on the server
	Meteor.publish('foodlibrary', function tasksPublication() {
		return FoodLibrary.find({});
	});
}

Meteor.methods({
  'flibrary.insert'(name, category, serving, carb, energy, sugar, picture) {
    check(name, String);
    check(category, String);
    check(carb, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
	try {
		FoodLibrary.insert({
		  name,
		  category,
		  carb,
		  serving,
		  energy,
		  sugar,
		  picture
		},(error, result) => {
			if(error){
				throw new Error();
			}
		});
	} catch (e) {
		console.log('Exception: '+e);
	}
  },
  'flibrary.remove'(recordId) {
    check(recordId, String);
 
    FoodLibrary.remove(recordId);
  }
});