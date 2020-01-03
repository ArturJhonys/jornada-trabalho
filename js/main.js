let calculaHoras = () => {

	// Pega os valores dos inputs
	let jornada = document.getElementById('j').value.newRecord()
	let entrada1 = document.getElementById('e1').value.newRecord()
	let saida1 = document.getElementById('s1').value.newRecord()
	let entrada2 = document.getElementById('e2').value.newRecord()
	
	// Define o parâmetro de Jornada de Trabalho
	let parametroJornadaTrabalho = jornada === null ? recordFromTotalMinutes(525) : jornada
	
	// Fórmula de cálculo de hora de saída
	let minutosTrabalhado = saida1.total - entrada1.total
	let minutosATrabalhar = parametroJornadaTrabalho.total - minutosTrabalhado
	let totalCalculo = entrada2.total + minutosATrabalhar
	
	let saida2 = recordFromTotalMinutes(totalCalculo)
	
	// Atualiza campo com o horário de saída
	document.getElementById("s2").value = saida2.desc
	
}
//Limpa Campos Carregados
let limpaCampo = () =>{

	document.getElementById('e1').value = ''
	document.getElementById('s1').value = ''
	document.getElementById('e2').value = ''
	document.getElementById("s2").value = ''
}

/* PROBLEMA AO CRIAR O CAMPO ELE ESTÁ REPETINDO O ULTIMO VALOR PARA A PROXIMA LINHA ADICIONADA */
let adicionaCampo = () =>{
	var novaEntradaSaida = document.querySelector('#areaCampoAdicional')
	var tabela = document.getElementById('tabela')
	var linha = tabela.rows.length
	console.log(linha)
	var texto = `<td class="celula"><input class="form-control form-control-sm inputHoras" type="time" id="e${linha+1}" class="record"></td>
	             <td class="celula"><input class="form-control form-control-sm inputHoras" type="time" id="s${linha+2}" class="record"></td>`
	
	 console.log(texto)
	novaEntradaSaida.insertAdjacentHTML('afterend',texto)
}

// Evento onClick do botão Calcular
document.getElementById('btnCalcular').addEventListener('click',calculaHoras)
document.getElementById('btnlimparCampo').addEventListener('click',limpaCampo)
document.getElementById('adicionaEntradaSaida').addEventListener('click',adicionaCampo)

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