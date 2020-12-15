const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Joi = require("joi");
const catchError = require("./utils/ExpressError");
const catchAsync = require("./utils/syncWrapper");
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

app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => res.render("home"));
app.get("/campgrounds", async (req, res) => {
   const campgrounds = await Campground.find({});
   res.render("campgrounds/index", { campgrounds });
});
app.get("/campgrounds/new", (req, res) => {
   res.render("campgrounds/new");
});

app.post(
   "/campgrounds",
   catchAsync(async (req, res, next) => {
      // if (!req.body.campground)
      //    throw new catchError("Invalid Campground Info", 400);
      const campgroundSchema = Joi.object({
         campground: Joi
            .object({
               title: Joi.string().required(),
               price: Joi.number().required().min(1),
               image: Joi.string().required(),
               location: Joi.string().required(),
               description: Joi.string().required(),
            })
            .required(),
      });
      const { error } = campgroundSchema.validate(req.body);
      if (error) {
         const msg = error.details.map((el) => el.message).join(",");
         throw new catchError(msg, 400);
      }
      console.log(results);
      const campground = new Campground(req.body.campground);
      await campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
   })
);

app.get(
   "/campgrounds/:id",
   catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findById(id);
      res.render("campgrounds/show", { campground });
   })
);

app.get(
   "/campgrounds/:id/edit",
   catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findById(id);
      res.render("campgrounds/edit", { campground });
   })
);
app.put(
   "/campgrounds/:id",
   catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findByIdAndUpdate(id, {
         ...req.body.campground,
      });
      res.redirect(`/campgrounds/${campground._id}`);
   })
);
app.delete(
   "/campgrounds/:id",
   catchAsync(async (req, res) => {
      const { id } = req.params;
      await Campground.findByIdAndDelete(id);
      res.redirect("/campgrounds");
   })
);
app.all("*", (req, res, next) => {
   next(new catchError("Page Not Found!!!!", 404));
});
app.use((err, req, res, next) => {
   const { statusCode = 500 } = err;
   if (!err.messsage)
      (err.messsage = "Something went wrong"),
         res.status(statusCode).render("error", { err });
});
app.listen(port, () => console.log(`Example app listening on port 27017`));
