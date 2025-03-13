

// const arrayPosts = require("../data/posts"); //Richiama l'array dei post, nella cartella data

//Import db
const connection = require('../data/db.js');



function index(req, res) {
  // // res.send('Lista dei Post') //MILESTONE 1
  // res.json(arrayPosts);

  //MySQL 
  const sql = 'SELECT * FROM posts';

  connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({
          error: 'Database query error'
      })

      res.json(results)
  })

}

function show(req, res) {
  //   res.send("Dettagli del post" + req.params.id); //MILESTONE 1
  const id = parseInt(req.params.id); //recupero id e lo trasformo in numero
  const post = arrayPosts.find((post) => post.id === id); //Cerco il post tramite l'id

  if (!post) {
  //   //Condizione per la quale se non trova l'id e quindi il post, dà errore
  //   res.status(404);

  //   return res.json({
  //     status: 404,
  //     error: "Not Found",
  //     message: "Post non trovata",
  //   });
  // }

  // res.json(post);


//MySQL
const { id } = req.params

    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Database error'
        })

        if (results.length === 0) return res.status(404).json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })

        res.json(results[0])
    })


}}

function store(req, res) {
  // res.send("Creazione nuovo post");

  const newId = arrayPosts[arrayPosts.length - 1].id + 1;

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  arrayPosts.push(newPost);

  console.log(arrayPosts);

  res.status(201);
  res.json(newPost);
}

function update(req, res) {
  const id = parseInt(req.params.id)
  const post = arrayPosts.find((post) => post.id === id);

  if (!post) {
  res.status(404);
  return res.json({
  error: "Not Found",
  message: "Post non trovato"
  })
  }

  post.title = req.body.title,
  post.content = req.body.content,
  post.image = req.body.image,
  post.tags = req.body.tags,

  res.json(post);
}

function patch(req, res) {
  res.send("Modifica parziale del post" + req.params.id);
}

function destroy(req, res) {
  //   res.send("Eliminazione del post" + req.params.id); //MILESTONE 1

  // const id = parseInt(req.params.id); //recupero id e lo trasformo in numero
  // const post = arrayPosts.find((post) => post.id === id); //Cerco il post tramite l'id

  // if (!post) {
  //   //Condizione per la quale se non trova l'id e quindi il post, dà errore
  //   res.status(404);

  //   return res.json({
  //     status: 404,
  //     error: "Not Found",
  //     message: "Post non trovata",
  //   });
  // }
  // arrayPosts.splice(arrayPosts.indexOf(post), 1); //Rimuovo il post selezionato dall'array
  // res.json(arrayPosts);
  // res.sendstatus(204);


  //MySQL
  const { id } = req.params;

  const sql = 'DELETE FROM posts WHERE id = ?'

  connection.query(sql, [id], (err) => {
      if (err) return res.status(500).json({
          error: 'Database query error'
      })

      res.sendStatus(204)
    })
}

module.exports = { index, show, store, update, patch, destroy };
