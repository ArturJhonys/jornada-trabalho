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

// Evento onClick do botão Calcular
document.getElementById('btnCalcular').addEventListener('click',calculaHoras)

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