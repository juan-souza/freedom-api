import {getConnectionOptions, createConnection} from "typeorm";

export let connect = async () => {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = await getConnectionOptions();

  // create a connection using modified connection options
  const connection = await createConnection(connectionOptions);
};
