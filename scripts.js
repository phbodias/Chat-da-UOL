/* Funções */

function formathour(message){
    time = parseInt(message.time.slice(0,2))-3;
    if (time<0){
        time += 24;
    }
    let rest = message.time.slice(2,8)
    time = `${time}${rest}`;
    return time;
}

function login (username){
    const entrou = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", username);
    carregando();
    entrou.then(loginSucess);
    entrou.catch(loginError);
}

function carregando(){
    let tela = document.querySelector(".remove");
    tela.remove(".remove");

    tela = document.querySelector(".tela-entrada");
    tela.innerHTML += `
        <div class="gifff">
            <img class="gif" src="/images/gif.gif" alt="">
            <div class="entrando">Entrando...</div>
        </div>
    `
}


function loginSucess(resposta) {
    let tela = document.querySelector(".tela-entrada");
    tela.remove(".tela-entrada");

    let exibir = document.querySelector(".div-cega");
    exibir.innerHTML += `
        <div class="topo">
        <div class="topo-content">
            <img src="images/logo.png" alt="">
            <ion-icon name="people" class="icon"></ion-icon>
        </div>
        </div>
        <div class="content">
            <ul></ul>
        </div>
        <div class="floor">
            <input type="text" placeholder="Escreva aqui..." class="input" value="">
            <button class="button" onclick="send()"><ion-icon name="paper-plane-outline"></ion-icon></button>
        </div>
    `

    const ul = document.querySelector("ul");
    const meuInterval = setInterval(logado, 5000);
    messages_send();
}

function loginError(resposta) {

    if (resposta.response.status === 400){
        alert("Nome de usuário já em uso, escolha outro.");
        window.location.reload();
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
    const time = formathour(message);
        
    ul.innerHTML += `<li class="status"> (${time})&nbsp<strong>${message.from}</strong>&nbsp${message.text}...</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function type_message(message){
    const ul = document.querySelector("ul");
    const time = formathour(message);

    ul.innerHTML += `<li class="message"> (${time})&nbsp<strong>${message.from}</strong>&nbsppara&nbsp<strong>${message.to}</strong>:&nbsp${message.text}</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function type_private_message(message){
    const ul = document.querySelector("ul");
    const time = formathour(message);

    ul.innerHTML += `<li class="private_message"> (${time})&nbsp<strong>${message.from}</strong>&nbspreservadamente para&nbsp<strong>${message.to}</strong>: ${message.text}</li>`;
    const li = ul.lastChild;
    li.scrollIntoView(); 
}

function send(){
    
    const text = document.querySelector(".input");
    let message = [];

    if (text.value !== ""){
        message = {
            from: username.name,
            to: "Todos",
            text: text.value,
            type: "message"
        }

        const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
        post.then(messages_send());

    }

    text.value = '';
}

/*-------------------------------BONUS - ENVIAR COM ENTER---------------------------------------- */


document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
    
        const btn = document.querySelector(".button_ent");
      
        btn.click();
        
    }
});

document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
    
        const btn = document.querySelector(".button");
      
        btn.click();
    
    }
});

/*----------------------------------------------------------------------------------------------- */

/*-------------------------------BONUS - TELA DE ENTRADA ---------------------------------------- */

function tela_entrada(){
    let user = document.querySelector(".input_ent");
    username.name = user.value;
    login(username);
}

/* Variáveis globais */

let username = {};
