const net = require("net"), fs = require("fs");

let server, istream = fs.createReadStream("./envoie/testocr.png");

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    istream.on("readable", function () {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    })
    istream.on("end", function(){
        socket.end();
    })
    socket.on("end", () => {
        server.close(() => { console.log("\nSa marche putain!") });
    })
})

server.listen(8000, '0.0.0.0');