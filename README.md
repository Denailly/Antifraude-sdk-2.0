# Antifraude SDK 2.0

## Visão Geral

O **SDK Antifraude 2.0** fornece ferramentas avançadas para detecção e
prevenção de fraudes em tempo real, com foco em performance, segurança e
fácil integração.

------------------------------------------------------------------------

## Funcionalidades Principais

-   🔍 **Monitoramento em tempo real** de transações.\
-   🛡️ **Detecção de padrões suspeitos** com IA e Machine Learning.\
-   ⚡ **Baixa latência** para grandes volumes de requisições.\
-   🔗 **Integração simplificada** com APIs REST e gRPC.\
-   📊 **Relatórios detalhados** de risco e atividades.

------------------------------------------------------------------------

## Instalação

### Requisitos

-   Python 3.8+\
-   Pip\
-   Acesso à API do Antifraude

### Instalação via pip

``` bash
pip install antifraude-sdk
```

------------------------------------------------------------------------

## Exemplo de Uso

``` python
from antifraude import Cliente

# Inicializar cliente
cliente = Cliente(api_key="SUA_API_KEY")

# Avaliar transação
resposta = cliente.avaliar_transacao({
    "id_transacao": "12345",
    "valor": 100.50,
    "moeda": "BRL",
    "usuario": {
        "id": "user_001",
        "ip": "192.168.0.10"
    }
})

print(resposta)
```

------------------------------------------------------------------------

## Configuração Avançada

``` python
cliente = Cliente(
    api_key="SUA_API_KEY",
    ambiente="sandbox", # ou "producao"
    timeout=5,          # segundos
    retries=3           # tentativas em falha
)
```

------------------------------------------------------------------------

## Retornos da API

### Exemplo de Resposta

``` json
{
  "id_transacao": "12345",
  "risco": "alto",
  "score": 92,
  "motivos": [
    "IP suspeito",
    "Histórico de fraude associado"
  ]
}
```

------------------------------------------------------------------------

## Licença

Este SDK é distribuído sob a licença MIT. Consulte o arquivo `LICENSE`
para mais informações.
