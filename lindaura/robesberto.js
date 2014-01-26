/*
 * Robesberto
 */

function Robesberto(x, y, limitX, limitY) {
   this.x = x;
   this.y = y;
   this.limitX = limitX;
   this.limitY = limitY;
}

Robesberto.prototype = {
      
   x : 1,
   y : 1,
   limitX : 10,
   limitY : 10,

   newPosition : function() {
      this.x = Math.floor((Math.random()*(this.limitX-2))+3);
      this.y = Math.floor((Math.random()*(this.limitY-2))+3);
      
      return this.getPosition();
   },
   
   getPosition : function() {
      return {"x" : this.x,
              "y" : this.y};
   }
};

/*
 * Visual Robesberto
 */

function VisualRobesberto(theRobesberto, svgRobesberto) {
   this.svgRobesberto = svgRobesberto;
   this.update(theRobesberto.newPosition());
}

VisualRobesberto.prototype = {
   svgRobesberto : null,
   
   update : function(position) {
      if (position && position != null && this.svgRobesberto != null) {
         this.svgRobesberto.setAttribute("x", (position.x - 1) * 50);
         this.svgRobesberto.setAttribute("y", (position.y - 1) * 50);
      }
   }
};