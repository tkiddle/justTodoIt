//Event handelers for the app

if(Meteor.isClient){

	//Events for the Header
	Template.header.events({

		'click a' : function (e) {
			e.preventDefault();

			var route = e.target.pathname;
			
			appRoutes.navigate(route, true);
		},

		'click input, click label, click form' : function (e) {
			// Fix input element click problem
			e.stopPropagation();
		},

		'click .logout' : function (e) {
			Meteor.logout( function () {
				App.util.dbAlert('You are now logged out.');
			});
		}

	});

	//Events for the Footer
	Template.footer.events({

		'click a' : function (e) {
			e.preventDefault();

			var route = e.target.pathname;

			appRoutes.navigate(route, true);
		},

		'click .logout' : function (e) {
			Meteor.logout( function () {
				App.util.dbAlert('You are now logged out.');
			});
		}

	});

	//Events for the Content template
	Template.content.events({});

	Template.register.events({

		'click #register-submit' : function (e) {
			
			var regForm = $(e.target.form),
				fname = regForm.find('input[name=fname]').val(),
				lname = regForm.find('input[name=lname]').val(),
				email = regForm.find('input[name=email]').val(),
				uname = regForm.find('input[name=username]').val(),
				pword = regForm.find('input[type=password]').val();

			App.util.dbDir({
				'First Name' : fname,
				'Last Name' : lname,
				'Email' : email,
				'Username' : uname,
				'Password' : pword
			}, false);

			Accounts.createUser({

				username : uname,
				email : email,
				password : pword,
				profile : {
					'First Name' : fname,
					'Last Name' : lname,
					'Full Name' : fname + ' ' + lname
				}

			}, function () {

				App.util.dbAlert('Thanks for joining');
				regForm[0].reset();

			});

			e.preventDefault();
		}

	});


}