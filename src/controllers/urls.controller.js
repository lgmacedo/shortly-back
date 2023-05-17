import { db } from "../database/database.connect.js";
import { nanoid } from "nanoid";

export async function urlShortening(req, res) {
  const { url } = req.body;
  const { token } = res.locals;
  try {
    const sessionQuery = await db.query(
      `SELECT * FROM sessions WHERE token = $1;`,
      [token]
    );
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const session = sessionQuery.rows[0];
    const customIdLength = 8;
    const customId = nanoid(customIdLength);
    await db.query(
      `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3);`,
      [customId, url, session.userId]
    );
    const urlQuery = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
      customId,
    ]);
    const urlInserted = urlQuery.rows[0];
    return res.status(201).send({ id: urlInserted.id, shortUrl: urlInserted.shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
