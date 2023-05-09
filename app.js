//Declaração das variaveis HTML
const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sFuncao = document.querySelector("#m-funcao");
const sSalario = document.querySelector("#m-salario");

let itens;
let id;

// função para pegar iten no banco de dados
const getItensDataBase = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];

// função para setar itens no banco de dados
const setItensDataBase = () =>
  localStorage.setItem("dbfunc", JSON.stringify(itens));

//Pega os itens no banco de dados e da callback para criar as linhas
function loadItens() {
  itens = getItensDataBase();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}
loadItens();

// carrega e inclui os itens na tela atraves do elemento
function insertItem(item, index) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td> ${item.nome}</td>
    <td> ${item.funcao}</td>
    <td> ${item.salario}</td>
    <td class="acao">
        <button onclick="editItem(${index})"><i class ='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `;
  tbody.appendChild(tr);
}
//
function editItem(index) {
  openModal(true, index);
}

// faz splice em um item do index, atualiza o banco de dados e recarrega os dados na tela
function deleteItem(index) {
  itens.splice(index, 1);
  setItensDataBase();
  loadItens();
}

// incluir = não passa parameto é opcional
//ativa e desativa o modal ao clicar fora dele
function openModal(edit = false, index = 0) {
  modal.classList.add("active");
  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  //condição para pegar os valores para edição e salva no index ou carregar tudo em branco
  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = index;
  } else {
    sNome.value = "";
    sFuncao.value = "";
    sSalario.value = "";
  }
}

//faz validação do formulario e atribui valores do id vindo da edição com os valores de tela ou da push e atualiza o banco de dadados  editando ou incluindo dados

btnSalvar.onclick = (e) => {
  if (sNome.value == "" || sFuncao.value == "" || sSalario == "") {
    return;
  }

  e.preventDefault();

  if (id != undefined) {
    itens[id].nome = sNome.value;
    itens[id].funcao = sFuncao.value;
    itens[id].salario = sSalario.value;
  } else {
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
    });
  }
  setItensDataBase();
  modal.classList.remove("active");
  loadItens();
  id = undefined;
};
