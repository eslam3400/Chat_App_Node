export default class Socket {
  users: any[] = []

  constructor(io: any) {
    io.on("connection", (socket: any) => {
      this.joinRoom(socket)
      this.receiveMessage(socket)
      this.disconnect(socket)
    })
  }

  joinRoom(socket: any) {
    socket.on("join channel", (data: any) => {
      this.users.push(data)
      socket.join(data.channel)
      socket.broadcast.to(data.channel).emit("new join", { sender: "Chat Bot", content: `New user joined to the chat! Say Hello ${data.username}`, date: new Date() })
      const roomUsers = this.users.filter(user => user.channel === data.channel)
      socket.to(data.channel).emit("room users", roomUsers)
    })
  }

  receiveMessage(socket: any) {
    socket.on("message", (msg: any) => socket.broadcast.to(msg.channel).emit("receive message", msg))
  }

  disconnect(socket: any) {
    socket.on("disconnect", () => console.log("user disconnected"))
  }
}