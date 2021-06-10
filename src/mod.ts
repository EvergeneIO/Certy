//import * as deps from "./deps.ts";
import { config } from "./deps.ts";

config({ export: true });

const configs = {
  DOMAINS: Deno.env.get("DOMAINS"),
  HOST: Deno.env.get("DB_MYSQL_HOST"),
  PORT: Deno.env.get("DB_MYSQL_PORT"),
  USER: Deno.env.get("DB_MYSQL_USER"),
  PASSWORD: Deno.env.get("DB_MYSQL_PASSWORD"),
  NAME: Deno.env.get("DB_MYSQL_NAME"),
  SQLITE: Deno.env.get("DB_SQLITE_FILE"),
};

if (!configs.SQLITE) {
  const dirNames: string[] = [];
  for await (const dirEntry of Deno.readDir("./certs")) {
    if (dirEntry.isDirectory) {
      dirNames.push(dirEntry.name);
    }
  }
  console.log(dirNames);
} else {
  console.log("SQLITE active");
}
