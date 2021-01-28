const MongoClient = require('mongodb').MongoClient;

module.exports = (req, res) => {
	let comments = null;
	MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
		const db = client.db('movies-db');
		const commCollection = db.collection('comments');
		comments = commCollection.find({
			movieId: req.params.movieId
		}).toArray().then((data) => {
			if (data.length > 0)
				res.status(200).json(data);
			else res.status(404).json(data);
		});
	}).catch(error => console.error(error));
};
