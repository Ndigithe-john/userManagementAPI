const express = require("express");
const router = express.Router();
const data = require("./data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.status(200).json({
    result: true,
    errorCode: null,
    errorDesc: null,
    data: data,
  });
});

router.get("/:userid", (req, res) => {
  const id = req.params.userid;
  const userid = data.find((user) => user.id === Number(id));
  if (userid) {
    res.status(200).json({
      result: true,
      errorCode: null,
      errorDesc: null,
      data: data[id],
    });
  } else {
    res.status(404).json({
      result: false,
      errorCode: "GU_1705",
      errorDesc: "Invalid select fields",
      data: null,
    });
  }
});

router.post("/", (req, res) => {
  data.push(res.body);
  const user = {
    name: req.body.name,
  };
  res.status(200).json({
    success: true,
    message: "User added successfully",
    createdUser: user,
    result: res.body,
  });
});

router.post("/signup", (req, res) => {
  const existingUser = data.find((user) => user.email === req.body.email);
  if (existingUser) {
    return res.status(409).json({
      message: "Email exists",
    });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const newUser = {
          email: req.body.email,
          password: hash,
        };

        data.push(newUser);

        res.status(201).json({
          message: "User created",
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const user = data.find((user) => user.email === req.body.email);
  if (!user) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      "secretKey",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Auth Successful",
      token: token,
    });
  });
});

router.delete("/:userID", (req, res) => {
  const id = req.params.userID;
  const index = data.findIndex((user) => user.id === Number(id));
  if (index !== -1) {
    data.splice(index, 1);
    return res.status(200).json({
      message: "User deleted",
    });
  }
  res.status(404).json({
    message: "User not found",
  });
});

module.exports = router;
