const array_lotes = [
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
const t = 1;
const k = 0;
let id = 1; //id of the createInputsGramature()
const resultado = [];
const array_result = [];
let bt_check = null;

// Inputs
const findByCode = document.getElementById("p_cod");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");

// Functions

// Função para criar elemento campos para gramatura
function createInputsGramature() {
  let li = document.getElementById('idDivGramatures');
  let div = document.createElement('div');
  div.setAttribute("id", id);
  div.setAttribute("class", "divGramatures");
  let novoElemento = document.createElement('input');
  let novoLabel = document.createElement('label');
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

//gerador de div
function geraneratorDivs(id, texto, tagClass){
  const div = document.createElement("div");
  div.setAttribute("id", id);
  div.setAttribute("class", tagClass);
  div.innerHTML = texto;
  nav1.appendChild(div);
}

// Função para retornar mensagem caso campo de procura esteja vazio
function caseEmptyInput() {
  const div_to = document.getElementById('mensageResultLote');
  let messageInsertLote = geraneratorDivs("mensageResultLote",`Insira um lote!`, "descricaoTrue" );
  if (div_to == undefined) {
    messageInsertLote;
  } else {
    messageInsertLote;
    div_to.remove();
  }
}

// Função para retornar mensagem caso lote encontrado
function caseCodeFound() {
  const element = document.getElementById('mensageResultLote'); 
  let setResultFindByLote = geraneratorDivs("mensageResultLote",`O cartão ${itemVerificado.nome} ${itemVerificado.gramatura} g/m² <br> tem uma tolerância de ${itemVerificado.tolerancia}%`, "descricaoTolerancia" );
  if (element) {
    element.remove();
    setResultFindByLote;
  } else {
    setResultFindByLote;
  }
}

// Função para retornar mensagem caso campo de procura esteja vazio
function caseCodeNotFound() {
  const mensageResultLote = document.getElementById('mensageResultLote');
  let messageInvalidLote = geraneratorDivs("mensageResultLote",`Lote invalido!`, "descricaoTrue" );
  if (mensageResultLote == undefined) {
    messageInvalidLote;
  } else {
    mensageResultLote.remove();
    messageInvalidLote;
  }
}

function resultCalculationGramature(retornoG) {
  const msgResultCalculate = document.getElementById('msgResultCalculate');
  let statusMessage;
  switch (retornoG) {
    case true:
      statusMessage = 'Resultado: aprovado';
      break;
    
    case false:
      statusMessage = 'Resultado: reprovado';
      break;
  }
  if (msgResultCalculate != undefined) {
    msgResultCalculate.remove();
  }
  geraneratorDivs("msgResultCalculate", statusMessage, "descricaoTolerancia");
}

// Função para adicionar o listener de evento ao bt_check
function addEventBtCheck() {
  if (bt_check !== null) {
    bt_check.addEventListener("click", function() {
      calculateGramature();
    });
  }
}

// Função para procurar o número do lote
let itemVerificado = null;
function findLote() {
  const numeroInput = document.getElementById('p_cod').value;
  const numeroFornecidoPeloUsuario = parseInt(numeroInput);
  itemVerificado = array_lotes.find(item => item.lote === numeroFornecidoPeloUsuario);
  if (itemVerificado) {
    caseCodeFound();
    addButtonsGramature();
    bt_check = document.getElementById('bt_check'); // Criar o elemento bt_check
    addEventBtCheck(); // Adicionar o event listener após criar o elemento
  } else {
    caseCodeNotFound()
  }
}

// Função para add título no conjunto de gramaturas
function addTitleButtonsGramature() {
  const title = document.createElement('div');
  title.setAttribute("class", "inspecao");
  title.innerHTML = `Insira a gramatura:`;
  const divInputsGramatures = document.createElement('div');
  divInputsGramatures.setAttribute("id", "idDivGramatures");
  nav2.appendChild(title);
  nav2.appendChild(divInputsGramatures);
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

// Função para adicionar os campos para inserir gramatura
function addButtonsGramature() {
  const campos_amostras = [...document.getElementsByClassName('campos_amostras')];
  if (campos_amostras.length === 0) {
    addTitleButtonsGramature();
    buttonCheckGramature();
    for (let o = 0; o < 3; o++) {
      createInputsGramature();
    }
  }
}

// Função para calcular a gramatura
function calculateGramature() {
  const div = document.getElementById('nav2');
  const inputs = div.getElementsByClassName('campos_amostras');
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
  responseCalculateGramature(soma, gMax, gMin);
}
// Função para retornar se aprovado ou reprovado o calculo de gramatura
function responseCalculateGramature(soma, gMax, gMin) {
  const div = document.getElementById('nav2');
  const inputs = div.getElementsByClassName('campos_amostras');
  if (inputs.length > 0) {
    let retornoG = false;
    if ((soma / inputs.length).toFixed(2) > gMin && (soma / inputs.length).toFixed(2) < gMax) {
       retornoG = true;
    } else {
       retornoG = false;
    }
    resultCalculationGramature(retornoG);
  }
}

// Add Event listener no botão procurar
btn_proc.addEventListener("click", () => {
  if (findByCode.value == "") {
    caseEmptyInput()
   }else{
    findLote();
   }
});
