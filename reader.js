const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, function() {
    console.log('servidor ouvindo na porta 3000');
});
io.on("connection", function(socket) {
    console.log("Um usuário está conectado");
});

//comunicação serial
const SerialPort = require('serialport');
const ReadLine = require("@serialport/parser-readline");

//2° passo: definir a porta serial
const port = new SerialPort("Com21", { baudRate: 9600 });

//3° passo definir o ReadLine parser... Definir o serial port parser
const parser = new ReadLine('\r\n');
port.pipe(parser);

parser.on('open', function() {
    console.log('connection is open');
});
parser.on('data', function(data) {
    //let ldr = "ldr: " + parseInt(data, 10);
    //console.log(ldr);
    //console.log(data);
    io.emit('ldr', data);
});
port.on('error', function() {
    console.log(err);
});