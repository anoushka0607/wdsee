const express = require("express");

const {
    getMembers,
    getMember,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

const {
    authenticate,
    authorize
} = require("../middleware/auth");

const router = express.Router();

router.get("/", getMembers);

router.get("/:id", getMember);

router.put("/:id", authenticate, updateMember);

router.delete("/:id", authenticate, authorize("admin"), deleteMember);

module.exports = router;