import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  word: {type: String, required: true},
  definition: {type: String, required: true},
  example: {type: String},
},
{
  timestamps: true,   
});

const Vocab = mongoose.model('Vocab', vocabularySchema);
export default Vocab;
