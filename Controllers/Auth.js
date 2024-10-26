const Auth = require("../Model/Auth");
const bcrpyt = require("bcrypt");
const signupController = async (req, res) => {
  try {
    const addData = new Auth(req.body);
    const findUser = await Auth.find({ email: req.body.email });
    // find always returns an array.  if you find more than one of the same email then
    // its greater than 0 and you have an error.
    if (findUser.length > 0) {
      res.status(404).send("Email already exists");
    } else {
      addData
        .save()
        .then(() => {
          res.status(200).send(addData);
        })
        .catch((e) => {
          res.status(404).send(e);
        });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const signinController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const findUser = await Auth.findone({ email: userEmail });
    // use findone to return an object of that user.
    if (findUser !== null) {
      const matchPassword = await bcrypt.compare(
        userPassword,
        findUser.password
      );

      if (matchPassword) {
        res.status(200).send(findUser);
      } else {
        res.status(404).send("incorrect password");
      }
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  signupController,
  signinController,
};
