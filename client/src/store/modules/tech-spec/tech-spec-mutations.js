import { UPDATE, SET_REQUEST_STATUS, SET_REQUEST_ERROR, SET_VALID_SURVEY_TYPES,
  SET_VALID_SURVEY_CLASSIFICATIONS, SET_VALID_POSITIONING_REQUIREMENTS,
  SET_VALID_GROUND_TRUTHING_METHODS, SET_SURVEY_LINES,
  SET_VALID_DELIVERY_METHODS, SET_HORIZONTAL_REFERENCE_SYSTEMS,
  SET_VERTICAL_REFERENCE_SYSTEMS, SET_SOUNDING_DATUMS, SET_SPHEROIDS,
  SET_TIDAL_GAUGE_LOCATIONS}
  from './tech-spec-mutation-types';

const mutations = {
  [UPDATE] (state, { path, value }) {
    _.set(state, path, _.cloneDeep(value))
  },

  [SET_REQUEST_STATUS] (state, status) {
    state.requestStatus = status;
  },

  [SET_REQUEST_ERROR] (state, error) {
    state.requestError = error;
  },

  [SET_VALID_SURVEY_TYPES] (state, validSurveyTypes) {
    state.validSurveyTypes = validSurveyTypes;
  },

  [SET_VALID_SURVEY_CLASSIFICATIONS] (state, validSurveyClassifications) {
    state.validSurveyClassifications = validSurveyClassifications;
  },

  [SET_VALID_GROUND_TRUTHING_METHODS] (state, validGroundTruthingMethods) {
    state.validGroundTruthingMethods = validGroundTruthingMethods;
  },

  [SET_VALID_POSITIONING_REQUIREMENTS] (state, validPositioningRequirements) {
    state.validPositioningRequirements = validPositioningRequirements;
  },

  [SET_SURVEY_LINES] (state, surveyLines) {
    state.techSpec.surveyLines = surveyLines;
  },

  [SET_VALID_DELIVERY_METHODS] (state, validDeliveryMethods) {
    state.validDeliveryMethods = validDeliveryMethods;
  },

  [SET_HORIZONTAL_REFERENCE_SYSTEMS] (state, horizontalReferenceSystems) {
    state.horizontalReferenceSystems = horizontalReferenceSystems;
  },

  [SET_VERTICAL_REFERENCE_SYSTEMS] (state, verticalReferenceSystems) {
    state.verticalReferenceSystems = verticalReferenceSystems;
  },

  [SET_SOUNDING_DATUMS] (state, soundingDatums) {
    state.soundingDatums = soundingDatums;
  },

  [SET_SPHEROIDS] (state, spheroids) {
    state.spheroids = spheroids;
  },

  [SET_TIDAL_GAUGE_LOCATIONS] (state, tidalGaugeLocations) {
    state.techSpec.tidalGaugeLocations = tidalGaugeLocations;
  },
}

export default {
  mutations
}
