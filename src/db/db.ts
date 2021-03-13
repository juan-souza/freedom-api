import {createConnection} from "typeorm";
import * as path from "path";

export let connect = async () => {
  const dirname = path.join(__dirname, '..');
  console.log(dirname)
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
      dirname + '/entity/**/*.js'
    ],
    "migrations": [
      dirname + '/migrations/*.js'


    ],
    "cli": {
      entitiesDir: dirname + "/entity",
      migrationsDir: dirname + '/migrations'
    }
  });
};
