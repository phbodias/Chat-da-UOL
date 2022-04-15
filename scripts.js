const username = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

username.then(processarResposta);

function processarResposta(resposta) {
	console.log(resposta.data);
}