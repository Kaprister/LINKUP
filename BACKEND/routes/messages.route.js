const {
    getAllMessage,
    addMessage,
} = require("../controllers/messages.controller.js");


const router = require("express").Router();

router.post("/addMsg", addMessage)
router.post("/getMsg", getAllMessage)


module.exports = router;