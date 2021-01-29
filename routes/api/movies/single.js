const MongoClient = require('mongodb').MongoClient;

module.exports = (req, res) => {
	let movies = null;
	MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
		const db = client.db('movies-db');
		const movCollection = db.collection('movie');
		movies = movCollection.find({
			imdbID: req.params.imdbID
		}).toArray().then((data) => {
			if (data.length > 0)
				res.status(200).render('pages/movies', { movies: data, single: true });
			else res.status(404).json(data);
		});
	}).catch(error => console.error(error));
};
