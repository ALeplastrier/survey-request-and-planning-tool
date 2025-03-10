# AusSeabed Survey Request and Planning Tool
The AusSeabed Survey Request and Planning tool (ASB RPT) is a tool designed by GA and FrontierSI in collaboration with the AusSeabed Steering Committee and broader community.

Its intent is to provide a location for, and consistency in specification of bathymetric data acquisition for scientific research purposes.

The tool was partly funded by the National Environmental Science Program (NESP2) Marine and Coastal Hub, project 1.2 - National Areas of Interest for Seabed Mapping, Characterisation and Biodiversity Assessment. Project partners – Geoscience Australia, CSIRO, University of Tasmania.

### Build status
[![CircleCI](https://circleci.com/gh/ausseabed/survey-request-and-planning-tool.svg?style=svg)](https://circleci.com/gh/ausseabed/survey-request-and-planning-tool)

# Licensing Terms

AusSeabed Data Hub – Survey Request and Planning is licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Copyright (c) 2019- AusSeabed Development Team

# About the AusSeabed Development Team

The AusSeabed Development Team is the set of all contributors to the AusSeabed Program. This includes all of the AusSeabed Subprojects, which are the different repositories under the AusSeabed GitHub organization.

## Our Copyright Policy

AusSeabed Data Hub – Survey Request and Planning tool uses a shared copyright model. Each contributor maintains copyright over their contributions. But, it is important to note that these contributions are typically only changes to the repositories. Thus, the ASB Request and Planning tool source code, in its entirety is not the copyright of any single person or institution. Instead, it is the collective copyright of the entire AusSeabed Development Team. If individual contributors want to maintain a record of what changes/contributions they have specific copyright on, they should indicate their copyright in the commit message of the change, when they commit the change to one of the AusSeabed repositories.

With this in mind, the following banner should be used in any source code file to indicate the copyright and license terms:

    Distributed under the terms of the Apache License, Version 2.0.


# Dependencies
User authentication is by an external OAuth2 provider; the staging environment makes use of AWS cognito by other OAuth2 providers will also work. Configuration is set in the `server.conf` and `docker-compose-prod.yml` files. The `AUTH_HOST` (domain name of auth server), `AUTH_CLIENT_ID` and `AUTH_CLIENT_SECRET` variables must be set (latter two are provided by the auth system). The auth system will need to be configured to accept the request tools domain name as a login/logout callback (even `localhost`). `ANALYTICS_CODE` is used by the analytics plugin.

The development environment makes use of docker / docker-compose.

# Docker container architecture
There are 3 docker containers:

- api
    - Backend server
    - QA4 backend web services API
    - NodeJS based
- www
    - Web based user interface
    - VueJS, using the [Quasar framework](https://quasar-framework.org/).
- db-postgres
    - PostgreSQL database with PostGIS extension
- mapserver
    - MapServer connects to db-postgres and publishes OGC web services (WMS, WFS)

# Development

## Configuration
The following configuration parameters are required. These are set as environment variables in the `server.conf` config file.

* `AUTH_CLIENT_SECRET`  
    * obtained from the auth system admin interface
    * This secret must match the `AUTH_CLIENT_ID` id
* `JWT_TOKEN_KEY_PRIVATE`
    * Private RSA key used for generation of jwt token.
    * Must match the public key at `./server/ssh_keys/public`
    * Newlines in key must be replaced by `\n` other characters within key may need to be escaped.


## Setup
Clone the repository
```
    git clone git@github.com:frontiersi/asb-request-and-planning-tool.git
    cd asb-request-and-planning-tool
```

Copy/edit configs. The following environment variables need to be set:  

```
    cp config.sample/server.conf ./server.conf
```

Create database tables. The migrations scripts are also responsible for seeding
default values into the database (eg; instrument types, data capture types, etc)
```
    make migration-run
```

Build and run. This will build and start the various QA4MB containers, docker
compose is run in attached mode.
```
    make run
```

## Debugging

In development deployments NodeJS is run with the `--inspect` flag supporting
remote debugging (remote as the server is run within a docker container).
Several tools support NodeJS remote debugging; chrome included via [chrome://inspect](chrome://inspect). *note:* ignore the targets listed under Remote Targets and instead choose "Open dedicated DevTools for Node".


## Testing
Unit tests are available for the NodeJS server, they can be run via the
following command. Unit tests are run against test databases and do not impact
the production/development databases.

```
    make test
```


## URLs

Web UI application can be found at:  
    [http://localhost:3001](http://localhost:3001)

NodeJS express can be found at:  
    [http://localhost:3000](http://localhost:3000)

MapServer is proxied to the `/map/` path of the Web UI:  
    [http://localhost:3001/map/](http://localhost:3001/map/)

The above URL will produce a MapServer error, to access a GetCapabilities request use the following URL.
    [http://localhost:3001/map/?SERVICE=WMS&REQUEST=GetCapabilities](http://localhost:3001/map/?SERVICE=WMS&REQUEST=GetCapabilities)


## Development notes

Both the NodeJS server and VueJS client are run in development mode which
supports hot reloads. Running database migration scripts may cause the NodeJS
server to crash requiring a restart of the docker container.


## Development commands
There are a variety of maintenance commands available, all accessed via make:

`make run` - runs the development environment  
`make build-dev` - runs docker compose build for development environment  
`make stop` - stops all containers  
`make clean` - removes `node_modules` from client and server  
`make migration-run` - runs the database migration scripts  
`make migration-revert` - reverts the last database migration step (not all)  

## Testing production
Production Docker Compose commands are as follows:

`make build-prod` - builds production ready containers  
`make run-prod` - runs an environment that is similar to a production   deployment.


## Database

General process for modifying the database schema is as follows;    

1. Modify/add entity ( found in `server/src/lib/entity`)
2. Run migration generation command (shown below). This will produce a new
typescript file in `server/src/migration`.
3. Confirm migration script is ok (often require modification for default
values, etc)
4. Run new migration `make migration-run`


The following command will automatically generate a database migration script including schema changes made to the entities (replace MIGRATION_NAME> param);   

```
    docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml \
        run --rm api bash -c "yarn install && rm -rf ./dist && yarn run build && \
        ENVIRONMENT=production typeorm migration:generate -n <MIGRATION_NAME>"
```

A blank new migration can be created by replacing `generate` with `create` in the above command line.


### Backup and restore

The following commands will create a backup file in the `./backup` dir. The docker-compose command will require the db password.

```
    TODAY=$(date '+%F')
    docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml \
        run -e PGDATABASE=postgres -e PGHOST=db-postgres -e PGUSER=postgres \
        --rm db-postgres pg_dump  --format custom --blobs \
        --file "/backup/qa4mbes-backup-${TODAY}.psql"
```

To restore (requires `<BACKUP FILE NAME>` is in `./backup` );

*note:* to drop the existing database all current connections must be closed;
recommend stopping all docker containers (`make stop`).

```
    docker-compose -f docker-compose-base.yml -f docker-compose-dev.yml \
        run -e PGDATABASE=postgres -e PGHOST=db-postgres -e PGUSER=postgres \
        --rm db-postgres bash -c "
            dropdb postgres ;
            createdb postgres &&
            pg_restore -d postgres '/backup/<BACKUP FILE NAME>'"
```
