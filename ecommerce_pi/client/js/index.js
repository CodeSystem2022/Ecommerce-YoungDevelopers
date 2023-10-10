
const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
       const nuevoVino = document.createElement("div");
       nuevoVino.classList = "tarjeta-producto"
       nuevoVino.innerHTML= `
       <img src=${producto.urlImagen}>
       <h3>${producto.nombre}</h3>
       <p class="precio">$${producto.precio}</p>
       <button>Agregar al carrito</button>`
       contenedorTarjetas.appendChild(nuevoVino);
       nuevoVino.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
    });
}
getVinos().then(vinos => {
  crearTarjetasProductosInicio(vinos);  
})
//barra busqueda por nombre
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    buscarProductoPorNombre(searchTerm);
  });
});

function buscarProductoPorNombre(nombre) {
  
  const productos = [
    { nombre: 'Sol Juana', precio: 1500 },
    { nombre: 'Borges', precio: 1700 },
    { nombre: 'Centenario', precio: 1400 },
    { nombre: 'El Ganador', precio: 2000 },
    { nombre: 'Moura', precio: 2500 },
    { nombre: 'Cabernet', precio: 1900 },
    { nombre: 'San Telmo', precio: 1700 },
    { nombre: 'La Ocasion ', precio: 3500 },
    { nombre: 'La Bodega', precio: 3000 },
  ];

  const resultados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );

  mostrarResultadosEnInterfaz(resultados);
}

function mostrarResultadosEnInterfaz(data) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Limpia resultados anteriores

  if (data.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  // Recorrer los datos y mostrarlos en la interfaz
  data.forEach((producto) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.textContent = `${producto.nombre} - Precio: $${producto.precio}`;

    resultsContainer.appendChild(resultItem);
  });
}