export default function (io) {
  io.on("connection", socket => {
    socket.on("sendMessage", data => {
      io.emit("receiveMessage", data);
    });
  });
}
