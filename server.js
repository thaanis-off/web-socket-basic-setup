const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8080}); //wss -> web socket server to listen wss server

wss.on("connection", ws => { // whenever a client connects (visit 8080 port), it'll call 
    console.log(`New client connected, Total number of clients: ${wss.clients.size}`);

    // send msg to newly connected client
    ws.send('Welcome to the websocket server');

    // send msg to the client when receiving msg from them
    ws.on('message', (message) => {
        console.log(`Recieved from client: ${message}`);
        ws.send(`Server response you sent: ${message}`)
    })

    // send a message to the client every 5 sec when they connects
    setInterval(() =>{
        ws.send(`Totally there are ${wss.clients.size} clients connected to the server `)
    }, 5000)

    ws.on('close', () => console.log(`Client disconnected, Total number of Clients: ${wss.clients.size}`) )
})

console.log(`WebSocket server is running on ws://localhost:8080`);
