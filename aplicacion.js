const contenidoTienda = document.getElementById("contenidoTienda");
const mostrarCarrito = document.getElementById("mostrarCarrito");
const contenidoCompra = document.getElementById("contenidoCompra");
const mostrarAlerta = document.getElementById("mostrarAlerta");
const contarCarrito = document.getElementById("contarCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const llamarProductos = async () => {
    const response = await fetch("products.json")
    const data = await response.json();

    data.forEach((product) => {
        let contenido = document.createElement("div");
        contenido.className = "card";
        contenido.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="precio">${product.precio} $</p>
    `;
    
        contenidoTienda.append(contenido);
    
        let comprar = document.createElement("button");
        comprar.innerText = "Agregar al Carrito";
        comprar.className = "comprar";
    
        contenido.append(comprar);
    
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
                console.log(carrito);
                console.log(carrito.length);
                conteoCarrito();
                guardarLocal();
            }
            Toastify({

                text: "Se Agrego el Producto al Carrito",
                close: true,
                gravity: "bottom",
                position: "right",
                duration: 3000,
                stopOnFocus: true,
                style:{
                    background: "linear-gradient (to right, #4f4ff8, #6e6eff)",
                    color: "#000000",
                }
                }).showToast();
        });
    });
}

llamarProductos();


const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

