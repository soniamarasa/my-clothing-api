import mongoose from 'mongoose';

const accessoriesSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  icon: String,
});

const accessoriesModel = mongoose.model('accessories', accessoriesSchema);

export default accessoriesModel;
