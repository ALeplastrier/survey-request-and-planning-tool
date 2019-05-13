import Vue from 'vue'
import { EventBus } from './../../../event-bus';

import * as mutTypes from './project-metadata-mutation-types'

export const checkAoi = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    Vue.axios
    .post('/api/check-aoi', state.projectMetadata.areaOfInterest)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const save = ({ commit, state }) => {
  console.log('saving project metadata');
  console.log(state);

  return new Promise((resolve, reject) => {
    Vue.axios.post('/api/project-metadata', state.projectMetadata)
    .then((response) => {
      commit(mutTypes.UPDATE, { path: 'projectMetadata', value: response.data })
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const deleteProjectMetadata = ({ commit, state }, payload) => {
  var url_endpoint = '/api/project-metadata/' + payload.id;
  return new Promise((resolve, reject) => {
    Vue.axios.delete(url_endpoint)
    .then((response) => {
      commit(mutTypes.RESET);
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
  });
}

export const getProjectMetadata = ({ commit, state }, payload) => {
  var url_endpoint = '/api/project-metadata/' + payload.id;
  if (payload.version) { url_endpoint += "?version=" + payload.version }

  return new Promise((resolve, reject) => {
    Vue.axios.get(url_endpoint)
    .then((response) => {
      commit(mutTypes.RESET_PROJECT_METADATA)
      commit(mutTypes.UPDATE, { path: 'projectMetadata', value: response.data })
      commit(mutTypes.SET_DIRTY, false);
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });

}

export const getProjectStatuses = ({ commit, state }) => {
  var url_endpoint = '/api/project-metadata/valid-statuses';

  return Vue.axios.get(url_endpoint)
  .then((response) => {
    commit(mutTypes.SET_PROJECT_STATUSES, response.data);
  })
}
