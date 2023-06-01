const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

const dados = {
    tarefa:String,
    data:getDateTime()
}

function getDateTime() {
    const data_hora= new Date()
    const hora = data_hora.toLocaleTimeString('pt-BR')
    const data = data_hora.toLocaleDateString('pt-BR')
    return `${hora} - ${data}`
}

function adicionarNaLista(data){
    const liElement = document.createElement('li')
    liElement.innerHTML = `<span class="liText">${data}</span>`
    botaoApagarTarefa(liElement)
    tarefas.appendChild(liElement)
}

function criarTarefa(inputarTarefa) {
    if(inputarTarefa.value === ""){
        alert('Tarefa sem informação?')
    } else {
        dados.tarefa = inputarTarefa.value
        adicionarNaLista(`${dados.tarefa} - ${dados.data}`)
        salvarTarefas()
        cleanInputTarefa()
    }
}

function cleanInputTarefa() {
    inputTarefa.value=''
    inputTarefa.focus()   
}

function botaoApagarTarefa(liElement) {
    const btnDelete = document.createElement('button')
    btnDelete.className = 'btnExcluir'
    btnDelete.innerText= 'Excluir'
    liElement.appendChild(btnDelete)
}


function salvarTarefas() {
    const listaTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []
    for(let tarefa of listaTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Excluir','')
        listaDeTarefas.push(tarefaTexto.trim())
    }
    const tarefasToJason = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasToJason)
}

function obterTarefasSalvas() {
    const getTarefas = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(getTarefas)
    for(let tarefa of listaTarefas){
        adicionarNaLista(tarefa)
    }

}

btnTarefa.addEventListener('click', function (e) {
    e.preventDefault()
    criarTarefa(inputTarefa)
})

document.addEventListener('click', function(e){
    const elem = e.target
    if(elem.classList.contains('btnExcluir')){
        elem.parentElement.remove()
        salvarTarefas()
    }
})

obterTarefasSalvas()