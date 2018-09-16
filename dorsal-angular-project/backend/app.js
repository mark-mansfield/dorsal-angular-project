
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const request = require("request");
const config = {
  apiUrl : 'http://api.dorsalwatch.com/public',
  publicKey : 'ab61cd9427bea80f22e641c04c312195',
  contentType : 'application/json',
  appName : 'SHARK DATA 1.0'
};


app.use(bodyParser.json());

// disable CORS

app.use('' , (req,res,next) => {
  res.setHeader('Access-COntrol-Allow-Origin' ,'*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept"
  );
  // set the methods we can use
  res.setHeader(
    "Access-Control-allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  )
  next();
});

  app.get('/api/countries' , (req,res,next) => {

    request.get(config.apiUrl + "/countries", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        const returnData = [JSON.parse(body)]
        const countries = returnData[0].responseData;
        res.status(200).json({
          message : 'countries listed in the dorsal system',
          countries : countries
        });
    });
    // call next if there is more middlewear
    // next();
  }
);


app.post('/api/list-states' , (req,res,body) => {
  console.log(config.apiUrl + '/' + req.body.name + '/states')
  request.get(config.apiUrl + '/' + req.body.name + '/states', (error, response, body) => {


    if (error) {
      return console.dir(error);
    }


    const returnData = [JSON.parse(body)];
    const states = returnData[0].responseData;


    res.status(200).json({
      message : `States for ${req.body.name }`,
      states: states
    });
  });
});


app.post('/api/list-zones' , (req,res, body) => {




  request.get(config.apiUrl + '/surfspot/zone/' + req.body.state.country + '/' + req.body.state.name + '/'  + config.publicKey , (error, response, body) => {


    if (error) {
      return console.dir(error);
    }


    const returnData = [JSON.parse(body)];
    const zones = returnData[0].responseData;


    res.status(200).json({
      message : `Zones for ${req.body.state.name }`,
      zones: zones
    });
  });
});

module.exports = app;

