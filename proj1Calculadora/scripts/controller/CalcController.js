class CalcController{
	
	/* 
	Criando o construtor da classe CalcController, tudo que está dentro dele será executado 
	ao instânciar a classe
	*/
	constructor(){
		// EL = Convenção de element
		// this se refere a esta instância
		this._operation = [];
		this._locale = 'pt-br';
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		this._currentDate;
		this.initialize();		
		this.initButtonsEvents();
	}

	initialize(){
		/* Let = Defini variáveis dentro do escopo
		let dateEl = document.querySelectior("#data");
		
		Inner HTML insere é uma propriedade para manipular o dom, 
		ele pega o objeto e insere uma informação dentro dele substituindo uo agregando a atual.
		A informação é passada no formato html.
		
		Agregando
		displayCalcEl.innerHTML += "45654";
		Substitiundo
		displayCalcEl.innerHTML = "4567";
		*/
		// setInterval executa uma ação entre um determinado espaço de tempo
		// Iniciando a função para mostrar o tempo e a data
		this.setDisplayDateTime();
		// Criando um setInterval para que a função continue a ser executada de segundo em segundo
		let interval = setInterval(()=>{
			this.setDisplayDateTime();
		}, 1000);

		// setTimeout termina uma ação depois de um determinado espaço de tempo
		/* 
		setTimeout(()=>{
		 	clearInterval(interval);
		},10000);
		*/
	}
	addEventListenerAll(element, events, fn){

		events.split(' ').forEach(event => {
			element.addEventListener(event, fn, false);
		});

	}

	setError(){
		this.displayCalc = "Error";
	}

	clearAll(value){
		this._operation = [];
	}

	clearEntry(){
		this._operation.pop();
	}

	addOperation(value){
		this._operation.push(value);
		console.log(this._operation);
	}

	execBtn(value){
		switch (value) {
			case 'ac':
			
			break;
			case 'ce':
			
			break;
			case 'soma':
			
			break;
			case 'subtracao':
			
			break;
			case 'divisao':

			break;
			case 'multiplicacao':

			break;
			case 'porcento':
			
			break;
			case 'igual':

			break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			this.addOperation(parseInt(value));
			break;
			default:
				console.log(value);
				this.setError();
				break;
			}
		}

	// Criando a função para 
	initButtonsEvents(){
		// Traz o primeiro resultado
		// document.querySelector("#buttons > g, #parts > g")
		// Traz todos os resultados
		let buttons = document.querySelectorAll("#buttons > g, #parts > g");
		// Usando o foreach para percorrer cada item da lista
		buttons.forEach(/*Btn será o parametro que que receberá a informação de cada item*/btn =>{
			// Usando o event listener para ouvir a chamada de algum evento, no caso, o de click
			this.addEventListenerAll(btn,'click drag',e =>{
				// Imprimindo no console o nome da classe do botão já retirando a palavra btn-
				console.log(btn.className.baseVal.replace("btn-",""));
				let textButton = btn.className.baseVal.replace("btn-","");

				this.execBtn(textButton);
			});

			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
				btn.style.cursor = "pointer";
			});
		});
	}


	setDisplayDateTime(){
		// Definindo que o displayDate vai receber a data padrão pt br com o mês por extenso
		this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
			day:'2-digit',
			month: 'long',
			year: 'numeric'
		});
		// Definindo que o displayTime vai receber a hora no padrão pt-br
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);	
	}

	// Get display time para recuperar as informações que foram inseridas nele
	get displayTime(){
		return this._timeEl.innerHTML;
	}
	// Set display time para inserir informações nele
	set displayTime(value){
		this._timeEl.innerHTML = value;
	}
	
	// Get display date para recuperar as informações que foram inseridas nele
	get displayDate(){
		return this._dateEl.innerHTML;
	}
	
	// Set display date para inserir informações nele
	set displayDate(value){
		this._dateEl.innerHTML = value;
	}
	
	// Get display Calc para recuperar as informações que foram inseridas nele
	get displayCalc(){
		return this._displayCalcEl.innerHTML;
	}

	// Set display Calc para inserir informações nele
	set displayCalc(value){
		this._displayCalcEl.innerHTML = value;
	}
	
	// Get current date current date para recuperar as informações que foram inseridas nele
	get currentDate(){
		return new Date();
	}

	// Set current date current date para inserir informações nele
	set currentDate(value){
		this._currentDate = value;
	}

}