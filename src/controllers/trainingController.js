const pool = require("../config/db");

const getTraining = async (req, res) => {
    const result = await pool.query(
        `SELECT t.*, u.name AS coach
     FROM training_sessions t
     LEFT JOIN users u ON t.coach_id = u.id
     ORDER BY t.date, t.start_time`
    );

    res.json({
        training: result.rows
    });
};

const createTraining = async (req, res) => {
    const {
        sport,
        coach_id,
        date,
        start_time,
        end_time,
        venue,
        capacity
    } = req.body;

    const result = await pool.query(
        `INSERT INTO training_sessions
    (sport, coach_id, date, start_time, end_time, venue, capacity)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
        [
            sport,
            coach_id || null,
            date,
            start_time,
            end_time,
            venue,
            capacity || 30
        ]
    );

    res.status(201).json({
        message: "Training session created",
        training: result.rows[0]
    });
};

const updateTraining = async (req, res) => {
    const {
        sport,
        coach_id,
        date,
        start_time,
        end_time,
        venue,
        capacity
    } = req.body;

    const result = await pool.query(
        `UPDATE training_sessions
     SET sport = COALESCE($1, sport),
         coach_id = COALESCE($2, coach_id),
         date = COALESCE($3, date),
         start_time = COALESCE($4, start_time),
         end_time = COALESCE($5, end_time),
         venue = COALESCE($6, venue),
         capacity = COALESCE($7, capacity)
     WHERE id = $8
     RETURNING *`,
        [
            sport || null,
            coach_id || null,
            date || null,
            start_time || null,
            end_time || null,
            venue || null,
            capacity || null,
            req.params.id
        ]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Training session not found"
        });
    }

    res.json({
        message: "Training updated",
        training: result.rows[0]
    });
};

const deleteTraining = async (req, res) => {
    const result = await pool.query(
        "DELETE FROM training_sessions WHERE id = $1 RETURNING id",
        [req.params.id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Training session not found"
        });
    }

    res.json({
        message: "Training deleted"
    });
};

module.exports = {
    getTraining,
    createTraining,
    updateTraining,
    deleteTraining
};