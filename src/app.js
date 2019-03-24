const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const request = require('request')


const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static director to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris Emery'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'This site is awesome'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Were here to help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        //return stops flow
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            //stop function and print error
            return res.send({
                //shorthand object syntax for error (key/value the same)
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })    
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
            
        })
    
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        //return replaces else to stop flow
        return res.send({
            error: 'You must provide a search term'
        })    
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// 404 pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
//test