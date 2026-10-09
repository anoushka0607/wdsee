const pool = require("../config/db");

const getMembers = async (req, res) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, sport, role, created_at
     FROM users
     ORDER BY created_at DESC`
    );

    res.json({
        members: result.rows
    });
};

const getMember = async (req, res) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, sport, role, created_at
     FROM users
     WHERE id = $1`,
        [req.params.id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    res.json({
        member: result.rows[0]
    });
};

const updateMember = async (req, res) => {
    const {
        name,
        phone,
        sport
    } = req.body;

    const result = await pool.query(
        `UPDATE users
     SET name = COALESCE($1, name),
         phone = COALESCE($2, phone),
         sport = COALESCE($3, sport)
     WHERE id = $4
     RETURNING id, name, email, phone, sport, role`,
        [
            name || null,
            phone || null,
            sport || null,
            req.params.id
        ]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    res.json({
        message: "Member updated",
        member: result.rows[0]
    });
};

const deleteMember = async (req, res) => {
    const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [req.params.id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Member not found"
        });
    }

    res.json({
        message: "Member deleted"
    });
};

module.exports = {
    getMembers,
    getMember,
    updateMember,
    deleteMember
};