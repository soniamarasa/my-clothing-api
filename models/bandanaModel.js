import mongoose from 'mongoose';

const bandanaSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  // icon: String,
});

const bandanaModel = mongoose.model('bandana', bandanaSchema);

export default bandanaModel;
