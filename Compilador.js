const ohm = require('ohm-js')

//Object A para OOA

//Explicação da gramatica da linguagem Object A:

//Aceita que a classe não tenha ou tenha várias variaveis como atributos
//Aceita que tenha ou não classe extendida
//Nome das classes devem iniciar obrigatoriamente com letra
//Palavras reservadas não podem ser utilizadas como nome de classes e atributos
const gramatica = ohm.grammar(`
Comandos {
  Inicio = Classes+
  Classes = "class" NomeClasse "(" Variavel* ")" (":" ClasseExtend)? "{" "}"
  ClasseExtend = ~reservadas letter alnum*
  NomeClasse = ~reservadas letter alnum*
  tipo = ("int" | "double" | "string" | "long" | "boolean")
  Variavel = (",")? tipo nomeVariavel
  nomeVariavel = ~reservadas letter alnum*
  reservadas = tipo | "class" | "extends" | "constructor"
}
`)

const inputs = `
class Ponto(int a, int b) : Figura {
}

class Ponto1() {
}

class Ponto2(int a, int b, boolean c) {
}
`;

const resultado = gramatica.match(inputs);

console.log("1. Validando Gramatica...");
if(resultado.succeeded()){
  console.log("\tGramatica validada com sucesso!");
}else{
  console.log("\tERRO: Gramatica não está correta!");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

//variavel criada para saber se irá existir erros de compilação
var error =  false;

//compilando gramatica para verificar se existem erros que não podem ser validados na gramatica
//EX: não pode ter nomes de variaveis iguais, não pode existem nomes de classes iguais
function compile(){
    //variavel criada para saber se irá existir erros de compilação
    var error =  false;

    semantica.addOperation('compile', {
        Inicio(classes){
          console.log("2. Validando Compilação...");

          //compilando classes para ter uma lista com todos os nomes de classes
          let colecaoLista = classes.compile();
          //criando uma lista Set com os nomes das classes, ou seja, não havera nomes duplicados
          let colecaoSet = new Set(colecaoLista);

          //caso o tamanho da lista de todas as classes seja diferente da lista de Set sem repetição,
          //significa que existem classes com o mesmo nome
          if(colecaoLista.length != colecaoSet.size){
            console.log(`\tERRO: Existem classes com nomes duplicados.`);

            //seta que existem erros na compilação
            error = true;
          }
          
          //caso não exista erros de compilação, **imprime** no console que a compilação foi concluída!
          if(error == false) {
            console.log("\tCompilação concluída com sucesso!\n-------------------\nRESULTADO DA CONVERSÃO PARA LINGUAGEM OAA\n");
          }
        },
        
        Classes(class_, classeNome, aP, variaveis, fP, dP, classeExtend, aC, fC){
          
          //caso o nome da classe e o nome da classe extendida seja o mesmo,
          //imprime o erro e seta error = true
          if(classeNome.sourceString == classeExtend.sourceString){
            console.log(`\tERRO: A classe não pode herdar dela mesma.`);
            error = true;
          }
          
          var setVariaveis = new Set();
          let count = 0;

          //mapeando as variaveis e adicionando a lista de Set
          //ao mesmo tempo aumenta o count a cada map
          variaveis.children.map(variavel => {
            setVariaveis.add(variavel.compile());
            count++;
          });

          //caso o count seja diferente do tamanho da lista de Set, significa que
          //existem variaveis duplicadas.
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

        tipo(tipo){return tipo.sourceString;},
        
        Variavel(virgula, tipo, nomeVariavel){
          return nomeVariavel.sourceString;
        }, 
        
        _terminal() {return this.primitiveValue;}
    })
}

//variavel que será criada com a linguagen OOA 
var linguagemOOA = "";


//traduzindo da linguagem Object A para linguagem OOA
function generateCode(){
    semantica.addOperation('generateCode', {
        Inicio(classes){
          classes.generateCode();
        },

        Classes(class_, classeNome, aP, variaveis, fP, dP, classeExtend, aC, fC){
          //criando nome do método: class + nome da classe
          linguagemOOA += "class " + classeNome.sourceString
          
          //se existe um extends em Object A, deve adicionar extends + nome da classe extendida, caso contrario, segue sem o extends
          linguagemOOA += classeExtend.sourceString != "" ? " extends " + classeExtend.generateCode() + " {\n\tconstructor(" : " {\n\tconstructor(" ;
          
          //mapeando todas as variaveis e adicionando ao construtor
          variaveis.children.map(variavel => {
            linguagemOOA += variavel.sourceString;
          });

          //fechando a classe
          linguagemOOA += ");\n}\n\n";
        },

        ClasseExtend(letter, alnum){
          return letter.sourceString + alnum.sourceString
        }
    })
}

compile();
generateCode();
semantica(resultado).compile();

if(error == false){
  generateCode();
  semantica(resultado).generateCode();
}

console.log(linguagemOOA);