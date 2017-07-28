const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.changeSeatStatus = functions.database.ref('seats/{movieid}/{seatid}')
	.onWrite(event => {
		const original = event.data.val();
		var seatStatus = "";
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var seat = {};
		if (re.test(original.reservedby)) {
			seat.status = "AVAILED";
			seat.uid = "MODIFIED";
		} else {
			seat.status = "";
			seat.uid = "";
		}
		// console.log("getting seats per movie",original,"-",event.params.movieid);
 		 return event.data.ref.update({"status":seat.status,"uid":seat.uid});
	});
