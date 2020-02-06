
const net = require("net"), fs = require("fs"), remote_server = process.argv[2];
let socket;

socket = remote_server ? net.connect(8000, remote_server) : net.connect(8000);

let ostream = fs.createWriteStream("./reception/testocr.png");
let date = new Date(), size = 0, elapsed;
socket.on('data', chunk => {
  size += chunk.length;
  elapsed = new Date() - date;
  socket.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB envoyer. Temps total transfert: ${elapsed / 1000} s`)
  process.stdout.write(`\r${(size / (1024 * 1024)).toFixed(2)} MB envoyer. Temps total transfert: ${elapsed / 1000} s`);
  ostream.write(chunk);
});
socket.on("end", () => {
  console.log(`\nSa marche ici aussi! Vitesse: ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s`);
  process.exit();
});