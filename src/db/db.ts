import {createConnection} from "typeorm";

export let connect = async () => {
  const connection = await createConnection({
    "type": "mysql",
    "host": "mysql743.umbler.com",
    "port": 41890,
    "username": "botadmin",
    "password": "-ZrUW3GT_.NDK7.",
    "database": "freedom",
    "synchronize": false,
    "logging": true,
    "migrationsTableName": "custom_migration_table",
    "entities": [
      __dirname + '/models/*.js'
    ],
    "migrations": [
      __dirname + '/migrations/*.js'
    ],
    "cli": {
      entitiesDir: __dirname + "/models/",
      migrationsDir: __dirname + '/migrations/'
    }
  });
};
