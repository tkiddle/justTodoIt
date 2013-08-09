//Event handelers for the app

if(Meteor.isClient){



	//Events for the Header
	Template.header.events({

		'click a' : function (e) {

			var route = e.target.pathname;
			
			appRoutes.navigate(route, true);

			e.preventDefault();

		},

		'click input, click label, click form' : function (e) {
			// Fix input element click problem
			e.stopPropagation();
		},

		'click	#login-submit' : function (e) {

			var loginForm = $(e.target.form),
				uname = loginForm.find('input[name=uname]').val(),
				pword = loginForm.find('input[name=pword]').val()

			Meteor.loginWithPassword(uname, pword, function (error) {

				if(!error) {
					App.util.dbAlert('You are now logged in.');
				} else {
					App.util.dbAlert('Login failed, please try again.');
				}

			});

			e.preventDefault();
			
		},

		'click .logout' : function (e) {

			Meteor.logout( function () {

				App.util.dbAlert('You are now logged out.');

			});

		}

	});

	//Events for the sidebar
	Template.sidebar.events({

		'click a' : function (e) {

			var route = e.target.pathname;
			
			appRoutes.navigate(route, true);

			e.preventDefault();

		}
	});

	//Events for the Footer
	Template.footer.events({

		'click a' : function (e) {

			var route = e.target.pathname;

			appRoutes.navigate(route, true);

			e.preventDefault();

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

			}, function (error) {

				if (!error) {

					App.util.dbAlert('Thanks for joining');
					regForm[0].reset();

				} else {

					App.util.dbAlert('Registration Failed please try again');

				}

			});

			e.preventDefault();
		}

	});

	//Events for the hompage template
	Template.home.events({
		/*BROKEN NEESDS FIXING*/
		
		'click #add-list' : function (e) {

			var newList = $('#new-list'),
				addLink = $(e.target.parentNode);

			newList.show();
			addLink.hide();


		},


		
		'submit' : function (e) {

			var toDoForm = $(e.target),
				listName = toDoForm.find('input[name=listName]');			
		

					if (listName.val() !== '') {
						
						var owner = Meteor.user().username,
							ownerId = Meteor.userId(),
							listNameVal = listName.val();
		

						ToDoLists.insert({

							'owner': owner,
							'ownerId' : ownerId,
							'name' : listNameVal,
							'items'	: [

							]
			


						}, function (error, _id) {
							if (!error) {
								appRoutes.navigate('/list/' + _id, true);
								
							} else {
								App.util.dbAlert('Woops something wnet wrong, please try again.');
							}
						});

						listName.val('');

					} else {

						App.util.dbAlert('Please enter some text');

					}

				return false;		

		}
	


	});

	Template.list.events({

		'submit' : function (e) {

			var newItemForm = $(e.target),
				newItem = newItemForm.find('input[name=newItem]'),
				newItemVal = newItem.val(),
				currentDoc = Session.get('page_id').slice(Session.get('page_id').indexOf('/') + 1,Session.get('page_id').length),
				randId = new Meteor.Collection.ObjectID();
				cleanId = randId.toHexString();

					if (newItemVal !== '') {



						ToDoLists.update(
						
							currentDoc, 
							{ $pushAll: 
								{
									'items': 
									[ 
										{	
											'_id' : cleanId, 
											'text' : newItemVal,
											'state' : 'new'
										} 
									] 
								} 
							}
							
						)




					}	

				newItem.val('');							

				return false;		

		},

		'click .progress-check' : function (e) {

			console.dir(e);

		}

		

	});


}