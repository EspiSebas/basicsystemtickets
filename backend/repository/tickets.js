const pool = require('../config/connection');

exports.create = async (ticket) => {
  const [result] = await pool.query(
    `INSERT INTO tickets (title, description, client_id)
     VALUES (?, ?, ?)`,
    [ticket.title, ticket.description, ticket.client_id]
  );
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM tickets WHERE id = ?`,
    [id]
  );
  return rows[0];
};

exports.findAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM tickets`
  );
  return rows;
};


exports.countInProgressByAgent = async (agent_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count
     FROM tickets
     WHERE agent_id = ?
     AND status = 'IN_PROGRESS'`,
    [agent_id]
  );
  return rows[0].count;
};

exports.updateStatus = async (id, status, resolution) => {
  if (status === "RESOLVED") {
    await pool.query(
      "UPDATE tickets SET status = ?, resolution = ? WHERE id = ?",
      [status, resolution, id]
    );
  } else if (status === "IN_PROGRESS") {
    await pool.query(
      "UPDATE tickets SET status = ? WHERE id = ?",
      [status, id]
    );
  }
};


exports.createAssing = async (id, agent_id) => {
  await pool.query(
    `UPDATE tickets
     SET agent_id = ?
     WHERE id = ?`,
    [agent_id, id]
  );
};