import io from "socket.io-client";
import readline from "readline";
import { Readline } from "readline/promises";

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

socket.on("connect", () => {
  console.log("Connected to server");
  promptMessage();
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
    rl.close();
});

socket.on("message", (message: string) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log('received message: ', message);

    rl.prompt(true);
});

function promptMessage(){
    rl.question('Enter message (or "exit" to quit): ', (message) => {
        if(message.toLocaleLowerCase()==='exit'){
            console.log('Exiting...');
            socket.disconnect();
            rl.close();
            return
        }

        socket.emit("message", message);

        promptMessage();
    })
}

rl.on('close', ()=>{
    process.exit(0);
})