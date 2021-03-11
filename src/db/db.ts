import {createConnection} from "typeorm";

export const connection = createConnection({
  "type": "mysql",
  "host": "mysql743.umbler.com",
  "port": 41890,
  "username": "botadmin",
  "password": "-ZrUW3GT_.NDK7.",
  "database": "freedom",
  "synchronize": true,
  "logging": true,
  "migrationsTableName": "custom_migration_table",
  "entities": [
    __dirname + '/entity/*.js'
  ],
  "migrations": [
    __dirname + '/migrations/*.js'
  ],
  "cli": {
    entitiesDir: __dirname + "/entity/",
    migrationsDir: __dirname + '/migrations/'
  }
});
