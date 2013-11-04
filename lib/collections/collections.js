/*Collections*/
if (Meteor.isServer) {

	Meteor.startup(function () {
		ToDoLists = new Meteor.Collection('ToDoLists');
	});

	Meteor.methods({





		updateListItem: function (itemId, newItemValue) {

			
			var updateItem = ToDoLists.update({items:{$elemMatch:{_id:itemId}}}, {$set: {'items.$.text':newItemValue}});

			return updateItem;

		},


		updateListState: function (itemId, newState, updatedTimeStamp, updatedTimeClean) {

			
			var updateState = ToDoLists.update({items:{$elemMatch:{_id: itemId}}}, {
						$set: {	
							'items.$.state': newState,
							'items.$.sortLastUpdatedDate' : updatedTimeStamp, 
							'items.$.lastUpdatedDate' : updatedTimeClean
						}
					}
				);			

			return updateState;

		},


		deleteListItem : function (collectionId, item) {

			var  removeState = ToDoLists.update({_id: collectionId}, {$pull : {items : item}});
							   
			return removeState;

		}



	});

}




