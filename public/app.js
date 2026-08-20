// Cargar el nombre del servidor al iniciar la página
async function cargarInfoServidor() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        document.getElementById('server-info').innerText = data.instancia;
    } catch (error) {
        document.getElementById('server-info').innerText = 'Desconocido (Error de conexión)';
    }
}

// Cargar la lista de clientes
async function cargarClientes() {
    try {
        const response = await fetch('/api/clientes');
        const clientes = await response.json();
        const lista = document.getElementById('lista-clientes');
        lista.innerHTML = ''; // Limpiar lista

        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${cliente.nombre} (${cliente.correo})
                <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            `;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// Eliminar un cliente
async function eliminarCliente(id) {
    if(confirm('¿Seguro que deseas eliminar este cliente?')) {
        await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
        cargarClientes();
    }
}

// Manejar el envío del formulario de registro
document.getElementById('form-cliente').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    const nuevoCliente = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value
    };

    try {
        await fetch('/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCliente)
        });
        
        document.getElementById('form-cliente').reset(); // Limpiar formulario
        cargarClientes(); // Refrescar lista
        alert('Cliente registrado exitosamente');
    } catch (error) {
        alert('Error al registrar');
    }
});

// Inicializar
cargarInfoServidor();
cargarClientes();