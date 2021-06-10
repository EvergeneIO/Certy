const database = await import("./src/database/connection.ts");

const query = await database.con.query(`SELECT * FROM proxy_host where (domain_names like '%"server.evergene.dev"%') and is_deleted = 0`);

console.log(query[0].certificate_id)