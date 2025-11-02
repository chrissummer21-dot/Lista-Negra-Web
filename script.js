// 1. PEGA AQUÍ LA URL DE TU APP SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbxoX58xGucHdzAkr0rNCEBHkT-tOOF6XsPxkfM0AoPbK_xnepwAjIRXKDJ1nw4S54X_/exec";

// 2. Referencias
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
let allPlayers = []; 

// 3. Función para mostrar los jugadores (actualizada)
function renderTable(players) {
    tableBody.innerHTML = "";
    
    if (players.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="2">No se encontraron resultados</td></tr>';
        return;
    }
    
    // Usamos displayName para "Usuario" y userId para "ID"
    players.forEach(player => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.displayName}</td>
            <td>${player.userId}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Función para filtrar (actualizada)
function filterPlayers() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredPlayers = allPlayers.filter(player => {
        // Busca en displayName, username Y userId
        const disp = String(player.displayName).toLowerCase();
        const user = String(player.username).toLowerCase();
        const id = String(player.userId).toLowerCase();
        
        return disp.includes(searchTerm) || 
               user.includes(searchTerm) ||
               id.includes(searchTerm);
    });
    
    renderTable(filteredPlayers);
}

// 5. Función principal para cargar los datos (actualizada)
async function loadPlayers() {
    tableBody.innerHTML = '<tr><td colspan="2">Cargando lista...</td></tr>';
    
    try {
        const response = await fetch(API_URL);
        allPlayers = await response.json(); 
        
        // Manejar si el API nos devuelve un error
        if (allPlayers.error) {
            console.error("Error desde la API de Google:", allPlayers.error);
            tableBody.innerHTML = '<tr><td colspan="2">Error en el script de Google.</td></tr>';
        } else {
            renderTable(allPlayers);
        }

    } catch (error) {
        // Este es el error de red/CORS
        console.error("Error al cargar los jugadores:", error);
        tableBody.innerHTML = '<tr><td colspan="2">Error al cargar la lista. Revisa la consola.</td></tr>';
    }
}

// 6. Event Listeners
document.addEventListener('DOMContentLoaded', loadPlayers);
searchInput.addEventListener('input', filterPlayers);