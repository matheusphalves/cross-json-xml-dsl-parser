const ohm = require('ohm-js')

//A++ to OOA
const gramatica = ohm.grammar(`
Comandos {
    Inicio = Collection+
    Collection = ("class" ClasseNome ("subclassof" ClasseNome)? "{" Construtor "}") 
    ClasseNome = letter alnum*
    Construtor = ClasseNome "(" Variavel ( "," Variavel)* ");"
    Variavel = Tipo letter alnum*
    Tipo = ("int" | "double" | "string" | "long" | "boolean")
}
`)


const inputs = `
class Ponto subclassof Figura {
    Ponto(int x, int y);
}
class PontoA subclassof Figura {
  PontoA(int x, int y);
  }
`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Padrões OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();
const ooaCode = ''

function compile(){
    semantica.addOperation('compile', {
        Inicio(colecao){
          colecao
        },

    })
}

/*
class Ponto subclassof Figura {
Ponto(int x, int y);
}
*/