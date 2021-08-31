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
<?xml version="1.0" encoding="UTF-8"?>
<!--As categorias dos estudantes carregado por meses-->
<class_list>
   <student>
      <name>Tanmay</name>
      <grade>A</grade>
   </student>
</class_list>
`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Operações OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

var json = "";
function backEnd(){
    semantica.addOperation('generateCode', {
        Inicio(com1, cab, com2, est, com3){
          est.generateCode();
        },

        /*Cabecalho(start, versao, encod, encodingContent, end){
        },*/


        Estrutura(start1, variavel, end1, content, start2, variavel2, end2){
            json += "\"" + variavel.sourceString + "\": ";
            if(content.children.length > 0){
              json += "{\n\t"
            }
            content.generateCode();
        },

        /*Versao(digito, dot, digito2){

        },

        Encoding(seila){

        },

*/
        Informacao(info){
            json += "\"" + info.sourceString + "\","
        },
/*
        Variavel(seila){

        },

        Comentario(){

        }*/
    }
    )
}

function compile(){
  semantica.addOperation('compile', {
    Inicio(com1, cab, com2, est, com3){
      est.compile();
    },

    Estrutura(start1, variavel1, end1, content, start2, variavel2, end2){
      if(variavel1.sourceString === variavel2.sourceString){
        if(content.children.length>0)
          content.compile();
      }else{
        throw Error(`Start tag element '${variavel1.sourceString}' don't match with '${variavel2.sourceString}'`)
      }
    },

    Informacao(info){
      return info.sourceString;
    }
  })
}

backEnd();
//compile();
//semantica(resultado).compile()
semantica(resultado).generateCode()
console.log(json)