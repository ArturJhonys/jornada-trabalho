const novaLinha = () => {
	return `<tr><td class="celula"><input class="form-control form-control-sm inputHoras" type="time" id="e${contador}" class="record"></td>` +
	`<td class="celula"><input class="form-control form-control-sm inputHoras" type="time" id="s${contador}" class="record"></td></tr>`
}

let calculaHoras = () => {
	// Pega os valores dos inputs
	let jornada = document.getElementById('j').value.newRecord()
	let entradaFinal = document.getElementById('ef').value.newRecord()
	
	let minutosTrabalhado = 0

	if (contador > 0){
		let i = 1
		let entrada = []
		let saida = []

		while(contador >= i){

			entrada = document.getElementById(`e${i}`).value.newRecord()
			saida = document.getElementById(`s${i}`).value.newRecord()

			minutosTrabalhado += saida.total - entrada.total
			i += 1
		}

	}

	// Define o parâmetro de Jornada de Trabalho
	let parametroJornadaTrabalho = jornada === null ? recordFromTotalMinutes(525) : jornada

	// Formula
	let minutosATrabalhar = parametroJornadaTrabalho.total - minutosTrabalhado
	let totalCalculo = entradaFinal.total + minutosATrabalhar	
	let saidaFinal = recordFromTotalMinutes(totalCalculo)
	
	// Atualiza campo com o horário de saída
	document.getElementById("sf").value = saidaFinal.desc
	
}

//Limpa Campos Carregados
let limpaCampo = () =>{
	let i = 1

	//limpa linhas dinâmicas
	while(contador >= i){
		document.getElementById(`e${i}`).value = ''
		document.getElementById(`s${i}`).value = ''	
		i += 1						
	}
	
	//limpa as linhas fixas
	document.getElementById('ef').value = ''
	document.getElementById("sf").value = ''
}

let adicionaCampo = () =>{
	contador += 1
	tabela.innerHTML += novaLinha()
}

//contador de linhas de entrada
var contador = 1

// Evento onClick do botão Calcular
document.getElementById('btnCalcular').addEventListener('click',calculaHoras)
document.getElementById('btnlimparCampo').addEventListener('click',limpaCampo)
document.getElementById('adicionaEntradaSaida').addEventListener('click',adicionaCampo)

var tabela = document.getElementById('corpoTabela')

tabela.innerHTML += novaLinha()


// Estrutura do registro de ponto 
var record = function (h, m, t, d){
	this.hours = h
	this.minutes = m
	this.total = t
	this.desc = d
}

// External Method para criação de um novo Registro de ponto
String.prototype.newRecord = function(){
	
	if (this === "")
		return null
	var h = parseInt(this.split(":")[0]) 
	var m = parseInt(this.split(":")[1])
	var t = h * 60 + m
	return new record(h, m, t, this)
}

// Metodo para criar um registro de ponto a partir de total de minutos
const recordFromTotalMinutes = (total) => {

	var h = Math.floor(total/60)
	var m = total - h * 60
	var desc = String(h).concat(":").concat(("00"+String(m)).slice(-2))

	return new record(h, m, total, desc)
}

