const express = require("express"); //Richiama l'utilizzo di Express
const cors = require("cors")

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

app.get("/", (req, res) => {
  res.send(`Server della mia pizzeria`);
});

app.use(errorsHandler);
app.use (notFound);

//attivazione del server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
