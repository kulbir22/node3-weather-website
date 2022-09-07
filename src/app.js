import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import express from 'express';

const app = express();

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const publicDirectoryPath = path.join(dirName, '../public');
const viewsPath = path.join(dirName, '../templates/views');
const partialsPath = path.join(dirName, '../templates/partials');
console.log(dirName);
//console.log(fileName);
console.log(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kulbir Singh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kulbir Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'This is some helpful text'
    })
})

// app.get('/help/*', (req, res) => {
//     res.send('Help article not found.')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 page')
// })


app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kulbir Singh',
        errorMessage: 'Help article not found (Handlebar).'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kulbir Singh',
        errorMessage: 'Page not found.'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Its snowing',
//         location: 'Philadelphia'
//     })
// });

app.listen(3000, () => {
    console.log('Server is live at 3000')
});