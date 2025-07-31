import {Server} from "socket.io"
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        
    }
});

export function getRecieverSocketId(userId) {
    return userSocketMap[userId]; // Return the socket ID for the given userId or null if not found
}

//use to store online users
const userSocketMap ={};


io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    const userId = socket.handshake.query.userId; // Assuming userId is passed in the query string
    if(userId){
        userSocketMap[userId] = socket.id; // Map userId to socket id
        
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit online users to all clients

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        delete userSocketMap[userId]; // Remove user from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users to all clients
    });

    // You can add more event listeners here for different socket events
});
export { io,app,server};