---
title: Procura de circulações
description: "-"
---
## Pesquisa por Texto

A funcionalidade de pesquisa por texto permite localizar circulações de forma rápida e flexível através da introdução de palavras-chave, identificadores ou filtros diretos. O sistema interpreta automaticamente o conteúdo pesquisado e aplica os critérios mais adequados para encontrar os resultados pretendidos.

A pesquisa pode ser utilizada tanto para consultas simples como para combinações mais avançadas.
### Como Funciona

Ao introduzir texto no campo de pesquisa, o sistema analisa cada termo individualmente e tenta associá-lo ao tipo de informação mais relevante, como por exemplo:

- Identificador da circulação
- Códigos ou referências operacionais
- Veículo associado
- Motorista associado
- Horário da circulação

Sempre que possível, os termos são encaminhados para filtros específicos, tornando a pesquisa mais precisa e eficiente.

Quando um termo não corresponde diretamente a um filtro conhecido, o sistema utiliza-o como pesquisa genérica, procurando correspondências no identificador da circulação.

#### Identificador da circulação

A pesquisa pelo `id` da circulação é a forma mais direta de chegar a uma circulação específica. Os identificadores são únicos.

As circulações são identificadas com o seguinte formato `[plan_id]-[agency_id]-[operational_day]-[trip_id]`
Um exemplo de um `id` de uma circulação é `O9AXB-41-20260302-1001_0_1_0700_0729_0_1`.

**Códigos ou referências operacionais**

Os códigos operacionais podem ser separados em:
- `line_id` - `1001`
- `route_id` - `1001_0`
- `pattern_id ` - `1001_0_1`

Estes permitem-nos especificar se queremos filtrar as circulações por linha, rota ou direção da rota.

#### Horário da circulação

Podemos filtar as circulações por **hora de partida** ou **hora de chegada** como identificadas no 

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

