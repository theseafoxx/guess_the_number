function RPNCalculator() {
    this.stash = [];
}

RPNCalculator.prototype = {
    push: function(num) {
        this.stash.push(num);
    },
    plus: function() {
        var check = this.stashCheck();
        if(check.status) {
            this.stash.push(check.param1 + check.param2);
        }
    },
    minus: function() {
        var check = this.stashCheck();
        if(check.status) {
            this.stash.push(check.param1 - check.param2);
        }
    },
    divide: function() {
        var check = this.stashCheck();
        if(check.status) {
            this.stash.push(check.param1 / check.param2);
        }
    },
    times: function() {
        var check = this.stashCheck();
        if(check.status) {
            this.stash.push(check.param1 * check.param2);
        }
    },
    value: function() {
        return this.stash.length? this.stash[this.stash.length-1]:"rpnCalculator is empty"
    },
    stashCheck: function() {
        var result = {
            status: false
        }
        if(this.stash.length < 1){
            throw "rpnCalculator is empty";
        } else if(this.stash.length < 2){
            throw "rpnCalculator does not have enough parameters for the operation";
        } else {
            result.status = true;
            result.param2 = this.stash.pop();
            result.param1 = this.stash.pop();
        }
        return result;
    }
}
Object.defineProperty(RPNCalculator.prototype, 'constructor', {
    enumerable: false,
    value: RPNCalculator
});