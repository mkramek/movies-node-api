const MongoClient = require('mongodb').MongoClient;

module.exports = (req, res) => {
	let comments = null;
	MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
		console.log("Connected to the database");
		const db = client.db('movies-db');
		const commCollection = db.collection('comments');
		comments = commCollection.find().toArray().then((data) => {
			console.log(data);
			res.status(200).json(data);
		});
	}).catch(error => console.error(error));
};
