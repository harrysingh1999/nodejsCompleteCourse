/* eslint-disable max-len */
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const getLogin = (req, res) => {
  console.log(req.isLoggedIn, req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

export const getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    user: {},
  });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Email or Password"], // for security reasons we don't pass exact failed input, so attacker won't know which input is correct or which isn't..............
      oldInput: { email },
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Email or Password"],
      oldInput: { password },
      user: {},
    });
  }
  // store only plain serializable data in session (not full mongoose document), good Practice..............
  req.session.isLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType,
  };
  await req.session.save();

  res.redirect("/");
};

export const postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name should contain only alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last Name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }

      return true;
    }),

  async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user: {},
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });

      await user.save();

      return res.redirect("/login");
    } catch (err) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: { firstName, lastName, email, userType },
        user: {},
      });
    }
  },
];

export const postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
  // res.session.isLoggedIn = false
  // res.cookie("isLoggedIn", false);
};
