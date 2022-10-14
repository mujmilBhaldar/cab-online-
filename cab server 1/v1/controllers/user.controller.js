const bcrypt = require("bcryptjs");
const _ = require("lodash");
const UserModel = require("../models/user.model");
class UserCtrl {
  static pickUser(user) {
    return _.pick(user, [
      "id",
      "_id",
      "name",
      "mobile",
      "email",
      "status",
      "createdAt",
    ]);
  }

  static createUser(req, res) {
    const user = req.body;
    if (user.password) {
      try {
        user.password = bcrypt.hashSync(user.password);
      } catch (err) {
        console.log(err);
      }
    }

    const userDoc = new UserModel(user);

    userDoc
      .save()
      .then((result) => {
        res
          .status(200)
          .send({ data: UserCtrl.pickUser(result), message: "User Created" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ error: err, message: "Could not created the user" });
      });
  }
  // end of createUser

  static updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ data: UserCtrl.pickUser(result), message: "User updated" });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err, message: "Couls not updated the user" });
      });
  }
  // end of updateUser

  static deleteUser(req, res) {
    const { id } = req.params;
    UserModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ data: UserCtrl.pickUser(result), message: "User deleted" });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err, message: "Could not deleted the user" });
      });
  }
  // end of deleteUser

  static getSingleUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ data: UserCtrl.pickUser(result), message: "User record" });
      })
      .catch((err) => {
        res.status(404).send({ error: err, message: "the user not available" });
      });
  }
  // end of getSingleUser

  static getAllUser(req, res) {
    UserModel.find({})
      .then((result) => {
        res.status(200).send({
          data: _.map(result, UserCtrl.pickUser),
          message: "User records",
        });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ error: err, message: "the users not available" });
      });
  }
  // end of getAllUser
}

module.exports = UserCtrl;
