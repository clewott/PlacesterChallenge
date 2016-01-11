/*
 * This file is the plain js (jquery and prototypes) version of the interview programming exercises.
 * 
 * As the candidate, your tasks are
 *    1. load the html page into a browser and test its functionality
 *    2. note the bugs and fix them. Be prepared to explain your work. (use window.alert or a new span to put out error messages)
 *       - if you get stuck and can't make any progress, ask for help because getting some help and making progress is better
 *         than not getting anything done.
 *       2.1 explain the function pattern at the end
 *    3. extra credit: change the equation entry to free form text entry
 *       3.1 first, make it functionally equivalent to the existing entry
 *       3.2 second, allow any well formed equation using the given operators with the addition of parentheses
 *       
 */


// I added document.ready to ensure that the page is ready before any of this tries to run
$(document).ready(function() {
    // I set .operator to '+' because it is the default selction from the select menu 
var Equation = function() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = '+';
    this.answer = null;
};

Equation.prototype.compute = function() {
    switch (this.operator) {
    case '+':
        this.answer = this.operand1 + this.operand2;
        break;
    case '-':
        this.answer = this.operand1 - this.operand2;
        break;
    case '/':
        this.answer = this.operand1 / this.operand2;
        break;
    case '*':
        this.answer = this.operand1 * this.operand2;
        break;

    default:
        break;
    } 
    $('#answer').text(this.answer);
};

Equation.prototype.updateOperand = function(event) {
    // removed the # from the id it is checking since .id already indicates that
    if (event.currentTarget.id === 'operand1') {
        // I added the check in here for it to be undefined since the user could delete out the entry and cause it to spit out NaN
        if (eval($(event.currentTarget).val()) == undefined) {
            this.operand1 = 0;
        } else {
            // I changed it from parseInt to eval to be able to evaulate a free form equation
            this.operand1 = eval($(event.currentTarget).val());
        }
    }
    else { 
        if (eval($(event.currentTarget).val()) == undefined) {
            this.operand2 = 0;
        } else {
            this.operand2 = eval($(event.currentTarget).val());
        }
    }
   this.compute();
};

Equation.prototype.updateOperator = function(event) {
    this.operator = $(event.currentTarget).val();
    this.compute();
};

(function() {
    // WARNING: don't treat equation as a global variable in any changes you make
    var equation = new Equation();
    
    // Added .bind() to the equation becuase that ties it to the specific instance of equation
    $('#operator').change(equation.updateOperator.bind(equation));
    
    $('.operand').change(equation.updateOperand.bind(equation));
    
})();

});

// This specific .prototype pattern breaks down the object creation into multiple steps.
// The first method defines the constructor and propeties
// Then we are able to build on top of that and be able to call any of the related methods at any needed time for this particular object