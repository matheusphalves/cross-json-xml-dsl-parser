const ohm = require('ohm-js')

//Objective A para A++
//Richard Jeremias Martins Rocha
//Data: 02/09
//1º Exercício Escolar

const gramaticaCompilador = ohm.grammar(`
Comandos {
  Inicio = Colecao+
  Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses (_doisPontos Classe)? _abreChaves _fechaChaves
  Classe = letter alnum*
  Variavel = ((",")? Tipo Exclusiva)+
  Exclusiva = ~Tipo letter letter*
  Tipo = ("boolean" | "char" | "double" | "int" | "long" | "String")
  _classe = "class"
  _fechaParenteses = ")"
  _abreParenteses = "("
  _abreChaves = "{"
  _fechaChaves = "}"
  _doisPontos = ":"
}
`)

const inputs = `
class Ponto1(int x, int w,int l) : Ponto2 {
}
class Figura(int s, int b) : Figurinha {
}
class Ponto3(int z, int y){
}
class Ponto4(int z, int w, int t, int x) : Ponto2 {
}
`;

const resultadoGramaticaCompilador = gramaticaCompilador.match(inputs);

if(resultadoGramaticaCompilador.succeeded()){
  console.log("Correto! A gramática foi lida corretamente.\n");
}else{
  console.log("Erro! Sua gramática não foi lida corretamente.\n");
  console.log(resultadoGramaticaCompilador.message)
}

const semanticaCompilador = gramaticaCompilador.createSemantics();

function compile(){
    semanticaCompilador.addOperation('compile', {
        Inicio(colecao){
          let colecaoTotal = colecao.compile();
          let colecaoRestritiva = new Set(colecaoTotal);
          if(colecaoTotal.length != colecaoRestritiva.size){
            throw Error(`Existem classes duplicadas na coleção.`);
          }
        },
       // Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses _doisPontos Classe _abreChaves _fechaChaves
        Colecao(_classe,classe,ap,variavel,fp,dp,classeDois,ac, fc){
          //let conjuntoVariaveis = new Set()
          let listaVariaveis = variavel.compile();
          //terminal variável abriga uma ou mais variáveis, avalie repetição ou não no método Variavel
          //usar listaVariaveis para demais necessidades...
          if(classe.sourceString == classeDois.compile()){
            throw Error(`Erro de programação! A classe ${classe.sourceString} não pode herdar dela mesma.`)
          }

          return classe.sourceString;
        },
        Variavel(virgula, variavel, exclusiva){
          let listaVariaveis = exclusiva.compile(); //obter lista de todas as variáveis
          let conjuntoVariaveis = new Set(listaVariaveis);
          if(listaVariaveis.length != conjuntoVariaveis.size){
            throw Error(`Existem variáveis duplicadas na declaração do construtor.`)
          }
          return conjuntoVariaveis;
        },

        //Classe = letter alnum*

        Classe(nome,nome2){
          return nome.sourceString + nome2.sourceString
        },

        Exclusiva(nome, nome2){ //nome da variável armazenada em Não-terminal
          return nome.sourceString + nome2.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;},

        _terminal() {return this.primitiveValue;}

    })
}

let codigoGerado = "";

//Inicio = Colecao+
//Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses _doisPontos Classe _abreChaves _fechaChaves
function generateCode(){
    semanticaCompilador.addOperation('generateCode', {
        Inicio(colecao){
          colecao.generateCode()
        },

        Colecao(_classe,classe,ap,variavel,fp,dp,classeDois,ac, fc){
          codigoGerado += "class " + classe.sourceString;
          codigoGerado += classeDois.sourceString == ""? " {" : " subclassof " + classeDois.sourceString + " {";
          codigoGerado += "\n\t" + classe.sourceString + "(" + variavel.sourceString + ");\n}\n";
        }
      }
    )
}

console.log("Zaoshang hao! O código foi gerado para a linguagem A++\n");
compile();
generateCode();
semanticaCompilador(resultadoGramaticaCompilador).compile();
semanticaCompilador(resultadoGramaticaCompilador).generateCode();
console.log(codigoGerado)
