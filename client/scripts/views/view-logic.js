//View logic

if (Meteor.isClient) {

	//Home page template
	Template.content.home = function () {
		return Session.get('page_id') == 'home';
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

}