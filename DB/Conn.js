const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://jhamiltonramm:kh2ReBWziaJuhRID@jhramm.zivdd.mongodb.net/jason-native")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });
