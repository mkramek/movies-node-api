const MongoClient = require('mongodb').MongoClient;

module.exports = (req, res) => {
	let movies = null;
	MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {
		console.log("Connected to the database");
		const db = client.db('movies-db');
		const movieCollection = db.collection('movie');
		movies = movieCollection.find().toArray().then((data) => {
			console.log(data);
			res.status(200).render('pages/movies', { movies: data, single: false });
		});
	}).catch(error => console.error(error));
};
