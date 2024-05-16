const socket = io()

let user;
let chatBox = document.getElementById('chatBox')
let messageLogs = document.getElementById('messageLogs')

let data;

socket.on('message', (message)=>{
    data= message
})


socket.on('messageLogs', (data)=>{
    mostrar(data)
})

const mostrar= (arrayMessage)=>{
    let messages = ''

    arrayMessage.forEach(mess => {
        const identUser = message.user === user
        const messageClass = identUser ? 'my-message' : ' other-message'
        message = message + `<div class='${messageClass}> ${message.user}: ${message.message}</div>`
    });

    messageLogs.innerHTML = messages
    chatBox.scrollIntroView(false)
}


Swal.fire({
    title: 'Indetificate',
    input: 'text',
    text: 'Ingresa un nombre de usuario',
    inputValidator: (value)=>{
        return !value && 'Necesitas escribir un nombre de usuario'
    },
    allowOutsideClick: false,
}).then(result =>{
    if(result.isConfirmed){
        user=result.value
        mostrar(data)
    }
})

chatBox.addEventListener('keyup', event =>{
    if(event.key==='Enter'){
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value
            socket.emit('message', {user, message})
            chatBox.value='' 
        }
    }
})

socket.on('New User', ()=>{
    Swal.fire({
        text: 'Un nuevo usuario se conecto',
        toast: true,
        position: 'top-right'
    })
})
