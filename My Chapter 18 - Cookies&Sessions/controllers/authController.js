export const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false
  });
};

export const postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
}

export const postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  })
  // res.session.isLoggedIn = false
  // res.cookie("isLoggedIn", false);
}

