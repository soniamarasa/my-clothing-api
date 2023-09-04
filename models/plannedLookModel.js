import mongoose from 'mongoose';

const plannedLookSchema = mongoose.Schema({
  userId: String,
  look: Object,
  date: String,
  status: String,
  place: Object,
  plannedLook: Object,
});

const plannedLookModel = mongoose.model('plannedLook', plannedLookSchema);

export default plannedLookModel;
