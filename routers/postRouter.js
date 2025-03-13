/*
    3. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

    4. Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
       
       Se tutto funziona, passiamo alla prossima milestone
*/

const express = require("express"); //Richiama l'utilizzo di Express
const router = express.Router(); //Definisce Express nella costante app

const arrayPosts = require("../data/posts"); //Richiama l'array dei post, nella cartella data

const {
  index,
  show,
  store,
  update,
  patch,
  destroy,
} = require("../controllers/postController"); //Richiama le funzioni

// Associo le varie rotte alle funzioni

router.get("/", index);

router.get("/:id", show);

router.post("/", store);

router.put("/:id", update);

router.patch("/:id", patch);

router.delete("/:id", destroy);

module.exports = router;
