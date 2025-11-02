// 1. PEGA AQUÍ LA URL DE TU APP SCRIPT
const API_URL = "AKfycbxzxNAGSdbCC2bi9yqQl7LHhSNWojOX-tpC_W5aQvfpi9DX0ada2CrWShRzGSzir1EL";

// 2. Referencias
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
let allPlayers = []; 

// 3. Función para mostrar los jugadores (actualizada)
function renderTable(players) {
    tableBody.innerHTML = "";
    
    if (players.length === 0) {
        // CAMBIO AQUÍ: colspan="4"
        tableBody.innerHTML = '<tr><td colspan="4">No se encontraron resultados</td></tr>';
        return;
    }
    
    players.forEach(player => {
        let row = document.createElement('tr');
        // CAMBIO AQUÍ: Añadimos las 4 columnas
        // Hacemos que el profile_url sea un enlace clickeable
        row.innerHTML = `
            <td>${player.userId}</td>
            <td>${player.username}</td>
            <td>${player.displayName}</td>
            <td><a href="${player.profileUrl}" target="_blank">Ver perfil</a></td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Función para filtrar (actualizada)
function filterPlayers() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredPlayers = allPlayers.filter(player => {
        // Busca en todos los campos
        const id = String(player.userId).toLowerCase();
        const user = String(player.username).toLowerCase();
        const disp = String(player.displayName).toLowerCase();
        const url = String(player.profileUrl).toLowerCase();
        
        return id.includes(searchTerm) || 
               user.includes(searchTerm) ||
               disp.includes(searchTerm) ||
               url.includes(searchTerm); // CAMBIO AQUÍ
    });
    
    renderTable(filteredPlayers);
}

// 5. Función principal para cargar los datos (actualizada)
async function loadPlayers() {
    // CAMBIO AQUÍ: colspan="4"
    tableBody.innerHTML = '<tr><td colspan="4">Cargando lista...</td></tr>';
    
    try {
        const response = await fetch(API_URL);
        allPlayers = await response.json(); 
        
        if (allPlayers.error) {
            console.error("Error desde la API de Google:", allPlayers.error);
            tableBody.innerHTML = '<tr><td colspan="4">Error en el script de Google.</td></tr>';
        } else {
            renderTable(allPlayers);
        }

    } catch (error) {
        console.error("Error al cargar los jugadores:", error);
        tableBody.innerHTML = '<tr><td colspan="4">Error al cargar la lista. Revisa la consola.</td></tr>';
    }
}

// 6. Event Listeners
document.addEventListener('DOMContentLoaded', loadPlayers);
searchInput.addEventListener('input', filterPlayers);