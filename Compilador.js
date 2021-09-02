const ohm = require('ohm-js')

//A++ to OOA
const gramatica = ohm.grammar(`
Comandos {
  Inicio = Colecao+
  Colecao = "class " classeFilha "subclassof" classePai "{" Construtor "}"
  classeFilha = letter alnum*
  classePai = letter alnum*
  Variavel = Tipo letter letter*
  Tipo = ("int" | "double" | "string" | "long" | "boolean")
  Construtor = classeFilha "(" Variavel ( "," Variavel)* ");"
}
`)

const inputs = `
class Ponto subclassof Birilo {
    Ponto(int x, int y);
}
class Ponto subclassof Ponto {
  Ponto(int x, int y);
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
          colecao.compile();
        },
        Colecao(class_, classeNome, subclassof, classeNome2, ac, construtor, fc){
          console.log(classeNome.sourceString, classeNome2.sourceString)
          if(classeNome.sourceString == classeNome2.sourceString){
            throw Error(`A classe '${classeNome.sourceString}' não pode herdar dela mesma.`)
          }

        },

        classeFilha(nome, nome2){
          console.log(nome.sourceString)
          return nome.sourceString
        },

        classePai(nome, nome2){
          console.log(nome.sourceString)
          return nome.sourceString
        },

        Construtor(classeNome, ap, variavel1, outrasVariaveis, fp, pv){//Construtor = ClasseNome "(" Variavel ( "," Variavel)* ");"
          
        },

        Variavel(tipo, nome, nome2){
          return tipo.compile() + nome.sourceString + nome2.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;},

        _terminal() {return this.primitiveValue;}

    })
}

compile();
const execute = semantica(resultado).compile();
//console.log(lista);