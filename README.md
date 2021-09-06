# Projeto de Compiladores - Construção de DSL

# I) Sobre o projeto 📝

O JX Conversor 🔄 é uma Linguagem de Domínio específico utilizada para o domínio particular de conversão entre XML (Extensible Markup Language) e JSON (Javascript Object Notation).

## ⏏️ Motivação

JSON E XML são formatos de dados utilizados diariamente pelos desenvolvedores de software. Em sua construção, eles permitem inserir informações complexas e difíceis de serem estruturadas no dia-a-dia, facilitando assim suas aplicações em ambientes que requerem um certo nível de complexidade na informação a ser transmitida. Dessa forma, sua aplicação se torna uma alternativa muito viável para aqueles que necessitam tanto de flexibilidade, como também simplificidade em seu contexto.

![Ilustração referente a conversão, onde há um filtro simulando a conversão de bases. A tela do computador é roxa, e um personagem simular retirar o código do computador](https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2019/05/O-que-e-JSON.png)


Um fato interessante é que ambos padrões independem de linguagem. Essa definição permite que os dados representados por eles possam ser acessados em qualquer linguagem de programação, principalmente por APIs específicas, uma vez que essa junção traria ainda mais praticidade no desenvolvimento.

## ⏏️ Objetivo

Essa conversão pode ser utilizada de diversas formas num fluxo de trabalho. Seja para atender uma demanda específica, ou para a praticidade no entendimento de uma estrutura específica, a DSL busca atender uma necessidade no aspecto de desenvolvimento de software.

O presente projeto propõe elaborar uma DSL (Domain Specific Language) que seja possível traduzir scripts escritos em XML para JSON. 

# II) Grupo de Desenvolvimento
 👨‍💻 Matheus Phelipe Alves Pinto
 
 👨‍💻 Murilo Campanhol Stoldoni

 👨‍💻 Nilton Vieira da Silva

 👨‍💻 Richard Jeremias Martins Rocha

Nome da linguagem: JX Conversor 🔄

🔗 Link para o projeto no repl.it: [Clique aqui](https://www.npmjs.com/package/ohm-js)

# III) Dependências ⬇️  

Os itens necessários para o uso dessa DSL são:

➡️ [Node v12^](https://nodejs.org/ru/blog/release/v12.16.1/)

➡️ [Ohm-js](https://www.npmjs.com/package/ohm-js)

➡️ [fs](https://www.npmjs.com/package/fs)

# IV) Sintaxe do JSON

O dois elementos centrais da sintaxe do JSON são: _Keys_ (chaves) e _Values_ (valores).

_**Keys:**_ devem ser strings (linhas), ou seja, deve conter uma sequência de caracteres entre aspas duplas.

_**Values:**_ são um tipo válido de dados JSON, podem ser array, object, string, boolean, number ou null.

Um objeto JSON deve iniciar e terminar obrigatoriamente com chaves {}. Como o objeto é formado aos pares (key/value), dentro deve existir um mais pares. Sendo estruturada da seguinte forma: "key":"value" conforme exemplo abaixo.

```
{
    "disciplina":"Compiladores",
    "periodo": 7
}
```

## **Tipos de Valores**
Os valores devem conter um tipo válido de dado JSON, como:

## Array
É uma coleção ordenada de valores, é esplicito com colchetes [] e cada valor dentro do array é separado por uma vírgula.

Um array pode obter objetos JSON dentro, conforme é mostrado no exemplo abaixo:
```
"estudantes":[      
    {"primeiroNome":"Matheus", "ultimoNome":"Pinto"},
    {"primeiroNome":"Murilo", "ultimoNome":"Stodolni"},
    {"primeiroNome":"Nilton", "ultimoNome":"Vieira"},
    {"primeiroNome":"Richard", "ultimoNome":"Jeremias"}
]
```

## Object
Contém uma key e um value. Tem dois pontos depois de cada key e uma vírgula depois de cada value, diferenciando cada objeto. Lembrando que o último elemento não contem vírgula.

Um objeto em JSON é mostrado abaixo:
```
"disciplina": {
    "nome": "Compiladores",
    "vagasDisponiveis": 20,
    "professor": "Luis Menezes"
}
```

## Strings
Sequência de zeros ou mais caracteres Unicode. É colocado entre aspas duplas

Exemplo abaixo:
```
{
    "nomeDisciplina": "Compiladores"
}
```

## Number
Pode ser informado do tipo inteiro ou fracionado, conforme mostrado abaixo:
```
{
    "vagasDisciplina": 20,
    "mediaDisciplina": 9.5
}
```

## Boolean
É informado os valores TRUE ou FALSE:

```
{
    disciplinaOfertada": "true"
}
```

## Null
Apenas informa que não existe informação.
```
{
    "alunosReprovados": "null"
}
```

# IV) Sintaxe do XML
A documentação do XML é feita pelo site W3C (órgão responsável pela definição da linguagem XML). Iremos mostrar os principais tópicos que devem ser levados em consideração quando estamos criando um objeto XML.

1. Um documento XML deve possuir raiz única.
2. Todas as tags devem ser fechadas (elementos devem possuir tag inicial e tag final)
3. Os nomes de elementos (tags) e atributos são sensíveis à caracteres maiúsculos e minúsculos.
4. Nomes de tags não podem conter espaços em branco nem os caracteres !"#$%&'()*+,/;<=>?@[\]^`{|}~. Além disso, não podem começar com um número, “ . ” (ponto) ou “ - " (traço).

Abaixo iremos dar exemplo válidos das regras mencionadas acima

## 1. Deve possuir raiz única
```
<curso>
  <disciplina>
    <nome>Compiladores</nome>
    <professor>Luiz Menezes</professor>
  </disciplina>
  <disciplina>
    <nome>Sistema Operacional</nome>
    <professor>José Paulo</professor>
  </disciplina>
</curso>
```

## 2. Todas as tags devem ser fechadas
```
<disciplina>
    <nome>Compiladores</nome>
    <professor>Luiz Menezes</professor>
</disciplina>
```

## 3. Nomes de elementos e atributos são Case Sensitive (são sensíveis à caracteres maiúsculos e minúsculos)
```
<nome>Compiladores</nome>
<Professor>Luiz Menezes</Professor>
```

## 4. Nomes de elementos e atributos são Case Sensitive (são sensíveis à caracteres maiúsculos e minúsculos)
```
<nomeDisciplina_1>Compiladores</nomeDisciplina_1>
```

# V) Exemplos de Códigos Fontes  🔣

# VI) Comportamento do Compilador 🖥️

## Etapas envolvidas ⏏️

1. Definição da gramática 

2. Definição do analisador léxico

3. Definição do analisador semântico

# VII) Manual



# VIII) Informações adicionais 👍🏼

Essa DSL foi desenvolvida com o objetivo de complementar a nota da 2ª avaliação da disciplina de Compiladores da Escola Politécnica da Universidade de Pernambuco, disciplina ministrada pelo professor Luis Menezes.

O editor de texto utilizado para este desenvolvimento foi o VSCode. As dificuldades encontradas foram a formatação do padrão de saída, a partir da informação transmitida pelos analisadores construídos.

No mais, o projeto foi executado com êxito. Como projeto de código aberto, esperamos que consiga auxiliar outros desenvolvedores no seu dia-a-dia.


                        Obrigado!


![Imagem Final é uma arte onde há um programador sentado programando encima do computador. O fundo da imagem é roxo e na tela do computador há uma estrutura que se assemelha a código](https://computerworld.com.br/wp-content/uploads/2019/11/IT-Trends-firma-parceria-com-Code-for-All.jpg.webp)