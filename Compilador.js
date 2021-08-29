const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    
}
`);

const inputs = `

`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Operações OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}