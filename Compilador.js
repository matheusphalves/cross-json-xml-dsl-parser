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
  Chave = "\\"" letter+ (alnum | "_")* "\\":"
  String = "\\"" (alnum | "/" | "." | "-" | ":")+ "\\""
  Booleano = "false" | "true"
  Numero =  "-"? digit+ ("." digit+)*
  Valor =  (Numero | String | Booleano)+
  Objeto = Chave "{" (ChaveValor | Objeto)+ "}" ","? 
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
  "numero_proposta_seguradora": "10002021077500002379",
  "id_proposta_origem": "d74a328f-c801-49c5-a5a1-1fff0c605ac5",
  "sistema_origem": "1000",
  "codigo_grupo_susep_principal": "07",
  "codigo_ramo_susep_principal": "75",
  "tipo_apolice": "PROPRIA",
  "limite_maximo_apolice": {
      "moeda_limite_total": "BRL",
      "valor_limite_total": "26153.7900"
  },
  "codigos_condicoes_gerais": ["05690-CG-000700750001001-0015-001"],
  "datas": {
      "inicio_vigencia": "2021-06-09T00:00:00Z",
      "fim_vigencia": "2024-06-08T00:00:00Z",
      "registro_origem": "2021-06-09T18:27:57Z",
      "assinatura": "2021-06-09T18:28:03Z",
      "protocolo_origem": "2021-06-09T18:28:25Z",
      "conclusao_subscricao": "2021-06-09T18:28:09Z"
  },
  "id_subscritor_origem": "10336",
  "resultado_subscricao": "APROVADA",
  "emissao_condicionada_pagamento": false,
  "partes": [{
          "papel_parte": "CORRETOR",
          "tipo_parte": "INTERMEDIARIO",
          "id_pessoa": "string",
          "id_pessoa_origem": "96077aa9-f69b-4608-99ce-fe99837d50dc",
          "tipo_pessoa": "JURIDICA",
          "pais_nacionalidade": "BRA",
          "exposicao_politica": "PRIVADA",
          "nome_pessoa": "SWZ CORPORATE SOLUCOES E CORRETAGEM DE SEGUROS SA",
          "data_nascimento_fundacao": "2021-06-09T18:28:25Z",
          "documentos_identificacao": [{
                  "pais_identificacao": "BRA",
                  "tipo_identificacao": "CNPJ",
                  "valor_identificacao": "22656482000112"
              }, {
                  "pais_identificacao": "BRA",
                  "tipo_identificacao": "CODIGO_CORRETOR_SUSEP",
                  "valor_identificacao": "202020845"
              }
          ],
          "enderecos": [{
                  "tipo_endereco": "COMERCIAL",
                  "pais": "BRA",
                  "estado": "DF",
                  "cidade": "Brasilia",
                  "cep": "70712904",
                  "rua": "Q SCN QUADRA 2 BLOCO D ENTRADA B",
                  "numero": "SN",
                  "bairro": "ASA NORTE",
                  "complemento": "SALA 1301 ANDAR 13 EDIF LIBERTY MALL"
              }
          ],
          "informacao_contato": [{
                  "tipo_contato": "TELEFONE",
                  "valor_contato": "(61)3426-9627"
              }, {
                  "tipo_contato": "EMAIL",
                  "valor_contato": "carlos@wizsolucoes.com.br"
              }
          ]
      }, {
          "papel_parte": "TOMADOR",
          "tipo_parte": "CONTRATANTE",
          "id_pessoa": "string",
          "id_pessoa_origem": "bf5386f1-240b-4d49-939c-81513fbed548",
          "tipo_pessoa": "JURIDICA",
          "pais_nacionalidade": "BRA",
          "exposicao_politica": "PUBLICA",
          "nome_pessoa": "GAEL-TELEMATICA SERVICOS E COMERCIO LTDA.",
          "data_nascimento_fundacao": "2021-06-09T18:28:25Z",
          "documentos_identificacao": [{
                  "pais_identificacao": "BRA",
                  "tipo_identificacao": "CNPJ",
                  "valor_identificacao": "54163433000115"
              }
          ],
          "enderecos": [{
                  "tipo_endereco": "COMERCIAL",
                  "pais": "BRA",
                  "estado": "SP",
                  "cidade": "São Paulo",
                  "cep": "02714000",
                  "rua": "R MIGUEL CASAGRANDE",
                  "numero": "200",
                  "bairro": "FREGUESIA DO O",
                  "complemento": "BLOCO D"
              }
          ],
          "informacao_contato": [{
                  "tipo_contato": "TELEFONE",
                  "valor_contato": "(11) 9999-9999"
              }, {
                  "tipo_contato": "EMAIL",
                  "valor_contato": "emailnaoencontrado@email.com.br"
              }
          ]
      }, {
          "papel_parte": "SEGURADO",
          "tipo_parte": "BENEFICIARIO",
          "id_pessoa": "string",
          "id_pessoa_origem": "019838e0-bc0a-462c-bb14-e2a991a05cb2",
          "tipo_pessoa": "NATURAL",
          "pais_nacionalidade": "BRA",
          "exposicao_politica": "NAO_EXPOSTA",
          "nome_pessoa": "FRANCISCO SOUZA DA FREITAS",
          "data_nascimento_fundacao": "2021-06-09T18:28:25Z",
          "documentos_identificacao": [{
                  "pais_identificacao": "BRA",
                  "tipo_identificacao": "CPF",
                  "valor_identificacao": "25188225032"
              }
          ],
          "enderecos": [{
                  "tipo_endereco": "COMERCIAL",
                  "pais": "BRA",
                  "estado": "RS",
                  "cidade": "Gravatai",
                  "cep": "94198200",
                  "rua": "Rua Paraguassu",
                  "numero": "308",
                  "bairro": "Sagrada Família",
                  "complemento": "Não informado"
              }
          ],
          "informacao_contato": [{
                  "tipo_contato": "TELEFONE",
                  "valor_contato": "985484039"
              }, {
                  "tipo_contato": "EMAIL",
                  "valor_contato": "emailNaoEncontrado@onpoint.com.br"
              }
          ]
      }
  ],
  "itens": [{
          "numero_item": 1,
          "id_item_origem": "1fb38ec7-099e-4a7e-beb0-80e70d8ced9a",
          "codigo_tipo_objeto": "000700750015001",
          "descricao_tipo_objeto": "Execução trabalhista",
          "classe_risco_item": "BB",
          "detalhes_objeto": [{
                  "tipo_detalhe_objeto": "DESCRICAO_OBJETO",
                  "valor_detalhe_objeto": "Garantir ao Segurado as obrigações do Tomador, nos autos do Processo n.º 00202668920165040202, em trâmite perante a/o\n[TAG_VARA_JUIZO]. \n\nAUTOR: [TAG_AUTOR] \n\nA garantia expressa nessa apólice, abrange o montante original do débito executado, com os encargos e os acréscimos legais, inclusive honorários advocatícios, assistenciais e periciais, devidamente atualizado pelos índices legais aplicáveis aos débitos trabalhistas na data da realização do depósito, acrescido de, no mínimo, 30%.\n\nA presente apólice é emitida de acordo com Ato Conjunto TST.CSJT.CGJT nº 1, de 16 de outubro de 2019."
              }, {
                  "tipo_detalhe_objeto": "NUMERO_CONTRATO",
                  "valor_detalhe_objeto": "00202668920165040202"
              }, {
                  "tipo_detalhe_objeto": "NUMERO_CONTRATO",
                  "valor_detalhe_objeto": "00202668920165040202"
              }, {
                  "tipo_detalhe_objeto": "INICIO_VIGENCIA_CONTRATO",
                  "valor_detalhe_objeto": "6/9/2021 12:00:00 AM"
              }, {
                  "tipo_detalhe_objeto": "FIM_VIGENCIA_CONTRATO",
                  "valor_detalhe_objeto": "6/8/2024 12:00:00 AM"
              }, {
                  "tipo_detalhe_objeto": "MOEDA_VALOR_OBJETO",
                  "valor_detalhe_objeto": "BRL"
              }, {
                  "tipo_detalhe_objeto": "VALOR_OBJETO",
                  "valor_detalhe_objeto": "26153.79000"
              }
          ],
          "coberturas": [{
                  "codigo_cobertura": "0007007500150029001",
                  "codigo_cobertura_origem": "dc742953-24e2-435f-8a99-a985be79caca",
                  "codigo_grupo_susep": "07",
                  "codigo_ramo_susep": "75",
                  "nome_cobertura": "Execução trabalhista",
                  "numero_processo_susep": "15414.900374/2014-46",
                  "datas": {
                      "inicio_vigencia_cobertura": "2021-06-09T00:00:00Z",
                      "fim_vigencia_cobertura": "2024-06-08T00:00:00Z"
                  },
                  "codigos_condicoes_especiais": ["05690-CE-000700750001001-0015-0029-001"],
                  "abrangencia_geografica": "abrangencia_geografica",
                  "limites": [{
                          "tipo_limite_cobertura": "APOLICE",
                          "moeda_limite_cobertura": "BRL",
                          "valor_limite_cobertura": "26153.7900",
                          "tipo_obrigacao": "FAZER"
                      }
                  ],
                  "composicao_premio_cobertura": [{
                          "natureza_premio": "PREMIO",
                          "tipo_premio": "DIRETO",
                          "moeda_premio": "BRL",
                          "valor_premio": "433.5000",
                          "id_pessoa_origem": "bf5386f1-240b-4d49-939c-81513fbed548"
                      }, {
                          "natureza_premio": "IMPOSTO",
                          "tipo_premio": "IOF",
                          "moeda_premio": "BRL",
                          "valor_premio": "0.0000",
                          "id_pessoa_origem": "bf5386f1-240b-4d49-939c-81513fbed548"
                      }, {
                          "natureza_premio": "INTERMEDIACAO",
                          "tipo_premio": "COMISSAO_CORRETAGEM",
                          "moeda_premio": "BRL",
                          "valor_premio": "76.5000",
                          "id_pessoa_origem": "96077aa9-f69b-4608-99ce-fe99837d50dc"
                      }
                  ]
              }
          ]
      }
  ],
  "pagamento": {
      "parcelas": [{
              "numero_parcela": 1,
              "id_parcela": "4067",
              "id_parcela_origem": "4067",
              "id_parcela_auxiliar": "4067",
              "data_vencimento": "2021-06-16T18:28:19Z",
              "composicao_premio_parcela": [{
                      "natureza_premio": "PREMIO",
                      "tipo_premio": "DIRETO",
                      "moeda_premio": "BRL",
                      "valor_premio": "433.5000",
                      "id_pessoa_origem": "bf5386f1-240b-4d49-939c-81513fbed548"
                  }, {
                      "natureza_premio": "IMPOSTO",
                      "tipo_premio": "IOF",
                      "moeda_premio": "BRL",
                      "valor_premio": "0.0000",
                      "id_pessoa_origem": "bf5386f1-240b-4d49-939c-81513fbed548"
                  }, {
                      "natureza_premio": "INTERMEDIACAO",
                      "tipo_premio": "COMISSAO_CORRETAGEM",
                      "moeda_premio": "BRL",
                      "valor_premio": "76.5000",
                      "id_pessoa_origem": "96077aa9-f69b-4608-99ce-fe99837d50dc"
                  }
              ],
              "id_pagador": "bf5386f1-240b-4d49-939c-81513fbed548",
              "meio_pagamento": "BOLETO",
              "instrucao_pagamento": "1ª de $510.00",
              "domicilio_bancario": "string"
          }
      ]
  }
}

`


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