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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 5;
    const camp = new Campground({
      author: "5ff27f98c7cef50488d165ea",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610156665/yelp_camp/vp59jdawupvml6h224jf.jpg",
          filename: "yelp_camp/vp59jdawupvml6h224jf",
        },
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610156663/yelp_camp/njbscyc8rgaaea40fw1b.jpg",
          filename: "yelp_camp/njbscyc8rgaaea40fw1b",
        },
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610155687/yelp_camp/zqm6yyccoungyqjwpv3h.jpg",
          filename: "yelp_camp/zqm6yyccoungyqjwpv3h",
        },
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610155687/yelp_camp/vhzsvif2umzbo24deq5u.jpg",
          filename: "yelp_camp/vhzsvif2umzbo24deq5u",
        },
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610155686/yelp_camp/sdc2fxrj9xoji1v5slnt.jpg",
          filename: "yelp_camp/sdc2fxrj9xoji1v5slnt",
        },
        {
          url:
            "https://res.cloudinary.com/dxatqwuju/image/upload/v1610155686/yelp_camp/iiajsuksaubtoniyiwcy.jpg",
          filename: "yelp_camp/iiajsuksaubtoniyiwcy",
        },
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
