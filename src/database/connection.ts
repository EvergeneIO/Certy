import { Client, DB } from "../deps.ts";
import { configs } from "../utils/configs.ts";


export const con = configs.SQLITE ? new DB(configs.SQLITE) : await new Client().connect({
    hostname: configs.HOST,
    port: configs.PORT,
    username: configs.USER,
    db: configs.NAME,
    poolSize: 10, // connection limit
    password: configs.PASSWORD,
});

export default con
