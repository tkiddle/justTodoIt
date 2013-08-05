/*Collections*/
if (Meteor.isServer) {

	Meteor.startup(function () {
		ToDoLists = new Meteor.Collection('ToDoLists');
	});

}