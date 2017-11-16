$(document).ready(function () {
	$('.calc-input').focus();

	$('.header-background').on('click',function () {
		$('.calc-input').focus();
	});
	
	$('#calc-show').on('click', function () {
		calculator.show = true;
	});

});


var calculator = new Vue({
	el: '#calculator',
	data:{
		show: true,
		expression: "",
		raw_expr: "",
		result: 0,
		input_block: false
	},
	methods:{
		clear: function () {
			this.result = 0;
			this.expression = "";
			$('.calc-input').focus();
		},
		keyup: function (event) {
			event.preventDefault();

			if(lastIsOperator(this.expression)) { this.input_block=true;} else { this.input_block=false;}

			if(event.which==13){
				this.result = Calculate(toPostFix(splitExpression(this.raw_expr.split(' ')))).toFixed(2);
			} else if((event.which==43 || event.which==45 || event.which==46 || event.which==47 || event.which==42)&& this.input_block==false){
				this.expression += String.fromCharCode(event.keyCode);
			} else if(event.which>=49 && event.which<=57 && InputAfterDot(this.expression)){
				this.expression += String.fromCharCode(event.keyCode);
			} else if (event.which==48 && this.expression[this.expression.length-1]!='0') {
				this.expression += '0';
			} else if(event.which==40 || event.which==41){
				this.expression += String.fromCharCode(event.keyCode);
			}
		},
		keyPad: function (key) {
			this.expression += key;
		},
		calculate: function () {
			this.result = Calculate(toPostFix(splitExpression(this.raw_expr.split(' ')))).toFixed(2);
		}
	},
	watch:{
		expression: function(){
			this.raw_expr = "";
			if(this.expression[this.expression.length-2]=="+"){
				this.input_block==true;
			}
			for (x in this.expression){
				console.log(this.expression[x]);
			}
			for (char in this.expression){
				if(this.expression[char]!="="){
					this.raw_expr += " " + this.expression[char];
				}
			}
		}
	}
});

