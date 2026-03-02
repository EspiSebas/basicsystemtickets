const pool = require('../config/connection');

exports.create = async (client) => {
  const [result] = await pool.query(
    `INSERT INTO clients (name, email)
     VALUES (?, ?)`,
    [client.name, client.email]
  );
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      c.id AS client_id,
      c.name,
      c.email,
      t.id AS ticket_id,
      t.title,
      t.status,
      t.created_at
    FROM clients c
    LEFT JOIN tickets t ON c.id = t.client_id
    WHERE c.id = ?
    `,
    [id]
  );

  if (rows.length === 0) return null;

  const client = {
    id: rows[0].client_id,
    name: rows[0].name,
    email: rows[0].email,
    tickets: []
  };

  rows.forEach(row => {
    if (row.ticket_id) {
      client.tickets.push({
        id: row.ticket_id,
        title: row.title,
        status: row.status,
        created_at: row.created_at
      });
    }
  });

  return client;
};

exports.findAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM clients`,
  );
  return rows;
};


