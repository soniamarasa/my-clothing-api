import mongoose from 'mongoose';

const lookSchema = mongoose.Schema({
  userId: String,
  bottom: Object,
  top: Object, 
  shoe: Object, 
  dress: Object,
  accessory: Object,
  handbag: Object,
  bandana: Object,
  coat: Object
});

const lookModel = mongoose.model('look', lookSchema);

export default lookModel;
