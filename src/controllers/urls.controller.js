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
    const urlQuery = await db.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [customId]
    );
    const urlInserted = urlQuery.rows[0];
    return res
      .status(201)
      .send({ id: urlInserted.id, shortUrl: urlInserted.shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const urlQuery = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    if (!urlQuery.rowCount) return res.sendStatus(404);
    const url = urlQuery.rows[0];
    return res
      .status(200)
      .send({ id: url.id, shortUrl: url.shortUrl, url: url.url });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectToUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlQuery = await db.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    if (!urlQuery.rowCount) return res.sendStatus(404);
    const url = urlQuery.rows[0].url;
    await db.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    return res.redirect(url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { token } = res.locals;
  try {
    const sessionQuery = await db.query(
      `SELECT * FROM sessions WHERE token = $1;`,
      [token]
    );
    if (!sessionQuery.rowCount) return res.sendStatus(401);
    const session = sessionQuery.rows[0];
    const urlQuery = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    if (!urlQuery.rowCount) return res.sendStatus(404);
    const url = urlQuery.rows[0];
    if (url.userId !== session.userId) return res.sendStatus(401);
    await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
