const express = require("express");

const router = express.Router();

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  postDb.insert(req.body)
    .then( post =>{
      res.status(201).json(post)
    })
});

router.get("/", (req, res) => {
  userDb.get().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  userDb.getById(req.params.id).then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then((posts) => {
    res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then((posts) => {
      res.status(200).json({ message: "successfully deleted a user" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body)
    .then( count =>{
      if( count === 1){
        res.status(200).json({message: "user updates successfully"})
      } else {
        res.status(500).json({ error: "Something went wrong" })
      }
    })
});

//custom middleware

function validateUserId(req, res, next) {
  userDb
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "A user with that id was not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({message: 'User must contain a name property'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text || !req.body.user_id){
    res.status(400).json({message: "Please include a text and user_id properties"})
  } else{
    next()
  }
}

module.exports = router;
