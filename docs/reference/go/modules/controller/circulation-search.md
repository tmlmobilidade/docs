---
title: Procura de circulações
description: "-"
---
## Pesquisa por Texto

A funcionalidade de pesquisa por texto permite localizar circulações de forma rápida e flexível através da introdução de palavras-chave, identificadores ou filtros diretos. O sistema interpreta automaticamente o conteúdo pesquisado e aplica os critérios mais adequados para encontrar os resultados pretendidos.

A pesquisa pode ser utilizada tanto para consultas simples como para combinações mais avançadas.

---

## Como Funciona

Ao introduzir texto no campo de pesquisa, o sistema analisa cada termo individualmente e tenta associá-lo ao tipo de informação mais relevante, como por exemplo:

- Identificador da circulação;
- Códigos ou referências operacionais;
- Veículo associado;
- Motorista associado;
- Horário da circulação

Sempre que possível, os termos são encaminhados para filtros específicos, tornando a pesquisa mais precisa e eficiente.

Quando um termo não corresponde diretamente a um filtro conhecido, o sistema utiliza-o como pesquisa genérica, procurando correspondências no identificador da circulação.

---

## Pesquisa Simples

É possível pesquisar apenas por um termo.

**Exemplos:**

- `12345`
- `ABC123`
- `20250415`

Nestes casos, o sistema procura correspondências relevantes associadas à circulação.

---

## Pesquisa com Vários Termos

Podem ser introduzidos vários termos na mesma pesquisa. Nesse cenário, os resultados devolvidos terão de cumprir todos os critérios introduzidos.

**Exemplos:**

- `12345 manhã`
- `ABC linha12`
- `20250415 expresso`

Isto permite refinar significativamente os resultados.

---

## Pesquisa por Veículo

É possível filtrar diretamente por identificador de veículo através do prefixo: `v:`

**Exemplos:**

- `v:120`
- `v:120,121,122`

Neste modo, serão apresentadas circulações associadas aos veículos indicados.

Também é possível combinar com texto livre:

- `v:120 atraso`
- `v:121 linha azul`

---

## **Pesquisa por Motorista**

É igualmente possível filtrar por motorista através do prefixo:

```text
d:
```

**Exemplos:**

- `d:4501`
- `d:4501,4502`

Serão apresentadas circulações associadas aos motoristas indicados.

Também pode ser combinado com outros critérios:

- `d:4501 manhã`
- `d:4502 v:120`

---

## **Combinação de Filtros**

Os filtros podem ser utilizados em simultâneo para pesquisas mais específicas.

**Exemplos:**

- `v:120 d:4501`
- `v:120,121 d:4501 atraso`
- `d:4502 linha12`

Nestes casos, apenas serão devolvidos resultados que cumpram todos os critérios indicados.

---

## **Boas Práticas**

Para melhores resultados:

- Utilize identificadores exatos sempre que possível;
- Use `v:` para veículos;
- Use `d:` para motoristas;
- Combine múltiplos termos para reduzir resultados;
- Separe vários IDs com vírgulas.

---

## **Resumo Rápido**

|**Pesquisa**|**Resultado**|
|---|---|
|`12345`|Procura textual por circulação|
|`v:120`|Filtra por veículo 120|
|`d:4501`|Filtra por motorista 4501|
|`v:120,121`|Filtra por vários veículos|
|`d:4501,4502`|Filtra por vários motoristas|
|`v:120 atraso`|Veículo 120 + termo adicional|
|`v:120 d:4501`|Veículo 120 + motorista 4501|

---
## Notas Importantes

A pesquisa foi desenhada para ser tolerante e intuitiva, permitindo ao utilizador escrever critérios de forma natural, sem necessidade de seguir uma ordem rígida.

Por exemplo, as seguintes pesquisas produzem o mesmo efeito:

- `v:120 d:4501`
- `d:4501 v:120`
- `atraso v:120`
- `v:120 atraso`

A ordem dos termos não altera o resultado final.

---

## Sensibilidade a Maiúsculas e Minúsculas

A pesquisa textual não distingue letras maiúsculas de minúsculas. Isto significa que os seguintes exemplos são equivalentes:

- `abc123`
- `ABC123`
- `AbC123`

Esta abordagem facilita a utilização e reduz erros de introdução manual.

---

## Pesquisa Parcial

Sempre que aplicável, o sistema consegue localizar resultados mesmo quando apenas parte do texto é introduzida.

**Exemplos:**

- `123` pode encontrar `ABC12345`
- `linha` pode encontrar referências que contenham esse termo

Isto permite pesquisas rápidas mesmo quando o valor completo não é conhecido.

---

## Utilização de Múltiplos IDs

Nos filtros de veículo e motorista podem ser indicados vários identificadores separados por vírgulas.

**Exemplos:**

- `v:101,102,103`
- `d:4501,4502,4503`
- `v:101,102 d:4501`

Esta funcionalidade é útil para equipas operacionais que necessitam de acompanhar vários recursos em simultâneo.

---

## Quando Não Existem Resultados

Se não forem encontrados resultados, poderá significar uma das seguintes situações:

- Não existem circulações que correspondam aos critérios indicados;
- O identificador introduzido está incorreto;
- A combinação de filtros é demasiado restritiva;
- Não existem dados disponíveis para o período consultado.

Nestes casos, recomenda-se simplificar a pesquisa e adicionar critérios progressivamente.

---

## Exemplos Práticos

| Objetivo | Pesquisa Sugerida |
|---|---|
| Encontrar circulações do veículo 120 | `v:120` |
| Ver viagens do motorista 4501 | `d:4501` |
| Procurar veículo 120 com referência 12345 | `v:120 12345` |
| Pesquisar vários veículos | `v:120,121,122` |
| Cruzar veículo e motorista | `v:120 d:4501` |
| Procurar por texto livre | `expresso manhã` |

---

## Recomendações Operacionais

Para utilização diária, recomenda-se:

- Supervisão de frota: utilizar `v:` para veículos;
- Gestão de equipas: utilizar `d:` para motoristas;
- Auditoria rápida: combinar veículo + motorista;
- Investigação de ocorrências: adicionar texto livre ou identificadores.

---

## Resumo Final

A pesquisa por texto permite encontrar circulações de forma simples ou avançada, combinando:

- Texto livre;
- Identificadores;
- Veículos (`v:`);
- Motoristas (`d:`);
- Múltiplos critérios em simultâneo.

Desta forma, adapta-se tanto a consultas rápidas como a análises operacionais mais detalhadas.