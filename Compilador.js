const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Inicio = Comentario* Cabecalho Comentario* Estrutura* Comentario*
    Cabecalho = "<?xml version=\\"" Versao "\\" encoding=\\"" Encoding "\\"?>" 
    Estrutura = "<" Variavel ">" (Estrutura | Informacao)+ "<\/" Variavel ">"
    Versao = digit+ ("." digit+)*
    Encoding = letter+ (alnum+ | any)*
    Informacao = alnum+
    Variavel = letter+ (alnum)*
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

//está cagado, consertar gramática
function backEnd(){
    semantica.addOperation('execute', {
        Inicio(com1, cab, com2, est, com3){
            
        },

        Cabecalho(start, versao, encod, encodingContent, end){
        },


        Estrutura(start1, variavel, end1, content, start2, variavel2, end2){

        },

        Versao(digito, dot, digito){

        },

        Encoding(seila){

        },


        Informacao(info){
            return info.sourceString;
        },

        Variavel(seila){

        },

        Comentario(){

        }
    }
    )
}

backEnd();
console.log(semantica(resultado).execute())