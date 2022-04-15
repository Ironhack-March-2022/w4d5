const express = require('express')
const app = express()
const hbs = require('hbs')

// this sets hbs as a templating engine for this express app
app.set('view engine', 'hbs')

// // this enables us to use partials in handlebars  
hbs.registerPartials(__dirname + '/views/partials')

const movies = require('./movies')

app.get('/', function (req, res) {
	res.render('movies', { movieList: movies, doctitle: 'Movies' })
})

app.get('/about', function (req, res) {
	// layout: false disables the layout for this route
	res.render('about', { title: 'About', layout: false })
})

// app.get('/godfather', function (req, res) {
// 	// get the movie godfather from the array
// 	const godfather = movies.find(function (movie) {
// 		return movie.title === 'The Godfather'
// 	})
// 	console.log(godfather)
// 	res.render('movieDetails', { movie: godfather, doctitle: 'Detail Page' })
// })

app.get('/moviesearch', function (req, res) {
	// this is how you retrieve a query string in express
	// req.query.<name attribute of the form>
	const queryString = req.query.q
	const filteredMovies = movies.filter(movie => {
		return movie.title.toLowerCase().includes(queryString.toLowerCase())
	})
	// res.send(queryString)
	res.render('movies', { movieList: filteredMovies, doctitle: 'Movies' })
})


app.get('/:movieTitle', function (req, res) {
	// to retrieve the route parameter you always use 
	// req.params.<name of your variable>
	// console.log(req.url)
	const title = req.params.movieTitle
	const movie = movies.find(function (movie) {
		return movie.title === title
	})
	console.log(movie)
	// res.send(title)
	res.render('movieDetails', { movie: movie, doctitle: 'Detail Page' })
})


app.listen(3000, function () {
	console.log('server listening')
})