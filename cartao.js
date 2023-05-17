const array_cod = [
  {
    "numero": 50641631,
    "tolerancia": 7,
    "nome": 'Super 6 Plus',
    "gramatura": 320,
  },
  {
    "numero": 50008841,
    "tolerancia": 5,
    "nome": 'CMPC RC',
    "gramatura": 295,
  },
  {
    "numero": 50462669,
    "tolerancia": 2,
    "nome": 'TP White Plus',
    "gramatura": 275,
  }
]

// Botões
const btn_8 = document.getElementById("i_8")
const btn_10 = document.getElementById("i_10")
const btn_13 = document.getElementById("i_13")
const btn_proc = document.getElementById("btn_proc")
// Input procurar
const codigo_proc = document.getElementById("p_cod")
const nav1 = document.getElementById("nav1")
const nav2 = document.getElementById("nav2")
const div_proc = document.getElementById("proc_codigo")
const div_btns = document.getElementById("btns")
const q_amostra = document.getElementById("q_amostra")
const aplic_gramature = document.getElementById("#aplic_gramature")
const nav_array = [...document.querySelectorAll("#nav2")]
const g_mi = [...document.querySelectorAll("#g_mi")]

//variaveis auxiliares
let t = 1
let k = 0
let id = 1
let resultado = []
let array_result = []
let retornoG = false;
// Funções
//função remover os botões 8,10,13
function removeBtns() {
  q_amostra.remove()
}
//função criar elemento campos para gramatura
function criarElemento() {
  const novoElemento = document.createElement('input')
  novoElemento.setAttribute("type", "number")
  novoElemento.setAttribute("id", id)
  novoElemento.setAttribute("class", "campos_amostras")
  nav2.appendChild(novoElemento)
  t++
  id++
}
//função criar elemento campo quando codigo invalido
function creatGgmiInsira() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTrue");
  g_mi.innerHTML = (`Insira um código!`)
  nav1.appendChild(g_mi)
  const div_to = document.getElementById("#g_mi")
}
//função criar elemento campo quando codigo invalido
function creatNextGgmiInsira() {
  const n_g_mi = document.createElement("div");
  n_g_mi.setAttribute("id", "n_g_mi");
  n_g_mi.setAttribute("class", "aprov_reprov");
  nav1.appendChild(n_g_mi)
  const div_to = document.getElementById("#n_g_mi")
}
//função criar elemento campo quando codigo valido
function creatGgmiTolerances() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTolerancia");
  g_mi.innerHTML = `O cartão ${itemVerificado.nome} ${itemVerificado.gramatura} tem uma tolerância de ${itemVerificado.tolerancia}%`;
  nav1.appendChild(g_mi);
  const div_to = document.getElementById("#g_mi")
}
//função criar elemento campo quando codigo não existe
function creatGgmiCodNotEx() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoFalse");
  g_mi.innerHTML = `O código ${codigo_proc.value} não existe`;
  nav1.appendChild(g_mi);
  const div_to = document.getElementById("#g_mi")
}

function handleEmptyInput() {
  if (div_to == undefined) {
    creatGgmiInsira();
  } else {
    creatGgmiInsira();
    div_to.remove();
  }
}

function handleCodeFound(div_to) {
  const element = document.getElementById('g_mi'); 
  if (element) {
    element.remove();
    creatGgmiTolerances()
  }else{
    creatGgmiTolerances()
  }
}

function handleCodeNotFound() {
  const element = document.getElementById('g_mi'); 
  if (!codigo_proc.value && element) {
    element.remove();
    creatGgmiInsira()
  }else if(!codigo_proc.value && !element){
    creatGgmiInsira()
  }else if (element) {
    element.remove();
    creatGgmiCodNotEx()
  }else{
    creatGgmiCodNotEx()
  }
}
function aprov_reprov(){
  const n_g_mi = document.getElementById('n_g_mi'); 
  if (retornoG == true  && !n_g_mi) {
    
    creatNextGgmiInsira()
    n_g_mi.innerHTML(`Aprovado`);
  }else if(retornoG == false && !n_g_mi){
    n_g_mi.remove();
    creatNextGgmiInsira()
    n_g_mi.innerHTML(`Reprovado`);
  }
}
let itemVerificado = null;
function procurar() {
  const numeroInput = document.getElementById('p_cod').value;
  const numeroFornecidoPeloUsuario = parseInt(numeroInput);
  itemVerificado = array_cod.find(item => item.numero === numeroFornecidoPeloUsuario);
  if (itemVerificado) {
    handleCodeFound()
  } else {
    handleCodeNotFound()
  }
}
div_btns.addEventListener("click", (evt) => {
  removeBtns()
  while (t <= parseInt(evt.target.textContent)) {
    criarElemento()
    }
  })
  
  function calculateGramature() {
    var div = document.getElementById('nav2');
    var inputs = div.getElementsByClassName('campos_amostras');
    resultado = [];
    aux= 0,00;
    soma = parseInt(0);
    for (var i = 0; i < inputs.length; i++) {
      var valor = parseFloat(inputs[i].value);
      var gMax = (itemVerificado.gramatura + (itemVerificado.gramatura * (itemVerificado.tolerancia / 100))) ;
      var gMin = (itemVerificado.gramatura - (itemVerificado.gramatura * (itemVerificado.tolerancia / 100)));
      var aux = parseFloat(inputs[i].value)
      soma = soma + aux
    }
    console.log(resultado)
    console.log(soma.toFixed(2))
    console.log((soma/inputs.length).toFixed(2))
      return resultado;
    }
  
    function addButtonNextProcurar() {
      const btn_proc = document.getElementById("btn_proc");
      if (btn_proc) {
        btn_proc.setAttribute("id", "aplic_gramature");
        btn_proc.innerHTML = "Aplicar gramatura";
        btn_proc.addEventListener("click", () => {
          calculateGramature();
          var array_result = [...calculateGramature()]
        });
      }
    }
    
    if (btn_proc) {
      btn_proc.addEventListener("click", () => {
        procurar();
        addButtonNextProcurar();
      });
    }
    