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
    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [user.id, token]);
    res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
