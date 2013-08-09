/*Application Global JS*/

App = {} || Application;

App.util = {

	debug : true,

	dbDir : function (toLog, inUse) {
		if (App.util.debug && inUse !== false) {
			console.dir(toLog);
		}
	},

	dbLog : function (toLog, inUse) {
		if (App.util.debug && inUse !== false) {
			console.log(toLog);
		}
	},

	dbAlert : function (toLog, inUse) {
		if (App.util.debug && inUse !== false) {
			alert(toLog);
		}
	}
}


