import { db } from "../database/database.connect.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const emailQuery = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    if (emailQuery.rowCount) return res.sendStatus(409);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, passwordHash]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const emailQuery = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    const user = emailQuery.rows[0];
    if (!emailQuery.rowCount || !bcrypt.compareSync(password, user.password))
      return res.sendStatus(401);
    const token = uuid();
    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [
      user.id,
      token,
    ]);
    res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getUserData(req, res) {
  const { token } = res.locals;
  try {
    const sessionQuery = await db.query(
      `SELECT * FROM sessions WHERE token = $1;`,
      [token]
    );
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const userId = sessionQuery.rows[0].userId;
    const userQuery = await db.query(
      `
      SELECT users.id AS id, users.name as name, SUM(urls."visitCount") AS "visitCount" 
      FROM users JOIN urls 
      ON users.id = urls."userId"
      WHERE users.id = $1
      GROUP BY users.id;`,
      [userId]
    );
    const user = userQuery.rows[0];
    const urlsQuery = await db.query(
      `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1;`,
      [userId]
    );
    const urls = urlsQuery.rows;
    return res.status(200).send({
      ...user,
      visitCount: Number(user.visitCount),
      shortenedUrls: urls,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  try {
    const rankingQuery = await db.query(`
    SELECT users.id AS id,
      users.name AS name,
      COUNT(CASE WHEN urls."userId" = users.id THEN 1 END) AS "linksCount",
      SUM(CASE WHEN urls."userId" = users.id THEN urls."visitCount" END) AS "visitCount"
    FROM users
    JOIN urls ON users.id = urls."userId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC LIMIT 10;`);
    const ranking = rankingQuery.rows.map((u) => {
      return {
        ...u,
        linksCount: Number(u.linksCount),
        visitCount: Number(u.visitCount),
      };
    });
    return res.status(200).send(ranking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
