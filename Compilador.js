const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Inicio = Comentario* Cabecalho Comentario* Estrutura* Comentario*
    Cabecalho = "<?xml version=\\"" Informacao "\\" encoding=\\"" Informacao "\\" ?>" 
    Estrutura = "<" Variavel ">" (Estrutura | Informacao)+ "<\/" Variavel ">"
    Informacao = letter+
    Variavel = letter+
    Comentario = "<!--" alnum* "-->"
}
`);

const inputs = `
<?xml version="1.0" encoding="UTF-8" ?>
<!---As categorias dos estudantes carregado por meses---->
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