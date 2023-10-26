import mongoose from 'mongoose';

const lookSchema = mongoose.Schema({
  userId: String,
  bottom: Object,
  top: Object, 
  garb: Object,
  shoe: Object, 
  bandana: Object,
  accessories: Array,
});

const lookModel = mongoose.model('look', lookSchema);

export default lookModel;
