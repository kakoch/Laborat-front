//getElements
const numero_lote = document.getElementById("numero_lote")
const fornecedor = document.getElementById("fornecedor")
const nome_cartao = document.getElementById("nome_cartao")
const gramatura = document.getElementById("gramatura")
const formato = document.getElementById("formato")
const of = document.getElementById("of")
const numero_bobinas = document.getElementById("numero_bobinas")
const sub_form = document.getElementById("sub_form")

//functions
function getElements(){
    console.log(numero_lote.value + fornecedor.value + nome_cartao.value + gramatura.value + formato.value + of.value + numero_bobinas.value)
}

//eventsListener
sub_form.addEventListener("click", function() {
    getElements()
})