function ConvertHandler() {
  
  this.regexp = /^((\d+|\d+.\d+)(\/(\d+|\d+.\d+))?)?(l|lbs|kg|gal|km|mi){1}$/i
  this.regexpUnit = /^([^a-zA-Z]*)?(l|lbs|kg|gal|km|mi){1}$/i
  this.regexpNumber = /^((\d+|\d+.\d+)(\/(\d+|\d+.\d+))?)?([a-zA-Z])/
  this.spellOut = {
    "km":"kilometers",
    "mi":"miles",
    "L":"liters",
    "gal":"gallons",
    "kg":"kilograms",
    "lbs":"pounds"
  }
  /*
  const text2 = "1.1/1.2l"
  console.log(this.regexp.test(text2));
  returns Array ["1.1/1.2l", "1.1/1.2", "1.1", "/1.2", "1.2", "l"]
  */
  
  this.getNum = function(input) {
    let result;
    let qw = this.regexp.exec(input);
    if(!this.regexp.test(input)){
      throw new Error("error");

    } else if(!/\//.test(input)){
      if (qw[1]){
      result = Number(qw[1]);
      }  else {
        result = Number(1);
      }
    } else {
      result = Number(qw[2]) / Number(qw[4]);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let qw = this.regexp.exec(input);
   
    result = "";
    if(!this.regexpUnit.test(input)){
      throw new Error("error");
    } else {
    let unit = qw[qw.length-1].toLowerCase();
    if (unit=="l"){
      unit = unit.toUpperCase();
    }
      result = unit;
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
      switch (initUnit){
        case "L": result= "gal";break;
        case "gal": result= "L";break;
        case "kg": result= "lbs";break;
        case "lbs": result= "kg";break;
        case "km": result= "mi";break;
        case "mi": result= "km";break;
        default: result = false;

      }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
      result = this.spellOut[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit){
        case "L": result= initNum/galToL;break;
        case "gal": result= initNum*galToL;break;
        case "kg": result= initNum/lbsToKg;break;
        case "lbs": result= initNum*lbsToKg;break;
        case "km": result= initNum/miToKm;break;
        case "mi": result= initNum*miToKm;break;
        default: result = false;

      }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    /*3.1 miles converts to 4.98895 kilometers*/
    return result;
  };
   
}

module.exports = ConvertHandler;
