const express = require("express");



const {



    getTraining,



    createTraining,



    updateTraining,



    deleteTraining



} = require("../controllers/trainingController");



const {



    authenticate,



    authorize



} = require("../middleware/auth");



const router = express.Router();



router.get("/", getTraining);


router.post(



    "/",



    authenticate,



    authorize("admin", "coach"),



    createTraining



);



router.put(



    "/:id",



    authenticate,



    authorize("admin", "coach"),



    updateTraining



);



router.delete(



    "/:id",



    authenticate,



    authorize("admin"),



    deleteTraining



);



module.exports = router;