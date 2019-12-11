import axios from "axios";
import baseUrl from "../../Configs/index";

export function getAllInvoice() {
  var getAllInvoice = {
    method: "GET",
    url: baseUrl + "/invoices",
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
    url: baseUrl + `/invoices/${id}`,
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
    url: baseUrl + `/invoices`,
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
    url: baseUrl + `/invoices/${info._id}`,
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
    url: baseUrl + `/invoices/${id}`,
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
