const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine',hbs);

app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    //res.send('<h1>hel express</h1>');
    // res.send({
    //     name: 'rd',
    //     likes: [
    //         'tennis',
    //         'swimming'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMsg: 'Welcome home page',
        //currentYear: new Date().getFullYear(),
    })
});

app.get('/about',(req,res)=>{
    //res.send('abou');
    res.render('about.hbs',{
        pageTitle: 'new About',
        //currentYear: new Date().getFullYear(),
    });
});



app.get('/bad',(req,res)=>{
 res.send({
    errMsg: 'error message'
 });
});


app.listen(3000, ()=>{
    console.log('server is running on 3000');
});