const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Inicio = Comentario* Cabecalho Comentario* Estrutura* Comentario*
    Cabecalho = "<?xml version=" Versao Encoding? "?>"
    Estrutura = "<" Variavel ">" (Estrutura | Informacao)+ "</" Variavel ">"
    Versao = "\\"" digit+ ("." digit+)* "\\""
    Encoding = "encoding" "=" "\\"" letter+ "-" digit "\\""
    Informacao = (alnum | ":" | "=" | "\\"" | "/" | "." | "{" | "}" | "-")+
    Variavel = letter+ (alnum | ":" | "=" | "\\"" | "/" | "." | "_" | "-" | "{" | "}")* 
    Comentario = "<!--" alnum* "-->"
}
`);

const inputs = `
<?xml version="1.0"?>
<build>
  <plugins>
    <plugin>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-maven-plugin</artifactId>
      <version>{quarkus-plugin.version}</version>
    </plugin>
    <plugin>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>{compiler-plugin.version}</version>
    </plugin>
    <plugin>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>{surefire-plugin.version}</version>
    </plugin>
  </plugins>
</build>
 
`;

const resultado = gramatica.match(inputs);

if (resultado.succeeded()) {
  console.log("Operações OK");
} else {
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

var json = "{ \n\t";
var list = [];
var contTab = 1;
//var array = "";
var tamanhoArray = 0;
var isArray = false;
var somaArray = 0;

function backEnd() {
  semantica.addOperation('generateCode', {
    Inicio(com1, cab, com2, est, com3) {
      est.generateCode();
      for (var cont = 0; cont < list.length; cont++) {
        json += list[cont]
      }
      json = json.substring(0, json.length - 1)
      json += "}"
    },


    Estrutura(start1, variavelAtual, end1, content, start2, variavel2, end2) {
      console.log("---------------------")

      var estruturaAtual = ""

      console.log("TAB: " + contTab)
      for (var c = 0; c < contTab; c++) {
        //console.log(c)
        estruturaAtual += "\t"
      }


      console.log("VARIAVEL ATUAL -> " + variavelAtual.sourceString)
      console.log("PRÓXIMO CONTENT -> " + content.sourceString)
      var informacaoFutura = content.sourceString;
      indexInicio = informacaoFutura.indexOf("<");
      indexFinal = informacaoFutura.indexOf(">");

      //se tem uma variavel por vir!
      if(indexInicio != -1 && indexFinal != -1){
        var proximaVariavel = informacaoFutura.substring(indexInicio + 1, indexFinal);
        var quantArrayProximaVariavel = (informacaoFutura.split("<" + proximaVariavel + ">").length - 1);
        console.log("PROXIMA VARIAVEL -> " + proximaVariavel)
        console.log("TAMANHO: " + quantArrayProximaVariavel)

        //essa variavel por vir é um array?
        if(quantArrayProximaVariavel >= 2){
          console.log("É ARRAY COM TAMANHO: " + quantArrayProximaVariavel)
          estruturaAtual += "\"" + variavelAtual.sourceString + "\": {\n";
          list.push(estruturaAtual);
          isArray = true;
          contTab++;
          console.log(estruturaAtual)
          content.generateCode();
          /*
          console.log("if if else")
          var arrayJson = variavelAtual + ":[";

          arrayInicio = str.indexOf("<" + proximaVariavel + ">");
          arrayFinal = str.indexOf("</" + proximaVariavel + ">");
          content.children.map(x => {
            arrayJson += "\n{";
            //arrayJson += str.substring(variavelAtual.length + 2, arrayFinal);
            console.log("generateCode")
            arrayJson += content.generateCode();
            arrayJson += "},";
          });
          
          console.log(arrayJson)*/

        } else {
          console.log("É NÃO ARRAY")
          
          if(isArray == true){
            console.log("ARRAY TRUE")
            console.log("VARIAVEL ATUAL -> " + variavelAtual.sourceString)
            console.log("PRÓXIMO CONTENT -> " + content.sourceString)
            content.children.map(x => {
              console.log(x. )
            });
            //estruturaAtual += "\"" + variavelAtual.sourceString + "\": [\n";
            //list.push(estruturaAtual);
            //cabecalhoImpresso = true;
            //console.log(estruturaAtual)
            //contTab++;
            //content.generateCode();

          }

          if(tamanhoArray > 0){
            var infoArray = "";
            for (var c = 0; c < contTab; c++) {
              //console.log(c)
              infoArray += "\t"
            }
            tamanhoArray--;
            console.log("ARRAY: " + tamanhoArray);
            console.log(estruturaAtual)
            //contTab++;
            //content.generateCode();
          } else {
            cabecalhoImpresso = false;          
            console.log("CABECALHO ARRAY NEM TAMANHO ARRAY")
            estruturaAtual += "\"" + variavelAtual.sourceString + "\": {\n";
            list.push(estruturaAtual);
            console.log(estruturaAtual)
            contTab++;
            content.generateCode();
          }

        }
      } else {
        console.log("FOLHA")
        estruturaAtual += "\"" + variavelAtual.sourceString + "\": \"" + content.sourceString + "\",\n";
        contTab++;
        list.push(estruturaAtual);
        console.log(estruturaAtual)
        content.generateCode();
      }

      contTab--

        //NILTON
        /*if (list.length != 0) {
          var auxVirgula = list.pop()
          if (auxVirgula.substring(0,1)=="}") {
            list.push(auxVirgula.substring(0,1)+ ","+ auxVirgula.substring(1,auxVirgula.length))
          }else{
            list.push(auxVirgula)
          }
          
        }
        var object = "\"" + variavel.sourceString + "\": ";
        if (content.sourceString.substring(0, 1) == "<") {
          //if(content.sourceString.substring(1, content.sourceString.indexOf(">"))==variavel.sourceString){
          /*if (content.sourceString.includes(variavel.sourceString)) {
            object += "[\n"
            contTab++
            for (var c = 0; c < contTab; c++) {
              object += "\t"
            }
            list.push(object);
            content.generateCode();
            var aux = list.pop()
            list.push(aux.replace(",", " ").substring(0, aux.length - 1))
            contTab--
            var chave = "]\n"
            for (var c = 0; c < contTab; c++) {
              chave += "\t"
            }
            list.push(chave)
          }
          else {
            object += "{\n"
            contTab++
            for (var c = 0; c < contTab; c++) {
              object += "\t"
            }
            list.push(object);
            content.generateCode();
            var aux = list.pop()
            list.push(aux.replace(",", " ").substring(0, aux.length - 1))
            contTab--
            var chave = "}\n"
            for (var c = 0; c < contTab; c++) {
              chave += "\t"
            }
            list.push(chave)
          //}
          //}
  
  
        }
        else {
          var conteudo = content.generateCode();
          object += conteudo
          for (var c = 0; c < contTab; c++) {
            object += "\t"
          }
          list.push(object)
        }
      */

    //console.log("\n---------------\nRESULT: " + mySubString + " -> " + (str.split(mySubString).length - 1) +"\n---------------")
    },
    Informacao(info) {
      return "\"" + info.sourceString + "\",\n"
    }
  }
  )
}

function compile() {
  semantica.addOperation('compile', {
    Inicio(com1, cab, com2, est, com3) {
      est.compile();
    },

    Estrutura(start1, variavel1, end1, content, start2, variavel2, end2) {
      if (variavel1.sourceString === variavel2.sourceString) {
        if (content.children.length > 0)
          content.compile();
      } else {
        throw Error(`Start tag element '${variavel1.sourceString}' don't match with '${variavel2.sourceString}'`)
      }
    },

    Informacao(info) {
      return info.sourceString;
    }
  })
}

backEnd();
//compile();
//semantica(resultado).compile()
semantica(resultado).generateCode()
console.log("------------------- JSON PRONTO -------------------")
console.log(json)