# Projeto de Compiladores - Construção de DSL

# ⚠️ XML TO JSON e JSON TO XML⚠️

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

# III) Dependências ⬇️  

Os itens necessários para o uso dessa DSL são:

➡️ [Node v12^](https://nodejs.org/ru/blog/release/v12.16.1/)

➡️ [Ohm-js](https://www.npmjs.com/package/ohm-js)

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
    "disciplinaOfertada": true
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
### 1. Exemplo de XML para JSON
**Entrada XML:**
```
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

**Saída JSON:**
```
{ 
    "note": {
        "to": "Tove",
        "from": "Jani",
        "heading": "Reminder",
        "body": "Do not forget me this weekend" 
    }
}
```
### 2. Exemplo de XML para JSON
**Entrada XML:**
```
<?xml version="1.0" encoding="UTF-8"?>
<breakfast_menu>
<food>
    <name>Belgian Waffles</name>
    <price>$5.95</price>
    <description>
   Two of our famous Belgian Waffles with plenty of real maple syrup
   </description>
    <calories>650</calories>
</food>
<food>
    <name>Strawberry Belgian Waffles</name>
    <price>$7.95</price>
    <description>
    Light Belgian waffles covered with strawberries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>Berry-Berry Belgian Waffles</name>
    <price>$8.95</price>
    <description>
    Belgian waffles covered with assorted fresh berries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>French Toast</name>
    <price>$4.50</price>
    <description>
    Thick slices made from our homemade sourdough bread
    </description>
    <calories>600</calories>
</food>
<food>
    <name>Homestyle Breakfast</name>
    <price>$6.95</price>
    <description>
    Two eggs, bacon or sausage, toast, and our ever-popular hash browns
    </description>
    <calories>950</calories>
</food>
</breakfast_menu>
```
**Saída JSON:**
```
{ 
    "breakfast_menu": {
        "food": {
            "name": "Belgian Waffles",
            "price": "5.95",
            "description": "Two of our famous Belgian Waffles with plenty of real maple syrup",
            "calories": "650" 
        },
        "food": {
            "name": "Strawberry Belgian Waffles",
            "price": "7.95",
            "description": "Light Belgian waffles covered with strawberries and whipped cream",
            "calories": "900" 
        },
        "food": {
            "name": "Berry-Berry Belgian Waffles",
            "price": "8.95",
            "description": "Belgian waffles covered with assorted fresh berries and whipped cream",
            "calories": "900" 
        },
        "food": {
            "name": "French Toast",
            "price": "4.50",
            "description": "Thick slices made from our homemade sourdough bread",
            "calories": "600" 
        },
        "food": {
            "name": "Homestyle Breakfast",
            "price": "6.95",
            "description": "Two eggs bacon or sausage toast and our ever-popular hash browns",
            "calories": "950" 
        }
    }
}
```

### 3. Exemplo de JSON para XML
**Entrada JSON:**
```
{"menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}
```
**Saída XML:**
```
<?xml version="1.0" encoding="UTF-8"?>
<root> 
    <menu>
        <id>"file"</id>
        <value>"File"</value>
        <popup>
            <menuitem>
                <element>
                    <value>"New"</value>
                    <onclick>"CreateNewDoc()"</onclick>
                </element>
                <element>
                    <value>"Open"</value>
                    <onclick>"OpenDoc()"</onclick>
                    <value>"Close"</value>
                    <onclick>"CloseDoc()"</onclick>
                </element>
            </menuitem>
        </popup>
    </menu>
</root>
```
### 4. Exemplo de JSON para XML
**Entrada JSON:**
```
{"widget": {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
}}
```
**Saída XML:**
```
<?xml version="1.0" encoding="UTF-8"?>
<root> 
    <widget>
        <debug>"on"</debug>
        <window>
            <title>"Sample Konfabulator Widget"</title>
            <name>"main_window"</name>
            <width>500</width>
            <height>500</height>
        </window>
        <image>
            <src>"Images/Sun.png"</src>
            <name>"sun1"</name>
            <hOffset>250</hOffset>
            <vOffset>250</vOffset>
            <alignment>"center"</alignment>
        </image>
        <text>
            <data>"Click Here"</data>
            <size>36</size>
            <style>"bold"</style>
            <name>"text1"</name>
            <hOffset>250</hOffset>
            <vOffset>100</vOffset>
            <alignment>"center"</alignment>
            <onMouseUp>"sun1.opacity = (sun1.opacity / 100) x 90;"</onMouseUp>
        </text>
    </widget>
</root>
```
# VI) Comportamento do Compilador 🖥️

Sendo uma DSL um conversor para linguagem específica de domínio que irá otimizar algo para uma classe específica de problemas,O compilador irá gerar um código que irá remover as abstrações e, consequentemente, esse código será um código eficiente pra uso independente do fluxo que seja escolhido, sendo ele de XML para JSON como JSON para XML.

O domínio é a parte mais importante da DSL, sendo necessário escolher bem o domínio do problema e deve-se implementá-lo usando uma boa estrutura do tipo de solução onde ele será aplicado. Também é importante buscar peças reutilizáveis ​​durante o desenvolvimento da solução, que serão utilizadas para geração de código de saída. Se você tiver esses bots, a transformação entre eles é mais fácil, e isso é uma vantagem do DSL. Uma DSL cria mais oportunidades para criação de novos compiladores com o aumento da produtividade de desenvolvimento com sua implementação.

## Etapas envolvidas ⏏️

1. Definição da gramática 

2. Definição do analisador léxico

3. Definição do analisador semântico

# VII) Manual

Para acessar de XML para JSON, acesse o link: https://replit.com/@MatheusPinto3/projeto-compiladores-20202

Para acessar de JSON para XML, acesse o link: https://replit.com/@MatheusPinto3/projeto-compiladores-json

A necessidade de separação do código foi para melhor entendimento do fluxo de execução, por isso a necessidade de dois repositórios virtuais.

# VIII) Informações adicionais 👍🏼

Essa DSL foi desenvolvida com o objetivo de complementar a nota da 2ª avaliação da disciplina de Compiladores da Escola Politécnica da Universidade de Pernambuco, disciplina ministrada pelo professor Luis Menezes.

O editor de texto utilizado para este desenvolvimento foi o VSCode. As dificuldades encontradas foram a formatação do padrão de saída, a partir da informação transmitida pelos analisadores construídos.

No mais, o projeto foi executado com êxito. Como projeto de código aberto, esperamos que consiga auxiliar outros desenvolvedores no seu dia-a-dia.

Obrigado!

![Imagem Final é uma arte onde há um programador sentado programando encima do computador. O fundo da imagem é roxo e na tela do computador há uma estrutura que se assemelha a código](https://computerworld.com.br/wp-content/uploads/2019/11/IT-Trends-firma-parceria-com-Code-for-All.jpg.webp)