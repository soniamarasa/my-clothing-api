import mongoose from 'mongoose';

const dashboardSchema = mongoose.Schema({
  userId: String,
  total: Number,
  result: Object,
});

const userModel = mongoose.model('dashboard', dashboardSchema);

export default userModel;
