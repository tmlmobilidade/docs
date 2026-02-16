---
title: "Dados Abertos e API da Carris Metropolitana — Um Exemplo de Transparência no Transporte Público"
date: 2026-02-16
description: "Num setor tradicionalmente opaco, a Carris Metropolitana destaca-se pela sua aposta nos dados abertos. A disponibilização pública de feeds GTFS, uma API REST completa e documentação para programadores coloca-a como referência nacional — e, em certos aspetos, europeia — na abertura de dados de transporte público."
tags:
  - transportes
  - dados-abertos
  - GTFS
  - API
  - carris-metropolitana
  - open-data
  - desenvolvimento
---

# Dados Abertos e API da Carris Metropolitana — Um Exemplo de Transparência no Transporte Público

Num setor tradicionalmente opaco, a Carris Metropolitana destaca-se pela sua aposta nos dados abertos. A disponibilização pública de feeds GTFS, uma API REST completa e documentação para programadores coloca-a como referência nacional — e, em certos aspetos, europeia — na abertura de dados de transporte público.

## GTFS — O Padrão da Indústria

A Carris Metropolitana disponibiliza os seus dados operacionais no formato **GTFS (General Transit Feed Specification)**, o padrão global para dados de transporte público. O feed inclui:

- **Paragens** (stops.txt)
- **Percursos/Rotas** (routes.txt)
- **Viagens** (trips.txt)
- **Horários** (stop_times.txt)
- **Calendários** (calendar.txt, calendar_dates.txt)
- **Shapes** (shapes.txt) — geometrias dos percursos

O feed está sempre atualizado no URL oficial:

```
https://api.carrismetropolitana.pt/gtfs
```

A Carris Metropolitana também publica dados **GTFS-RT (Realtime)**, incluindo:
- **Vehicle Positions** — localização GPS dos autocarros em tempo real
- **Service Alerts** — alertas de serviço (desvios, supressões, etc.)

## A API REST

Para além do GTFS, a Carris Metropolitana mantém uma **API REST open-source** que serve os dados em formato JSON, cobrindo toda a rede. Esta é a mesma API que alimenta o site oficial [carrismetropolitana.pt](https://carrismetropolitana.pt).

### Endpoints Principais

| Endpoint | Descrição |
|----------|-----------|
| `/lines` | Lista de todas as linhas |
| `/lines/{line_id}` | Detalhes de uma linha |
| `/routes/{route_id}` | Detalhes de uma rota |
| `/stops` | Todas as paragens |
| `/stops/{stop_id}` | Detalhes de uma paragem |
| `/patterns/{pattern_id}` | Padrões de viagem |
| `/shapes/{shape_id}` | Geometria em GTFS e GeoJSON |
| `/municipalities` | Municípios da AML |
| `/vehicles` | Posições dos veículos em tempo real |

### Exemplo: Posição de Veículos em Tempo Real

A API devolve a localização de todos os veículos em serviço, com coordenadas, velocidade, direção, e informação sobre a viagem e padrão em curso:

```json
{
  "id": "41|1153",
  "lat": 38.740165,
  "lon": -9.268897,
  "speed": 0,
  "heading": 68.1,
  "trip_id": "1724_0_2_2030_2059_0_7",
  "pattern_id": "1724_0_2",
  "timestamp": 1693948520000
}
```

O timestamp está em milissegundos, com precisão de segundos, ajustado para o fuso horário de Lisboa (GMT+01 WEST).

### Shapes em GeoJSON

As geometrias dos percursos são servidas tanto no formato GTFS como em GeoJSON, facilitando a integração com mapas:

```json
{
  "id": "p2_3701_0_1",
  "extension": 12745,
  "geojson": {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [-9.164045, 38.66786],
        [-9.16377, 38.66772]
      ]
    }
  }
}
```

## Extensão TML

A Carris Metropolitana desenvolveu uma **extensão ao standard GTFS** (TML Extension) que acrescenta informação específica sobre a rede metropolitana de Lisboa, enriquecendo os dados públicos para além do que o formato base permite.

## Repositórios Open-Source

O código-fonte da API e de outros projetos está disponível no GitHub:

- **[carrismetropolitana/api](https://github.com/carrismetropolitana/api)** — API de horários em JSON
- **[carrismetropolitana/gtfs](https://github.com/carrismetropolitana/gtfs)** — Feed GTFS oficial
- **[carrismetropolitana/datasets](https://github.com/carrismetropolitana/datasets)** — Dados georeferenciados da AML
- **[carrismetropolitana/website](https://github.com/carrismetropolitana/website)** — Website oficial

A documentação técnica completa está em [docs.carrismetropolitana.pt](https://docs.carrismetropolitana.pt/).

## Enquadramento Legal

A publicação destes dados está alinhada com a **Lei n.º 68/2021** (transposição da Diretiva UE 2019/1024 sobre dados abertos), que obriga entidades públicas a disponibilizar informação reutilizável. Os dados estão também publicados no portal nacional [dados.gov.pt](https://dados.gov.pt).

## Para Programadores

Se trabalhas com dados de transporte público ou queres criar uma aplicação sobre a rede da AML, a Carris Metropolitana oferece um ecossistema completo: GTFS estático e em tempo real, API REST documentada, dados georeferenciados e código open-source. A barreira de entrada é praticamente zero.

---

> **Documentação técnica**: [docs.carrismetropolitana.pt](https://docs.carrismetropolitana.pt)
> **Dados abertos**: [carrismetropolitana.pt/open-data](https://www.carrismetropolitana.pt/open-data)
