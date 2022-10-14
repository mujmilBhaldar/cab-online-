const bcrypt = require("bcryptjs");
const _ = require("lodash");
const CustomerModel = require("../models/customer.model");
class CustomerCtrl {
  static pickCustomer(customer) {
    return _.pick(customer, [
      "id",
      "_id",
      "name",
      "mobile",
      "email",
      "status",
      "address",
      "createdAt",
    ]);
  }

  static createCustomer(req, res) {
    const customer = req.body;
    if (customer.password) {
      try {
        customer.password = bcrypt.hashSync(customer.password);
      } catch (err) {
        console.log(err);
      }
    }

    const customerDoc = new CustomerModel(customer);

    customerDoc
      .save()
      .then((result) => {
        res.status(200).send({
          data: CustomerCtrl.pickCustomer(result),
          message: "Customer Created",
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ error: err, message: "Could not created the customer" });
      });
  }
  // end of createCustomer

  static updateCustomer(req, res) {
    const { id } = req.params;
    const customer = req.body;
    CustomerModel.findOneAndUpdate({ _id: id }, customer, { new: true })
      .then((result) => {
        res.status(200).send({
          data: CustomerCtrl.pickCustomer(result),
          message: "Customer updated",
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err, message: "Couls not updated the customer" });
      });
  }
  // end of updateCustomer

  static deleteCustomer(req, res) {
    const { id } = req.params;
    CustomerModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({
          data: CustomerCtrl.pickCustomer(result),
          message: "Customer deleted",
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err, message: "Could not deleted the customer" });
      });
  }
  // end of deleteCustomer

  static getSingleCustomer(req, res) {
    const queries = req?.query;
    const filter = CustomerCtrl.pickCustomer(queries);

    if (filter?._id?.length != 24) delete filter._id;

    CustomerModel.findOne(filter)
      .then((result) => {
        console.log("Customers: ", result);
        res.status(200).send({
          data: CustomerCtrl.pickCustomer(result),
          message: "Customer record",
        });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ error: err, message: "the customer not available" });
      });
  }
  // end of getSingleCustomer

  static getAllCustomers(req, res) {
    const queries = req?.query;

    const filter = CustomerCtrl.pickCustomer(queries);

    if (filter?._id) delete filter._id;

    CustomerModel.find(filter)
      .then((result) => {
        res.status(200).send({
          data: _.map(result, CustomerCtrl.pickCustomer),
          message: "Customer records",
        });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ error: err, message: "the customers not available" });
      });
  }
  // end of getAllCustomers
}

module.exports = CustomerCtrl;
