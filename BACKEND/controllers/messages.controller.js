const Messages = require('../models/message.model.js')

module.exports.addMessage = async(req, res) => {
    try {
        const {from, to, message} = req.body;
        const data = await Messages.create({
            message : {text: message},
            users: {from , to},
            sender: from,
        })
        if(data){
            return res.status(200).json({msg : "massage added successfully!"})
        }
        return res.status(400).json({msg : "failed to add massage to the database!"})
    } catch (error) {
        res.status(500).json("something went wrong, please try again!", error.message)
    }
}


module.exports.getAllMessage = async(req, res) => {
    try {
        const {from, to} = req.body;
        const message = await Messages.find({
            // users: {
            //     $all : [from, to],
            // },
            $and: [
                { "users.from": from },
                { "users.to": to }
            ]
        }).sort({updatedAt: 1});

        const projectedMessages = message.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                createdAt : msg.createdAt,
            }
        });
        // console.log(projectedMessages);

        return res.status(202).json(projectedMessages);

    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json("something went wrong, please try again!", error.message)
    }
}