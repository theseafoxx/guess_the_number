/*
  for loop
 */

function repeat(text, count) {
    var textString = "";
    for(var ii=0; ii<count; ii++) {
        textString += text.toString();
    }
    return textString;
}

/*
  iterate over an array
 */
function sum(arr) {
    var total = 0;
    for(var ii= 0, len=arr.length; ii<len; ii++) {
        total += arr[ii];
    }
    return total;
}

/*
 nested loop
 */
function gridGenerator(num) {
    var grid = '';
    for(var ii=0; ii<num; ii++){
        for(var jj=0; jj<num; jj++){
            var temp = ii+jj;
            if(temp%2 == 0){
                grid += "#";
            } else {
                grid += " ";
            }
        }
        grid += "\n";
    }
    return grid;
}
/*
v
 */
function largestTriplet(longSide) {
    var parent = [3,4,5];
    var pptList = [];
    function child1(arr) {
        var a = arr[0];
        var b = arr[1];
        var c = arr[2];
        var triplet = [];
        triplet.push(-a + 2*b + 2*c);
        triplet.push(-2*a + b + 2*c);
        triplet.push(-2*a + 2*b + 3*c);
        return triplet.sort(function(a,b){return a > b;});
    }
    function child2(arr) {
        var a = arr[0];
        var b = arr[1];
        var c = arr[2];
        var triplet = [];
        triplet.push(+a + 2*b + 2*c);
        triplet.push(+2*a + b + 2*c);
        triplet.push(+2*a + 2*b + 3*c);
        return triplet.sort(function(a,b){return a > b;});
    }
    function child3(arr) {
        var a = arr[0];
        var b = arr[1];
        var c = arr[2];
        var triplet = [];
        triplet.push(+a - 2*b + 2*c);
        triplet.push(+2*a - b + 2*c);
        triplet.push(+2*a - 2*b + 3*c);
        return triplet.sort(function(a,b){return a > b;});
    }

    function findTriplet(arr){
        if(arr[2] > longSide) {
            return false;
        }
        if(arr[2] <= longSide){
            pptList.push(arr);
        }
        return findTriplet(child1(arr)) || findTriplet(child2(arr)) || findTriplet(child3(arr));
    }
    findTriplet(parent);
    var result = parent;
    for(var ii=0, len=pptList.length; ii<len; ii++) {
        var cur = pptList[ii];
        if(result[2] <= cur[2] && result[1] < cur[1]) {
            result = cur;
        }
    }
return result;

}

/* more looping over arrays */