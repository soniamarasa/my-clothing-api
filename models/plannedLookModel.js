import mongoose from 'mongoose';

const plannedLookSchema = mongoose.Schema({
  userId: String,
  look: Object,
  date: Date,
  status: Object,
  place: Object,
  tag: Object,
  coat: Object,
  handbag: Object,
});

const plannedLookModel = mongoose.model('plannedLook', plannedLookSchema);

export default plannedLookModel;
