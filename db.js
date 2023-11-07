const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://quickDel:quickdel123@cluster0.thtx0uu.mongodb.net/quickdelMern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(dbURI).catch(error => console.log(error));
        console.log("DB Connected!");
        
        const fetched_data = mongoose.connection.db.collection('food_item');
        
        // Find all documents and convert them to an array
        global.food_items = await fetched_data.find({}).toArray( async function(err, data){

            if(err) console.log(err);
            else console.log(data);
        })

        const foodCategoryFetchedData = mongoose.connection.db.collection('food_category');
        global.foodCategory = await foodCategoryFetchedData.find({}).toArray(function (err, catData) {

            if(err) console.log(err);
            else console.log(catData)
                
        })

        // console.log(global.food_items);
        
        
    } catch (error) {
        console.error(error);
    }

}

module.exports = mongoDB;