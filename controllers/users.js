const User = require("../models/user");


module.exports.registerUser = (req, res) => {
   res.render("users/register");
};
module.exports.newUser = async (req, res, next) => {
   try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
         if (err) return next(err);
         req.flash("success", " Welcome To Yelp Camp!!");
         res.redirect("/campgrounds");
      });
   } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
   }
};
module.exports.loginUser = (req, res) => {
   res.render("users/login");
};
module.exports.redirectUser = async (req, res) => {
   req.flash("success", "YO YO YO Welcome back homes!!!");
   const redirectUrl = req.session.returnTo || "/campgrounds";
   delete req.session.returnTo;
   res.redirect(redirectUrl);
};
module.exports.logoutUser = (req, res) => {
   req.logout();
   req.flash("success", " Goodbye , Come Back Soon !!!");
   res.redirect("/campgrounds");
};
