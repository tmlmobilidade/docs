## Análise: EXPECTED_VEHICLE_EVENT_INTERVAL

Esta análise verifica se o **intervalo médio entre eventos de localização do veículo** está dentro do intervalo esperado.
Os eventos de localização devem ser enviados com uma cadência razoavelmente regular.
Considera-se aceitável quando o **intervalo médio entre eventos é ≤ 20 segundos**.
Intervalos muito grandes podem indicar falhas de comunicação, perda de telemetria ou períodos prolongados sem transmissão.

---

### Tabela de Resultados Possíveis

| Reason | Descrição | Grade | Value |
|---|---|---|---|
| `NO_VEHICLE_EVENTS` | Não existem eventos de veículo para calcular o intervalo | `skip` | `null` |
| `EXPECTED_VEHICLE_EVENT_INTERVAL` | O intervalo médio entre eventos está dentro do limite (≤ 20s) | `pass` | Intervalo médio entre eventos (em milissegundos) |
| `UNEXPECTED_VEHICLE_EVENT_INTERVAL` | O intervalo médio entre eventos ultrapassa o limite (> 20s) | `fail` | Intervalo médio entre eventos (em milissegundos) |
| *(erro inesperado)* | Erro interno ao executar a análise | `error` | `null` |

---