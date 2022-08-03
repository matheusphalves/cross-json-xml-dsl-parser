const ohm = require('ohm-js')

//Objective A para A++
//Richard Jeremias Martins Rocha
//Data: 02/09
//1º Exercício Escolar

const gramaticaCompilador = ohm.grammar(`
Comandos {
  Inicio = Colecao+
  Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses (_doisPontos Classe)? _abreChaves _fechaChaves
  Classe = letter alnum*
  Variavel = ((",")? Tipo Exclusiva)+
  Exclusiva = ~Tipo letter letter*
  Tipo = ("boolean" | "char" | "double" | "int" | "long" | "String")
  _classe = "class"
  _fechaParenteses = ")"
  _abreParenteses = "("
  _abreChaves = "{"
  _fechaChaves = "}"
  _doisPontos = ":"
}
`)

const inputs = `

class Ponto(int x, int y) : Figura {
}
class Ponto1(int x, int y, int z) : Ponto2 {
}
class Figura(int x, int o) : Figurinha {
}
class Ponto3(int z, int y){
}
class Ponto4(int z, int w, int t, int x) : Ponto5 {
}
`;

const resultadoGramaticaCompilador = gramaticaCompilador.match(inputs);

if(resultadoGramaticaCompilador.succeeded()){
  console.log("Correto! A gramática foi lida corretamente.\n");
}else{
  console.log("Erro! Sua gramática não foi lida corretamente.\n");
  console.log(resultadoGramaticaCompilador.message)
=======
<?xml version="1.0"?>
<modelVersion>4.0.0</modelVersion>
  <groupId>com.di2win.elis.emission</groupId>
  <artifactId>elis-emission</artifactId>
  <version>1.0.0-SNAPSHOT</version>
  <properties>
    <compiler-plugin.version>3.8.1</compiler-plugin.version>
    <maven.compiler.parameters>true</maven.compiler.parameters>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <quarkus-plugin.version>1.12.2.Final</quarkus-plugin.version>
    <quarkus.platform.artifact-id>quarkus-universe-bom</quarkus.platform.artifact-id>
    <quarkus.platform.group-id>io.quarkus</quarkus.platform.group-id>
    <quarkus.platform.version>1.12.2.Final</quarkus.platform.version>
    <surefire-plugin.version>2.22.1</surefire-plugin.version>
  </properties>
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>{quarkus.platform.group-id}</groupId>
        <artifactId>{quarkus.platform.artifact-id}</artifactId>
        <version>{quarkus.platform.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-resteasy</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-arc</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-smallrye-reactive-messaging-amqp</artifactId>
    </dependency>
    <dependency>
      <groupId>com.di2win.elis</groupId>
      <artifactId>elis-commons</artifactId>
      <version>1.0.0-SNAPSHOT</version>
    </dependency>
    <dependency>
		  <groupId>com.di2win.elis</groupId>
		  <artifactId>elis-orchestrator-commons</artifactId>
		  <version>1.0.0-SNAPSHOT</version>
	  </dependency>
    <dependency>
      <groupId>com.di2win.elis</groupId>
      <artifactId>elis-database</artifactId>
      <version>1.0.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-hibernate-orm-panache</artifactId>
    </dependency>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-hibernate-orm</artifactId>
    </dependency>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-jdbc-mssql</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-resteasy-jsonb</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-smallrye-openapi</artifactId>
    </dependency>
    <dependency>
      <groupId>org.jboss.resteasy</groupId>
      <artifactId>resteasy-multipart-provider</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-junit5</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
    <groupId>com.googlecode.json-simple</groupId>
    <artifactId>json-simple</artifactId>
    <version>1.1.1</version>
    </dependency>
    <dependency>
      <groupId>io.rest-assured</groupId>
      <artifactId>rest-assured</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-rest-client</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-smallrye-jwt</artifactId>
    </dependency>
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-core</artifactId>
      <version>1.13.0</version>
    </dependency>
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-messaging-servicebus</artifactId>
      <version>7.0.2</version>
    </dependency>
    <dependency>
    <groupId>org.jboss.logmanager</groupId>
    <artifactId>log4j2-jboss-logmanager</artifactId>
</dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-maven-plugin</artifactId>
        <version>{quarkus-plugin.version}</version>
        <extensions>true</extensions>
        <executions>
          <execution>
            <goals>
              <goal>build</goal>
              <goal>generate-code</goal>
              <goal>generate-code-tests</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>{compiler-plugin.version}</version>
      </plugin>
      <plugin>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>{surefire-plugin.version}</version>
        <configuration>
          <systemPropertyVariables>
            <java.util.logging.manager>org.apache.logging.log4j.LogManager</java.util.logging.manager>
            <maven.home>{maven.home}</maven.home>
          </systemPropertyVariables>
        </configuration>
      </plugin>
    </plugins>
  </build>
  <profiles>
    <profile>
      <id>native</id>
      <activation>
        <property>
          <name>native</name>
        </property>
      </activation>
      <build>
        <plugins>
          <plugin>
            <artifactId>maven-failsafe-plugin</artifactId>
            <version>{surefire-plugin.version}</version>
            <executions>
              <execution>
                <goals>
                  <goal>integration-test</goal>
                  <goal>verify</goal>
                </goals>
                <configuration>
                  <systemPropertyVariables>
                    <native.image.path>{project.build.directory}/{project.build.finalName}-runner</native.image.path>
                    <java.util.logging.manager>org.jboss.logmanager.LogManager</java.util.logging.manager>
                    <maven.home>{maven.home}</maven.home>
                  </systemPropertyVariables>
                </configuration>
              </execution>
            </executions>
          </plugin>
        </plugins>
      </build>
      <properties>
        <quarkus.package.type>native</quarkus.package.type>
      </properties>
    </profile>
  </profiles>

`;

const inputs2 = `
<?xml version="1.0" encoding="UTF-8"?>
<breakfast_menu>
<food>
    <name>Belgian Waffles</name>
    <price>5.95</price>
    <description>
   Two of our famous Belgian Waffles with plenty of real maple syrup
   </description>
    <calories>650</calories>
</food>
<food>
    <name>Strawberry Belgian Waffles</name>
    <price>7.95</price>
    <description>
    Light Belgian waffles covered with strawberries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>Berry-Berry Belgian Waffles</name>
    <price>8.95</price>
    <description>
    Belgian waffles covered with assorted fresh berries and whipped cream
    </description>
    <calories>900</calories>
</food>
<food>
    <name>French Toast</name>
    <price>4.50</price>
    <description>
    Thick slices made from our homemade sourdough bread
    </description>
    <calories>600</calories>
</food>
<food>
    <name>Homestyle Breakfast</name>
    <price>6.95</price>
    <description>
    Two eggs bacon or sausage toast and our ever-popular hash browns
    </description>
    <calories>950</calories>
</food>
</breakfast_menu>
`

const resultado = gramatica.match(inputs2);

if (resultado.succeeded()) {
  console.log("Operações OK");
} else {
  console.log("Erro");
  console.log(resultado.message)
}

const semanticaCompilador = gramaticaCompilador.createSemantics();


function compile(){
    semanticaCompilador.addOperation('compile', {
        Inicio(colecao){
          let colecaoTotal = colecao.compile();
          let colecaoRestritiva = new Set(colecaoTotal);
          if(colecaoTotal.length != colecaoRestritiva.size){
            contemErro(true);
            throw Error(`Existem classes duplicadas na coleção de entrada.`);
          }
        },
       // Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses _doisPontos Classe _abreChaves _fechaChaves
        Colecao(_classe,classe,ap,variavel,fp,dp,classeDois,ac, fc){
          //let conjuntoVariaveis = new Set()
          let listaVariaveis = variavel.compile();
          if(classe.sourceString == classeDois.compile()){
            contemErro(true);
            throw Error(`Erro de programação! A classe ${classe.sourceString} não pode herdar dela mesma.`)
          }

          return classe.sourceString;
        },
        Variavel(virgula, variavel, exclusiva){
          let listaVariaveis = exclusiva.compile(); //obter lista de todas as variáveis
          let conjuntoVariaveis = new Set(listaVariaveis);
          if(listaVariaveis.length != conjuntoVariaveis.size){
            contemErro(true);
            throw Error(`Existem variáveis duplicadas na declaração do construtor.`)
          }
          return conjuntoVariaveis;
        },

        Classe(nome,nome2){
          return nome.sourceString + nome2.sourceString
        },

        Exclusiva(nome, nome2){ 
          return nome.sourceString + nome2.sourceString;
        },

        Tipo(tipo){return tipo.sourceString;},

        _terminal() {return this.primitiveValue;}
=======
var json = "{ \n\t";
var list = [];
var contTab = 1

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
    Estrutura(start1, variavel, end1, content, start2, variavel2, end2) {
      if (list.length != 0) {
        var auxVirgula = list.pop()
        if (auxVirgula.substring(0,1)=="}") {
          list.push(auxVirgula.substring(0,1)+ ","+ auxVirgula.substring(1,auxVirgula.length))
        }else{
          list.push(auxVirgula)
        }
        
      }
      var object = "\"" + variavel.sourceString + "\": ";
      if (content.sourceString.substring(0, 1) == "<") {
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
      }
      else {
        var conteudo = content.generateCode();
        object += conteudo
        for (var c = 0; c < contTab; c++) {
          object += "\t"
        }
        list.push(object)
      }
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

let codigoGerado = "";

//Inicio = Colecao+
//Colecao = _classe Classe _abreParenteses Variavel _fechaParenteses _doisPontos Classe _abreChaves _fechaChaves
function generateCode(){
    semanticaCompilador.addOperation('generateCode', {
        Inicio(colecao){
          colecao.generateCode()
        },

        Colecao(_classe,classe,ap,variavel,fp,dp,classeDois,ac, fc){
          codigoGerado += "class " + classe.generateCode();
          codigoGerado += classeDois.generateCode() == ""? " {" : " subclassof " + classeDois.generateCode() + " {";
          codigoGerado += "\n\t" + classe.generateCode() + "(" + variavel.sourceString + ");\n}\n";
        },

      Classe(valor,alnum){
        return  valor.sourceString + alnum.sourceString
      }
      }
    )
}

function contemErro(contemErro){
  if(contemErro === true){
    console.log("Houston, we have a problem. Um erro foi gerado na compilação\n");
  } 
}

compile();
generateCode();
semanticaCompilador(resultadoGramaticaCompilador).compile();
semanticaCompilador(resultadoGramaticaCompilador).generateCode();
console.log(codigoGerado)
=======
backEnd();
compile();
semantica(resultado).compile()
semantica(resultado).generateCode()
console.log(json)
