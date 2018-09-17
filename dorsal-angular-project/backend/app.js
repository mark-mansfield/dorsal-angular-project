
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


app.post('/api/list-locations' , (req,res, body) => {


  // drill down using country , state , zone
  request.get(config.apiUrl + '/surfspot/location/' + req.body.country  + '/' + req.body.state.name + '/' + req.body.zone + '/' + config.publicKey , (error, response, body) => {

    if (error) {
      return console.dir(error);
    }
    const returnData = [JSON.parse(body)];
    const locations = returnData[0].responseData;

    res.status(200).json({
      message : `Reporting Locations for ${req.body.zone} in ${req.body.state.name }`,
      locations: locations
    });
  });
});

app.post('/api/list-reports' , (req,res, body) => {

  const jsonBody = {};
  jsonBody.state = req.body.state
  jsonBody.zone = req.body.zone
  jsonBody.location = req.body.location
  jsonBody.publicKey = config.publicKey;
  jsonBody.pageSize = 20; //items return per call
  jsonBody.pageIndex = 0; //page index


  request.post({
    url: config.apiUrl + '/report/list',
    method: "POST",
    json: true,   // <--Very important!!!
    body: JSON.parse(JSON.stringify(jsonBody))
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      // const returnData = [JSON.parse(response.body)];
      const returnData = response.body;
      const reports = returnData;

      res.status(200).json({
        message : `Reports`,
        reports: reports
      });
  });
  // console.log(req.body.country);
  // console.log(req.body.state);
  // console.log(req.body.zone);
  // console.log(req.body.location);


  // const jsonBody = {};
  // jsonBody.state = req.body.state
  // jsonBody.zone = req.body.zone
  // jsonBody.location = req.body.location
  // jsonBody.publicKey = config.publicKey;
  // jsonBody.pageSize = 20; //items return per call
  // jsonBody.pageIndex = 0; //page index

  // console.log(requestBody);
  //  ? we asend the body of the request here
  //  ? send as a string
  // ? set http headers  for content type and respons type

  // drill down using country , state , zone, location
  // config.apiUrl + '/report/list'

  // request.post(config.apiUrl + '/report/list' , JSON.stringify(requestBody))
  // request.post(config.apiUrl + '/report/list' + req.body.country  + '/' + req.body.state.name + '/' + req.body.zone + '/' + config.publicKey , (error, response, body) => {

  //   if (error) {
  //     return console.dir(error);
  //   }
  //   const returnData = [JSON.parse(body)];
  //   const zones = returnData[0].responseData;

  //   res.status(200).json({
  //     message : `Reporting Locations for ${req.body.zone} in ${req.body.state.name }`,
  //     zones: zones
  //   });
  // });
});

module.exports = app;

