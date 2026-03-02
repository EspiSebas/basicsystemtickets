const pool = require('../config/connection');

exports.create = async (ticket) => {
  const [result] = await pool.query(
    `INSERT INTO tickets (title, description, client_id)
     VALUES (?, ?, ?)`,
    [ticket.title, ticket.description, ticket.cliente_id]
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

exports.countInProgressByAgent = async (agente_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count
     FROM tickets
     WHERE agente_id = ?
     AND status = 'IN_PROGRESS'`,
    [agente_id]
  );
  return rows[0].count;
};

exports.updateStatus = async (id, status, agente_id, resolution) => {
  await pool.query(
    `UPDATE tickets
     SET status = ?, agente_id = ?, resolution = ?
     WHERE id = ?`,
    [status, agente_id, resolution, id]
  );
};