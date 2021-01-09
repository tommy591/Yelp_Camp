const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const catchAsync = require("../utils/syncWrapper");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage});

router
   .route("/")
   .get(catchAsync(campgrounds.index))
   .post(
      isLoggedIn,
      upload.array("image"),
      validateCampground,
      catchAsync(campgrounds.newCampground)
   );
router.get("/new", isLoggedIn, campgrounds.newForm);
router
   .route("/:id")
   .get(catchAsync(campgrounds.showNewCampground))
   .put(
      isLoggedIn,
      isAuthor,
      upload.array("image"),
      validateCampground,
      catchAsync(campgrounds.updateCampground)
   )
   .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));
router.get(
   "/:id/edit",
   isLoggedIn,
   isAuthor,
   catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
