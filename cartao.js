const array_cod = [
  {
    "lote": 225031,
    "tolerancia": 7,
    "nome": 'Super 6 Plus',
    "gramatura": 320,
  },
  {
    "lote": 218765,
    "tolerancia": 5,
    "nome": 'CMPC RC',
    "gramatura": 295,
  },
  {
    "lote": 235868,
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
const inputs = document.getElementsByClassName('campos_amostras')
const li = document.getElementById('d_g_i')

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
  const li = document.getElementById('d_g_i')
  const novoElemento = document.createElement('input')
  const novoLabel = document.createElement('label',id)
  novoLabel.setAttribute("class", "label_amostras")
  novoLabel.innerHTML=id
  novoElemento.setAttribute("type", "number")
  novoElemento.setAttribute("id", id)
  novoElemento.setAttribute("class", "campos_amostras")
  li.appendChild(novoLabel)
  li.appendChild(novoElemento)
  t++
  id++
}
//função criar elemento campo quando codigo invalido
function creatGgmiInsira() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTrue");
  g_mi.innerHTML = (`Insira um lote!`)
  nav1.appendChild(g_mi)
  const div_to = document.getElementById("#g_mi")
}
//função criar elemento campo quando codigo invalido
function creatDivAprov() {
  const n_g_mi = document.createElement("div");
  n_g_mi.setAttribute("id", "n_g_mi");
  n_g_mi.setAttribute("class", "descricaoTolerancia");
  //n_g_mi.innerHTML=(`Aprovado`);
  nav1.appendChild(n_g_mi)
  const div_n_g_mi = document.getElementById('n_g_mi')
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
  
  g_mi.setAttribute("class", "descricaoTolerancia");
  g_mi.innerHTML = `O lote ${codigo_proc.value} não existe`;
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

function handleCodeFound() {
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
  const div_n_g_mi = document.getElementById('n_g_mi'); 
  if (retornoG == true) {
    if(div_n_g_mi == undefined){
      creatDivAprov()
      n_g_mi.innerHTML=(`Aprovado`);
    }else{
      div_n_g_mi.remove();
      creatDivAprov()
      n_g_mi.innerHTML=(`Aprovado`);
    }
  }else{
    if(div_n_g_mi == undefined){
      creatDivAprov()
      n_g_mi.innerHTML=(`Reprovado`);
    }else{
      div_n_g_mi.remove();
      creatDivAprov()
      n_g_mi.innerHTML=(`Reprovado`);
    }
  }
}
let itemVerificado = null;
function procurar() {
  const numeroInput = document.getElementById('p_cod').value;
  const numeroFornecidoPeloUsuario = parseInt(numeroInput);
  itemVerificado = array_cod.find(item => item.lote === numeroFornecidoPeloUsuario);
  if (itemVerificado) {
    handleCodeFound()
  } else {
    handleCodeNotFound()
  }
}
div_btns.addEventListener("click", (evt) => {
  removeBtns()
  const t_g_mi = document.createElement('div');
  t_g_mi.setAttribute("class", "inspecao")
  t_g_mi.innerHTML=(`Insira a gramatura:`)
  const g_i = document.createElement('div');
  g_i.setAttribute("id", "d_g_i");
  nav2.appendChild(t_g_mi)
  nav2.appendChild(g_i)
  
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
    if(inputs.length > 0) {
      if((soma/inputs.length).toFixed(2) > gMin && (soma/inputs.length).toFixed(2) < gMax){
        retornoG = true;
        aprov_reprov()
      }else{
        retornoG = false;
        aprov_reprov()
      }
    }
    return resultado;
  }
  
    function addButtonNextProcurar() {
      const btn_proc = document.getElementById("btn_proc");
      if (btn_proc) {
        btn_proc.setAttribute("id", "aplic_gramature");
        btn_proc.innerHTML = "Aplicar gramatura";
        btn_proc.addEventListener("click", () => {
            calculateGramature()
        })
      }
    }
    
    if (btn_proc) {
      btn_proc.addEventListener("click", () => {
        procurar();
        if(codigo_proc.value !== "") {
          addButtonNextProcurar();
        }
      });
    }
    