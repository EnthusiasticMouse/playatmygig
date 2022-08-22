import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});
interface Query {
  sql: string;timeout: number;values: string[];
}
export default async function executeQuery(query : Query | string) {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    console.log(error)
    return { error };
  }
}