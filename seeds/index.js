const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cites");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelpCamp", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
   await Campground.deleteMany({});
   for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 30) + 5;
      const camp = new Campground({
         location: `${cities[random1000].city},${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         image: "https://source.unsplash.com/collection/4803919",
         description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, facere iusto! Ab est distinctio a.",
         price,
      });
      await camp.save();
   }
};
seedDB().then(() => {
   mongoose.connection.close();
});
