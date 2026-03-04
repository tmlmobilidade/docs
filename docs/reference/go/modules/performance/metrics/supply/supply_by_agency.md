---
title: supply_by_agency
description: Agrega métricas de oferta operacional por agency_id, podendo estar ao nível diário, mensal ou anual. A métrica inclui o volume de viagens, quilómetros, receita e custo estimado.
---
## Estrutura do Documento

| Campo                  | Tipo     | Descrição                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `_id`                  | ObjectId | Identificador único do documento.                                                                       |
| `description`          | String   | Descrição da métrica.                                                                                   |
| `generated_at`         | DateTime | Data e hora em que o documento foi gerado.                                                              |
| `metric`               | String   | Nome da métrica (`supply_by_agency_by_day`, `supply_by_agency_by_month` ou `supply_by_agency_by_year`). |
| `data`                 | Objeto   | Objeto onde cada chave representa um período (`YYYY-MM-DD`, `YYYY-MM` ou `YYYY`).                       |
| `properties.agency_id` | String   | Identificador da área de operação (ex: `"42"`).                                                         |

# Estrutura do campo data

Para cada período (exemplo: `"2024-01-01"`, `"2024-01"` ou `"2024"`), existe um objeto com os seguintes campos:

| Campo                | Tipo   | Descrição                                        |
| -------------------- | ------ | ------------------------------------------------ |
| `scheduled_rides`    | Número | Número total de circulações programadas.         |
| `accomplished_rides` | Número | Número de circulações válidas (`grade = pass`).  |
| `vkms_scheduled`     | Número | Soma de quilómetros programados.                 |
| `vkms_observed`      | Número | Soma de quilómetros observados (apenas válidos). |
| `revenue_per_trip`   | Número | Receita total agregada no período.               |
| `cost_per_trip`      | Número | Custo total estimado no período.                 |
## Exemplo Simplificado

```json
{
  "_id": "69a5fc4380896089c50e3fa9",
  "description": "Aggregated supply for agency 42",
  "generated_at": "2026-03-02T21:08:19.828+00:00",
  "metric": "supply_by_agency_by_day",
  "data": {
    "2024-01-01": {
      "scheduled_rides": 330,
      "accomplished_rides": 312,
      "vkms_scheduled": 5000,
      "vkms_observed": 4821,
      "revenue_per_trip": 12843.50,
      "cost_per_trip": 17500.00
    },
    "2024-01-02": { ... }
  },
  "properties": {
    "agency_id": "42"
  }
}
```