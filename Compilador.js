const ohm = require('ohm-js')

//A++ to OOA
const gramatica = ohm.grammar(`
Comandos {
    Inicio = Colecao+
    Colecao = "class " ClasseNome "subclassof" ClasseNome " { " Construtor " } " 
    ClasseNome = letter+
    Construtor = ClasseNome "(" Variavel ( "," Variavel)* ");"
    Variavel = Tipo Reservada
    Reservada = ~Tipo letter+
    Tipo = ("int" | "double" | "string" | "long" | "boolean")
}
`)




const inputs = `
class Ponto subclassof Birilo {
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
          console.log(classeNome2.sourceString)
          if(classeNome.sourceString == classeNome2.sourceString){
            throw Error(`A '${classeNome}' não pode herdar dela mesma.`)
          }

        },

        ClasseNome(nome){
          console.log(nome.sourceString)
          return nome.sourceString
        },

        Construtor(classeNome, ap, variavel1, outrasVariaveis, fp, pv){//Construtor = ClasseNome "(" Variavel ( "," Variavel)* ");"
          
        },

        Variavel(tipo, nome){
          return tipo.compile() + nome.compile();
        },

        Reservada(nome){
          return nome.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;},

        _terminal() {return this.primitiveValue;}

    })
}

compile();
const execute = semantica(resultado).compile();
//console.log(lista);