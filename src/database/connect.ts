import { createConnection } from "typeorm";
import * as path from "path";

export let connect = async () => {
  const dirname = path.join(__dirname, '..');
  console.log(dirname)

  console.log(`${process.env.MYSQL_USER}`)
  const connection = await createConnection({
    'type': 'mysql',
    'host': process.env.MYSQL_HOST,
    'port': Number(process.env.MYSQL_PORT),
    'username': process.env.MYSQL_USER,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'synchronize': false,
    'logging': true,
    'migrationsTableName': "custom_migration_table",
    'entities': [
      dirname + '/entity/**/*.js'
    ],
    'migrations': [
      dirname + '/migrations/*.js'
    ],
    "cli": {
      entitiesDir: dirname + "/entity",
      migrationsDir: dirname + '/migrations'
    }
  });
};
