//@requires game.engine/geometry.js
define(function(){
  "use strict";
  
  return {
    
    Array: {
      move: function(pos1, pos2) {
        // local variables
        var i, tmp;
        // cast input parameters to integers
        pos1 = parseInt(pos1, 10);
        pos2 = parseInt(pos2, 10);
        // if positions are different and inside array
        if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
          // save element from position 1
          tmp = this[pos1];
          // move element down and shift other elements up
          if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
              this[i] = this[i + 1];
            }
          }
          // move element up and shift other elements down
          else {
            for (i = pos1; i > pos2; i--) {
              this[i] = this[i - 1];
            }
          }
          // put element from position 1 to destination
          this[pos2] = tmp;
        }
      },
      reIndex: function(){
        for(var i = 0; i < this.length; i++)
        {
          if(this[i] === undefined)
          {
              this.splice(i, 1);
          }
        }
      },
      swap: function(a, b){
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
      }
    }
  }
  
})()