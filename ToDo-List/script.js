const input = document.querySelector('.caixaDigitacao');
const botao = document.querySelector('.botao');
const listaCompleta = document.querySelector('.lista');

let listaArray = [];

function adicionarTarefa() {
    listaArray.push({
        tarefa: input.value,
        concluida: false,
    });
    input.value = '';  //depois que pegar item,ele limpa o input
    mostrarTarefa();
}

function mostrarTarefa() {
    let novaLi = '';

    // forEach vai interar no array e pegar cada item
    listaArray.forEach((item, index) => {

        //quando item.concluida for verdadeiro ele adiciona class done
        novaLi += ` 
            <li class="task ${item.concluida && "done"}">
                <img  src="./img/checked.png" alt="simbolo nike" onclick= "concluirTarefa(${index})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="Tarefa-lixo" onclick=deletarItem(${index})>

            </li>`

    })
    // depois que ele adicionar cada item na novaLi,ele passa novaLi para lista listaCompleta.
    listaCompleta.innerHTML = novaLi;

    //deixar guardado do localStorage...JSON pega os itens(objetos) e transforma em String
    localStorage.setItem('lista', JSON.stringify(listaArray))
}

function concluirTarefa(index) {
    //pega cada posicao da listaArray = concluida....se ja tiver concluida inverte.
    listaArray[index].concluida = !listaArray[index].concluida;
    mostrarTarefa();
}

function deletarItem(index) {
    //splice - permite deletar qualquer posicao e quantos itens quiser no array
    listaArray.splice(index, 1);
    mostrarTarefa();
}

function recarregarTarefas() {
    //ele pega os itens que foram guardado no localStorage
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) {
        //adiciona os itens a listaArray...JSON.parse transforma string em objetos
        listaArray = JSON.parse(tarefasDoLocalStorage);
    }
    mostrarTarefa();
}
recarregarTarefas();

botao.addEventListener('click', adicionarTarefa);