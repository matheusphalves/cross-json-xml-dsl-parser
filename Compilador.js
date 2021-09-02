const ohm = require('ohm-js')

//A++ to OOA
const gramatica = ohm.grammar(`
Comandos {
    Inicio = Colecao+
    Colecao = "class " classeNome "subclassof" classeNome "{" Construtor "}"
    classeNome = letter alnum*
    Construtor = classeNome "(" Variavel ( "," Variavel)* ");"
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

/*function compile(){
    semantica.addOperation('compile', {
        Inicio(colecao){
          colecao
        },

    })
}*/

var codigoGerado = "";
var list = []

function compile(){
    semantica.addOperation('generateCode', {
        Inicio(colecao){
          colecao.generateCode()
          for (var cont = 0; cont < list.length; cont++) {
            codigoGerado += list[cont]
          }
        },
        Colecao(class_, classeNome, subClass, nomeClass, ac, constr, fc){
          var string = class_.sourceString + classeNome.sourceString + " extends " + nomeClass.sourceString + ac.sourceString + "\n\t" + constr.generateCode() + "\n" + fc.sourceString +"\n"
          list.push(string)
        },
        Construtor(classNome, ap, variavel, variaveis, _, fp){
          return "constructor " + ap.sourceString + variavel.sourceString + variaveis.sourceString + fp.sourceString
        }
    })
}
compile()
semantica(resultado).generateCode()
console.log(codigoGerado)
/*
class Ponto subclassof Figura {
Ponto(int x, int y);
}
*/