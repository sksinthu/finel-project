const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://sksinthu15:sinthu234@cluster0.hcqfnq5.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"; // Ensure the database name is included in the URI

module.exports = function(callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Connected to MongoDB");

            const foodCollection = mongoose.connection.db.collection("food_items");
            const foodData = await foodCollection.find({}).toArray();
            console.log("Food Items:", foodData); // Log the fetched food items

            const categoryCollection = mongoose.connection.db.collection("foodCategory");
            const categoryData = await categoryCollection.find({}).toArray();
            console.log("Categories:", categoryData); // Log the fetched categories

            callback(null, foodData, categoryData);
        })
        .catch(err => {
            console.error("Error connecting to MongoDB: ", err);
            callback(err, null, null);
        });
};
