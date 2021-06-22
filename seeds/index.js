const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cites");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
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
  for (let i = 0; i < 5; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 10) + 2;
    const camp = new Campground({
      author: "60c3e84eaa16b409d0a7f480",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
					url: 'https://res.cloudinary.com/tommy91/image/upload/v1623452622/YelpKamp/fozklgzij1suk1y5rghv.jpg',
					filename: 'YelpKamp/fozklgzij1suk1y5rghv',
				}
      ],
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
