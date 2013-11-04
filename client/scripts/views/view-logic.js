//View logic

if (Meteor.isClient) {

	//Home page template
	Template.content.home = function () {
		return Session.get('page_id') == 'home';
	};

	//Home page template
	Template.content.list = function () {
		return Session.get('page_id') == 'list/' + Session.get('page_id').slice(Session.keys.page_id.indexOf('/'), Session.get('page_id').length);
	};

	//About page template
	Template.content.about = function () {
		return Session.get('page_id') == 'about';
	};

	//Contact page template
	Template.content.contact = function () {
		return Session.get('page_id') == 'contact';
	};

	//Register page template
	Template.content.register = function () {
		return Session.get('page_id') == 'register';
	};

	//Modal window One
	Template.modal.modalOne = function () {
		return Session.get('current_modal') == 'modalOne';
	};

	//Modal window Two
	Template.modal.modalTwo = function () {
		return Session.get('current_modal') == 'modalTwo';
	};

	//Map individual lists
	Template.list.listItem = function () {
		return ToDoLists.findOne(Session.get('page_id').slice(Session.keys.page_id.indexOf('/'), Session.get('page_id').length));
	}

	//Sidebar list items
	Template.sidebar.UserLists = function () {
		return ToDoLists.find({'ownerId' : Meteor.userId()}).fetch();
	}

}