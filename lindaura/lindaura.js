/*
 * Lindaura
 */

function Lindaura(x, y, limitX, limitY) {
   this.x = x;
   this.y = y;
   this.limitX = limitX;
   this.limitY = limitY;
}

Lindaura.prototype = {
      
   observers : [],
   x : 1,
   y : 1,
   limitX : 10,
   limitY : 10,
   scrambleV : [],

   subscribe : function(anObserver) {
      this.observers.push(anObserver);
   },
   
   position : function(x, y) {
      this.x = x;
      this.y = y;
      this.notify();
   },
   
   move : function(moveType) {
      switch (moveType) {
        case '<' : if (this.x > 1) this.x--; break;
        case '>' : if (this.x < this.limitX) this.x++; break;
        case '^' : if (this.y > 1) this.y--; break;
        case 'v' : if (this.y < this.limitY) this.y++; break;
      }
      this.notify();
   },
   
   moveS : function(moveType) {
      var codes = ['<', '>', '^', 'v'];
      var c = codes.indexOf(moveType);
      this.move(codes[scrambleV[c]]);
   },
   
   scramble : function() {
      scrambleV = [];
      var p = 0;
      while (p < 4) {
         var v = Math.floor(Math.random()*4);
         var i;
         var duplicate = false;
         for (i = 0; i < p; i++)
            if (v === scrambleV[i]) duplicate = true;
         if (!duplicate) {
            scrambleV.push(v);
            p++;
         }
      }
      alert(scrambleV);
   },
   
   moveSeq : function(commandSeq) {
      var sequence = commandSeq.returnSeq();
      var s;
      for (s = 0; s < sequence.length; s++)
         this.move(sequence.charAt(s));
   },
   
   moveSeqS : function(commandSeq) {
      var sequence = commandSeq.returnSeq();
      var s;
      for (s = 0; s < sequence.length; s++)
         this.moveS(sequence.charAt(s));
   },
   
   notify : function() {
      var position = {"x" : this.x,
                      "y" : this.y};
      for (obs in this.observers) {
         this.observers[obs].update(position);
      }
   },

   getPosition : function() {
      return {"x" : this.x,
              "y" : this.y};
   }
};

/*
 * Visual Lindaura
 */

function VisualLindaura(theLindaura, svgLindaura) {
   if (theLindaura && theLindaura != null)
      theLindaura.subscribe(this);
   
   this.svgLindaura = svgLindaura;
}

VisualLindaura.prototype = {
   svgLindaura : null,
   
   update : function(position) {
      if (position && position != null && this.svgLindaura != null) {
         this.svgLindaura.setAttribute("x", (position.x - 1) * 50);
         this.svgLindaura.setAttribute("y", (position.y - 1) * 50);
      }
   }
};