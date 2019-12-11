import axios from "axios";
import baseUrl from '../../Configs/index';

export function setHarvests(payload) {
    return {
      type: "SET_HARVESTS_DATA",
      payload
    };
  }
  export function getAllHarvests() {
    var getAllHarvests = {
      method: "GET",
      url: baseUrl + "/harvests",
      json: true
    };
    return axios(getAllHarvests)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  export function getHarvestsByID(id) {
    var getHarvestsByID = {
      method: "GET",
      url: baseUrl + `/harvests/${id}`,
      json: true
    };
    return axios(getHarvestsByID)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  export function createHarvests(info) {
    var createHarvests = {
      method: "POST",
      url: baseUrl + `/harvests`,
      data: {...info},
      json: true
    };
    return axios(createHarvests)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  export function updateHarvests(info) {
    var updateHarvests = {
      method: "PUT",
      url: baseUrl + `/harvests/${info.id}`,
      data: {...info},
      json: true
    };
    return axios(updateHarvests)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  export function deleteHarvests(id) {
    var deleteHarvests = {
      method: "DELETE",
      url: baseUrl + `/harvests/${id}`,
      json: true
    };
    return axios(deleteHarvests)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  