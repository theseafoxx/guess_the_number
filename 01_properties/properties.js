function setPropertiesOnObjLiteral(object) {
    object.x = 7;
    object.y = 8;
    object.onePlus = function(value) {
      return value + 1;
    };
}

function setPropertiesOnArrayObj(arrayObject){
    arrayObject['hello'] = function (){
        return 'Hello!';
    };
    arrayObject['full'] = "stack";
    arrayObject[0] = 5;
    arrayObject.twoTimes = function(value) {
      return value * 2;
    };
}

function setPropertiesOnFunctionObj(functionObject){

    functionObject.year = 2015;
    functionObject.divideByTwo = function(value) {
      return value / 2;
    };
    functionObject.prototype.helloWorld = function() {
        return "Hello World";
    }
    
}