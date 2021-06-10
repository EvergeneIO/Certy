import { Client, DB } from "../deps.ts";
import { configs } from "../utils/configs.ts"

if (Deno.env.get("ENV") == "dev") {
    configs.HOST = 'localhost'
    configs.PORT = 3308
}

// TODO: Find Type for connection
export let con: any
if (!configs.SQLITE) {
    con = await new Client().connect({
        hostname: configs.HOST,
        port: configs.PORT,
        username: configs.USER,
        db: configs.NAME,
        poolSize: 10, // connection limit
        password: configs.PASSWORD,
    });
} else {
    con = new DB(configs.SQLITE);
}

export default con

