document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  cargarCarrito();
});

function cargarProductos() {
  fetch("./js/productos.json")
  .then(response => {
      if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
      }
      return response.json();
  })
  .then(data => {
      const listaProductos = document.getElementById('lista-productos');
      data.forEach(producto => {
          const li = document.createElement('li');
          li.innerHTML = `
              <div>
                  <img src="${producto.imagen}" alt="${producto.nombre}" width="100px" height="100px">
                  <h6>${producto.nombre}</h6>
                  <p>$${producto.precio}</p>
                  <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
              </div>`;
          listaProductos.appendChild(li);
      });
  })
  .catch(error => {
      console.error('Error al cargar los productos:', error);
  });
}

function agregarAlCarrito(idProducto) {
  fetch("./js/productos.json" + idProducto)
  .then(response => {
      if (!response.ok) {
          throw new Error('No se pudo agregar el producto al carrito');
      }
      return response.json();
  })
  .then(producto => {
      Toastify({
          text: "Acabas agregar el producto al carrito con éxito",
          className: "info",
          style: {
              background: "linear-gradient(to right, red, yellow)",
          }
      }).showToast();
      let carrito = obtenerCarrito();
      if (producto) {
          carrito.push(producto);
          guardarCarrito(carrito);
          actualizarCarritoDOM();
      }
  })
  .catch(error => {
      console.error('Error al agregar el producto al carrito:', error);
  });
}


  //  LOCAL STORAGE - FUNCIONES PARA REMOVER CARRITO, CARGARLO Y GUARDARLO PARA EL SIGUIENTE INICIO" //

  function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarritoDOM();
    Toastify({
      text: "Acabas de vaciar tu carrito con éxito",
      className: "info",
      style: {
        background: "linear-gradient(to right, red, yellow)",
      }
    }).showToast();
    
  }
  
  function cargarCarrito() {
    const carrito = obtenerCarrito();
    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.innerHTML = `${producto.nombre} - $${producto.precio}`;
      document.getElementById('lista-carrito').appendChild(li);
    });
  }
  
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function actualizarCarritoDOM() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
  
    const carrito = obtenerCarrito();
    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.innerHTML = `${producto.nombre} - $${producto.precio}`;
      listaCarrito.appendChild(li);
    });
  }
