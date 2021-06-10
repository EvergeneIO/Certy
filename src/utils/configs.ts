if (Deno.env.get("ENV") === "dev") {
    const config = await import("../deps.ts");
    config.config({ export: true });
}

export const configs = {
    DOMAINS: Deno.env.get('DOMAINS'),
    HOST: Deno.env.get('DB_MYSQL_HOST'),
    PORT: Number(Deno.env.get('DB_MYSQL_PORT')),
    USER: Deno.env.get('DB_MYSQL_USER'),
    PASSWORD: Deno.env.get('DB_MYSQL_PASSWORD'),
    NAME: Deno.env.get('DB_MYSQL_NAME'),
    SQLITE: Deno.env.get('DB_SQLITE_FILE')
}

export default configs