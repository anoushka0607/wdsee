const pool = require("../config/db");

const getAnnouncements = async (req, res) => {
    const result = await pool.query(
        `SELECT a.*, u.name AS created_by_name
     FROM announcements a
     LEFT JOIN users u
     ON a.created_by = u.id
     ORDER BY a.created_at DESC`
    );

    res.json({
        announcements: result.rows
    });
};

const createAnnouncement = async (req, res) => {
    const {
        title,
        message
    } = req.body;

    const result = await pool.query(
        `INSERT INTO announcements
    (title, message, created_by)
    VALUES ($1, $2, $3)
    RETURNING *`,
        [
            title,
            message,
            req.user.id
        ]
    );

    res.status(201).json({
        message: "Announcement created",
        announcement: result.rows[0]
    });
};

const deleteAnnouncement = async (req, res) => {
    const result = await pool.query(
        "DELETE FROM announcements WHERE id = $1 RETURNING id",
        [req.params.id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Announcement not found"
        });
    }

    res.json({
        message: "Announcement deleted"
    });
};

module.exports = {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement
};