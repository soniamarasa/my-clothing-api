import mongoose from 'mongoose';

const clothingSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  inactive: Boolean,
  category: Object,
  tag: Object,
});

const clothingModel = mongoose.model('clothing', clothingSchema);

export default clothingModel;
