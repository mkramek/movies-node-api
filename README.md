#movies-node-api
##Usage
###`/api/movies`
List all movies available in the database
###`/api/movies/[imdbID]`
Show single movie with matching IMDB ID
###`/api/comments`
List all movies with assigned comments
###`/api/comments/[imdbID]`
Show comments for the movie with specific IMDB ID
##Deployment
The app is deployed by default on [Heroku](https://heroku.com/), available under [this link](https://movies-with-comments.herokuapp.com/).

To deploy the app on the local device, change `NODE_ENV` variable in `.env` to `development`. Default port is `3001`.
