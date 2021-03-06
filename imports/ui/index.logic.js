import { Template } from 'meteor/templating';
import { Invites, UserInfo } from '/lib/collections';

Template.index.onRendered(function() {
  let settings = '/particles.json';
  this.autorun(() => {
    if (particlesJS) {
      //console.log(`loading particles.js config from "${settings}"...`)
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles', settings, function () {
        //console.log('callback - particles.js config loaded');
      });
    }
  });
});

Template.index.helpers({
  strength() {
		return Session.get('index/pass/strength');
	},
  hasCode(){
    if(FlowRouter.getParam('token') != null){
      console.log(FlowRouter.getParam('token'));
      return true;
    }
    return false;
  }
});

Template.index.events({
	'submit .request-beta' (event) {
		event.preventDefault();

		const target = event.target;
		const email = target.email.value;
    const reason = 'test';

		Meteor.call('beta.addToInvites', email, reason, function(error, result) {
			if(error){
				alert(error.reason);
			}else{
				target.email.value = '';
				target.reason.value = '';
				alert('Invite requested. We\'ll be in touch soon');
			}
		});
	}
});

Template.login.events({
	'submit .signin' (event) {
		event.preventDefault();

		const target = event.target;
		const email = target.email.value;
		const password = target.password.value;

		Meteor.loginWithPassword(email, password, (error) => {
			if(error){
				swal({
					title: 'Something happened!',
					text: error.message,
					type: 'warning',
					showCancelButton: false,
					confirmButtonText: 'Ok!',
					cancelButtonText: 'No',
				});
			}else{
				BlazeLayout.render('content', {main: 'dashboard'});
			}
		});
	},
	'submit .register' (event) {
		event.preventDefault();

		const target = event.target;
		const username = target.username.value;
		const email = target.email.value;
		const password = target.password.value;
		const token = Session.get('beta_token');

		Meteor.call('beta.checkInvite', token, (err, res) => {
			if(res == false) {
				swal({
					title: 'Something happened!',
					text: 'Invalid beta token',
					type: 'warning',
					showCancelButton: false,
					confirmButtonText: 'Ok!',
					cancelButtonText: 'No',
				});
			} else {
				Accounts.createUser({
					username: username,
					email: email,
					password: password
				}, (error) => {
					if(error){
						swal({
							title: 'Something happened!',
							text: error.message,
							type: 'warning',
							showCancelButton: false,
							confirmButtonText: 'Ok!',
							cancelButtonText: 'No',
						});
					}else{
						FlowRouter.go('/');
					}
				});
			}
		});
	},
	'keyup .password' (event) {

		var zxcvbn = require('zxcvbn');
		var password = $(event.target).val();
		var pass_strength = zxcvbn(password);
		//console.log('Password Strength : ' + pass_strength.score );
		Session.set('index/pass/strength', pass_strength.score );

	}
});

function isBetaCode(){
  if(Session.get('beta_token')){
    console.log('test');
    return true;
  }
  return false;
}
