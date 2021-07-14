//conexão de sockets
const socket = io();

socket.on('ldr', function(data) {
    console.log(data);
    let ldr = document.getElementById('LDR');
    ldr.innerHTML = `LDR: ${data}`;
});