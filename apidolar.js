const url = 'https://dolarapi.com/v1/dolares/blue';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

async function dataDolar (){
    try {
        const response = await fetch (url, options);
        const data = await response.json();

        const nombre = data.nombre
        const fechaActualizacion = data.fechaActualizacion;
        const compra = data.compra;
        const venta = data.venta;

        const infoDolar = document.getElementById('info-dolar');
        infoDolar.textContent = `Dolar ${nombre} | Dolar Compra: $${compra} | Dolar Venta: $${venta} | Ultima Actualizacion: ${fechaActualizacion}`;
    }catch (error) {   
        console.error(error);
    }
}

dataDolar();
setInterval (dataDolar, 20000000);