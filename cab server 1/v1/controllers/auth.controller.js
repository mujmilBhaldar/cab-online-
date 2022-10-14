const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const CustomerModel = require("../models/customer.model");
const { createToken, verifyToken } = require("../helpers/token");
const sendEmail = require("../helpers/email");
class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ status: 1, email: email })
      .then((result) => {
        if (!result) {
          res.status(404).send({
            error: null,
            message: "Invalid email or user is disabled",
          });
        } else {
          try {
            if (bcrypt.compareSync(password, result.password)) {
              // authentication is successful
              const token = createToken({
                id: result._id,
                status: result.status,
                role: "admin",
              });
              res.set("x-token", token);
              res
                .status(200)
                .send({ data: result, message: "Login successful" });
            } else {
              res
                .status(404)
                .send({ error: null, message: "Invalid password" });
            }
          } catch (e) {
            res
              .status(500)
              .send({ error: e, message: "Could not logged in, try again" });
          }
        }
      })
      .catch((e) => {
        res
          .status(500)
          .send({ error: e, message: "Could not logged in, try again" });
      });
  } //end of userLogin

  static validateToken(req, res) {
    const { token } = req.body;

    try {
      const payload = verifyToken(token);
      if (payload && payload.id) {
        res
          .status(200)
          .send({ data: { id: payload.id }, message: "Valid token" });
      } else {
        res.status(403).send({ error: null, message: "Invalid token" });
      }
    } catch (e) {
      res.status(403).send({ error: null, message: "Invalid token" });
    }
  } //validateToken

  static passwordResetLink(req, res) {
    const { email } = req.body;

    console.log("Req ", req);
    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (result?._id) {
          // if user is available then generate a token
          const token = createToken({ id: result._id });

          const link = `${req?.headers?.origin}/forgot-password/${token}`;
          const textBody = `Copy the below link and paste in the addressbar of web browser
           ${link}`;
          const htmlBody = `<p> You can reset the password by using below link. 
            <a href="${link}">click here</a> to reset password </p>`;

          sendEmail(
            email,
            "patilaishu2099@gmail.com",
            "Password Reset Link",
            textBody,
            htmlBody,
            (err, info) => {
              if (err) {
                console.log(err);
                res.status(500).send({
                  error: "Could not sent the email. please try again!",
                });
              } else {
                console.log(info);
                res.status(200).send({ data: null, message: "Email sent" });
              }
            }
          );

          // send the email (nodemailer)
        } else {
          res.status(404).send({ error: "Invalid email or user is disabled" });
        }

        // give success respnse if email sent
      })
      .catch((err) => {
        res.status(404).send({ error: "Invalid email or user is disabled" });
      });
  }
}

module.exports = AuthCtrl;
