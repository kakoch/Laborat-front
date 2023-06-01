const array_cod = [
  {
    "lote": 225031,
    "tolerancia": 7,
    "nome": 'Super labels',
    "gramatura": 125,
  },
  {
    "lote": 218765,
    "tolerancia": 5,
    "nome": 'Carton FC',
    "gramatura": 293,
  },
  {
    "lote": 235868,
    "tolerancia": 2,
    "nome": 'Tripe White',
    "gramatura": 282,
  }
]


// Botões
const btn_8 = document.getElementById("i_8")
const btn_10 = document.getElementById("i_10")
const btn_13 = document.getElementById("i_13")
const btn_proc = document.getElementById("btn_proc")
//variaveis auxiliares
let t = 1
let k = 0
let id = 1
let resultado = []
let array_result = []
let retornoG = false;
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
const divOnGramatures = document.getElementById(id)

// Funções
//função criar elemento campos para gramatura
function criarElemento() {
  const li = document.getElementById('d_g_i')
  const div = document.createElement('div')
  div.setAttribute("id", id)
  div.setAttribute("class", "divGramatures")
  const novoElemento = document.createElement('input')
  const novoLabel = document.createElement('label',id)
  novoLabel.setAttribute("class", "label_amostras")
  novoLabel.setAttribute("for", id)
  novoLabel.innerHTML=id
  novoElemento.setAttribute("type", "number")
  novoElemento.setAttribute("id", id)
  novoElemento.setAttribute("class", "campos_amostras")
  li.appendChild(div)
  div.appendChild(novoLabel)
  div.appendChild(novoElemento)
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

//função criar campo lote vazio
/*function handleEmptyInput() {
  if (div_to == undefined) {
    creatGgmiInsira();
  } else {
    creatGgmiInsira();
    div_to.remove();
  }
}*/

//função criar campo se encontrar lote
function handleCodeFound() {
  const element = document.getElementById('g_mi'); 
  if (element) {
    element.remove();
    creatGgmiTolerances()
  }else{
    creatGgmiTolerances()
  }
}

//função criar mensagem campo vazio 
function handleCodeNotFound() {
  const g_mi = document.getElementById('g_mi');
  if (g_mi == undefined) {
    creatGgmiInsira()
  }else{
    g_mi.remove()
    creatGgmiInsira()
  }
}
/*
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
*/
//função de procurar o numero do lote
let itemVerificado = null;
function procurar() {
  const numeroInput = document.getElementById('p_cod').value;
  const numeroFornecidoPeloUsuario = parseInt(numeroInput);
  itemVerificado = array_cod.find(item => item.lote === numeroFornecidoPeloUsuario);
  if (itemVerificado) {
    handleCodeFound()
    addButtonsGramature()
  } else {
    handleCodeNotFound()
  }
}
//função dar titulo no conjunto de gramaturas
function addTitleButtonsGramature() {
  const t_g_mi = document.createElement('div');
  t_g_mi.setAttribute("class", "inspecao")
  t_g_mi.innerHTML=(`Insira a gramatura:`)
  const g_i = document.createElement('div');
  g_i.setAttribute("id", "d_g_i");
  nav2.appendChild(t_g_mi)
  nav2.appendChild(g_i)
}
//função adicionar os campos de inserir gramatura
function addButtonsGramature(){
  const campos_amostras = [...document.getElementsByClassName('campos_amostras')]
  if(campos_amostras == ''){
    addTitleButtonsGramature()
    for (let o = 0; o < 15; o++) {
      criarElemento()
    }
  }
  
}
//função calcular gramatura
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
  //if de teste perdido dando erro, mover e corrigir
  if (btn_proc) {
    btn_proc.addEventListener("click", () => {
      procurar();
      if(codigo_proc.value !== "") {
        
      }
    });
  }
  /*function addButtonNextProcurar() {
    const btn_proc = document.getElementById("btn_proc");
    if (btn_proc) {
      btn_proc.setAttribute("id", "aplic_gramature");
      btn_proc.innerHTML = "Aplicar gramatura";
      btn_proc.addEventListener("click", () => {
          calculateGramature()
      })
    }
  }*/