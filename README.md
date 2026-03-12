# Tabela FIPE API 

A Tabela FIPE expressa preços médios para pagamento à vista, praticados na revenda de veículos para o consumidor final, pessoa física, no mercado nacional, servindo apenas como um parâmetro para negociações ou avaliações. 

Decidimos desenvolver uma simples tela simples usando a [FIPE API](https://deividfortuna.github.io/fipe/), onde você consegue filtrar por um carro especifico e ver o seus dados conforme com o mercado atual.

## Tecnologias usadas
- HTML - Estruturação dos elementos da página.
- CSS - Estilização  organização da tela.
- JavaScript - Criação do sistema que filtra os dados da API.

## Aprofundando no JavaScript

Explicando cada função do Javascript:

1. Inicialização

Assim que a janela é carregada (window.onload), a função busca as marcas disponíveis para preencher o primeiro menu de seleção.

```javascript
window.onload = async function() {
    // Faz o fetch na API para obter todas as marcas
    // Cria e popula o selectElementBrand usando DocumentFragment para performance
    // Armazena os dados em brandsData para consultas futuras
};
```

2. Busca de Modelos

Quando o usuário foca no campo de Modelos, o script identifica qual marca foi selecionada, recupera seu código único e busca os modelos correspondentes.
```javascript
   selectElementModel.addEventListener('focus', async () => {
    // Localiza o código da marca selecionada em brandsData
    // Faz a requisição para o endpoint de modelos específico daquela marca
    // Limpa o select anterior e popula com os novos modelos recebidos
});
```

3. Busca de Anos e Combustível

Ao focar no campo de Anos, o sistema utiliza o código da marca e o código do modelo selecionado para filtrar os anos de fabricação e tipos de combustível disponíveis.
```javascript
selectElementYear.addEventListener('focus', async () => {
    // Localiza o código do modelo selecionado em modelsData
    // Realiza o fetch para obter a lista de anos/combustíveis
    // Atualiza o selectElementYear com as opções retornadas
});
```
4. Exibição dos Dados do Veículo (`showVehicle`)

Esta é a função final que consolida todas as escolhas do usuário. Ela utiliza os três códigos obtidos (Marca, Modelo e Ano) para buscar o preço e as especificações completas.
```javascript
async function showVehicle() {
    // Obtém o código final do ano selecionado
    // Consulta o endpoint de preço final da API
    // Renderiza dinamicamente o HTML dentro de vehicleResult com os dados do objeto vehicleData
}
```
## Estrutura do Resultado Final

O resultado é injetado na página apresentando as seguintes informações:
- Valor: Preço atualizado.

- Dados Técnicos: Marca, Modelo e Ano Modelo.

- Combustível: Tipo de combustível e sigla.

- Mês de Referência: Qual tabela FIPE está sendo consultada.
