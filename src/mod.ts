import { copyCerts, configs, yamlParser, } from "./utils/mod.ts"
import { DB, blue, gray } from "./deps.ts"
import { log } from "./utils/logger.ts";
import { sheduleTask } from "./utils/tasks.ts";
import { con } from "./database/connection.ts";
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
/* setInterval(async function () {
    console.log("10 sind um");
}, 1000 * 10); */
if ('windows' == 'windows') {
    log.info("Intervall Started!")
    sheduleTask({
        name: "Certy",
        interval: 10000,
        execute() {
            main();
        }
    })
} else {
    const watcher = Deno.watchFs(["./letsencrypt/live", "./config"]);
    log.info("Watcher Started!")
    for await (const event of watcher) {
        main();
    }
}


async function main() {
    const data = await yamlParser();
    if (!data) return;

    if (!configs.SQLITE) {
        /**
         * TODO: edge cases
         * mail.domain.photo
         * mail.domain.photography
         * co.uk
         */
        for (const [domain, location] of Object.entries(data)) {
            const res = (await con.query(`SELECT * FROM proxy_host WHERE (domain_names LIKE '%"${domain}"%') AND is_deleted = 0`))[0]
            console.log(blue('OWO WHATS THIS'))
            await copyCerts(domain, location, res)
        }
    } else {
        for (const [domain, location] of Object.entries(data)) {
            const res = [...(con as DB).query(`SELECT * FROM proxy_host WHERE (domain_names LIKE '%"${domain}"%') AND is_deleted = 0`).asObjects()][0];
            await copyCerts(domain, location, res)
        }
        con.close();
    }
}