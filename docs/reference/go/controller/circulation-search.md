---
title: Pesquisa de Circulações
description: Técnicas avançadas para encontrares a circulação que procuras.
---
Como cada Ride representa apenas uma circulação, o volume de dados é enorme. Só a Carris Metropolitana tem mais de 20.000 rides por dia. Por isso, é necessário aplicar filtros para conseguires encontrar as rides que procuras.
## Filtros

No início da página está disponível uma barra com todos os filtros possíveis de aplicar à pesquisa. O único filtro obrigatório, e que está sempre ativo, é o do intervalo de datas. Por defeito, a aplicação mostra as rides que estão ativas agora.

Por questões de performance, a lista não mostra mais do que 2.000 rides de cada vez, o que significa que se colocares um intervalo de datas muito grande só vais ver as primeiras 2.000 que resultarem da tua pesquisa com todos os filtros aplicados. Por exemplo, se colocares o intervalo de datas entre 1 Janeiro 2025 e 31 Janeiro 2025, vais ver apenas as primeiras 2.000 rides do dia 1 Jan. Mas se aplicares o filtro de Atraso, então vais ver as primeiras 2.000 rides nesse intervalo *que se atrasaram*, e aí já podes ter rides de outras datas.

A funcionalidade de exportação não tem limite de resultados.

#### Intervalo de datas

O filtro por i**ntervalo de datas** é o único que é obrigatório devido ao elevado volume de dados. Este permite-nos filtrar as circulações por um intervalo entre o *inicio de hora planeada* (`start_time_scheduled`) e *fim de hora planeada* (`end_time_scheduled`).

#### Operador

O filtro por **operador** (`agency_id`) permite-nos visualizar circulações realizadas pelos operadores selecionados.

#### Outros filtros

Explora a plataforma para consultar os filtros disponíveis.

## Pesquisa Livre

A funcionalidade de pesquisa por texto permite localizar circulações de forma rápida e flexível através da introdução de palavras-chave, identificadores ou filtros diretos. O sistema interpreta automaticamente o conteúdo pesquisado e aplica os critérios mais adequados para encontrar os resultados pretendidos.

A pesquisa pode ser utilizada tanto para consultas simples como para combinações mais avançadas.

### Como Funciona

Ao introduzir texto no campo de pesquisa, o sistema analisa cada termo individualmente e tenta associá-lo ao tipo de informação mais relevante, como por exemplo:

- ID da Ride
- Códigos operacionais
- Veículo associado
- Motorista associado
- Horário da circulação

Sempre que possível, os termos são encaminhados para filtros específicos, tornando a pesquisa mais precisa e eficiente.

Quando um termo não corresponde diretamente a um filtro conhecido, o sistema utiliza-o como pesquisa genérica, procurando correspondências no identificador da circulação.
#### ID da Ride

As circulações são identificadas com o seguinte formato `[plan_id]-[agency_id]-[operational_day]-[trip_id]`
Um exemplo de um `id` de uma circulação é `O9AXB-41-20260302-1001_0_1_0700_0729_0_1`. A pesquisa pelo `id` da circulação é a forma mais direta de chegar a uma circulação específica. Como os identificadores são únicos, colocando o ID na caixa de pesquisa irá devolver imediatamente a circulação que procuras.
#### Códigos operacionais

Os códigos operacionais indentificam a linha, a variante ou o percurso e podem ser separados individualmente. Por exemplo: `line_id: 1001`, `route_id: 1001_0`, `pattern_id: 1001_0_1`.
#### Veículo associado

É possível filtrar diretamente por identificador do veículo através do prefixo `v:{vehicle_id}`. É possível ainda pesquisar por múltiplos veículos de uma só vez, separando os valores por virgulas
Como por exemplo `v:1603,2000`

Exemplo: `v:1234` ou `v:1234,5678`
#### Motorista associado

É possível filtrar diretamente por identificador de motorista através do prefixo `d:{driver_id}`. É possível ainda pesquisar por múltiplos motoristas de uma só vez, separando os valores por virgulas.

Exemplo: `d:1234` ou `d:1234,5678`