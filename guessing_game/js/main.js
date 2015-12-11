function GuessingGame(el, options, messages) {
    this.settings = $.extend({
         rangeStart: 1
        ,rangeEnd: 10
        ,allowedGuesses: 5
    },options);
    this.messages = $.extend({
         winner: "You Are A <span class=\"colorful\">WINNER</span>!"
        ,lost: "Sorry, game over. Try again."
        ,duplicate: "Duplicate entry, try again."
        ,reset: "Your game has been restarted, enter a new guess!"
        ,error: "Please enter digits only between " + this.settings.rangeStart + "-" + this.settings.rangeEnd + "."
        ,welcome: "Enter a Number Between " + this.settings.rangeStart + "-" + this.settings.rangeEnd
        ,guessPlaceHolder: "Input Number " + this.settings.rangeStart + "-" + this.settings.rangeEnd
    }, messages);
    this.el = el;
    this.init('new');

}

GuessingGame.prototype = {
     init : function(type) {
         var self = this;
         this.winningNum = this.generateWinningNumber();
         this.hint = this.generateHint();
         this.status = "play";
         this.usedGuesses = 0;
         this.guessRecord = [];
         this.currentGuess = "";
         this.el.find('input[name=guess]').val("").attr("placeholder",this.messages.guessPlaceHolder);
         if(type == 'new' || type == 'reset') {
             this.el.off('.guess');
             /* need the event handler to call anonymous functions which then call a function within the instance scope */
             this.el.on('click.guess', 'input[name=btnGuess]', function (e) {
                 self.playersGuessSubmission();
             });
             this.el.on('keyup.guess', 'input[name=guess]', function (e) {
                 if (e.keyCode === 13) {
                     self.playersGuessSubmission();
                 }
             });
         }
         if(type == 'new') {
             this.displayMessages(this.settings.allowedGuesses, this.messages.welcome);
             this.el.on('click', 'input[name=btnReset]', function() {
                 self.playAgain();
             });
             this.el.on('click', 'input[name=btnHint]', function() {
                 self.provideHint();
             });
         }
         console.log(this.winningNum);
         console.log(this.hint);
     }
    ,generateWinningNumber : function() {
        return Math.floor(Math.random() * (this.settings.rangeEnd - this.settings.rangeStart +1)) + this.settings.rangeStart;
    }
    ,generateHint : function(){
        var hint = [this.winningNum];
        var curNum;
        while( hint.length < 5 ) {
            curNum = this.generateWinningNumber();
            if( hint.indexOf(curNum) < 0 ) {
                hint.push(curNum);
            }
        }
        return hint.sort(function(a,b){return a > b;}).join(', ');
    }
    ,checkGuess : function() {
        /* check if this is a unique guess */
        if(isNaN(this.currentGuess)) {
            /* something other than a number was entered */
            return this.messages.error;
        } else if( this.guessRecord.indexOf(this.currentGuess) > -1 ){
            /* this guess was already made */
            return this.messages.duplicate;
        } else {
            /* new guess */
            ++this.usedGuesses;
            this.guessRecord.push(this.currentGuess);
            /* check if it is a winner */
            if(this.currentGuess === this.winningNum){
                this.status = "won";
                return this.messages.winner;
            } else {
                /* return clues */
                if(this.usedGuesses != this.settings.allowedGuesses){
                    var result = this.lowerOrHigher();
                    return "Your guess is " + result.position + " and " + result.within + " digits away from the winning number.";
                } else {
                    this.status = "lost";
                    return this.messages.lost;
                }
            }
        }
    }
    ,playersGuessSubmission : function() {
        this.currentGuess = +this.el.find('input[name=guess]').val();
        var msg = this.checkGuess();

        if(this.usedGuesses === this.settings.allowedGuesses || this.status === "won") {
            /* no more guesses allowed */
            /* remove submission ability */
            this.el.off('.guess');
        }
        this.displayMessages(this.settings.allowedGuesses - this.usedGuesses, msg);
    }
    ,provideHint : function() {
        this.displayHint(this.hint);
    }
    ,playAgain : function() {
        /* re-initialize variables */
        this.init('reset');
        /* reset messages */
        this.displayMessages(this.settings.allowedGuesses, this.messages.reset);
        this.displayHint("");
    }
    ,lowerOrHigher : function() {
        var diff = Math.abs(this.currentGuess - this.winningNum);
        var within = "less than 20";
        if(diff > 20) {
            within = "more than 20";
        } else if(diff < 5) {
            within = "less than 5";
        } else if(diff < 10) {
            within = "less than 10";
        }

        if(this.currentGuess > this.winningNum){
            return {position: 'higher', within: within};
        } else {
            return {position: 'lower', within: within};
        }
    }
    ,displayMessages : function(availableGuesses, msg) {
        this.el.find('#gameStatus').html(msg);
        this.el.find('#guessNum').text(availableGuesses);
    }
    ,displayHint : function(msg) {
        this.el.find('#hint').text(msg);
    }
};

Object.defineProperty(GuessingGame.prototype, 'constructor', {
     value: GuessingGame
    ,enumerable: false
});

var guessTheNumber = new GuessingGame($('main'),{rangeEnd: 100});