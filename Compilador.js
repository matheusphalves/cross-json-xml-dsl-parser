const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Start = Operacao+
    Operacao = Comentario* Algoritmo Comentario* Definicao? Comentario* Funcao* Demarcacao Funcao* Comentario*
    Reservada= "imprima" | Tipo
    Comentario = "/*" ( alnum |"\\"" | space | "!" | "@" | "#" | "$" | ":"| "(" | ")" | "|" | "&" | "/")* "*/"
    Digito = digit+
    Nome = ~Reservada letter+ Comentario*
    String = "\\"" Nome "\\""

    Algoritmo = "algoritmo" Nome ";"
    Definicao = "variáveis" Comentario* Var Comentario* "fim-variáveis"
    Var= Nome ":" Comentario* Tipo  ";"
    VarDefinida = Nome ":" Comentario* Tipo
    Tipo= ("inteiro" | "real" | "caractere" | "literal" | "lógico") Comentario*
    Demarcacao = "início" Comandos* "fim"
    Comandos= Print | Read | If | Atribuicao | Comentario | While | For | Return
    Print = "imprima" "("  (String | Expressao)  ("," Expressao)* ")" ";"
    Expressao = Expressao Operadores Expressao --Op
    | Digito
    | DefFuncao
    | Nome
    Operadores= "<" | ">" | "<=" | ">=" | "=" | "!=" | "%" | "+" | "*" | "/" | "-"
    Read = "leia" "()" ";"
    If= "se" Expressao "então" Comandos* ("senão" Comandos* "fim-se")?
    Atribuicao= Nome ":=" (Expressao | Comandos) ";"
    While = "enquanto" Expressao "faça" Comandos* "fim-enquanto"
    For = "para" Nome "de" Expressao "até" Expressao ("passo" Digito)? "faça" Comandos* "fim-para"
    DefFuncao = Nome "(" Expressao? ")"
    Funcao = "função" Nome "(" VarDefinida ("," VarDefinida)* ")" ":" Tipo Demarcacao
    Return = "retorne" Expressao ";"
}
`);

const inputs = `
algoritmo teste;

variáveis
    x : inteiro;
fim-variáveis

início
    imprima("Digita ai");
    x := leia();
    imprima(x);
fim

função fatorial(z: inteiro) : inteiro /* tstsadge " &@(&@@) :  */
início

    se z = 1 então
        retorne 1;
    senão
        retorne z * fatorial(z-1);
    fim-se

fim
`;

const resultado = gramatica.match(inputs);

if(resultado.succeeded()){
  console.log("Operações OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica.createSemantics();

function executeOperation(){//operação para interpretar comandos inseridos
    semantica.addOperation('execute',
    {
        Start(operacoes){
            return {...operacoes.execute()}//execução de todos os dos elementos da árvore
        },
        Operacao(com1, algo, com2, def, com3, fun1, demar, fun2, com4){
            //algo.execute();
            //def.execute();
            demar.execute();
        },

        Reservada(nome){

        },

        Comentario(start, content, end){

        },

        Digito(_){ return this.primitiveValue},

        Nome(letras, com){
            console.log(letras, com)
        },
        
        String(start, nome, end){

        },

        Algoritmo(algoritmo, nome, pv){
            console.log(algoritmo.sourceString, nome.sourceString, pv.sourceString)
        },
        Definicao(startVar, com1, var_, com2, endVar){
            console.log(startVar.sourceString, endVar.sourceString);
            var_.execute(); //não terminal
        },

        Var(nome, twoDots, com, tipo, pv){
            //console.log(nome.sourceString, twoDots.sourceString, tipo.sourceString, pv.sourceString)
            console.log(tipo.execute()); //não terminal
        },

        VarDefinida(nome, twoDots, com, tipo){

        },

        Tipo(tipo, com){
            console.log(tipo.sourceString);
        },

        Demarcacao(start, comandos, end){
            comandos.execute();
        },

        Comandos(nome){
            console.log(nome.sourceString);
        },

        Print(imp, pr1, stringOrExp, virgula, otherExp, pr2, pv){

        },

        Expressao_Op(exp, op, exp2){

        },

        Expressao(comand){//Digito DefFuncao, Nome

        },

        Operadores(op){

        },

        Read(leia, parentesis, pv){

        },

        If(se, exp, entao, comandos, senao, maisComandos, fim){//vulgo inteligencia

        },

        Atribuicao(nome, atrib, expOrCom, pv){

        },

        While(enqt, exp, faca, comds, fim){

        },

        For(para, nome, de, exp, ate, exp2, passo, digito, faca, comandos, fim){

        },

        DefFuncao(nome, pr1, exp, pr2){

        },

        Funcao(fun, nome, pr1, varDef, virgula, varDef2, pr2, twoDots, tipo, demar){

        },


        Return(retorne, Exp, pv){

        }
        
    })
}

function generateCodeOperation(){//operação para gerar txt com arquivo.c
    //gerar código compilado e interpretado...
}

//Execução das operações
executeOperation();

console.log(semantica(resultado).execute())