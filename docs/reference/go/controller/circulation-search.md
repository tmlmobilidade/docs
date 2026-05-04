---
title: Procura de circulações
description: "-"
---
Devido ao enorme volume de dados, é necessário necessário a aplicação de filtros na pesquisa circulações por sendo que o único filtro obrigatório é o "Intervalo de datas".

---
## Barra de Filtros

Na parte superidor da nossa lista encontramos uma lista de vários menus que nos permitem filtara. informação por o filtro correspondente ao título desse botão.

Os filtros disponíveis são:
- Intervalo de datas
- Operador
- Estado
- Atraso
- Aceitação
- 3 Momentos
- Fim na Última Paragem
- Intervalo Validações
- Sequencialidade APEX

### Intervalo de datas

O filtro por i**ntervalo de datas** é o único que é obrigatório devido ao elevado volume de dados. Este permite-nos filtar as circulações por um intervalo entre o *inicio de hora planeada* (`start_time_scheduled`) e *fim de hora planeada* (`end_time_scheduled`).

### Operador

O filtro por **operador** (`agency_id`) permite-nos apenas visualizar circulações realizadas por os operadores selecionados.
Por defeito todos os operadores estão selecionados.

### Atraso

O filtro por **atraso** permite-nos filtrar circulações pelo teste de atraso que compara o `start_time_scheduled` com o `start_time_observed`.

As opções disponíveis são:
- A Horas
- Atrasada
- Adiantada
- (Sem valor) - Quando o teste ainda não foi realizado

---
## Pesquisa por Texto

A funcionalidade de pesquisa por texto permite localizar circulações de forma rápida e flexível através da introdução de palavras-chave, identificadores ou filtros diretos. O sistema interpreta automaticamente o conteúdo pesquisado e aplica os critérios mais adequados para encontrar os resultados pretendidos.

A pesquisa pode ser utilizada tanto para consultas simples como para combinações mais avançadas.
### Como Funciona

Ao introduzir texto no campo de pesquisa, o sistema analisa cada termo individualmente e tenta associá-lo ao tipo de informação mais relevante, como por exemplo:

- Identificador da circulação
- Códigos operacionais
- Veículo associado
- Motorista associado
- Horário da circulação

Sempre que possível, os termos são encaminhados para filtros específicos, tornando a pesquisa mais precisa e eficiente.

Quando um termo não corresponde diretamente a um filtro conhecido, o sistema utiliza-o como pesquisa genérica, procurando correspondências no identificador da circulação.

#### Identificador da circulação

A pesquisa pelo `id` da circulação é a forma mais direta de chegar a uma circulação específica. Os identificadores são únicos.

As circulações são identificadas com o seguinte formato `[plan_id]-[agency_id]-[operational_day]-[trip_id]`
Um exemplo de um `id` de uma circulação é `O9AXB-41-20260302-1001_0_1_0700_0729_0_1`.

**Códigos operacionais**

Os códigos operacionais podem ser separados em:
- `line_id` - `1001`
- `route_id` - `1001_0`
- `pattern_id ` - `1001_0_1`

Estes permitem-nos especificar se queremos filtrar as circulações por linha, rota ou direção da rota.

#### Horário da circulação

Podemos filtrar as circulações por **hora de partida** (ex.: 0700) ou **hora de chegada** (0729) como identificadas no `id`
Nota: Apenas é possível utilizar este filtro após inserido um código operacional

#### Veículo associado

É possível filtrar diretamente por identificador de veículo através do prefixo `v:{vehicle_id}`
Como por exemplo `v:1603`

É possível ainda pesquisar por múltiplos veículos de uma só vez, separando os valores por virgulas
Como por exemplo `v:1603,2000`

#### Motorista associado

É possível filtrar diretamente por identificador de motorista através do prefixo `d:{driver_id}`
Como por exemplo `d:1234`

É possivel ainda pesquisar por múltiplos motoristas de uma só vez, separando os valores por virgulas
Como por exemplo `v:1234,5678`

