const pool = require('../config/connection');

exports.create = async (agent) => {
  const [result] = await pool.query(
    `INSERT INTO agents (name, email)
     VALUES (?, ?)`,
    [agent.name, agent.email]
  );
  return result.insertId;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM agents WHERE id = ?`,
    [id]
  );

  
  if (rows.length === 0) {
    return null;
  }


  const [countInProgress] = await pool.query(
      `SELECT COUNT(*) as total FROM tickets
      WHERE agent_id = ?
      AND status = 'IN_PROGRESS'`,
      [id]
   );

   const [resolvedRows] = await pool.query(
      `SELECT COUNT(*) as total FROM tickets
      WHERE agent_id = ?
      AND status = 'RESOLVED'`,
      [id]
   );


   return { ...rows[0],
    in_progress: countInProgress[0].total,
    resolved: resolvedRows[0].total}
};

exports.findAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM agents`,
  );
  return rows;
};


