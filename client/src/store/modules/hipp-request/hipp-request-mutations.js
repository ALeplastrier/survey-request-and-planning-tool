const _ = require('lodash');
import Vue from 'vue'

import * as types from './hipp-request-mutation-types'

const mutations = {
  [types.UPDATE] (state, { path, value }) {
    state.dirty = true;
    _.set(state, path, value)
  },

  [types.SET_REQUEST_STATUS] (state, status) {
    state.requestStatus = status;
  },

  [types.SET_REQUEST_ERROR] (state, error) {
    state.requestError = error;
  },

  [types.UPDATE_WITH_DEFAULTS] (state, defaults) {
    const item = defaults;
    // replace all `null` values with `undefined`
    Object.keys(item).forEach(function(key) {
      item[key] = item[key] == null ? undefined : item[key];
    })
    _.merge(state.hippRequest, item);
    // set tech spec attributes to new objects for Vue change detection to
    // pick up on. Mostly works without this, but array types aren't being
    // picked up.
    Object.keys(state.hippRequest).forEach(function(key) {
      state.hippRequest[key] = _.cloneDeep(state.hippRequest[key]);
    })

    state.dirty = true;
  },

  [types.SET_DIRTY] (state, dirty) {
    state.dirty = dirty;
  },

  [types.SET_CHART_PRODUCT_QUALITY_IMPACT_REQUIREMENTS] (state, reqs) {
    state.chartProductQualityImpactRequirements = reqs
  },

  [types.SET_SURVEY_QUALITY_REQUIREMENTS] (state, reqs) {
    state.surveyQualityRequirements = reqs
  },

  [types.SET_RISK_MATRIX] (state, riskMatrix) {
    state.riskMatrix = riskMatrix
  },

  [types.SET_REQUEST_PURPOSES] (state, purposes) {
    Vue.set(state.hippRequest, 'purposes', purposes)
  },

  [types.UPDATE_HIPP_REQUEST] (state, { path, value }) {
    Vue.set(state.hippRequest, path, value)
  },
}

export default {
  mutations
}
