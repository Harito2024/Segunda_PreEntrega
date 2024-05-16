const socket = io()

let user

const chatBox= document.getElementById('chatBox')

Swal.fire({
    title: 'Indetificate',
    input: 'text',
    text: 'Ingresa un nombre de usuario',
    inputValidator: (value)=>{
        return !value && 'Necesitas escribir un nombre de usuario'
    },
    allowOutsideClick: false,
}).then(result =>{
    user=result.value
})

chatBox.addEventListener('keyup', (event) =>{
    if(event.key === 'Enter'){
        if(chatBox.value.trim().length>0){
            socket.emit('chat', {user: user, message:chatBox.value} )
        }
        chatBox.value=''
    }
})

socket.on('messagesLogs', data=>{
    let log = document.getElementById('messagesLogs')
    let messages= ''
    
    data.forEach(message => {
         messages = messages + `${message.user} dice: ${message.message}<br>`
    });
    log.innerHTML = messages
})

