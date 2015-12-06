/*
  factory pattern, but not using Object constructor.
  Object is created within the return statement
 */
function createCalculator(){
    return {
        add: function(vv) {
            this.total += vv;
        },
        subtract: function(vv) {
            this.total -= vv;
        },
        value: function() {
            return this.total;
        },
        total: 0
    }
}

/*
  or factory pattern can use the Object() constructor
  */
/*
function createCalculator() {
  var o = new Object();
  o.add = function(vv) {
   this.total += vv;
  };
  o.subtract = function(vv) {
   this.total -= vv;
  };
  o.value = function() {
   return this.total;
  };
  o.total = 0;

 console.log('Factory Constructor');
  return o;
}
*/
/*
  Durable Constructor Pattern
  Variables created within the scope of the function are available
  to methods/functions within the function
 */
/*
function createCalculator() {
    var o = new Object();
    var total = 0;
    o.add = function(vv) {
        total += vv;
    };
    o.subtract = function(vv) {
        total -= vv;
    };
    o.value = function() {
        return total;
    };
    o.tkh = function() {
        return {
            nested : function() {
                return total;
            }
        };
    }
    console.log('Durable Constructor');

    return o;
}
*/