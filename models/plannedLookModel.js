import mongoose from 'mongoose';

const plannedLookSchema = mongoose.Schema({
  userId: String,
  look: Object,
  date: String,
  status: String,
  place: Object,
  tag: Object,
});

const plannedLookModel = mongoose.model('plannedLook', plannedLookSchema);

export default plannedLookModel;
