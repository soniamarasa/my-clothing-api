import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  // icon: String,
});

const tagModel = mongoose.model('handbag', tagSchema);

export default tagModel;
