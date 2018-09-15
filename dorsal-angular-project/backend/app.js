
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

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


// app.post('api/countries' , (req,res,next) => {
//   cont.country = req.body;
//   console.log(country);
//   res.status(201).json(
//   {
//     countries: countries
//   });
// });

app.get('/api/countries' , (req,res,next) => {
  const config = {
    apiUrl : 'http://api.dorsalwatch.com/public',
    publicKey : 'ab61cd9427bea80f22e641c04c312195',
    contentType : 'application/json',
    appName : 'SHARK DATA 1.0'

  };

  const Request = require("request");

  Request.get(config.apiUrl + "/countries", (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      const returnData = [JSON.parse(body)]
      const countries = returnData[0].responseData;
      // returnData[0].responseData.forEach((item) => {
      //   countries.push(item.name)
      // })


      res.status(200).json({
        message : 'countries listed in the dorsal system',
        countries : countries
      });
  });

  // const countries = [
  //     {
  //       name: 'Australia'
  //     },
  //     {
  //       name: 'USA'
  //     },
  //     {
  //       name: 'Hawaii'
  //     }
  //   ]





    // call next if there is more middlewear
  }
);

module.exports = app;

