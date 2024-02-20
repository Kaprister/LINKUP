const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route.js")
const messageRoutes = require("./routes/messages.route.js")
const socket = require("socket.io")


const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)


mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connected Successfully!");
        }).catch((error) => {
            console.log("error while connecting to MongoDB: " + error.message);
        })


const server = app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
})


const io = socket(server, {
    cors:{
        origin: "*",
        credentials: true,
    },
});


//? integrate socket
global.onlineUsers = new Map();

io.on('connection',(socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});