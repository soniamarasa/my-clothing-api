import mongoose from 'mongoose';

const usedLookSchema = mongoose.Schema({
  userId: String,
  look: Object,
  date: String,
  status: String,
  place: Object,
  usedLook: Object,
});

const usedLookModel = mongoose.model('usedLook', usedLookSchema);

export default usedLookModel;
