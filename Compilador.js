const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Start = Comentario* Algoritmo Comentario* Definicao? Comentario* Funcao* Demarcacao Funcao* Comentario*

    Reservada= "imprima" | Tipo
    Comentario = "/*" Texto "*/"
    Texto = any+
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

função fatorial(z: inteiro) : inteiro
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
