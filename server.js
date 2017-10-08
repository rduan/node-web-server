const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine',hbs);


app.use((req,res,next)=>{
    let now = new Date().toString();

    console.log(`${req.method} ${req.url}`);
    console.log(now);
    let log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err) {
            console.log('unable to append server.log');
        }
    })
    next();
});


app.use((req,res, next)=>{
    res.render('maintenance.hbs');
}); 

//this middleware should be after app.use
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


app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});