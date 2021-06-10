import { parse } from "../deps.ts"

export async function yamlParser() {
    const data = await Deno.readTextFile("./data/certy/config/certy.yml")
    if (!data) return {} as Record<string, Service | null>;

    const parsed = await parse(data) as Config

    const domains: Record<string, Service | null> = {}
    for (const [key, value] of Object.entries(parsed.services)) {
        for (const [domain, customData] of Object.entries(value)) {
            domains[domain] = customData
        }
    }

    return domains
}

export default yamlParser;

interface Config {
    services: Record<string, Services>
}

interface Services {
    [key: string]: Service | null
}

export interface Service {
    path: string,
    cert: string,
    chain: string,
    fullchain: string,
    privkey: string,
}