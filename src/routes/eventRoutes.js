const express = require("express");



const {



    getEvents,



    createEvent,



    updateEvent,



    deleteEvent,



    registerForEvent,



    unregisterFromEvent



} = require("../controllers/eventController");



const {



    authenticate,



    authorize



} = require("../middleware/auth");



const router = express.Router();



router.get("/", getEvents);


router.post(



    "/",



    authenticate,



    authorize("admin", "coach"),



    createEvent



);



router.put(



    "/:id",



    authenticate,



    authorize("admin", "coach"),



    updateEvent



);



router.delete(



    "/:id",



    authenticate,



    authorize("admin"),



    deleteEvent



);



router.post(



    "/:id/register",



    authenticate,



    registerForEvent



);



router.delete(



    "/:id/register",



    authenticate,



    unregisterFromEvent



);



module.exports = router;