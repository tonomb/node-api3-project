
const moment = require('moment');

function logger(req, res, next){
  const timeStamp = moment().format()
  console.log(`${req.method} ${req.url} ${timeStamp} `);

  next()
}


module.exports = logger