const ohm = require('ohm-js')

//Objective A para A++
//Richard Jeremias Martins Rocha
//Data: 02/09
//1º Exercício Escolar

const gramaticaCompilador = ohm.grammar(`
Comandos {
  Inicio = Colecao+
  Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses _doisPontos Classe _abreChaves _fechaChaves
  Classe = letter alnum*
  Variavel = (_virgula? Tipo Exclusiva)+
  Exclusiva = ~Tipo letter letter*
  Tipo = ("boolean" | "char" | "double" | "int" | "long" | "String")
  _classe = "class"
  _virgula = ","
  _fechaParenteses = ")"
  _abreParenteses = "("
  _abreChaves = "{"
  _fechaChaves = "}"
  _doisPontos = ":"
}
`)

const inputs = `
class Ponto1(int x, int y) : Ponto2 {
}
class Ponto2(int a, int b) : Figura {
}
class Ponto3(int z, int w) : Figura {
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
          let conjuntoVariaveis = new Set()

          variavel.children.map(x => console.log(x.sourceString))

          if(classe.sourceString == classeDois.sourceString){
            throw Error(`Erro de programação! A classe '${classe.sourceString}' não pode herdar dela mesma.`)
          }

          return classe.sourceString;
        },

        /*
        Construtor(classeNome, ap, variavel1, outrasVariaveis, fp){
          let variaveisSet = new Set(variavel1.compile().split(' ')[1]);
          let count = 1;
          outrasVariaveis.children.map(item => {
            variaveisSet.add(item.compile().split(' ')[1]);
            count++;
          });
          if(variaveisSet.size != count){
            throw Error(`Construtor possui variáveis duplicadas em sua assinatura.`)
          }
          return classeNome.sourceString;

        },
        */

        Variavel(_virgula,variavel,exclusiva){
          return exclusiva.sourceString();
        },

        Tipo(tipo){return tipo.sourceString;},

        _terminal() {return this.primitiveValue;}

    })
}

let list = []

/*
function generateCode(){
    semanticaCompilador.addOperation('generateCode', {
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
        Construtor(classNome, ap, variavel, variaveis, fp){
          return "constructor " + ap.sourceString + variavel.sourceString + variaveis.sourceString + fp.sourceString
        }
    })
}
*/

//console.log("Zaoshang hao! O código foi gerado para a linguagem A++");
compile();
//generateCode();
semanticaCompilador(resultadoGramaticaCompilador).compile();
//semanticaCompilador(resultado).generateCode();
