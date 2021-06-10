import { copyCerts, configs, yamlParser, } from "./utils/mod.ts"
import { DB, blue, gray } from "./deps.ts"
import { log } from "./utils/logger.ts";
log.info('Certy Started');

console.log(blue([
    gray(`\n**************************************************************\n`),
    `${gray("*")}                _____           _                           ${gray("*")}\n`,
    `${gray("*")}               /  __ \\         | |                          ${gray("*")}\n`,
    `${gray("*")}               | /  \\/ ___ _ __| |_ _   _                   ${gray("*")}\n`,
    `${gray("*")}               | |    / _ \\ '__| __| | | |                  ${gray("*")}\n`,
    `${gray("*")}               | \\__/\\  __/ |  | |_| |_| |                  ${gray("*")}\n`,
    `${gray("*")}                \\____/\\___|_|   \\__|\\__, |                  ${gray("*")}\n`,
    `${gray("*")}                                     __/ |                  ${gray("*")}\n`,
    `${gray("*")}                                    |___/                   ${gray("*")}\n`,
    `${gray("*")}                                                            ${gray("*")}\n`,
    gray(`**************************************************************\n`)].join("")
));

setInterval(function () {
    console.log("10 sind um");
}, 1000 * 10);

const watcher = Deno.watchFs(["./letsencrypt/live", "./data/certy/config"]);
for await (const event of watcher) {
    const data = await yamlParser();
    if (!data) continue;
    if (!configs.SQLITE) {
        const database = await import("./database/connection.ts");

        for (const [domain, location] of Object.entries(data)) {
            const res = (await database.con.query(`SELECT * FROM proxy_host WHERE (domain_names LIKE '%"${domain}"%') AND is_deleted = 0`))[0]
            await copyCerts(domain, location, res)
        }
    } else {
        const db = new DB(configs.SQLITE);
        for (const [domain, location] of Object.entries(data)) {
            const res = [...db.query(`SELECT * FROM proxy_host WHERE (domain_names LIKE '%"${domain}"%') AND is_deleted = 0`).asObjects()][0];
            await copyCerts(domain, location, res)
        }
    }
}
