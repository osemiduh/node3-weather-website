const express = require('express')
const path = require('path');


const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const hbs = require('hbs');


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join('../templates/partials')


//Iniitializing express
const app = express()


//Setup ejs engine and views location
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Setup static directory to serve
  app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Welcome to Dynamic Weather App',
        name: 'Cruise Iduh'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Read About the company here',
        name: 'Cruise Iduh'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Cruise Iduh'
    })
})

app.get('/help/*', (req, res)=>{
 res.send('Help Article not found')
})

app.get('/weather', (req, res)=>{

    if(!req.query.address) {
        return res.send( {error: 'You must enter an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
    // res.send({

        
    //     forecast: 'It is snowing',
    //     location: 'Philadephia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search) {
     return   res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res)=>{
 res.render('404', {
     message: 'This page has been moved, or does not exit, please go back to the home page'
 })
})




// app.use(express.static(publicDirectoryPath));


app.listen(3900, ()=>{
    console.log('Server is up on port 3900.')
})


// app.use(express.static(partialsPath));




// // Setup handlebars engine and views location
// app.set('view engine', 'ejs')
// app.set('views', viewsPath)

// // Setup static directory to serve
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather App',
//         name: 'Andrew Mead'
//     })
// })


// app.get('/about', (req, res)=>{
//     res.render('about', { 
//         title: 'About Me',
//         name: 'Cruise Iduh'

//     })
// })


// app.get('/help', (req, res)=>{
//     res.render('help', {
//         title: 'Help Page',
//         name: 'Vulcan'
//     })
// })


