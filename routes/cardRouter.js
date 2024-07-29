import express, { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import Vocab from "../models/cardModel.js";

const cardRouter = express.Router();

// GET: show all vocabs
cardRouter.get('/', async (req, res) => {
  try {
    const vocabs = await Vocab.find().lean();
    res.render("homeCard", {
      vocabs
    });

  } catch (err){
    console.error(err);
  }
})

// POST: add new vocab 
cardRouter.post('/', async (req, res) => {
  const {word, definition, example} = req.body;
  try {
    const newVocab = new Vocab({word, definition, example});
    await newVocab.save();
    console.log(req.body);
    res.redirect('/cards');
  } catch (err){
    console.error(err);
  }
})

// Delete
cardRouter.delete('/:id', async(req, res) => {
  console.log("Delete the card");
  try {
    await Vocab.deleteOne({_id: req.params.id});
    res.redirect('/cards');
  } catch (err) {
    console.error(err);
  }
})

export default cardRouter;
