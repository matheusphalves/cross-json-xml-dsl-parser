const ohm = require('ohm-js');

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
	Inicio = "{" (ChaveValor | Objeto | Lista)+ "}"
	Chave = "\\"" letter+ (alnum | "_" | "-" | ":")* "\\":"
	String = "\\"" (alnum | "/" | "." | "-" | "_" | "(" | ")" | "@" | "," | "[" | "]" | ";" | "=" | "'" | "%" | "$" | ":")+ "\\"" ?
	Booleano = "false" | "true"
	Numero =  "-"? digit+ ("." digit+)*
	Valor =  (Numero | String | Booleano | "null")+
	Objeto = "{" (ChaveValor | Objeto | Lista)+ "}"
	Lista =  Chave "["  ( Valor ("," Valor)* | Objeto ("," Objeto)*) "]" ","?
	ChaveValor =  Chave Valor ","? -- value 
                | Chave? Objeto ","? -- object 
}
`)


const inputs2 = `
{
  "proposta_endosso_C": {
    "numero_apolice_seguradora": "056902021000207750000083000000",
    "numero_proposta_seguradora": "12300044555400000114",
    "id_proposta_origem": "s",
    "sistema_origem": "0506",
    "numero_endosso_seguradora": "000007",
    "numero_endosso_cancelado": "000000",
    "motivo_endosso": "string",
    "descricao_motivo_endosso": "string",
    "datas": {
      "protocolo_origem": "2020-09-25T23:10:1400:00",
      "registro_origem": "2020-09-25T23:10:1400:00",
      "assinatura": "2020-09-25T23:10:1400:00",
      "conclusao_subscricao": "2020-09-25T23:10:1400:00"
    },
    "resultado_subscricao": "APROVADA",
    "id_subscritor_origem": "s",
    "pagamento": "COM_RESTITUICAO"
  }
}

`
const inputs3 = `
{
  "proposta": {
    "numero_proposta_seguradora": "12300044555400000178",
    "id_proposta_origem": "s",
    "sistema_origem": "0506",
    "codigo_grupo_susep_principal": "07",
    "codigo_ramo_susep_principal":75,
    "tipo_apolice": "COSSEGURO_ACEITO",
    "cosseguro": {
      "numero_apolice_lider": "s",
      "codigo_seguradora_lider": "ABCDE",
      "cnpj_seguradora_lider": 64210227000144,
      "codigo_contrato_cosseguro": "s"
    },
    "renovacao": {
      "numero_apolice_renovacao": "s",
      "quantidade_renovacoes": 0,
      "codigo_seguradora_renovacao": "ABCDE"
    },
    "limite_maximo_apolice": {
      "moeda_limite_total": "BRL",
      "valor_limite_total": 1122.3456
    },
    "codigos_condicoes_gerais": [
      "05690-CG-000700750001001-0009-001"
    ],
    "datas": {
      "inicio_vigencia": "2020-09-29T23:10:1400:00",
      "fim_vigencia": "2020-09-29T23:10:1400:00",
      "registro_origem": "2020-09-29T23:10:1400:00",
      "assinatura": "2020-09-29T23:10:1400:00",
      "protocolo_origem": "2020-09-29T23:10:1400:00",
      "conclusao_subscricao": "2020-09-29T23:10:1400:00"
    },
    "id_subscritor_origem": "s",
			"resultado_subscricao": "APROVADA",
    "emissao_condicionada_pagamento": true,
    "url_repositorio_documento": "string",
    "partes": [
      {
        "papel_parte": "CORRETOR",
        "tipo_parte": "INTERMEDIARIO",
        "id_pessoa": "s",
        "id_pessoa_origem": "1111",
        "tipo_pessoa": "JURIDICA",
        "pais_nacionalidade": "BRA",
        "exposicao_politica": "NAO_EXPOSTA",
        "nome_pessoa": "Rafaela Bárbara Campos",
        "data_nascimento_fundacao": "2020-09-23T23:10:1400:00",
        "documentos_identificacao": [
          {
            "pais_identificacao": "BRA",
            "tipo_identificacao": "CODIGO_CORRETOR_SUSEP",
            "valor_identificacao": "1234"
          },
          {
            "pais_identificacao": "BRA",
            "tipo_identificacao": "CNPJ",
            "valor_identificacao": "85924372000167"
          }
        ],
        "enderecos": [
          {
            "tipo_endereco": "RESIDENCIAL",
            "pais": "BRA",
            "estado": "CE",
            "cidade": "Caucaia",
            "cep": "61608220",
            "rua": "Rua Manuel Bandeira",
            "numero": "123",
            "complemento": "AP 404",
            "bairro": "Teste"
          }
        ],
        "informacao_contato": [
          {
            "tipo_contato": "CELULAR",
            "valor_contato": "123456789"
          },
          {
            "tipo_contato": "EMAIL",
            "valor_contato": "teste@example.test"
          }
        ]
      },
      {
        "papel_parte": "SEGURADO",
        "tipo_parte": "BENEFICIARIO",
        "id_pessoa": "s",
        "id_pessoa_origem": "2222",
        "tipo_pessoa": "NATURAL",
        "pais_nacionalidade": "BRA",
        "exposicao_politica": "NAO_EXPOSTA",
        "nome_pessoa": "Sandra Heloisa Luana Teixeira",
        "data_nascimento_fundacao": "2020-09-23T23:10:1400:00",
        "documentos_identificacao": [
          {
            "pais_identificacao": "BRA",
            "tipo_identificacao": "CPF",
            "valor_identificacao": "82419483014"
          }
        ],
        "enderecos": [
          {
            "tipo_endereco": "RESIDENCIAL",
            "pais": "BRA",
            "estado": "CE",
            "cidade": "Caucaia",
            "cep": "61608220",
            "rua": "Rua Manuel Bandeira",
            "numero": "456",
            "complemento": "AP 404",
            "bairro": "Teste"
          }
        ],
        "informacao_contato": [
          {
            "tipo_contato": "CELULAR",
            "valor_contato": "981818181"
          },
          {
            "tipo_contato": "EMAIL",
            "valor_contato": "email@test.com"
          }
        ]
      },
      {
        "papel_parte": "TOMADOR",
        "tipo_parte": "CONTRATANTE",
        "id_pessoa": "123",
        "id_pessoa_origem": "3333",
        "tipo_pessoa": "NATURAL",
        "pais_nacionalidade": "BRA",
        "exposicao_politica": "NAO_EXPOSTA",
        "nome_pessoa": "Luzia Márcia Tatiane Teixeira",
        "data_nascimento_fundacao": "2020-09-23T23:10:1400:00",
        "documentos_identificacao": [
          {
            "pais_identificacao": "BRA",
            "tipo_identificacao": "CPF",
            "valor_identificacao": "94470506036"
          }
        ],
        "enderecos": [
          {
            "tipo_endereco": "RESIDENCIAL",
            "pais": "BRA",
            "estado": "CE",
            "cidade": "Caucaia",
            "cep": "61608220",
            "rua": "Rua Manuel Bandeira",
            "numero": "789",
            "complemento": "AP 404",
            "bairro": "Teste"
          }
        ],
        "informacao_contato": [
          {
            "tipo_contato": "CELULAR",
            "valor_contato": "981818181"
          },
          {
            "tipo_contato": "EMAIL",
            "valor_contato": "email@test.com"
          }
        ]
      }
    ],
    "itens": [
      {
        "numero_item": 1,
        "id_item": "s",
        "id_item_origem": "s",
        "codigo_tipo_objeto": "000700750001001",
        "descricao_tipo_objeto": "s",
        "classe_risco_item": "s",
				"dados_item": {
					"codigo_fipe": "38003-2",
                "placa": "BRA2Z99",
                "renavam": "11111111111",
                "ano_modelo": 2020,
					"DESCRICAO_OBJETO": 
                    "Garantir ao Segurado as obrigações do Tomador, nos autos do Processo n.º 00202668920165040202, em trâmite perante alguma coisa \n\nA garantia expressa nessa apólice, abrange o montante original do débito executado, com os encargos e os acréscimos legais, inclusive honorários advocatícios, assistenciais e periciais, devidamente atualizado pelos índices legais aplicáveis aos débitos trabalhistas na data da realização do depósito, acrescido de, no mínimo, 30%.\n\nA presente apólice é emitida de acordo com Ato Conjunto TST.CSJT.CGJT nº 1, de 16 de outubro de 2019.",
                
                "ano_fabricacao": 2019,
                "cep_pernoite": "51000000",
                "catetoria_tarifaria": "Passeio Nacional",
                "utilizacao": "Passeio",
                "condutores": [{
                        "sexo": "Feminino",
                        "data_nascimento": "2021-06-02T23:59:59Z"
                    }
                ]
        },
        "coberturas": [
          {
            "codigo_cobertura": "0007007500010001001",
            "codigo_cobertura_origem": "s",
            "codigo_grupo_susep": 10,
            "codigo_ramo_susep": "01",
            "nome_cobertura": "s",
            "numero_processo_susep": 12345678901234567000,
            "datas": {
              "inicio_vigencia_cobertura": "2020-09-23T23:10:1400:00",
              "fim_vigencia_cobertura": "2020-09-23T23:10:1400:00"
            },
            "codigos_condicoes_especiais": [
              "05690-CE-000700750001001-0001-0001-001"
            ],
            "abrangencia_geografica": "s",
            "limites": [
              {
                "tipo_limite_cobertura": "APOLICE",
                "moeda_limite_cobertura": "BRL",
                "valor_limite_cobertura": 12.3456,
                "tipo_obrigacao": "FAZER"
              }
            ],
            "franquia": {
              "tipo_franquia": "FRANQUIA_DEDUTIVEL",
              "dados_franquia": [
                {
                  "tipo_dado_franquia": "MOEDA",
                  "valor_dado_franquia": "BRL"
                }
              ]
            },
            "composicao_premio_cobertura": [
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "ACEITO",
                "moeda_premio": "BRL",
                "valor_premio": "1350.8016",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "IOF",
                "moeda_premio": "BRL",
                "valor_premio": "1.3134",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "PREMIO",
                "tipo_premio": "ADICIONAL_FRACIONAMENTO",
                "moeda_premio": "BRL",
                "valor_premio": "15.2150",
                "id_pessoa_origem": "9999"
              }
            ],
            "condicoes_particulares": [
              {
                "texto_clausula": "teste",
                "tipo_clausula": "OBSERVACAO"
              }
            ],
            "beneficiarios": [
              {
                "id_pessoa_beneficiario": "s",
                "parentesco_beneficiario": "PAI",
                "participacao_beneficiario": "50.0000"
              }
            ],
            "carencia": {
              "unidade_carencia": "DIA",
              "valor_carencia": 180
            }
          },
					{
            "codigo_cobertura": "0007007500010001001",
            "codigo_cobertura_origem": "s",
            "codigo_grupo_susep": 10,
            "codigo_ramo_susep": "01",
            "nome_cobertura": "s",
            "numero_processo_susep": 12345678901234567000,
            "datas": {
              "inicio_vigencia_cobertura": "2020-09-23T23:10:1400:00",
              "fim_vigencia_cobertura": "2020-09-23T23:10:1400:00"
            },
            "codigos_condicoes_especiais": [
              "05690-CE-000700750001001-0001-0001-001"
            ],
            "abrangencia_geografica": "s",
            "limites": [
              {
                "tipo_limite_cobertura": "APOLICE",
                "moeda_limite_cobertura": "BRL",
                "valor_limite_cobertura": 12.3456,
                "tipo_obrigacao": "FAZER"
              }
            ],
            "franquia": {
              "tipo_franquia": "FRANQUIA_DEDUTIVEL",
              "dados_franquia": [
                {
                  "tipo_dado_franquia": "MOEDA",
                  "valor_dado_franquia": "BRL"
                }
              ]
            },
            "composicao_premio_cobertura": [
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "ACEITO",
                "moeda_premio": "BRL",
                "valor_premio": "1350.8016",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "IOF",
                "moeda_premio": "BRL",
                "valor_premio": "1.3134",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "PREMIO",
                "tipo_premio": "ADICIONAL_FRACIONAMENTO",
                "moeda_premio": "BRL",
                "valor_premio": "15.2150",
                "id_pessoa_origem": "9999"
              }
            ],
            "condicoes_particulares": [
              {
                "texto_clausula": "string",
                "tipo_clausula": "something"
              }
            ],
            "beneficiarios": [
              {
                "id_pessoa_beneficiario": "s",
                "parentesco_beneficiario": "PAI",
                "participacao_beneficiario": "50.0000"
              }
            ],
            "carencia": {
              "unidade_carencia": "DIA",
              "valor_carencia": 180
            }
          },
					{
            "codigo_cobertura": "0007007500010001001",
            "codigo_cobertura_origem": "s",
            "codigo_grupo_susep": 10,
            "codigo_ramo_susep": "01",
            "nome_cobertura": "s",
            "numero_processo_susep": 12345678901234567000,
            "datas": {
              "inicio_vigencia_cobertura": "2020-09-23T23:10:1400:00",
              "fim_vigencia_cobertura": "2020-09-23T23:10:1400:00"
            },
            "codigos_condicoes_especiais": [
              "05690-CE-000700750001001-0001-0001-001"
            ],
            "abrangencia_geografica": "s",
            "limites": [
              {
                "tipo_limite_cobertura": "APOLICE",
                "moeda_limite_cobertura": "BRL",
                "valor_limite_cobertura": 12.3456,
                "tipo_obrigacao": "FAZER"
              }
            ],
            "franquia": {
              "tipo_franquia": "FRANQUIA_DEDUTIVEL",
              "dados_franquia": [
                {
                  "tipo_dado_franquia": "MOEDA",
                  "valor_dado_franquia": "BRL"
                }
              ]
            },
            "composicao_premio_cobertura": [
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "ACEITO",
                "moeda_premio": "BRL",
                "valor_premio": "1350.8016",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "IOF",
                "moeda_premio": "BRL",
                "valor_premio": "1.3134",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "PREMIO",
                "tipo_premio": "ADICIONAL_FRACIONAMENTO",
                "moeda_premio": "BRL",
                "valor_premio": "15.2150",
                "id_pessoa_origem": "9999"
              }
            ],
            "condicoes_particulares": [
              {
                "texto_clausula": "string",
                "tipo_clausula": "OBSERVACAO"
              }
            ],
            "beneficiarios": [
              {
                "id_pessoa_beneficiario": "s",
                "parentesco_beneficiario": "PAI",
                "participacao_beneficiario": "50.0000"
              }
            ],
            "carencia": {
              "unidade_carencia": "DIA",
              "valor_carencia": 180
            }
          },
					{
            "codigo_cobertura": "0007007500010001001",
            "codigo_cobertura_origem": "s",
            "codigo_grupo_susep": 10,
            "codigo_ramo_susep": "01",
            "nome_cobertura": "s",
            "numero_processo_susep": 12345678901234567000,
            "datas": {
              "inicio_vigencia_cobertura": "2020-09-23T23:10:1400:00",
              "fim_vigencia_cobertura": "2020-09-23T23:10:1400:00"
            },
            "codigos_condicoes_especiais": [
              "05690-CE-000700750001001-0001-0001-001"
            ],
            "abrangencia_geografica": "s",
            "limites": [
              {
                "tipo_limite_cobertura": "APOLICE",
                "moeda_limite_cobertura": "BRL",
                "valor_limite_cobertura": 12.3456,
                "tipo_obrigacao": "FAZER"
              }
            ],
            "franquia": {
              "tipo_franquia": "FRANQUIA_DEDUTIVEL",
              "dados_franquia": [
                {
                  "tipo_dado_franquia": "MOEDA",
                  "valor_dado_franquia": "BRL"
                }
              ]
            },
            "composicao_premio_cobertura": [
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "ACEITO",
                "moeda_premio": "BRL",
                "valor_premio": "1350.8016",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "BONUS",
                "tipo_premio": "IOF",
                "moeda_premio": "BRL",
                "valor_premio": "1.3134",
                "id_pessoa_origem": "s"
              },
              {
                "natureza_premio": "PREMIO",
                "tipo_premio": "ADICIONAL_FRACIONAMENTO",
                "moeda_premio": "BRL",
                "valor_premio": "15.2150",
                "id_pessoa_origem": "9999"
              }
            ],
            "condicoes_particulares": [
              {
                "texto_clausula": "string",
                "tipo_clausula": "OBSERVACAO"
              }
            ],
            "beneficiarios": [
              {
                "id_pessoa_beneficiario": "s",
                "parentesco_beneficiario": "PAI",
                "participacao_beneficiario": "50.0000"
              }
            ],
            "carencia": {
              "unidade_carencia": "DIA",
              "valor_carencia": 180
            }
          }
        ]
      }
    ],
    "pagamento": {
      "parcelas": [
        {
          "numero_parcela": 1,
          "id_parcela": "123",
          "id_parcela_origem": "abcdef",
          "id_parcela_auxiliar": "J134",
          "data_vencimento": "2021-07-15T23:10:1400:00",
          "composicao_premio_parcela": [
            {
              "natureza_premio": "BONUS",
              "tipo_premio": "ACEITO",
              "moeda_premio": "BRL",
              "valor_premio": "1350.8016",
              "id_pessoa_origem": "1234"
            },
            {
              "natureza_premio": "IMPOSTO",
              "tipo_premio": "IOF",
              "moeda_premio": "BRL",
              "valor_premio": "1.3134",
              "id_pessoa_origem": "131"
            },
            {
              "natureza_premio": "PREMIO",
              "tipo_premio": "ADICIONAL_FRACIONAMENTO",
              "moeda_premio": "BRL",
              "valor_premio": "15.2150",
              "id_pessoa_origem": "9999"
            }
          ],
          "id_pagador": "1111",
          "meio_pagamento": "BOLETO",
          "instrucao_pagamento": "Teste",
          "domicilio_bancario": "Teste",
          "agente_cobrador": "0002"
        },
				{
          "numero_parcela": 2,
          "id_parcela": "123",
          "id_parcela_origem": "abcdef",
          "data_vencimento": "2021-07-15T23:10:1400:00",
          "composicao_premio_parcela": [
            {
              "natureza_premio": "BONUS",
              "tipo_premio": "ACEITO",
              "moeda_premio": "BRL",
              "valor_premio": "1350.8016",
              "id_pessoa_origem": "1234"
            },
            {
              "natureza_premio": "IMPOSTO",
              "tipo_premio": "IOF",
              "moeda_premio": "BRL",
              "valor_premio": "1.3134",
              "id_pessoa_origem": "131"
            },
            {
              "natureza_premio": "PREMIO",
              "tipo_premio": "ADICIONAL_FRACIONAMENTO",
              "moeda_premio": "BRL",
              "valor_premio": "15.2150",
              "id_pessoa_origem": "9999"
            }
          ],
          "id_pagador": "1111",
          "meio_pagamento": "RECIBO",
          "instrucao_pagamento": "Teste",
          "domicilio_bancario": "Teste",
          "agente_cobrador": "0002"
        },
				{
          "numero_parcela": 3,
          "id_parcela": "123",
          "id_parcela_origem": "abcdef",
          "id_parcela_auxiliar": "J134",
          "data_vencimento": "2021-07-15T23:10:1400:00",
          "composicao_premio_parcela": [
            {
              "natureza_premio": "BONUS",
              "tipo_premio": "ACEITO",
              "moeda_premio": "BRL",
              "valor_premio": "1350.8016",
              "id_pessoa_origem": "1234"
            },
            {
              "natureza_premio": "IMPOSTO",
              "tipo_premio": "IOF",
              "moeda_premio": "BRL",
              "valor_premio": "1.3134",
              "id_pessoa_origem": "131"
            },
            {
              "natureza_premio": "PREMIO",
              "tipo_premio": "ADICIONAL_FRACIONAMENTO",
              "moeda_premio": "BRL",
              "valor_premio": "15.2150",
              "id_pessoa_origem": "9999"
            }
          ],
          "id_pagador": "1111",
          "meio_pagamento": "BOLETO",
          "instrucao_pagamento": "Teste",
          "domicilio_bancario": "Teste",
          "agente_cobrador": "0002"
        },
				{
          "numero_parcela": 4,
          "id_parcela": "123",
          "id_parcela_origem": "abcdef",
          "id_parcela_auxiliar": "J134",
          "data_vencimento": "2021-07-15T23:10:1400:00",
          "composicao_premio_parcela": [
            {
              "natureza_premio": "BONUS",
              "tipo_premio": "ACEITO",
              "moeda_premio": "BRL",
              "valor_premio": "1350.8016",
              "id_pessoa_origem": "1234"
            },
            {
              "natureza_premio": "IMPOSTO",
              "tipo_premio": "IOF",
              "moeda_premio": "BRL",
              "valor_premio": "1.3134",
              "id_pessoa_origem": "131"
            },
            {
              "natureza_premio": "PREMIO",
              "tipo_premio": "ADICIONAL_FRACIONAMENTO",
              "moeda_premio": "BRL",
              "valor_premio": "15.2150",
              "id_pessoa_origem": "9999"
            }
          ],
          "id_pagador": "1111",
          "meio_pagamento": "RECIBO",
          "instrucao_pagamento": "Teste",
          "domicilio_bancario": "Teste",
          "agente_cobrador": "0002"
        }
      ]
    }
  }
}
`

const inputs4 = `
{
  "a": "matheus",
  "b": "teste",
  "limite_maximo_apolice": {
    "moeda_limite_total": "BRL",
    "valor_limite_total": "26153.7900",
  },
  "testando": [
    {
      "moeda_limite_total": "BRL",
      "valor_limite_total": "26153.7900",
    },

    {
      "moeda_limite_total": "BRL",
      "valor_limite_total": "26153.7900",
      "testeLista": ["1", "2", "3"],
    }
  ],
  "Alimite_maximo_apolice": {
    "moeda_limite_total": "BRL",
    "valor_limite_total": "26153.7900",
  },
}`

const resultado = gramatica2.match(inputs3);
if (resultado.succeeded()) {
  console.log("Operações OK");
} else {
  console.log("Erro");
  console.log(resultado.message)
}

const semantica = gramatica2.createSemantics();

var xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root> \n\t`;
var list = [];
var contTab = 1

function backEnd3() {
  semantica.addOperation('generateCode', {
    Inicio(ac, content, fc) {
      content.generateCode()
      var end = list.pop()
      end = end.substring(0,end.length-1)
      list.push(end)
      list.push("</root>")
      for (var cont = 0; cont < list.length; cont++) {
        xml += list[cont]
      }
    },
    
    Chave(ap, name, name2, fp) {
      return name.sourceString + name2.sourceString
    },

    Valor(content) {
      var retorno = "<element>" + content.generateCode() + "</element>\n"
      for (var c = 0; c < contTab; c++) {
        retorno += "\t"
      }
      list.push(retorno)

    },

    String(ap, text, fp) {
      return `"${text.sourceString}"`
    },

    Booleano(value) {
      return value.sourceString
    },

    Numero(minus, digit, dot, floatDigit) {
      return `${minus.sourceString ? minus.sourceString : ''}${digit.sourceString}${floatDigit.sourceString ? `${floatDigit.sourceString}` : ''}`
    },

    ChaveValor_value(chave, value, pv) {
      var content = "<" + chave.generateCode() + ">" + value.sourceString + "</" + chave.generateCode() + ">\n"
      for (var c = 0; c < contTab; c++) {
        content += "\t"
      }
      list.push(content)
    },


    ChaveValor_object(chave, object, pv) {
      var content = "<" + chave.generateCode() + ">\n"
      contTab++
      for (var c = 0; c < contTab; c++) {
        content += "\t"
      }
      list.push(content)
      object.generateCode()
      var ultimo = list.pop()
      ultimo = ultimo.substring(0, ultimo.length - 1)
      list.push(ultimo)
      contTab--
      var volta = ""
      volta += "</" + chave.generateCode() + ">\n"
      for (var c = 0; c < contTab; c++) {
        volta += "\t"
      }
      list.push(volta)

    },

    Objeto(ac, content, fc) {
      content.generateCode()
    },

    Lista(key, ac, value, comma, otherValues, fc, comma2) {
      if (otherValues.children.length > 0) {
        if (value.sourceString.includes("{")) {
          var content = "<" + key.generateCode() + ">\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            content += "\t"
          }
          list.push(content)
          var object = "<element>\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            object += "\t"
          }
          list.push(object)
          value.generateCode() 
          var temp = list.pop()
          contTab--
          temp = temp.substring(0, temp.length - 1)
          list.push(temp)
          var volta = "</element>\n"
          for (var c = 0; c < contTab; c++) {
            volta += "\t"
          }
          list.push(volta)
          var continuacao = "<element>\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            continuacao += "\t"
          }
          list.push(continuacao)
          otherValues.generateCode()
          var temp2 = list.pop()
          contTab--
          temp2 = temp2.substring(0, temp2.length - 1)
          list.push(temp2)
          var termino = "</element>\n"
          for (var c = 0; c < contTab; c++) {
            termino += "\t"
          }
          list.push(termino)
        }
        else {
          var content = "<" + key.generateCode() + ">\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            content += "\t"
          }
          list.push(content)
          value.generateCode()
          otherValues.generateCode()
        }
      }else{
        if (value.sourceString.includes("{")) {
          var content = "<" + key.generateCode() + ">\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            content += "\t"
          }
          list.push(content)
          var object = "<element>\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            object += "\t"
          }
          list.push(object)
          value.generateCode() 
          var temp = list.pop()
          contTab--
          temp = temp.substring(0, temp.length - 1)
          list.push(temp)
          var volta = "</element>\n"
          for (var c = 0; c < contTab; c++) {
            volta += "\t"
          }
          list.push(volta)
        }
        else {
          var content = "<" + key.generateCode() + ">\n"
          contTab++
          for (var c = 0; c < contTab; c++) {
            content += "\t"
          }
          list.push(content)
          value.generateCode()
        }
      }
        var tempFim = list.pop()
        tempFim = tempFim.substring(0,tempFim.length-1)
        list.push(tempFim)
        var fim = ""
        contTab--
        fim += "</" + key.generateCode() + ">\n"
        for (var c = 0; c < contTab; c++) {
          fim += "\t"
        }
        list.push(fim)
    },
    _terminal() { return this.sourceString; }

  })
}

rootKeysList = []
function compile() {
  semantica.addOperation('compile', {
    Inicio(ac, content, fc) {
      content.compile();
    },

    Chave(ap, name, name2, fp) {
      return name.sourceString + name2.sourceString
    },

    Valor(content) {
      return content.compile()
    },

    String(ap, text, fp) {
      return `"${text.sourceString}"`
    },

    Booleano(value) {
      return value.sourceString
    },

    Numero(minus, digit, dot, floatDigit) {
      return `${minus.sourceString ? minus.sourceString : ''}${digit.sourceString}${floatDigit.sourceString ? `${floatDigit.sourceString}` : ''}`
    },

    ChaveValor_value(chave, value, pv) {
      const keyName = chave.compile(); 
      rootKeysList.push(...keyName);
      value.compile();
      const aux = new Set(rootKeysList);
      if (aux.size != rootKeysList.length) {
        throw Error("JSON keys must be unique.")
      }
    },


    ChaveValor_object(chave, object, pv) {//gera par chave-valor
      const keyName = chave.compile(); //gera código da chave
      rootKeysList.push(...keyName);
      object.compile();
      const aux = new Set(rootKeysList);
      if (aux.size != rootKeysList.length) {
        throw Error("JSON keys must be unique.")
      }
    },

    Objeto(ac, content, fc) {//filhos nao podem ser repetidos
      let setNames = new Set();
      let counter = 0;

      content.children.map(item => {
        setNames.add(item.sourceString);
        counter++;
      })
      if (setNames.size != counter) {
        throw Error("Object's keys must be unique.")
      }
    },

    Lista(key, ac, value, comma, otherValues, fc, comma2) {
      key.compile();
      value.compile();
      otherValues.compile();
    },
    _terminal() { return this.sourceString; }

  })
}

function countItems(string) {
  console.log(string);
  let count = (string.match(/\t/g) || []).length;
  return count;
}

backEnd3();
compile();
console.log(semantica(resultado).compile())
console.log(semantica(resultado).generateCode())
console.log(xml)