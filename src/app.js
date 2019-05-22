const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))    

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mead'
    })
})


// app.get('',(req,res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send({ 
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About page!</h1>')
// })
app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,  (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                location,
                forecast: forecastData,
                address

            })
        })
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404', {
        pageNotFoundMessage: 'Help article not found',
        name: 'Andrew Mead',
        title: '404'
    })
})

app.get('*',(req,res) =>{
    res.render('404', {
        pageNotFoundMessage: 'Page not found',
        title: '404',
        name: 'Andrew Mead'
    })
})
app.listen(port,() => {
    console.log('Server is up on port ' + port)
})