const ohm = require('ohm-js')

//A++ to OOA
const gramatica = ohm.grammar(`
Comandos {
    Inicio = Colecao+
    Colecao = "class " classeNome "subclassof" classeNome "{" Construtor "}"
    classeNome = ~(reservada) letter alnum*
    Construtor = classeNome "(" Variavel VariasVariaveis* ");"
    VariasVariaveis = "," Variavel
    Variavel = tipo  ~(reservada) letter alnum*
    tipo = ("int" | "double" | "string" | "long" | "boolean")
    reservada = tipo | "class" | "subclassof"
}
`)


const inputs = `
class Ponto subclassof PontoA {
    Ponto(int x, int z);
}
class PontoA subclassof Figura {
  PontoA(int y, int x);
}

`;

const resultado = gramatica.match(inputs);

if (resultado.succeeded()) {
  console.log("Padrões OK");
} else {
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();
const ooaCode = ''

var codigoGerado = "Gerado código para ObjectiveA \n\n";
var list = []

function compile() {
  semantica.addOperation('compile', {
    Inicio(colecao) {
      var colecaoLista = colecao.compile();
      var colecaoSet = new Set(colecaoLista);
      if (colecaoLista.length != colecaoSet.size) {
        throw new Error(`Não deve existir classes com mesmo nome`);
      }
    },
    Colecao(class_, classeNome, subclassof, classeNome2, ac, construtor, fc) {
      const nomeConstrutor = construtor.compile();
      if (classeNome.sourceString == classeNome2.sourceString) {
        throw Error(`A classe ${classeNome.sourceString} não pode ser subclasse dela mesma`)
      } else if (nomeConstrutor != classeNome.sourceString) {
        throw Error(`O construtor não tem o mesmo nome de sua classe`)
      }
      return classeNome.sourceString;
    },
    Construtor(classeNome, ap, variavel1, outrasVariaveis, fp){
      let variaveisLista = [ variavel1.sourceString.split(' ')[1], ...outrasVariaveis.sourceString.split(' ')[2]] 
      let variaveisSet = new Set(variaveisLista); 

      if(variaveisLista.length != variaveisSet.size){
        throw Error(`Construtor tem mais de uma variável com mesmo nome`)
      }
      return classeNome.sourceString;

    }
  })
  semantica.addOperation('generateCode', {
    Inicio(colecao) {
      colecao.generateCode()
      for (var cont = 0; cont < list.length; cont++) {
        codigoGerado += list[cont]
      }
    },
    Colecao(class_, classeNome, subClass, nomeClass, ac, constr, fc) {
      var string = class_.sourceString + classeNome.sourceString + constr.generateCode() + " : " + nomeClass.sourceString + " {\n" + "}\n\n"
      list.push(string)
    },
    Construtor(classNome, ap, variavel, variaveis, fp) {
      return ap.sourceString + variavel.sourceString + variaveis.sourceString + ")"
    }
  })
}
compile()
semantica(resultado).compile()
semantica(resultado).generateCode()
console.log(codigoGerado)