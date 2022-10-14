const CabModel = require("../models/cab.model");

class CabCtrl {
  static addCab(req, res) {
    const cab = req.body;
    console.log("Cab file: ", req.file);
    cab.avatar = `cab/${req?.file?.filename}`;
    const cabDoc = new CabModel(cab);
    cabDoc
      .save()
      .then((result) => {
        res.status(201).send({ data: result, message: "Cab created.." });
      })
      .catch((err) => {
        res.status(500).send({ error: err, message: "Cab not created" });
      });
  } //addCab
  static updateCab(req, res) {
    const cab = req.body;
    console.log("Cab: ", cab);
    const { id } = req.params;
    if (req?.file) cab.avatar = `cab/${req?.file?.filename}`;

    CabModel.findOneAndUpdate({ _id: id }, cab)
      .then((result) => {
        res.status(200).send({ data: result, message: "Cab updated" });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ error: err, message: "Could not updated the cab" });
      });
  } //updateCab
  static deleteCab(req, res) {
    const { id } = req.params;
    CabModel.findOneAndUpdate({ _id: id }, { status: 2 }, (err) => {
      if (err) {
        res.status(404).send({ error: err, message: "Could not deleted" });
      } else {
        res.status(200).send({ data: null, message: "User Deleted" });
      }
    });
  } //deleteCab
  static getOneCab(req, res) {
    const { id } = req.params;
    CabModel.findOne({ status: 1 })
      .then((result) => {
        res.status(200).send({ data: result, message: "Cab Details" });
      })
      .catch((err) => {
        res.status(404).send({ error: err, message: "cabs not available" });
      });
  } //getOneCab
  static getAllCabs(req, res) {
    CabModel.find({ $or: [{ status: 0 }, { status: 1 }] })
      .then((result) => {
        res.status(200).send({ data: result, message: "Cab list" });
      })
      .catch((err) => {
        res.status(404).send({ error: err, message: "cabs not available" });
      });
  } //getAllCabs
}

module.exports = CabCtrl;
