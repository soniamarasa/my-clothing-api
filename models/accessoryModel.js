import mongoose from 'mongoose';

const accessoriesSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  category: Object,
});

const accessoriesModel = mongoose.model('accessories', accessoriesSchema);

export default accessoriesModel;
