const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	test("convertHandler should correctly read a whole number input.",function(){
		assert.equal(5,convertHandler.getNum("5l"));
	});
	test("convertHandler should correctly read a decimal number input.",function(){
		assert.equal(5.7,convertHandler.getNum("5.7l"));
	});
	test("convertHandler should correctly read a fractional input.",function(){
		assert.equal(0.14285714285714285,convertHandler.getNum("1/7l"));
	});
	test("convertHandler should correctly read a fractional input with a decimal.",function(){
		assert.equal(0.47826086956521746,convertHandler.getNum("1.1/2.3kg"));
	});
	test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).",function(){
		assert.throws(function(){ convertHandler.getNum("1/1.1/2.3kg")}, Error, "error");
	});
	test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.",function(){
		assert.equal(1,convertHandler.getNum("kg"));
	});
	test("convertHandler should correctly read each valid input unit.",function(){
		assert.equal("kg",convertHandler.getUnit("kg"));
	});
	test("convertHandler should correctly return an error for an invalid input unit.",function(){
		assert.throws(function(){ convertHandler.getUnit("pa")}, Error, "error");
	});
	test("convertHandler should return the correct return unit for each valid input unit.",function(){
		assert.equal("L",convertHandler.getReturnUnit("gal"));
	});
	test("convertHandler should correctly return the spelled-out string unit for each valid input unit.",function(){
		assert.equal("gallons",convertHandler.spellOutUnit("gal"));
	});
	test("convertHandler should correctly convert gal to L.",function(){
		assert.equal(3.78541,convertHandler.convert(1,"gal"));
	});
	test("convertHandler should correctly convert L to gal.",function(){
		assert.equal(0.26417,convertHandler.convert(1,"L"));
	});
	test("convertHandler should correctly convert mi to km.",function(){
		assert.equal(1.60934,convertHandler.convert(1,"mi"));
	});
	test("convertHandler should correctly convert km to mi.",function(){
		assert.equal(0.62137,convertHandler.convert(1,"km"));
	});
	test("convertHandler should correctly convert lbs to kg.",function(){
		assert.equal(0.45359,convertHandler.convert(1,"lbs"));
	});
	test("convertHandler should correctly convert kg to lbs.",function(){
		assert.equal(2.20462,convertHandler.convert(1,"kg"));
	});
	//mio
	test("get proper return unit.",function(){
		assert.equal("gal",convertHandler.getReturnUnit("L"));
	});
	test("get proper return unit.",function(){
		assert.equal("L",convertHandler.getReturnUnit("gal"));
	});  
});
