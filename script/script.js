let brandsData = [];
let modelsData = [];
let yearData = [];
let vehicleData = [];
let selectedBrandCode;
let selectedModelCode;
let selectedYearCode;
const selectElementBrand = document.getElementById("selectBrand");
const selectElementModel = document.getElementById("selectModel");
const selectElementYear = document.getElementById("selectYear");
const vehicleResult = document.getElementById("vehicleResult");

window.onload = async function() {
    try {
        const response = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
        if(!response.ok) {
            throw new Error("nao buscou");
        }
        brandsData = await response.json();

        const fragment = document.createDocumentFragment();

        brandsData.forEach(brand => {
            const option = new Option(brand.nome, brand.nome);
            fragment.appendChild(option);
        });

        selectElementBrand.appendChild(fragment);

        console.log(brandsData);

    } catch (e) {
        console.error(e);
    }
};

selectElementModel.addEventListener('focus', async() => {
    const selectedValue = selectElementBrand.value;
    if (!selectedValue) {
        console.log("Nada na marca");
        return;
    }
    const result = brandsData.find(brand => brand.nome === selectedValue);

    if (result) {
        selectedBrandCode = result.codigo;
        console.log("Codigo da marca:", selectedBrandCode);
        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos`);
            if(!response.ok) {
                throw new Error("nao buscou");
            }
            const data = await response.json();

            modelsData = data.modelos;

            const fragment = document.createDocumentFragment();

            modelsData.forEach(model => {
                const option = new Option(model.nome, model.nome);
                fragment.appendChild(option);
            });

            selectElementModel.appendChild(fragment);

            console.log(modelsData);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.log("N encontrei o modelo chefe");
    }
});

selectElementYear.addEventListener('focus', async () => {
    const selectedValue = selectElementModel.value;
    if (!selectedValue) {
        console.log("Nada no modelo");
        return;
    }

    const result = modelsData.find(model => model.nome === selectedValue);

    if (result) {
        selectedModelCode = result.codigo;
        console.log("Codigo do modelo:", selectedModelCode);
        try {
            const response = await fetch(
                `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos`);
            if(!response.ok) {
                throw new Error("nao buscou");
            }
            yearData = await response.json();

            const fragment = document.createDocumentFragment();

            yearData.forEach(year => {
                const option = new Option(year.nome, year.nome);
                fragment.appendChild(option);
            });

            selectElementYear.appendChild(fragment);

            console.log(yearData);

        } catch (e) {
            console.error(e);
        }
    } else {
        console.log("N encontrei o ano chefe");
    }
})

async function showVehicle() {
    const selectedValue = selectElementYear.value;
    if (!selectedValue) {
        console.log("Nada no ano");
        return;
    }

    const result = yearData.find(year => year.nome === selectedValue);

    if (result) {
        selectedYearCode = result.codigo;
        console.log("Codigo do modelo:", selectedYearCode);
        try {
            const response = await fetch(
                `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos/${selectedYearCode}`);
            if(!response.ok) {
                throw new Error("nao buscou");
            }
            vehicleData = await response.json();

            console.log(vehicleData);
        } catch (e) {
            console.error(e);
        }
    }

    vehicleResult.innerHTML = `
            <h3>Resultado da Consulta</h3>
            <hr>
            <p><strong>Valor:</strong> ${vehicleData.Valor}</p>
            <p><strong>Marca:</strong> ${vehicleData.Marca}</p>
            <p><strong>Modelo:</strong> ${vehicleData.Modelo}</p>
            <p><strong>Ano Modelo:</strong> ${vehicleData.AnoModelo}</p>
            <p><strong>Combustível:</strong> ${vehicleData.Combustivel}</p>
            <p><strong>Mês de Referência:</strong> ${vehicleData.MesReferencia}</p>
            <p><strong>Sigla Combustível:</strong> ${vehicleData.SiglaCombustivel}</p>
    `;
}