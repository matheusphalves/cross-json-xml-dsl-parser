const ohm = require ('ohm-js');
const fs = require ('fs');

const grammarCode = fs.readFileSync('./grammarCode.ohm');
const gramatica = ohm.grammar(grammarCode);

const inputs = `
algoritimo teste;

variáveis
    x : inteiro;
fim-variáveis

inicio

    imprima("digita ai");
    x := leia();
    imprima(x);

fim

função fatorial(z: inteiro) : inteiro
inicio

    se z = 1 então
        retorne 1;
    senão
        retorne z * fatorial(z-1);
    fim-se

fim


`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Operações OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}
