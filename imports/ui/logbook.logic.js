import { Template } from 'meteor/templating';
import { Logbook } from '../api/Logbook.js';
import SimpleSchema from 'simpl-schema';

Template.logbook.helpers({
  curYear() {
	 var today = new Date();
	 return today.getFullYear();
  },
  tasks() {
      return Logbook.find({});
  },
});

window.Logbook = Logbook;

Template.logbook.events({
  'submit .new-record'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const prebreakfast = target.prebreakfast.value;
    const prelunch = target.prelunch.value;
    const predinner = target.predinner.value;
    const prebed = target.prebed.value;
    const midnight = target.midnight.value;
 
    // Insert a record into the collection
    Meteor.call('logbook.insert', prebreakfast, prelunch, predinner, prebed, midnight);
	
	if(prebreakfast > 8){
		var r = confirm("It seems that you're glucose reading is a bit high.\n Would you like a recommended correction dose?");
		
		if(r === true){
			Meteor.call('calculator.calcCorrection', prebreakfast, 68, function(error, result) {
				  if (error)
					console.log(error);
				
				alert("Please give: "+result+"u");
			});
		}
	}else if(prelunch > 8){
		var r = confirm("It seems that you're glucose reading is a bit high.\n Would you like a recommended correction dose?");
		
		if(r === true){
			Meteor.call('calculator.calcCorrection', prelunch, 68, function(error, result) {
				  if (error)
					console.log(error);
				
				alert("Please give: "+result+"u");
			});
		}
	}else if(predinner > 8){
		var r = confirm("It seems that you're glucose reading is a bit high.\n Would you like a recommended correction dose?");
		
		if(r === true){
			Meteor.call('calculator.calcCorrection', predinner, 68, function(error, result) {
				  if (error)
					console.log(error);
				
				alert("Please give: "+result+"u");
			});
		}
	}else if(prebed > 8){
		var r = confirm("It seems that you're glucose reading is a bit high.\n Would you like a recommended correction dose?");
		
		if(r === true){
			Meteor.call('calculator.calcCorrection', prebed, 68, function(error, result) {
				  if (error)
					console.log(error);
				
				alert("Please give: "+result+"u");
			});
		}
	}
	
    // Clear form
    target.prebreakfast.value = '';
    target.prelunch.value = '';
    target.predinner.value = '';
    target.prebed.value = '';
    target.midnight.value = '';
  },
  'click .delete'() {
    Meteor.call('logbook.remove', this._id);
  },
});

Logbook.schema = new SimpleSchema({
  userId: {type: String},
  date: {type: String},
  prebreakfast: {type: Number, optional: true},
  prelunch: {type: Number, optional: true},
  predinner: {type: Number, optional: true},
  prebed: {type: Number, optional: true},
  midnight: {type: Number, optional: true},
  bolus1: {type: Number, optional: true},
  bolus2: {type: Number, optional: true},
  bolus3: {type: Number, optional: true},
  basal: {type: Number, optional: true}
});

Logbook.attachSchema(Logbook.schema);