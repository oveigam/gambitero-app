const traducirStatusAHeader = (status) => {
    switch (status) {
        case 'pending':
            return 'Solicitudes pendientes';
        case 'accepted':
            return 'Amigos';
        case 'waiting':
            return 'Solicitudes enviadas';
        case 'blocked':
        default:
            return 'Usuarios bloqueados';
    }
}

export default traducirStatusAHeader;