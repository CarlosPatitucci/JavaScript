const dibujarCarrito = () => {
  contenidoCompra.innerHTML = "";
  contenidoCompra.style.display = "flex";
  const compraHeader = document.createElement("div");
  compraHeader.className = "compra-encabezado";
  compraHeader.innerHTML = `
      <h1 class="compra-titulo">Carrito de Compras</h1>
    `;
  contenidoCompra.append(compraHeader);

  const compraBoton = document.createElement("h1");
  compraBoton.innerText = "x";
  compraBoton.className = "compra-button";

  compraBoton.addEventListener("click", () => {
    contenidoCompra.style.display = "none";
  });

  compraHeader.append(compraBoton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "compra-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> ➖ </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> ➕ </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
      `;

    contenidoCompra.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      guardarLocal();
      dibujarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      guardarLocal();
      dibujarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      Swal.fire({
        icon: 'question',
        title: 'Eliminar este Producto?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
        confirmButtonColor: "#ff0000",
        denyButtonColor: "#008000",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Producto Eliminado', '', 'success')
                eliminarProducto(product.id);
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
    });

  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalCompra = document.createElement("div");
  totalCompra.className = "total";
  totalCompra.innerHTML = `Total a pagar: $${total}`;
  contenidoCompra.append(totalCompra);
};

mostrarCarrito.addEventListener("click", dibujarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  conteoCarrito();
  guardarLocal();
  dibujarCarrito();
};

const conteoCarrito = () => {
  contarCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  contarCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

conteoCarrito();