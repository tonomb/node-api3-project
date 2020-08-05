const db = require('../users/userDb')

function validateUserId(req, res, next){
  db.getById(req.params.id)
    .then(user =>{
      console.log(user);
    })
}

module.exports = validateUserId