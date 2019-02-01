var express = require('express');
var _ = require('lodash');
const boom = require('boom');

import { getConnection } from 'typeorm';

import { asyncMiddleware, isAuthenticated }
  from '../utils';

const deliverableList = [
  {
    id: "a",
    name: "Coverage extent",
    description: "foo bar",
    public: true,
    organisation: "org1",
    fields: [
      {
        name: "format",
        type: "deliverable-field-option-single",
        options: ["kml", "xml", "shp"]
      },
    ]
  },
  {
    id: "b",
    name: "Navigation data",
    fields: [
      {
        name: "format",
        type: "deliverable-field-option-single",
        options: ["kml", "xml", "shp"]
      },
    ]
  },
  {
    id: "c",
    name: "Vessel track",
    fields: [
      {
        name: "format",
        type: "deliverable-field-option-single",
        options: ["kml", "xml", "shp"]
      },
    ]
  },
  {
    id: "d",
    name: "Transit data",
    fields: [
      {
        name: "format",
        type: "deliverable-field-option-single",
        options: ["kml", "xml", "shp"]
      },
      {
        name: "Requirements",
        type: "deliverable-field-text"
      },
    ]
  },
  {
    id: "e",
    name: "Bathymetric chart (contours)",
    fields: [
      {
        name: "format",
        type: "deliverable-field-option-single",
        options: ["kml", "xml", "shp"]
      },
      {
        name: "Requirements",
        type: "deliverable-field-text"
      },
    ]
  },
]

var router = express.Router();

// Gets a list of all deliverables that are available within the application
router.get('/definition-list', asyncMiddleware(async function (req, res) {
  res.json(deliverableList);
}));

module.exports = router;
