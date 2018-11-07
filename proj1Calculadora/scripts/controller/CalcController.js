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

		// Para inicar com 0
		this.setLastNumberToDisplay();
		// setTimeout termina uma ação depois de um determinado espaço de tempo
		/* 
		setTimeout(()=>{
		 	clearInterval(interval);
		},10000);
		*/
	}
	addEventListenerAll(element, events, fn){
		/* Criando um separador usando o metodo split, ele transforma tudo 
		que estiver espaçado com o valor definido por parametro em indice de array
		Fazendo um foreach com os índices do array obitdos através do split
		*/
		events.split(' ').forEach(event => {
			/* Adicionando evento para cada um dos botões, 
			passando  o evento do click, a função e o false é para que o clique não se repita.*/
			element.addEventListener(event, fn, false);
		});

	}
	// Definindo uma função para caso ocorra um erro que ele seja disparado na tela
	setError(){
		this.displayCalc = "Error";
	}
	// Definindo uma função para limpar a tela da calculadora
	clearAll(value){
		this._operation = [];
	}		
	// Definindo uma função para limpar a ultima entrada da calculadora
	clearEntry(){
		this._operation.pop();
	}
	// Definindo uma função para buscar a ultima operação feita na calculadora
	getLastOperation(){

		return this._operation[this._operation.length-1];

	}
	// Definindo uma função para adicionar função a calculadora
	setLastOperation(value){
		this._operation[this._operation.length-1] = value;
	}
	// Definindo uma função para definir se é um operador
	isOperator(value){
		return (['+','-','*','/','%'].indexOf(value) > -1);
	}

	pushOperation(value){

		this._operation.push(value); 

		if (this._operation.length > 3){
			this.calc();
		}
	}

	calc(){
		let last = '';
		if(this._operation > 3){
			let last = this._operation.pop(); 
		}
		let result = eval(this._operation.join(""));
		// console.log(this._operation);
		if(last == "%"){
			result /= 100;
			this._operation = [result];

		}else{

			this._operation = [result];
			if(last) this._operation.push(last);
		}
		this.setLastNumberToDisplay();
	}

	setLastNumberToDisplay(){
		let lastNumber;
		for( let i =this._operation.length-1; i>= 0; i--){
			if(!this.isOperator(this._operation[i])){
				lastNumber = this._operation[i];
				break;
			}
		}
		if(!lastNumber) lastNumber = 0;
		this.displayCalc = lastNumber;
	}

	// Definindo uma função para adicionar um operador
	addOperation(value){
		// Imprimindo se a entrada é um número ou não 
		// console.log('A',value, isNaN(this.getLastOperation()));
		// Se não é um número (is Not a Number), faça uma ação
		if(isNaN(this.getLastOperation())){
		// Verificando se é um operador através da função isOperator
		if(this.isOperator(value)){
			// Se receber um operador troca pelo operador anterior
			this.setLastOperation(value);
		// Se for outra entrada
	}else if(isNaN(value)){
			// Imprime no console
			// console.log(value);
		}else{
			// Se esta for um número insere no array
			this.pushOperation(value);
			// Atualiza o display
			this.setLastNumberToDisplay();
		}
	}else{
		if(this.isOperator(value)){
			this.pushOperation(value);

		}else{
		// Se for um número, transforma em string e adiciona
		// Os outros números clicados para que não se tranformem em outros 
		// Indíces de array fazendo assim um número só como por exemplo 1232
		let newValue = this.getLastOperation().toString() + value.toString();
		// Insere no array o número já convertido
		this.setLastOperation(parseInt(newValue));
		// Atualiza o display
		this.setLastNumberToDisplay();
	}
}
	// Imprime no console o array com todos os valores atuais
	// console.log(this._operation);
}

execBtn(value){
	switch (value) {
		case 'ac':
		this.clearAll();
		this.setLastNumberToDisplay();
		break;
		case 'ce':
		this.clearEntry();
		this.setLastNumberToDisplay();

		break;
		case 'soma':
		this.addOperation('+');
		break;
		case 'subtracao':
		this.addOperation('-');
		break;
		case 'divisao':
		this.addOperation('/');
		break;
		case 'multiplicacao':
		this.addOperation('*');
		break;
		case 'porcento':
		this.addOperation('%');
		break;
		case 'igual':
		this.calc();
		break;
		case 'ponto':
		this.addOperation('.');
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
				// console.log(btn.className.baseVal.replace("btn-",""));
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