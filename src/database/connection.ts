import { Client, DB } from "../deps.ts";
import { configs } from "../utils/configs.ts";

<<<<<<< Updated upstream
if (Deno.env.get("ENV") == "dev") {
  configs.HOST = "localhost";
  configs.PORT = 3308;
}

// TODO: Find Type for connection
export let con: any;
if (!configs.SQLITE) {
  con = await new Client().connect({
=======
/* if (Deno.env.get("ENV") == "dev") {
    configs.HOST = 'localhost'
    configs.PORT = 3308
    configs.PASSWORD = ''
} */

export const con = configs.SQLITE ? new DB(configs.SQLITE) : await new Client().connect({
>>>>>>> Stashed changes
    hostname: configs.HOST,
    port: configs.PORT,
    username: configs.USER,
    db: configs.NAME,
    poolSize: 10, // connection limit
    password: configs.PASSWORD,
<<<<<<< Updated upstream
  });
} else {
  con = new DB(configs.SQLITE);
}

export default con;
=======
})

export default con
>>>>>>> Stashed changes
