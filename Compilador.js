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
  console.log("1. Validando Gramatica...\n\tGramatica validada com sucesso!");
}else{
  console.log("ERRO: Gramatica não está correta!");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

function compile(){
    var error =  false;

    semantica.addOperation('compile', {
        Inicio(classes){
          console.log("2. Validando Compilação...");
          let colecaoLista = classes.compile();
          let colecaoSet = new Set(colecaoLista);
          if(colecaoLista.length != colecaoSet.size){
            console.log(`\tERRO: Existem classes duplicadas na coleção.`);
            error = true;
          }
          
          if(error == false) {
            console.log("\tCompilação concluída com sucesso!\n-------------------\nRESULTADO DA CONVERSÃO PARA LINGUAGEM OAA\n");
          }
        },
        
        Classes(class_, classeNome, aP, variaveis, fP, dP, classeExtend, aC, fC){
          
          if(classeNome.sourceString == classeExtend.sourceString){
            console.log(`\tERRO: A classe '${classeNome.sourceString}' não pode herdar dela mesma.`);
            error = true;
          }
          
          var setVariaveis = new Set();
          let count = 0;
          variaveis.children.map(variavel => {
            setVariaveis.add(variavel.compile());
            count++;
          });

          if(setVariaveis.size != count){
            console.log(`\tERRO: Classe possui variáveis duplicadas.`);
            error = true;
          }
          return classeNome.sourceString;
        },

        ClasseExtend(letter, alnum){
          return letter.sourceString + alnum.sourceString
        },

        NomeClasse(letter, alnum){
          return letter.sourceString + alnum.sourceString
        },

        Tipo(tipo){return tipo.sourceString;},
        
        Variavel(virgula, tipo, nomeVariavel){
          return nomeVariavel.sourceString;
        }, 
        
        _terminal() {return this.primitiveValue;}
    })
}

var codigoGerado = "";

function generateCode(){
    semantica.addOperation('generateCode', {
        Inicio(classes){
          classes.generateCode();
        },

        Classes(class_, classeNome, aP, variaveis, fP, dP, classeExtend, aC, fC){
          codigoGerado = "class " + classeNome.sourceString
          codigoGerado += classeExtend.sourceString != "" ? " extends " + classeExtend.sourceString + " {\n\tconstructor(" : " {\n\tconstructor(" ;
          
          variaveis.children.map(variavel => {
            codigoGerado += variavel.generateCode();
          });

          codigoGerado += ");\n}";
        },

        Variavel(virgula, tipo, nomeVariavel){
          var stringVirgula = virgula.sourceString == "" ? virgula.sourceString : virgula.sourceString + " "

          return stringVirgula + tipo.sourceString + " " + nomeVariavel.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;}
    })
}

compile();
generateCode();
semantica(resultado).compile();
semantica(resultado).generateCode();
console.log(codigoGerado);