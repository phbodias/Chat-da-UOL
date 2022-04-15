// Agendará a função minhaFuncao para ser executada periodicamente a cada 1 segundo
setInterval(minhaFuncao, 1000);

// O setInterval retorna um identificador único pra essa repetição.
// Você pode armazenar esse identificador numa variável e depois
// utilizá-la para parar a repetição quando quiser (por padrão ele vai rodar pra sempre).
const meuInterval = setInterval(minhaFuncao, 1000);
clearInterval(meuInterval);