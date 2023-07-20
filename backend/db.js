const mongoose = require('mongoose');
const url = "mongodb+srv://Tomatoadmin:%40tomatopassword@cluster0.qmotadk.mongodb.net/TomatoMern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log('Successfully connected to MongoDB');

    const fetchedData = await mongoose.connection.db.collection("fooditems").find({}).toArray();
    global.fooditems = fetchedData;
    // console.log('Fetched data:', fetchedData);
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.foodCategory = foodCategory;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = connectToMongoDB;
