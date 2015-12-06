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

/* or factory pattern can use the Object() constructor */
/*
function createCalculator() {
  var o = new Object();
  o.add: function(vv) {
   this.total += vv;
  };
  o.subtract: function(vv) {
   this.total -= vv;
  };
  o.value: function() {
   return this.total;
  };
  o.total: 0;

  return o;
}
 */
