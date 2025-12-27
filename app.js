var keys = document.querySelectorAll('#calculator span');
var input = document.querySelector('.input');

// Keep track if we already added a decimal point
var hasDecimal = false;

// Add click event to each button
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function() {
		// Get current display value
		var currentDisplay = input.innerHTML;
		
		// Get the button value that was clicked
		var buttonValue = this.getAttribute("data-value");
		
		// Clear button - erase everything
		if(buttonValue == 'C') {
			input.innerHTML = '';
			hasDecimal = false;
		}
		
		// Equals button - calculate the answer
		else if(buttonValue == '=') {
			// Replace x with * and ÷ with / for calculation
			var calculation = currentDisplay;
			calculation = calculation.replace(/x/g, '*');
			calculation = calculation.replace(/÷/g, '/');
			
			// Calculate and show result
			if(calculation) {
				input.innerHTML = eval(calculation);
			}
			hasDecimal = false;
		}
		
		// Operator buttons (+, -, x, ÷)
		else if(buttonValue == '+' || buttonValue == '-' || buttonValue == '*' || buttonValue == '/') {
			// Get the last character
			var lastCharacter = currentDisplay[currentDisplay.length - 1];
			
			// Only add operator if display is not empty
			if(currentDisplay != '') {
				// Check if last character is not already an operator
				if(lastCharacter != '+' && lastCharacter != '-' && lastCharacter != '*' && lastCharacter != '/') {
					input.innerHTML = input.innerHTML + buttonValue;
				}
			}
			
			// Allow negative numbers at the start
			if(currentDisplay == '' && buttonValue == '-') {
				input.innerHTML = buttonValue;
			}
			
			hasDecimal = false;
		}
		
		// Decimal point button
		else if(buttonValue == '.') {
			// Only add decimal if we haven't added one yet
			if(hasDecimal == false) {
				input.innerHTML = input.innerHTML + buttonValue;
				hasDecimal = true;
			}
		}
		
		// Number buttons (0-9)
		else {
			input.innerHTML = input.innerHTML + buttonValue;
		}
	}
}