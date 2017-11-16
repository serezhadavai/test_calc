
function getPriority(operand){
	switch(operand){
		case '*': return 2; break;
		case '/': return 2; break;
		case '+': return 1; break;
		case '-': return 1; break;
		default: return 0; break;
	}
}

function toPostFix(str){
	let stack = [];
	let output = [];
	let result = [];

	for (char in str){
		if(parseFloat(str[char])){
			output.push(str[char]);
		} else if(str[char]=='+' || str[char]=='-'||str[char]=='*'|| str[char]=='/'){
			if(stack.length == 0){
				stack.push(str[char]);
			}
			else if(getPriority(stack[stack.length-1])>=getPriority(str[char])){
				output.push(stack[stack.length-1]);
				stack.splice(-1);
				stack.push(str[char]);
			} else if(getPriority(stack[stack.length-1])<getPriority(str[char])){
				stack.push(str[char]);
			}
		} else if(str[char]=='('){
			stack.push(str[char]);
		} else if(str[char]==')'){
			for(var i=stack.length-1; i>=0; i--){
				if (stack[i]=='(') {
					output.push(stack[i+1]);
					stack.splice(i,1);
					stack.splice(i,1);
				}
			}
		}
	}
	result = output.concat(stack.reverse());
	return result;
}

function lastIsOperator(str){
	if(str[str.length-1]=='+' || str[str.length-1]=='-'|| str[str.length-1]=='*' || str[str.length-1]=='/'|| str[str.length-1]=='.'){
		return true;
	} else {
		return false;
	}
}

function InputAfterDot(str) {
	if(str[str.length-3]=='.' && !lastIsOperator(str)){
		return false;
	} else {
		return true;
	}
}

function operation(x,y,operator){
	switch (operator){
		case '*': return x*y; break;
		case '/': 
		if(isFinite(y/x)){
			return y/x; 
		} else {
			alert("Произошло деление на ноль");
		}
		break;
		case '+': return x+y; break;
		case '-': return y-x; break;
		default: return 0; break;
	}
}

function Calculate(expr) {
	let result = 0;
	let stack = [];

	//console.log('EXPRESSION ' + expr);

	for (char in expr){
		if (parseFloat(expr[char])){
			stack.push(parseFloat(expr[char]));
		} else if (expr[char]=='+' || expr[char]=='-'||expr[char]=='*'|| expr[char]=='/') {
			let temp = operation(stack[stack.length-1],stack[stack.length-2],expr[char]);
			stack.splice(stack.length-1,1);
			stack.splice(stack.length-1,1);
			stack.push(temp);
			result = temp;
		}
	}
	return result;
}

function splitExpression(array){

	var stack = [];
	var result_array = [];

	function splitInArray(array){

		for (item in array){
			if(Number(array[item]) || array[item]=='.' ){
				stack.push(array[item]);
			} else if (array[item]=='+' || array[item]=='*' || array[item]=='/' ) {
				if(stack.length>0){
					result_array.push(converter(stack));
				}
				result_array.push(array[item]);
				stack = [];
			} else if(array[item]=='0'){
				stack.push(array[item]);
			} else if(item==1 && array[item]=='-'){
				stack.push(array[item]);
			} else if(array[item]=='-'){
				if(stack.length>0){
					result_array.push(converter(stack));
				}
				result_array.push(array[item]);
				stack = [];
			} else if(array[item]=='('){
				result_array.push(array[item]);
				stack = [];
			} else if(array[item]==')'){
				if (stack.length>=1){
					result_array.push(converter(stack));
				}
				result_array.push(')');
				stack = [];
			}
		}
		result_array.push(converter(stack));

		return result_array;
	}

	function converter(expr) {
		if(expr.length>1){
			return parseFloat(expr.toString().split(",").join(""));
		} else {
			return parseFloat(expr);
		}
	}

	;
	return splitInArray(array);
}