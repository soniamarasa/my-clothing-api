import mongoose from 'mongoose';

const plannedLookSchema = mongoose.Schema({
  userId: String,
  look: Object,
  date: Date,
  status: Object,
  place: Object,
  coat: Object,
  handbag: Object,
  bandana: Object,
  accessories: Array,
});

const plannedLookModel = mongoose.model('plannedLook', plannedLookSchema);

export default plannedLookModel;
