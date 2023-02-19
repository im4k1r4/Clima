document.querySelector('.busca').addEventListener('submit', (event) => { // chamar fn depois do submit
    event.preventDefault(); // prevenir o comportamento padrão, ou seja enviar

    let input = document.querySelector('#searchInput').value; // pegar o que o user digitou

    if(input !== '') { // se a procura for diferente de vazio
        showWarning('Carregando...')
    } 

});

// Funções:
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; // Exibir mensagem de carregando
}