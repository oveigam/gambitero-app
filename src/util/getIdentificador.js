
export default (elemento) => {
    return elemento.id ? elemento.id : elemento.key;
}