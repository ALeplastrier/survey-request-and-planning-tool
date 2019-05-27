const _ = require('lodash');
const boom = require('boom');
import { getConnection } from 'typeorm';

var auth = require('../lib/auth')();
import { User } from '../lib/entity/user';

import { multiPolygon, multiLineString, multiPoint } from "@turf/helpers";

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    err.statusCode = err.output.statusCode;
    next(err);
  });
};


// Raise 401 if user is not authenticated
export const isAuthenticated = async (req, res, next) => {
  // requests coming from Axois use a header, other (eg from img src)
  // requests use a cookie
  const authToken =
    req.headers.authorization ?
      req.headers.authorization :
      req.cookies.Authorization

  if (_.isNil(authToken)) {
    res.status(401).send('Unauthorized');
    return
  }

  try {
    var verified_user = auth.verify(authToken);

    const userId = verified_user.id
    const existingUser = await getConnection().getRepository(User)
    .findOne(
      userId,
      {
        relations: ['role', 'organisation']
      }
    );
    if (_.isNil(existingUser)) {
      res.status(401).send('Unauthorized');
      return
    }

    req.user = existingUser;

    if (req.headers.authorization && _.isNil(req.cookies.Authorization)) {
      // then the header has a valid auth token, but it hasn't been set in
      // the cookie. New logins will have the cookie set, but existing
      // users wont (so do it here).
      // Todo; this could probably be removed in future one everyone's old
      // auth tokens have expired
      res.setHeader(
        'Set-Cookie', `Authorization=${req.headers.authorization} ; Path=/`);
    }

    return next();
  } catch(err) {
    res.status(401).send('Unauthorized');
  }
};


// middleware for doing role-based permissions
export function permitPermission(allowedPermission) {
  const isAllowed = role => {
    if (_.isNil(role)) {
      return false;
    } else if (role.hasOwnProperty(allowedPermission)) {
      return role[allowedPermission];
    } else {
      return false;
    }
  };

  // return a middleware
  return (request, response, next) => {
    if (request.user && isAllowed(request.user.role))
      next(); // role is allowed, so continue on the next middleware
    else {
      response.status(403).json({message: "Forbidden"}); // user is forbidden
    }
  }
}


// Appends user to req is authenticated, will not 401
export function authenticatedUser(req, res, next) {
    if (req.headers.authorization) {
        var verified_user = auth.verify(req.headers.authorization);
        if (verified_user) {
            req.user = verified_user;
        }
    }

    return next();
}

export function isUuid(testString) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(testString);
}

export function geojsonToMultiPolygon(geojson) {
  //converts a geosjon object to a multipolygon geojson object
  if (typeof geojson === 'string' || geojson instanceof String) {
    //if it wasn't an object, parse it to one.
    geojson = JSON.parse(geojson);
  }

  if (geojson.type == 'MultiPolygon') {
    //already in suitable format
    return geojson;
  }

  if (geojson.type == 'FeatureCollection') {
    let polys = [];
    geojson.features.forEach(function(feature) {
      if (feature.type == 'Feature' &&
          feature.geometry.type == 'Polygon') {
        polys.push(feature.geometry.coordinates);

      } else if (feature.type == 'Feature' &&
                 feature.geometry.type == 'MultiPolygon') {
        polys.push(...feature.geometry.coordinates);
      }
    });
    let mp = multiPolygon(polys);
    return mp.geometry;
  } else {
    let err = boom.notImplemented(
      `Geojson type ${geojson.type} is not supported`);
    throw err;
  }
}

export function geojsonToMultiLineString(geojson) {
  //converts a geosjon object to a multipolygon geojson object
  if (typeof geojson === 'string' || geojson instanceof String) {
    //if it wasn't an object, parse it to one.
    geojson = JSON.parse(geojson);
  }

  if (geojson.type == 'MultiLineString') {
    //already in suitable format
    return geojson;
  }

  if (geojson.type == 'FeatureCollection') {
    let lines = [];
    geojson.features.forEach(function(feature) {
      if (feature.type == 'Feature' &&
          feature.geometry.type == 'LineString') {
        lines.push(feature.geometry.coordinates);

      } else if (feature.type == 'Feature' &&
                 feature.geometry.type == 'MultiLineString') {
        lines.push(...feature.geometry.coordinates);
      }
    });
    let mls = multiLineString(lines);
    return mls.geometry;
  } else {
    let err = boom.notImplemented(
      `Geojson type ${geojson.type} is not supported`);
    throw err;
  }
}

export function geojsonToMultiPoint(geojson) {
  //converts a geosjon object to a multipolygon geojson object
  if (typeof geojson === 'string' || geojson instanceof String) {
    //if it wasn't an object, parse it to one.
    geojson = JSON.parse(geojson);
  }

  if (geojson.type == 'MultiPoint') {
    //already in suitable format
    return geojson;
  }

  if (geojson.type == 'FeatureCollection') {
    let points = [];
    geojson.features.forEach(function(feature) {
      if (feature.type == 'Feature' &&
          feature.geometry.type == 'Point') {
        points.push(feature.geometry.coordinates);

      } else if (feature.type == 'Feature' &&
                 feature.geometry.type == 'MultiPoint') {
        points.push(...feature.geometry.coordinates);
      }
    });
    let mls = multiPoint(points);
    return mls.geometry;
  } else {
    let err = boom.notImplemented(
      `Geojson type ${geojson.type} is not supported`);
    throw err;
  }
}

function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}
