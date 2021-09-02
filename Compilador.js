const ohm = require('ohm-js')

//Object A to OOA
const gramatica = ohm.grammar(`
Comandos {
  Inicio = Classes+
  Classes = "class" NomeClasse "(" Variavel+ ")" (":" ClasseExtend)? "{" "}"
  ClasseExtend = letter alnum*
  NomeClasse = letter alnum*
  Tipo = ("int" | "double" | "string" | "long" | "boolean")
  Variavel = (",")? Tipo NomeVariavel
  NomeVariavel = letter alnum*
}
`)

const inputs = `
class Ponto subclassof Birilo {
    Ponto(int x, int y, int z);
}
class Ponto2 subclassof Birilo {
  Ponto2(int a, int b, int y);
}
class Ponto3 subclassof Birilo {
  Ponto3(int a, int b, int y);
}
`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Padrões OK\n");
}else{
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

function compile(){
    semantica.addOperation('compile', {
        Inicio(colecao){
          let colecaoLista = colecao.compile();
          let colecaoSet = new Set(colecaoLista);
          if(colecaoLista.length != colecaoSet.size){
            throw Error(`Existem classes duplicadas na coleção.`);
          }
          
        },
        Colecao(class_, classeNome, subclassof, classeNome2, ac, construtor, fc){
          const nomeConstrutor = construtor.compile();
          if(classeNome.sourceString == classeNome2.sourceString){
            throw Error(`A classe '${classeNome.sourceString}' não pode herdar dela mesma.`)
          }else if(nomeConstrutor != classeNome.sourceString){
            throw Error(`O nome do construtor deve ter o mesmo nome da classe.`)
          }

          return classeNome.sourceString;
        },

        classeFilha(nome, nome2){
          return nome.sourceString
        },

        classePai(nome, nome2){
          return nome.sourceString
        },

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

        Variavel(tipo, nome){
          return tipo.compile() + " " + nome.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;},

        OutrasVariaveis(pv, nome){
          return nome.sourceString;
        },

        _terminal() {return this.primitiveValue;}

    })
}

var codigoGerado = "CÓDIGO GERADO PARA LINGUAGEM OOA\n\n";
var list = []

function generateCode(){
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
        Construtor(classNome, ap, variavel, variaveis, fp){
          return "constructor " + ap.sourceString + variavel.sourceString + variaveis.sourceString + fp.sourceString
        }
    })
}

compile();
generateCode();
semantica(resultado).compile();
semantica(resultado).generateCode();
console.log(codigoGerado);