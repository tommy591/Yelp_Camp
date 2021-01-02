const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
   const campgrounds = await Campground.find({});
   res.render("campgrounds/index", { campgrounds });
};
module.exports.newForm = (req, res) => {
   res.render("campgrounds/new");
};
module.exports.newCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully created a campground");
    res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.showNewCampground = async (req, res) => {
   const { id } = req.params;
   const campground = await Campground.findById(id)
      .populate({
         path: "reviews",
         populate: {
            path: "author",
         },
      })
      .populate("author");
   if (!campground) {
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
   }
   res.render("campgrounds/show", { campground, msg: req.flash("success") });
};
module.exports.renderEditForm = async (req, res) => {
   const { id } = req.params;
   const campground = await Campground.findById(id);
   if (!campground) {
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
   }
   res.render("campgrounds/edit", { campground });
};
module.exports.updateCampground = async (req, res) => {
   const { id } = req.params;
   const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
   });
   req.flash("success", "Successfully updated a campground");
   res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.deleteCampground = async (req, res) => {
   const { id } = req.params;
   await Campground.findByIdAndDelete(id);
   req.flash("success", "Successfully deleted campground");
   res.redirect("/campgrounds");
};
