const movies = require('express').Router();
const axios = require('axios');
const all = require('./all');
const single = require('./single');
const MongoClient = require('mongodb').MongoClient;

movies.post('/', (req, response) => {
	let data = '';
	req.on('data', chunk => data += chunk);
	req.on('end', () => {
		let title = JSON.parse(data).title;
		if (null === title || "" === title) {
			response.status(402).json({
				message: 'No title specified'
			});
		} else {
			MongoClient.connect(process.env.DB_URL, {
				useUnifiedTopology: true,
				useNewUrlParser: true
			}).then(client => {
				console.log("Connected to the database");
				console.log(`http://www.omdbapi.com/?apikey=50a47fd7&s=${escape(title)}`);
				const db = client.db('movies-db');
				const movieCollection = db.collection('movie');
				axios.get(`http://www.omdbapi.com/?apikey=50a47fd7&s=${escape(title)}`).then(res => {
					console.log(res.data.Search);
					const results = res.data.Search;
					for (let i = 0; i < results.length; i++) {
						console.log(results[i]);
						movieCollection.findOneAndUpdate(
							{ imdbID: results[i].imdbID },
							{
								$set: {
									Title: results[i].Title,
									Year: results[i].Year,
									imdbID: results[i].imdbID,
									Type: results[i].Type,
									Poster: results[i].Poster
								}
							},
							{ upsert: true, setDefaultsOnInsert: true },
							(err, res) => {
								if (err) {
									response.status(500).json({ message: err });
								} else {
									console.log("Products updated");
								}
							}
						);
					}
					response.status(200).json({ message: "Movies are updated" });
				}).catch(err => {
					console.error(err);
					response.status(500).json({ message: err });
				});
			}).catch(error => {
				console.error(error);
				response.status(500).json({ message: error });
			});
			response.status(200);
		}
	});
});

movies.get('/', all);
movies.get('/:imdbID', single);

module.exports = movies;
