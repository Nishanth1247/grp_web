const db = require("../config/db");

// member send query
exports.createQuery = (req, res) => {

  const { message } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO queries (user_id, message) VALUES (?, ?)",
    [userId, message],
    (err, result) => {
      if (err) return res.send(err);
      res.json({ message: "Query sent" });
    }
  );

};

// admin view queries
exports.getQueries = (req, res) => {

  db.query(
    `SELECT queries.id, users.name, queries.message, queries.reply
     FROM queries
     JOIN users ON users.id = queries.user_id`,
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );

};

// admin reply to query
exports.replyQuery = (req, res) => {

  const { id, reply } = req.body;

  db.query(
    "UPDATE queries SET reply=? WHERE id=?",
    [reply, id],
    (err, result) => {
      if (err) return res.send(err);
      res.json({ message: "Reply sent" });
    }
  );

};