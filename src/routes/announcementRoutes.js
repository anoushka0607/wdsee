const express = require("express");

const {



    getAnnouncements,



    createAnnouncement,



    deleteAnnouncement



} = require("../controllers/announcementController");



const {



    authenticate,



    authorize



} = require("../middleware/auth");



const router = express.Router();



router.get("/", getAnnouncements);


router.post(



    "/",



    authenticate,



    authorize("admin", "coach"),



    createAnnouncement



);



router.delete(



    "/:id",



    authenticate,



    authorize("admin"),



    deleteAnnouncement



);



module.exports = router;