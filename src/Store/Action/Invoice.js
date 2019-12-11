import axios from "axios";
import baseUrl from "../../Configs/index";

export function getAllInvoice() {
  var getAllInvoice = {
    method: "GET",
    url: baseUrl + "/invoice",
    json: true
  };
  return axios(getAllInvoice)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function getInvoiceByID(id) {
  var getInvoiceByID = {
    method: "GET",
    url: baseUrl + `/invoice/${id}`,
    json: true
  };
  return axios(getInvoiceByID)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function createInvoice(info) {
  var createInvoice = {
    method: "POST",
    url: baseUrl + `/invoice`,
    data: { ...info },
    json: true
  };
  return axios(createInvoice)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function updateInvoice(info) {
  var updateInvoice = {
    method: "PUT",
    url: baseUrl + `/invoice/${info._id}`,
    data: { ...info },
    json: true
  };
  return axios(updateInvoice)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function deleteInvoice(id) {
  var deleteInvoice = {
    method: "DELETE",
    url: baseUrl + `/invoice/${id}`,
    json: true
  };
  return axios(deleteInvoice)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
