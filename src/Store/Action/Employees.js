import axios from "axios";
import baseUrl from '../../Configs/index';

export function setEmployees(payload) {
  return {
    type: "SET_EMPLOYEES_DATA",
    payload
  };
}


export function getAllEmployees() {
  var getAllEmployees = {
    method: "GET",
    url: baseUrl + "/employees",
    json: true
  };
  return axios(getAllEmployees)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function getEmployeesByID(id) {
  var getEmployeesByID = {
    method: "GET",
    url: baseUrl + `/employees/${id}`,
    json: true
  };
  return axios(getEmployeesByID)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function createEmployees(info) {
  var createEmployees = {
    method: "POST",
    url: baseUrl + `/employees`,
    data: { ...info },
    json: true
  };
  return axios(createEmployees)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function updateEmployees(info) {
  var updateEmployees = {
    method: "PUT",
    url: baseUrl + `/employees/${info._id}`,
    data: { ...info },
    json: true
  };
  return axios(updateEmployees)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function deleteEmployees(id) {
  var deleteEmployees = {
    method: "DELETE",
    url: baseUrl + `/employees/${id}`,
    json: true
  };
  return axios(deleteEmployees)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
