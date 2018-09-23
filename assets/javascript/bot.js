function chatBot() {

    this.input = '';

    this.how = ['how old are you?', '1 day ago :)', 'how are you?', 'i am fine. Thanks :)', 'what is your job?', 'i am nothing job !'];
    this.what = ['what is your name?', 'my name is mr.mohammad rahmani :)', 'what is my name?', 'your name: ' + sessionStorage.getItem('name') ? sessionStorage.getItem('name') : ''];
    this.my = ['my name is'];

    this.hiresponse = ['hi', 'hello', 'hi there'];
    this.hiresponsed = [];

    this.response = function(input) {

        this.input = input.toLowerCase();

        if(this.match('(hi|hello|hey|سلام)(\\s|!|\\.|$)')){
            var item = this.getHi();
            var op = 0;
            while (true) {
                if (this.checkUniqHi(item)) {
                    return item;
                }

                if (op == 3) {
                    return "what are you doing?";
                }

                op++;
            }
        }

        if(this.match('what[^ ]*')) {
            for (var w =0;w<this.what.length;w++) {
                if (this.what[w] == this.input){
                    if (w == 0 && this.you == '') {
                        return this.what[w+1] + ' what is your name too?';
                    }

                    return this.what[w+1];
                }
            }
        }
		
		if(this.match('how[^ ]*')) {
            for (var h =0;h<this.how.length;h++) {
                if (this.how[h] == this.input){                  
                    return this.how[h+1];
                }
            }
        }

        if(this.match('my[^ ]*')) {
            for (var w =0;w<this.my.length;w++) {
                if (this.my[w].split(' ')[1] == this.input.split(' ')[1]){
                    sessionStorage.setItem('name', this.input.split(' ')[3]);
                    return 'ok your name is set -:)';
                }
            }
        }

        if(this.match('l(ol)+') || this.match('(ha)+(h|$)'))
            return "what's so funny?";

        if(this.match('^no+(\\s|!|\\.|$)'))
            return "don't be such a negative nancy :(";

        if(this.match('ok|good'))
            return ":)";

        if(this.match('see you later'))
            return ["alright, see you around", "good teamwork!"];

        if(this.match('(dumb|stupid|is that all)'))
            return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];

        if(this.input == 'noop')
            return;

        return input + " what?";
    };

    this.getHi = function () {
        return this.hiresponse[Math.floor(Math.random() * this.hiresponse.length)];
    };

    this.checkUniqHi = function (item) {
        if (this.hiresponsed.length > 0 && this.hiresponsed.length < 4) {
            for (var i = 0;i<this.hiresponsed.length;i++) {
                if (item == this.hiresponsed[i]){
                    return false;
                } else {
                    this.hiresponsed.push(item);

                    return true;
                }
            }
        } else {
            if (this.hiresponsed.length == 0)
                this.hiresponsed.push(item);
        }

        return true;
    };

    /**
     * match
     *
     * @param regex - regex string to match
     * @return boolean - whether or not the input string matches the regex
     */
    this.match = function(regex) {
        return new RegExp(regex).test(this.input);
    }
}
