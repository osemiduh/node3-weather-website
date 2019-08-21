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

const PORT = process.env.PORT || 3900


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

    
 })


app.get('*', (req, res)=>{
 res.render('404', {
     message: 'This page has been moved, or does not exit, please go back to the home page'
 })
})



app.listen(PORT, ()=>{
    console.log('Server is up on port ' + PORT)
})
