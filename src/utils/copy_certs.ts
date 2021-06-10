import { existsSync, copySync } from "../deps.ts"
import { Service } from "./yaml_parser.ts";

// TODO: type for res
export function copyCerts(domain: string, location: Service | null, res: any) {
    const dir = location?.path ?? domain
    const certs = {
        cert: location?.cert ?? 'cert',
        chain: location?.chain ?? 'chain',
        privkey: location?.privkey ?? 'privkey',
        fullchain: location?.fullchain ?? 'fullchain'
    }
    for (const [cert, name] of Object.entries(certs)) {
        if (!existsSync(`./certs/${dir}`)) Deno.mkdirSync(`./certs/${dir}`);
        copySync(`./letsencrypt/live/npm-${res.certificate_id}/${cert}.pem`, `./certs/${dir}/${name}.pem`, { overwrite: true });
    }
}

export default copyCerts