$(document).ready(function(){
   var ui = new UI();
   ui.showDialog();
   ui.startGame();
});   

function Game(){
   this.noWinners = true;
   this.whoWon;
   this.playerMach;
   this.playerPers;
}

Game.prototype.machinePlay = function (){
   var aleat =  Math.floor((Math.random() * 9) + 1);   
   var element = $("#"+aleat+"");
   while (element.html()){
      aleat = Math.floor((Math.random() * 9) + 1);
      element =$("#"+aleat+"");
   } 
   element.html(this.playerMach.figure);   
   this.playerMach.moves.push(aleat);
   this.hasWinner(this.playerMach);
}

Game.prototype.hasWinner= function (player){
   if(player.moves.length>=3){
      this.verify(player.moves, player.name);  
   }
   if (!this.hasMoreGames(this.playerMach, this.playerPers)&&this.noWinners){
      alert("Nobody won! try again!!");
      location.reload(true);
   }
   if(this.noWinners){
      return;
   } 
   else {
      alert(this.whoWon+" won!");
      location.reload(true);
   }
}  

Game.prototype.verify = function (playerMoves,playerName){
   var self=this;
   var greatPlay=[[1,2,3],[1,4,7],[1,5,9],[4,5,6],[7,8,9],[2,5,8],[3,6,9],[3,5,7]];
   greatPlay.forEach(function(arr){
      containsAll(arr,playerMoves);
   });
   function containsAll(greatArray, playerMoves){    
      for(var i = 0 , len = greatArray.length; i < len; i++){
         if($.inArray(greatArray[i], playerMoves) == -1) {
            return false;
         }
      }
      self.noWinners=false; 
      self.whoWon=playerName;
   }
}

Game.prototype.hasMoreGames = function (){
   if (this.playerMach.moves.length+this.playerPers.moves.length==9){
      return false;
   }
   return true;
}

function Player(id, figure, name){
   this.figure=figure;
   this.id=id;
   this.moves=[];
   this.name=name;
}

function UI(){
   this.possibleFig={
      'xis' : 'X',
      'circle' : 'O'
   };
   this.game=new Game();
}

UI.prototype.HideDialog = function(){
   $("#overlay").hide();
   $("#dialog").fadeOut();
}

UI.prototype.showDialog = function (){
   $("#overlay").show();
   $("#dialog").fadeIn();  
}

UI.prototype.startGame = function(){
   var self = this;
   $('button').on("click", function(){
      var chosen =this.id;
      var persFig = self.possibleFig[chosen];
      var idMachine =  (chosen == 'xis') ? 'circle' : 'xis';
      var machFig = self.possibleFig[idMachine];
      self.game.playerPers = new Player(chosen,persFig, 'you');
      self.game.playerMach = new Player (idMachine,machFig, 'machine');
      self.HideDialog();
      self.bindPlayerEvents();
      self.game.machinePlay();
   });
}

UI.prototype.bindPlayerEvents = function(){
   var self = this;
   $("div").on("click",function(){
      var spot=this.id;
      var element =$("#"+spot+"");
      if (!element.html()){
         element.html(self.game.playerPers.figure);
         self.game.playerPers.moves.push(parseInt(spot));
      } else {
         return;
      }
      self.game.hasWinner(self.game.playerPers);
      if (self.game.noWinners){
         self.game.machinePlay();
      }
   });
}

