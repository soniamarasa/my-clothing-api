import mongoose from 'mongoose';

const bandanaSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
});

const bandanaModel = mongoose.model('bandana', bandanaSchema);

export default bandanaModel;
