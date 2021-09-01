const ohm = require ('ohm-js');

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


const gramatica2 = ohm.grammar(`
Comandos{
  Inicio = "{" (ChaveValor | Objeto)+ "}"
  Chave = "\\"" letter+ (alnum)* "\\":"
  String = "\\"" (alnum | "/" | "." | "-")+ "\\""
  Numero =  "-"? digit+ ("." digit+)*
  Valor =  (Numero | String)+
  Objeto = Chave "{" (ChaveValor | Objeto)+ "}" 
  Lista = "[" Valor ("," Valor)* "]" | "[" Objeto ("," Objeto )* "]"
  ChaveValor =  Chave (Valor | Lista) ","? 
}
`)

const inputs = `
<?xml version="1.0"?>
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
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
</project>

`;


const inputs2 = `
{
  "name": "John",
  "age": 30,
  "cars": ["Ford", "BMW", "Fiat"]
}
`

//const resultado = gramatica.match(inputs);
const resultado = gramatica2.match(inputs2);
if(resultado.succeeded()){
  console.log("Operações OK");
}else{
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica2.createSemantics();

var json = "{ \n\t";
var list = [];
var contTab =1

function backEnd2(){
    semantica.addOperation('generateCode', {
        Inicio(com1, cab, com2, est, com3){
          est.generateCode();
          for(var cont = 0; cont< list.length; cont++){
            json+= list[cont]
          }
          json = json.substring(0, json.length-1)
          json += "}"
        },
        Estrutura(start1, variavel, end1, content, start2, variavel2, end2){
            var object = "\"" + variavel.sourceString + "\": ";
            if(content.sourceString.substring(0,1) == "<"){
              object += "{\n"
              contTab++
              for(var c=0; c<contTab;c++){
                object += "\t"
              }
              list.push(object);
              content.generateCode();
              var aux = list.pop()
              aux.replace( "", aux.lastIndexOf('\,'));
              list.push(aux.substring(0, aux.length-1))
              contTab--
              var chave = "}\n"
              for(var c=0; c<contTab;c++){
                chave += "\t"
              }
              list.push(chave)

            }
            else{
              var conteudo = content.generateCode();
              object += conteudo
              for(var c=0; c<contTab;c++){
                object += "\t"
              }
              list.push(object)
            }
        },
        Informacao(info){
            return "\"" + info.sourceString + "\",\n"
        }
    }
    )
}

function backEnd3(){
  semantica.addOperation('compile', {
    Inicio(ac, content, fc){ //"{" (ChaveValor | Objeto)+ "}"
      content.compile();
    },

    Chave(ap, name, name2, fp){//Chave = "\\"" letter+ (alnum)* "\\":"
      console.log(name.sourceString)
    },

    /*String(){

    },

    Numero(){
      
    },

    Valor(){

    },

    Objeto(){

    },

    Lista(){

    },*/

    ChaveValor(chave, value, pv){ //ChaveValor =  Chave (Valor | Lista) ","? 

    }

  })
}

backEnd3();
console.log(semantica(resultado).compile())
//console.log(json)

/*Comandos{
  String = "\\"" (alnum | "/" | "." | "-")+ "\\""
  Numero =  "-"? digit+ ("." digit+)*
  Valor =  (Numero | String)+
  Objeto = Chave "{" (ChaveValor | Objeto)+ "}" 
  Lista = "[" Valor ("," Valor)* "]" | "[" Objeto ("," Objeto )* "]"
  ChaveValor =  Chave (Valor | Lista) ","? 
}
`*/