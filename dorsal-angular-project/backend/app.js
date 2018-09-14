const config = {
  apiUrl : 'http://api.dorsalwatch.com/public',
  publicKey : 'ab61cd9427bea80f22e641c04c312195',
  contentType : 'application/json',
  appName : 'SHARK DATA 1.0'

}

const express = require('express');
const app = express();
app.use((req,res,next) => {
  next();
});

