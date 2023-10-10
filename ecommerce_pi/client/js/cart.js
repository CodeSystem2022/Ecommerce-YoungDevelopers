const contenedorTarjetas = document.getElementById("cart-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");
const totalesContainer = document.getElementById("totales");
const cantidadElement = document.getElementById("cantidad");
const formularioBusqueda = document.getElementById('formulario-busqueda');

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("vinos"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoVino = document.createElement("div");
      nuevoVino.classList = "tarjeta-producto";
      nuevoVino.innerHTML = `
    <img src=${producto.urlImagen}>
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevoVino);
      nuevoVino
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevoVino
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("vinos"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("vinos"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}

const productos = JSON.parse(localStorage.getItem("vinos"));
let total = 0;

if (productos && productos.length > 0) {
  productos.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
}

//mp
const mercadopago = new MercadoPago("TEST-80336d73-6404-4e50-90b0-95b22a82486a",{
  locale: "es-AR",
});

const checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", () => {
  checkoutButton.remove();

  const orderData = {
    quantity: 1,
    description: "Compra de ecommerce",
    price: total,
  };

  fetch("http://localhost:4002/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function createCheckoutButton(preferenceId) {
  const bricksBuilder = mercadopago.bricks();

  const renderComponenr = async (bricksBuilder) => {
    await bricksBuilder.create("wallet", "button-checkout", {
      initialization: {
        preferenceId: preferenceId,
      },
      callbacks: {
        onError: (error) => console.error(error),
        onReady: () => {},
      },
    });
  };
  window.checkoutButton = renderComponenr(bricksBuilder);
}


