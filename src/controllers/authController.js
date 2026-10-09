const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );
};

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            sport
        } = req.body;

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
      (name, email, password_hash, phone, sport)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, phone, sport, role`,
            [
                name,
                email.toLowerCase(),
                passwordHash,
                phone,
                sport
            ]
        );

        const user = result.rows[0];

        const token = generateToken(user);

        res.status(201).json({
            message: "Registration successful",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const publicUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            sport: user.sport,
            role: user.role
        };

        const token = generateToken(publicUser);

        res.json({
            message: "Login successful",
            token,
            user: publicUser
        });
    } catch {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getCurrentUser = async (req, res) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, sport, role
     FROM users
     WHERE id = $1`,
        [req.user.id]
    );

    res.json({
        user: result.rows[0]
    });
};

module.exports = {
    register,
    login,
    getCurrentUser
};