import mysql from 'serverless-mysql';
/*const db = mysql({
  config: {
    host: "62.171.183.164",
    port: 3306,
    database: "todoListDB",
    user: "root",
    password: "tE27dmNnNCWgf2"
  }
});*/
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});
export default async function executeQuery(query : string) {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    console.log(error)
    return { error };
  }
}