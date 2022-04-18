/* Funções */

function formathour2(message){
    time = parseInt(message.time.slice(0,2))-3;
    if (time<0){
        time += 24;
    }
    let rest = message.time.slice(2,8)
    time = `${time}${rest}`;
    return time;
}

function login (){
    const entrou = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);
    entrou.then(loginSucess);
    entrou.catch(loginError);
}

function loginSucess(resposta) {
    const ul = document.querySelector("ul");
    const meuInterval = setInterval(logado, 5000);
    messages_send();
}

function loginError(resposta) {
    if (resposta.response.status === 400){
        username.name = prompt("Digite seu nome de usuário");
        login();
    }
}

function logado(){
    const userlogado = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", username);
    
}

function messages_send(){
    const old_messages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    old_messages.then(get_messages);
}

function get_messages(resposta){
    let messages = resposta.data;
    let type;
    let message;

    for (let i = messages.length - 10; i < messages.length; i++){
        message = messages[i];
        type = message.type; 

        if (type === "status"){
            type_status(message);
        }else if (type === "message"){
            type_message(message);
        }else{
            type_private_message(message);
        }
    }

    messages_send();
    
}

function type_status(message){
    const ul = document.querySelector("ul");
    const time = formathour2(message);
        
    ul.innerHTML += `<li class="status"> (${time})&nbsp<strong>${message.from}</strong>&nbsp${message.text}...</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function type_message(message){
    const ul = document.querySelector("ul");
    const time = formathour2(message);

    ul.innerHTML += `<li class="message"> (${time})&nbsp<strong>${message.from}</strong>&nbsppara&nbsp<strong>${message.to}</strong>:&nbsp${message.text}</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function type_private_message(message){
    const ul = document.querySelector("ul");
    const time = formathour2(message);

    ul.innerHTML += `<li class="private_message"> (${time})&nbsp<strong>${message.from}</strong>&nbspreservadamente para&nbsp<strong>${message.to}</strong>: ${message.text}</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function send(){
    
    const text = document.querySelector(".input");
    let mensage = [];

    if (text.value !== ""){
        mensage = {
            from: username.name,
            to: "Todos",
            text: text.value,
            type: "message"
        }

        const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensage);
    }

    text.value = '';
}

/*-------------------------------BONUS - ENVIAR COM ENTER---------------------------------------- */


document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
    
        const btn = document.querySelector(".button");
      
        btn.click();
    
    }
});

/*---------------------------------------------------------------------------------- */


/* Variáveis globais */

let username = {name: prompt("Digite seu nome de usuário")};
/*---------------------------------------------------------------------------------- */

/* Invocação de funções */
login();
