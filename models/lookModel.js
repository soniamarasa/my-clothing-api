import mongoose from 'mongoose';

const lookSchema = mongoose.Schema({
  userId: String,
  bottom: Object,
  top: Object,
  garb: Object,
  shoe: Object,
  tag: Object,
});

const lookModel = mongoose.model('look', lookSchema);

export default lookModel;
