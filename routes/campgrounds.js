const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const catchAsync = require("../utils/syncWrapper");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/").get(catchAsync(campgrounds.index))
.post(upload.single('image'), (req,res) =>{
    res.send(req.body)
})
router.get("/new", isLoggedIn, campgrounds.newForm);
router.route("/:id").get(catchAsync(campgrounds.showNewCampground)).put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground)).delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));
router.get("/:id/edit",isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

module.exports = router;
