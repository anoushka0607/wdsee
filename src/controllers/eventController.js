const pool = require("../config/db");

const getEvents = async (req, res) => {
    const result = await pool.query(
        `SELECT e.*, u.name AS created_by_name,
     COUNT(er.id)::int AS registrations
     FROM events e
     LEFT JOIN users u ON e.created_by = u.id
     LEFT JOIN event_registrations er
     ON e.id = er.event_id
     GROUP BY e.id, u.name
     ORDER BY e.date`
    );

    res.json({
        events: result.rows
    });
};

const createEvent = async (req, res) => {
    const {
        title,
        description,
        date,
        venue
    } = req.body;

    const result = await pool.query(
        `INSERT INTO events
    (title, description, date, venue, created_by)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [
            title,
            description,
            date,
            venue,
            req.user.id
        ]
    );

    res.status(201).json({
        message: "Event created",
        event: result.rows[0]
    });
};

const updateEvent = async (req, res) => {
    const {
        title,
        description,
        date,
        venue
    } = req.body;

    const result = await pool.query(
        `UPDATE events
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         date = COALESCE($3, date),
         venue = COALESCE($4, venue)
     WHERE id = $5
     RETURNING *`,
        [
            title || null,
            description || null,
            date || null,
            venue || null,
            req.params.id
        ]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    res.json({
        message: "Event updated",
        event: result.rows[0]
    });
};

const deleteEvent = async (req, res) => {
    const result = await pool.query(
        "DELETE FROM events WHERE id = $1 RETURNING id",
        [req.params.id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    res.json({
        message: "Event deleted"
    });
};

const registerForEvent = async (req, res) => {
    const result = await pool.query(
        `INSERT INTO event_registrations
    (event_id, member_id)
    VALUES ($1, $2)
    RETURNING *`,
        [
            req.params.id,
            req.user.id
        ]
    );

    res.status(201).json({
        message: "Registered for event",
        registration: result.rows[0]
    });
};

const unregisterFromEvent = async (req, res) => {
    const result = await pool.query(
        `DELETE FROM event_registrations
     WHERE event_id = $1
     AND member_id = $2
     RETURNING id`,
        [
            req.params.id,
            req.user.id
        ]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.json({
        message: "Registration cancelled"
    });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent
};