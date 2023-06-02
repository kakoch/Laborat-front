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
];

// Botões
const btn_proc = document.getElementById("btn_proc");

// Variáveis auxiliares
let t = 1;
let k = 0;
let id = 1;
let resultado = [];
let array_result = [];
let retornoG = false;

// Inputs
const codigo_proc = document.getElementById("p_cod");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");

// Funções

// Função para criar elemento campos para gramatura
function criarElemento() {
  const li = document.getElementById('d_g_i');
  const div = document.createElement('div');
  div.setAttribute("id", id);
  div.setAttribute("class", "divGramatures");
  const novoElemento = document.createElement('input');
  const novoLabel = document.createElement('label');
  novoLabel.setAttribute("class", "label_amostras");
  novoLabel.setAttribute("for", id);
  novoLabel.innerHTML = id+`ª:`;
  novoElemento.setAttribute("type", "number");
  novoElemento.setAttribute("id", id);
  novoElemento.setAttribute("class", "campos_amostras");
  li.appendChild(div);
  div.appendChild(novoLabel);
  div.appendChild(novoElemento);
  id++;
}

// Função para criar elemento campo quando o código é inválido
function creatGgmiInsira() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTrue");
  g_mi.innerHTML = `Insira um lote!`;
  nav1.appendChild(g_mi);
}
function creatGgmiNotValid() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTrue");
  g_mi.innerHTML = `Lote invalido!`;
  nav1.appendChild(g_mi);
}

// Função para criar elemento campo quando o código é inválido
function creatDivAprov() {
  const n_g_mi = document.createElement("div");
  n_g_mi.setAttribute("id", "n_g_mi");
  n_g_mi.setAttribute("class", "descricaoTolerancia");
  nav1.appendChild(n_g_mi);
}

// Função para criar elemento campo quando o código é válido
function creatGgmiTolerances() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTolerancia");
  g_mi.innerHTML = `O cartão ${itemVerificado.nome} ${itemVerificado.gramatura} tem uma tolerância de ${itemVerificado.tolerancia}%`;
  nav1.appendChild(g_mi);
}

// Função para criar elemento campo quando o código não existe
function creatGgmiCodNotEx() {
  const g_mi = document.createElement("div");
  g_mi.setAttribute("id", "g_mi");
  g_mi.setAttribute("class", "descricaoTolerancia");
  g_mi.innerHTML = `O lote ${codigo_proc.value} não existe`;
  nav1.appendChild(g_mi);
}

// Função para lidar com campo lote vazio
function handleEmptyInput() {
  const div_to = document.getElementById('g_mi');
  if (div_to == undefined) {
    creatGgmiInsira();
  } else {
    creatGgmiInsira();
    div_to.remove();
  }
}

// Função para lidar com campo quando o código é encontrado
function handleCodeFound() {
  const element = document.getElementById('g_mi'); 
  if (element) {
    element.remove();
    creatGgmiTolerances();
  } else {
    creatGgmiTolerances();
  }
}

// Função para lidar com campo quando o código não é encontrado
function handleCodeNotFound() {
  const g_mi = document.getElementById('g_mi');
  if (g_mi == undefined) {
    creatGgmiNotValid();
  } else {
    g_mi.remove();
    creatGgmiNotValid();
  }
}

// Função para lidar com campo quando é aprovado ou reprovado
function aprov_reprov() {
  const div_n_g_mi = document.getElementById('n_g_mi'); 
  if (retornoG == true) {
    if (div_n_g_mi == undefined) {
      creatDivAprov();
      n_g_mi.innerHTML = `Aprovado`;
    } else {
      div_n_g_mi.remove();
      creatDivAprov();
      n_g_mi.innerHTML = `Aprovado`;
    }
  } else {
    if (div_n_g_mi == undefined) {
      creatDivAprov();
      n_g_mi.innerHTML = `Reprovado`;
    } else {
      div_n_g_mi.remove();
      creatDivAprov();
      n_g_mi.innerHTML = `Reprovado`;
    }
  }
}

// Função para adicionar o listener de evento ao bt_check
let bt_check = null;
function addEventBtCheck() {
  if (bt_check !== null) {
    bt_check.addEventListener("click", function() {
      calculateGramature();
    });
  }
}

// Função para procurar o número do lote
let itemVerificado = null;
function procurar() {
  const numeroInput = document.getElementById('p_cod').value;
  const numeroFornecidoPeloUsuario = parseInt(numeroInput);
  itemVerificado = array_cod.find(item => item.lote === numeroFornecidoPeloUsuario);
  if (itemVerificado) {
    handleCodeFound();
    addButtonsGramature();
    bt_check = document.getElementById('bt_check'); // Criar o elemento bt_check
    addEventBtCheck(); // Adicionar o event listener após criar o elemento
  } else {
    handleCodeNotFound()
  }
}

// Função para dar título no conjunto de gramaturas
function addTitleButtonsGramature() {
  const t_g_mi = document.createElement('div');
  t_g_mi.setAttribute("class", "inspecao");
  t_g_mi.innerHTML = `Insira a gramatura:`;
  const g_i = document.createElement('div');
  g_i.setAttribute("id", "d_g_i");
  nav2.appendChild(t_g_mi);
  nav2.appendChild(g_i);
}

// Função para criar botão de verificação de gramatura
function buttonCheckGramature() {
  const divBtCheck = document.createElement('div');
  divBtCheck.setAttribute("class", "divBtCheck");
  const btCheck = document.createElement('button');
  btCheck.setAttribute("id", "bt_check");
  btCheck.setAttribute("class", "bt_check");
  btCheck.innerHTML = `Verificar gramatura`;
  nav2.appendChild(divBtCheck);
  divBtCheck.appendChild(btCheck);
}

// Função para adicionar os campos de inserir gramatura
function addButtonsGramature() {
  const campos_amostras = [...document.getElementsByClassName('campos_amostras')];
  if (campos_amostras.length === 0) {
    addTitleButtonsGramature();
    buttonCheckGramature();
    for (let o = 0; o < 15; o++) {
      criarElemento();
    }
  }
}

// Função para calcular a gramatura
function calculateGramature() {
  const div = document.getElementById('nav2');
  const inputs = div.getElementsByClassName('campos_amostras');
  resultado = [];
  let aux = 0.00;
  let soma = parseInt(0);
  let valor, gMax, gMin = 0;
  for (let i = 0; i < inputs.length; i++) {
    valor = parseFloat(inputs[i].value);
    gMax = (itemVerificado.gramatura + (itemVerificado.gramatura * (itemVerificado.tolerancia / 100)));
    gMin = (itemVerificado.gramatura - (itemVerificado.gramatura * (itemVerificado.tolerancia / 100)));
    aux = parseFloat(inputs[i].value);
    soma = soma + aux;
  }
  if (inputs.length > 0) {
    if ((soma / inputs.length).toFixed(2) > gMin && (soma / inputs.length).toFixed(2) < gMax) {
      retornoG = true;
      aprov_reprov();
    } else {
      retornoG = false;
      aprov_reprov();
    }
  }
  return resultado;
}

// Event listener no botão procurar
btn_proc.addEventListener("click", () => {
  if (codigo_proc.value == "") {
    handleEmptyInput()
   }else{
    procurar();
   }
});
