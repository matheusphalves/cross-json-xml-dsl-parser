const ohm = require('ohm-js');

const gramatica = ohm.grammar(`
Comandos {
    Start = Comentario* Algoritmo Comentario* Definicao? Comentario* Funcao* Demarcacao Funcao* Comentario*
    Reservada= "imprima" | Tipo
    Comentario = "/*" Texto "*/"
    Texto = any+
    Digito = digit+
    Nome = ~Reservada letter+ Comentario*
    Algoritmo = Nome ";"
    Definicao = "variáveis" Comentario* Var Comentario* "fim-variáveis"
    Var= Nome ":" Comentario* Tipo  ";"
    Tipo= ("inteiro" | "real" | "caractere" | "literal" | "lógico") Comentario*
    Demarcacao = "início" Comandos* "fim"
    Comandos= Print | Read | If | Atribuicao | Comentario | While | For
    Print = "imprima" "("  Expressao  ("," Expressao)* ")"
    Expressao = Expressao Operadores Expressao --Op 
       | Digito
       | Nome
	   | "(" Expressao ")" --Par
    Operadores= "<" | ">" | "<=" | ">=" | "=" | "!=" | "%" | "+" | "*" | "/" | "-"
    Read = "leia" "()" ";"
    If= "se" Expressao "entao" Comandos* ("senão" Comandos* "fim-se")?
    Atribuicao= Nome ":=" (Expressao | Comandos)* ";"
    While = "enquanto" Expressao "faça" Comandos* "fim-enquanto"
    For = "para" Nome "de" Expressao "até" Expressao ("passo" Digito)? "faça" Comandos* "fim-para"
    Funcao = "função" Nome "(" Var ("," Var)* ")" ":" Tipo Demarcacao


}
`);

const inputs = `
algoritimo teste;

variáveis
    x : inteiro;
fim-variáveis

inicio

    imprima("digita ai");
    x := leia();
    imprima(x);

fim

função fatorial(z: inteiro) : inteiro
inicio

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
