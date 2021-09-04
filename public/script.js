// global varible and func
const display = document.getElementById("mes-display");
const input = document.getElementById("input");
function Display(data) {
    let newMes = document.createElement("div");
    newMes.classList.add("mes");
    newMes.innerHTML = data;
    display.appendChild(newMes);
    input.value = "";
}
// ---------------------------------------------------------------------------------
// handle socket.io
let socket = io();
// gửi message đi server
function sendMessage(data) {
    socket.emit("sendMessage",{
        message: data
    })
}
socket.on("connect",()=>{
    console.log("connected to server")
})
socket.on("broadCastMessage",(data)=>{
    Display(data.message);
})

// ---------------------------------------------------------------------------------
// nhập message và display lên khung chat
// lấy input 
function getInput() {
    const data = input.value;
    Display(data);
    // call hàm gửi message
    sendMessage(data);
}
// handle enter button để đẩy message từ input lên khung chat
function Enter(event) {
    if (event.key=="Enter") {
        getInput();
    }
}

// --------------------------------------------------------------------------------------
