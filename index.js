const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const app = express();
const port = 27017;

mongoose.connect("mongodb://localhost:27017/yelpCamp", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Dtabase connected");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("home"));
app.get("/campgrounds", async (req, res) => {
   const campgrounds = await Campground.find({});
   res.render("campgrounds/index", { campgrounds });
});
app.get("/campgrounds/new", (req, res) => {
   res.render("campgrounds/new");
});
app.get("/campgrounds/:id", async (req, res) => {
   const { id } = req.params;
   const campground = await Campground.findById(id);
   res.render("campgrounds/show", { campground });
});
app.post("/campgrounds", async (req, res) => {
   const campground = new Campground(req.body.campground);
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`)
});

app.listen(port, () => console.log(`Example app listening on port 27017`));
