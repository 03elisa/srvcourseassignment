const express = require("express");
const router = express.Router();
const controller = require("../controllers/participantsController");

router.post("/add", controller.addParticipant);
router.get("/", controller.getAllParticipants);
router.get("/details", controller.getAllDetails);
router.get("/details/:email", controller.getDetailsByEmail);
router.get("/work/:email", controller.getWorkByEmail);
router.get("/home/:email", controller.getHomeByEmail);
router.delete("/:email", controller.deleteParticipant);
router.put("/:email", controller.updateParticipant);

module.exports = router;
