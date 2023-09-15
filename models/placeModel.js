import mongoose from 'mongoose';

const placeSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  // icon: String,
});

const placeModel = mongoose.model('place', placeSchema);

export default placeModel;
