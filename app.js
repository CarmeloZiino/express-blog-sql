const express = require("express"); //Richiama l'utilizzo di Express
const cors = require("cors")
const db = require("./data/posts_db")

const app = express(); //Definisce Express nella costante app
const port = 3000; //Definisce una porta alla quale assegnare i comandi
const checkTime = require("./middlewares/checkTime")
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")

const postsRouter = require("./routers/postRouter"); //Richiama il routers
app.use(cors({
  // origin: "http://localhost:5173"
}));


app.use(checkTime);


app.use(express.static("public")); //Consente l'accesso alla cartella pubblic

app.use(express.json());


app.use("/posts", postsRouter);


// Endpoint per ottenere tutti i post
app.get('/', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: 'Errore nel server' });
    }
    res.json(results); // Restituisce i risultati come JSON
  });
});


app.use(errorsHandler);
app.use (notFound);

//attivazione del server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
