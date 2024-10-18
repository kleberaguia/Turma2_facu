
const modal = document.querySelector(".modal-container");
const tbody = document.querySelector('tbody')
const sNome  =  document.querySelector('#m-nome')
const sTelefone = document.querySelector('#m-telefone')
const sEmail = document.querySelector('#m-email')
const btnSalvar =  document.querySelector('#btnSalvar')

const inputusuario = document.querySelector("#usuario");
const inpusenha = document.querySelector("#senha");
const labefloat = document.querySelector('.labe-float')
const topLabelSenha = document.querySelector("#topLabelSenha");

let itens = [];
let itemPost = []
let id;
let data
const url = "https://localhost:7246/";

 //GetItensDconstB = () => JSON.parse(localStorage.getItem('dbNewBanc')) ?? []
//const SetItensDB = () => localStorage.setItem('dbNewBanc', JSON.stringify(itens))

async function GetItensDBAPI(){

  const response = await fetch(url + "api/Teste2/PegarGeral");     
  itens = await response.json();
  tbody.innerHTML = "";
    itens.forEach((item, index) => {
      populaGrid(item, index);
    });    

}


let listPessoa = {
  nome: '',  
  telefone: '',
  email: ''
}

const ini = {
 
};

async function SetItensDB() {

 
   await fetch(`${url}api/Teste2/Gravar`, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },

     body: JSON.stringify(listPessoa),
   })
     .then((response) => response.json())
     .then(() => {
       GetItensDBAPI();
     });
  
}

//GetItensDB = () => JSON.parse(fetch(url + "WeatherForecast")) ?? []

loadItens()

function loadItens(){
   tbody.innerHTML = "";
   itens = GetItensDBAPI()
  
}


async function openModal(edit = false, index = 0) {
  modal.classList.add("active");   
   if (edit) {
    const response = await fetch(`${url}api/Teste2/PegarById/${index}`);
    itens = await response.json();  

     sNome.value = itens.nome;
     sTelefone.value = itens.telefone;
     sEmail.value = itens.email;
     id = index;
   } else {
     sNome.value = "";
     sTelefone.value = "";
     sEmail.value = "";
   }
  modal.onClick = (e) => {
    if (e.target.className.indexOf("modal-container")!= - 1){
        e.target.classList.remove('active')
    }
  };
}

function editar(index){
  openModal(true,index)
}

function excluir(index) {

    return fetch(url + "api/Teste2/Delete/" + index, {
      method: "delete",
    }).then((response) => response.json());
  
  loadItens();

}

function populaGrid(item, index){

   
    const tr =  document.createElement('tr')

    tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.telefone}</td>
                <td>${item.email}</td>
                <td class="acao">
                    <button onclick="editar(${item.id})"><i class="bx bx-edit"></i></button>
                    <button onclick="excluir(${item.id})"><i class="bx bx-trash"></i></button>
                </td>
    `;
    tbody.appendChild(tr)
}

btnSalvar.onclick = e =>{

    if(sNome.value == '' || sTelefone.value == '' || sEmail.value == ''){
        return;
    }
    e.preventDefault()
   var item = [];
    if(id != undefined){
        itens.nome =  sNome.value
        itens.telefone =  sTelefone.value
        itens.email = sEmail.value

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itens),
        };

      fetch(`${url}api/Teste2/Alterar?id=${id}`, {
       method: "PUT",
       headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
        body: JSON.stringify(itens)
    })
    }else{
        listPessoa.nome =  sNome.value
        listPessoa.telefone =  sTelefone.value
        listPessoa.email =  sEmail.value
         SetItensDB();
      }

   
    modal.classList.remove('acitve')
    loadItens()
    id = undefined

}
