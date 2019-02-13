var MongoClient = require('mongodb').MongoClient;
var databaseName = "dinnerdb";
var tableName = "task";
var url = "mongodb://localhost:27017/" + databaseName;





module.exports.insertOnDB =  function(myobj, callback) {
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(databaseName);
		//var myobj = { name: "Company Inc", address: "Highway 37" };

		myobj["date"] = new Date();
		myobj["count"] = 0;
		dbo.collection(tableName).insertOne(myobj, function(err, res) {
			if (err) callback(false);	

			console.log("Document inserted = " + myobj + " > " + res);
			db.close();

			callback(true);	
		});
	});
};

module.exports.selectFromDB =  function(pos, callback) {
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(databaseName);

		dbo.collection(tableName).find().skip(pos).limit(1).toArray(function(err, result) {
			if (true) {
  				var myobj = { acknowledgment : "Feliz Natal" , whodrinks: "Bebe o Pedro Machado", namex: "Os amigos" , date : new Date() , count : 0 };
				callback(myobj);
			}

			//console.log("Select record from DB=" + result);
			db.close();

			callback(result);
		});
	});
};

module.exports.getCollectionSizeDB = function(callback) {

	MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(databaseName);
		dbo.collection(tableName).find().count(function (err, res) {
			if (err)
			throw err;

			db.close();
			callback(res);
		});
	});

};



