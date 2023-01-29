'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route("/api/convert/").get((req,res)=>{
  	const input = req.query.input;
  	const reg3 = convertHandler.regexp;
    const regUnit = convertHandler.regexpUnit;
    const regNumber = convertHandler.regexpNumber;
  	//console.log(reg3.test(input))
  	if(!reg3.test(input)){
      if(!regNumber.test(input)&&!regUnit.test(input)){
        res.send("invalid number and unit");
      } else if (!regNumber.test(input)&&regUnit.test(input)) {
        res.send("invalid number");
      } else if (!regUnit.test(input)&&regNumber.test(input)){
        res.send("invalid unit");
      }
  		/*res.send(
  			"invalid input"
  		);*/	
  	} else {
  		console.log(typeof convertHandler.getNum(input)+" "+convertHandler.getNum(input));
	  	res.json({
	  		"initNum":convertHandler.getNum(input),
	  		"initUnit":convertHandler.getUnit(input),
	  		"returnNum":Number(convertHandler.convert(convertHandler.getNum(input),convertHandler.getUnit(input))),
	  		"returnUnit":convertHandler.getReturnUnit(convertHandler.getUnit(input)),
	  		"string": convertHandler.getString(convertHandler.getNum(input),
                  convertHandler.spellOutUnit(convertHandler.getUnit(input)),
                  Number(convertHandler.convert(convertHandler.getNum(input),
                  convertHandler.getUnit(input))),
                  convertHandler.spellOutUnit(convertHandler.getReturnUnit(convertHandler.getUnit(input)))),
	 	});
  	}
  });
};
