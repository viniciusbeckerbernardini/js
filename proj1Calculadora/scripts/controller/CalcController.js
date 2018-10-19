class CalcController{
	
	constructor(){

		this._displayCalc = "0";
		this._currentDate;
		this.initialize();

	}

	initialize(){
		// Let = Defini variáveis dentro do escopo
		// EL = Convenção de element
		let displayCalcEl = document.querySelector("#display");
		let dateEl = document.querySelector("#data");
		let timeEl = document.querySelector("#hora");

		/*
		Inner HTML insere é uma propriedade para manipular o dom, 
		ele pega o objeto e insere uma informação dentro dele substituindo uo agregando a atual.
		A informação é passada no formato html.
		*/
		// Agregando
		// displayCalcEl.innerHTML += "45654";
		// Substitiundo
		displayCalcEl.innerHTML = "4567";
		dateEl.innerHTML = "19/09/2018";
		timeEl.innerHTML = "13:10";
	}

	get displayCalc(){
		return this._displayCalc;
	}

	set displayCalc(value){
		this._displayCalc = value;
	}

	get currentDate(){
		return this._currentDate;
	}

	set currentDate(value){
		this._currentDate = value;
	}

}