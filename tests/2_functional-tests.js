const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	test("GET a basic request from /", function(){
		chai.request(server)
		.get('/')
		.end((err,res)=>{
			assert.equal(res.status,200);
			//assert.equal(res.text)
		});	
	});
	test("Convert a valid input such as 10L: GET request to /api/convert.", function(){
		chai.request(server)
		.get('/api/convert?input=3.1mi')
		.end((err,res)=>{
			assert.equal(res.status,200);
			assert.equal(res.text,'{"initNum":3.1,"initUnit":"mi","returnNum":4.98895,"returnUnit":"km","string":"3.1 miles converts to 4.98895 kilometers"}')
		});	
	});
	test("Convert an invalid input such as 32g: GET request to /api/convert.", function(){
		chai.request(server)
		.get('/api/convert?input=32g')
		.end((err,res)=>{
			assert.equal(res.status,200);
			assert.equal(res.text,'invalid unit')
		});	
	});
	test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", function(){
		chai.request(server)
		.get('/api/convert?input=3/7.2/4kg')
		.end((err,res)=>{
			assert.equal(res.status,200);
			assert.equal(res.text,'invalid number')
		});	
	});
	test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", function(){
		chai.request(server)
		.get('/api/convert?input=3/7.2/4kilomegagram')
		.end((err,res)=>{
			assert.equal(res.status,200);
			assert.equal(res.text,'invalid number and unit')
		});	
	});
	test("Convert with no number such as kg: GET request to /api/convert.", function(){
		chai.request(server)
		.get('/api/convert?input=kg')
		.end((err,res)=>{
			assert.equal(res.status,200);
			assert.equal(res.text,'{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}')
		});	
	});
});
