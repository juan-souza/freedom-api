import {getConnectionOptions, createConnection} from 'typeorm';

export const connect = async () => {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = await getConnectionOptions();

  // create a connection using modified connection options
  const connection = await createConnection(connectionOptions);
};
