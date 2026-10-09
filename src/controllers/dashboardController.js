const pool = require("../config/db");

const getDashboard = async (req, res) => {
    try {
        const members = await pool.query(
            "SELECT COUNT(*)::int AS count FROM users"
        );

        const sports = await pool.query(
            "SELECT COUNT(DISTINCT sport)::int AS count FROM users WHERE sport IS NOT NULL"
        );

        const training = await pool.query(
            "SELECT COUNT(*)::int AS count FROM training_sessions WHERE date >= CURRENT_DATE"
        );

        const events = await pool.query(
            "SELECT COUNT(*)::int AS count FROM events WHERE date >= CURRENT_DATE"
        );

        const announcements = await pool.query(
            "SELECT COUNT(*)::int AS count FROM announcements"
        );

        res.json({
            totalMembers: members.rows[0].count,
            totalSports: sports.rows[0].count,
            upcomingTraining: training.rows[0].count,
            upcomingEvents: events.rows[0].count,
            totalAnnouncements: announcements.rows[0].count
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to load dashboard"
        });
    }
};

module.exports = {
    getDashboard
};