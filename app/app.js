const socket = io();
const name = prompt('Enter your name')
socket.emit('username',name);
function sendmsg(event){
    if (event) event.preventDefault();
    const msgInput = document.getElementById('msg').value.trim();
    if (msgInput!== "") {
        send(`You: ${msgInput}`);
        socket.emit('chat message', msgInput);
        msg.value = "";
    }
}
function send(message){
    const ul = document.getElementById('msg-list');
    if (message) {
        const li = document.createElement('li');
        li.style.display = "block";
        li.style.backgroundColor = "#f1f1f1";
        li.textContent = message + "\n";
        ul.appendChild(li);
        ul.scrollTop = ul.scrollHeight;
    }
}
socket.on('message',data=>{
    send(data);
})
socket.on('user joined', (data) => {
    send(data + ' has joined the chat');
});
socket.on('user left', (data) => {
    send(data + ' has left the chat');
});
document.querySelector('form').addEventListener('submit', sendmsg);
