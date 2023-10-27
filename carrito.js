const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito de Compras</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
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

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
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
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `Total a pagar: $${total}`;
  modalContainer.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();