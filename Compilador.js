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
    reservada = tipo | "class" | "subclassof" | "classeNome"
}
`)


const inputs = `
class Ponto subclassof Figura {
    Ponto(int x, int y);
}
class PontoA subclassof Figura {
  PontoA(int z, int y);
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

var codigoGerado = "CÓDIGO GERADO PARA LINGUAGEM ObjectiveA\n\n";
var list = []

function compile() {
  semantica.addOperation('compile', {
    Inicio(colecao) {
      var colecaoLista = colecao.compile();
      var colecaoSet = new Set(colecaoLista);
      if (colecaoLista.length != colecaoSet.size) {
        throw Error(`Existem classes duplicadas na coleção.`);
      }
    },
    Colecao(class_, classeNome, subclassof, classeNome2, ac, construtor, fc) {
      const nomeConstrutor = construtor.compile();
      if (classeNome.sourceString == classeNome2.sourceString) {
        throw Error(`A classe '${classeNome.sourceString}' não pode herdar dela mesma.`)
      } else if (nomeConstrutor != classeNome.sourceString) {
        throw Error(`O nome do construtor deve ter o mesmo nome da classe.`)
      }
      return classeNome.sourceString;
    },
    Construtor(classeNome, ap, variavel1, outrasVariaveis, fp) {
      var variaveisSet = new Set(variavel1.sourceString.split(' ')[1]);
      var cont = 1;
      outrasVariaveis.children.map(x => {
        variaveisSet.add(x.sourceString.split(' ')[1]);
        cont++;
      });
      if (variaveisSet.size != cont) {
        throw Error(`Construtor possui variáveis duplicadas em sua assinatura.`)
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