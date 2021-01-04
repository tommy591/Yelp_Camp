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
         author: "5fe5eadc573fb523e819ea5f",
         location: `${cities[random1000].city},${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         images: [
            {
               url:
                  "https://res.cloudinary.com/dxatqwuju/image/upload/v1609691825/yelp_camp/fcxcwovatrryddmzff0u.jpg",
               filename: "yelp_camp/fcxcwovatrryddmzff0u",
            },
            {
               url:
                  "https://res.cloudinary.com/dxatqwuju/image/upload/v1609691825/yelp_camp/ekhaglnjsnx48q0iw5ml.jpg",
               filename: "yelp_camp/ekhaglnjsnx48q0iw5ml",
            },
            {
               url:
                  "https://res.cloudinary.com/dxatqwuju/image/upload/v1609691825/yelp_camp/zqxggnyhjbtfpu5krjcz.jpg",
               filename: "yelp_camp/zqxggnyhjbtfpu5krjcz",
            },
            {
               url:
                  "https://res.cloudinary.com/dxatqwuju/image/upload/v1609691825/yelp_camp/qldxbqpfkuemo8nchbxw.jpg",
               filename: "yelp_camp/qldxbqpfkuemo8nchbxw",
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
