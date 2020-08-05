const express = require('express');

const postsDb = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  postsDb.get()
    .then( posts =>{
      res.status(200).json(posts)
    })
    .catch( err =>{
      res.status(500).json({message: 'something went wrong'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  postsDb.getById(req.params.id)
    .then( post =>{
      res.status(200).json(post)
    })
});

router.delete('/:id', validatePostId, (req, res) => {
    postsDb.remove(req.params.id)
      .then( post =>{
        res.status(200).json({message: 'Post was sucessfully deleted'})
      })
});

router.put('/:id', validatePostId, (req, res) => {
  postsDb.update(req.params.id, req.body)
  .then( count =>{
    if( count === 1){
      res.status(200).json({message: "post updated successfully"})
    } else {
      res.status(500).json({ error: "Something went wrong" })
    }
  })
});

// custom middleware

function validatePostId(req, res, next) {
  postsDb.getById(req.params.id)
    .then(post => {
      if(post){
        next()
      } else {
        res.status(404).json({message: 'The post id does not exist'})
      }
    })
}

module.exports = router;
