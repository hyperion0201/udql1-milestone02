import axios from "axios";
import baseUrl from "../../Configs/index";

export function setProduct(payload) {
  return {
    type: "SET_PRODUCT_DATA",
    payload
  };
}
export function deleteProjectProduct(payload) {
  return {
    type: "DELETE_PRODUCT",
    payload
  };
}

export function getAllProduct() {
  var getAllCategories = {
    method: "GET",
    url: baseUrl + "/products",
    json: true
  };
  return axios(getAllCategories)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function getProductByID(id) {
  var getCategoryByID = {
    method: "GET",
    url: baseUrl + `/products/${id}`,
    json: true
  };
  return axios(getCategoryByID)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function createProduct(info) {
  var getCategoryByID = {
    method: "POST",
    url: baseUrl + `/products`,
    data: { ...info },
    json: true
  };
  return axios(getCategoryByID)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function updateProduct(info) {
  var updateCategory = {
    method: "PUT",
    url: baseUrl + `/products/${info.id}`,
    data: { ...info },
    json: true
  };
  return axios(updateCategory)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err.response.data);
      return err;
    });
}
export function deleteProduct(id) {
  var deleteCategory = {
    method: "DELETE",
    url: baseUrl + `/products/${id}`,
    json: true
  };
  return axios(deleteCategory)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
