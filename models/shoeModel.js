import mongoose from 'mongoose';

const shoeSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  category: Object,
  // icon: String,
});

const shoeModel = mongoose.model('shoe', shoeSchema);

export default shoeModel;
