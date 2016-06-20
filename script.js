$(document).ready(function(){
   var ui = new UI();
   ui.showDialog();
   ui.startGame();
});   

function Player(id, figure, name){
   this.figure=figure;
   this.id=id;
   this.moves=[];
   this.name=name;
}

function Game(){
   this.winners = false;
   this.whoWon;
   this.playerMach;
   this.playerPers;
}

Game.prototype.hasWinner= function (player){
   if(player.moves.length>=3){
      this.verify(player.moves, player.name)         
   }
   return this.winners;
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
      self.winners=true; 
      self.whoWon=playerName;
   }
}

Game.prototype.hasMoreGames = function (){
   if (this.playerMach.moves.length+this.playerPers.moves.length==9){
      return false;
   }
   return true;
}

function UI(){
   this.possibleFig={
      'xis' : 'X',
      'circle' : 'O'
   };
   this.game=new Game();
}

UI.prototype.callWinner = function(player){
   this.game.hasWinner(player);
   if (!this.game.hasMoreGames(this.game.playerMach, this.game.playerPers)&&!this.game.winners){
      alert("Nobody won! try again!!");
      location.reload(true);
   }
   if(!this.game.winners){
      return;
   } 
   else {
      alert(this.game.whoWon+" won!");
      location.reload(true);
   }
}   

UI.prototype.machinePlay = function (){
   var random =  Math.floor((Math.random() * 9) + 1);   
   var element = $("#"+random+"");
   while (element.html()){
      random = Math.floor((Math.random() * 9) + 1);
      element =$("#"+random+"");
   } 
   element.html(this.game.playerMach.figure);   
   this.game.playerMach.moves.push(random);
   this.callWinner(this.game.playerMach);
}

UI.prototype.hideDialog = function(){
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
      self.hideDialog();
      self.bindPlayerEvents();
      self.machinePlay();
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
      self.callWinner(self.game.playerPers);
      if (!self.game.winners){
         self.machinePlay();
      }
   });
}

