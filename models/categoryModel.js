import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  userId: String,
  name: String,
  icon: String,
  color: String,
  type: Number,
});

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;
