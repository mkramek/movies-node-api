const comments = require('express').Router();
const axios = require('axios');
const all = require('./all');
const single = require('./single');
const MongoClient = require('mongodb').MongoClient;

comments.post('/', (req, response) => {
	let data = '';
	req.on('data', chunk => data += chunk);
	req.on('end', () => {
		let movieId = JSON.parse(data).movieId;
		let comment = JSON.parse(data).comment;
		if (null === movieId || "" === movieId) {
			response.status(402).json({
				message: 'No movie ID specified'
			});
		} else if (null === comment || "" === comment) {
			response.status(402).json({
				message: 'No comment specified'
			});
		} else {
			MongoClient.connect(process.env.DB_URL, {
				useUnifiedTopology: true,
				useNewUrlParser: true
			}).then(client => {
				const moviedb = client.db('movies-db');
				const movieCollection = moviedb.collection('movie');
				movieCollection.find({ imdbID: movieId }).toArray().then((data) => {
					if (data.length > 0) {
						const commCollection = moviedb.collection('comments');
						commCollection.findOneAndUpdate(
							{ movieId: movieId },
							{
								$push: {
									comments: comment
								}
							},
							{ upsert: true, setDefaultsOnInsert: true },
							(err, result) => {
								if (err) {
									console.error(err);
								}
							}
						);
						response.status(200).json({ message: "Comment added" });
					}
				});
			}).catch(error => {
				console.error(error);
				response.status(500).json({ message: error });
			});
		}
	});
});

comments.get('/', all);
comments.get('/:movieId', single);

module.exports = comments;
