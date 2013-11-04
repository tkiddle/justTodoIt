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
	},

	setGetDate : function (dateFormat) {

		var newDate = new Date(),
			
			dd = newDate.getUTCDate(),
			mm = newDate.getUTCMonth(),
			yyyy = newDate.getUTCFullYear(),
			
			cleanDate = (dd + '/' + mm + '/' + yyyy),
			timeStamp = Date.parse(newDate);


		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}
	
		return (dateFormat === 'timeStamp') ? timeStamp : cleanDate;

	}
	
}

