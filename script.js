function Player(id, figure, name){
   this.figure=figure;
   this.id=id;
   this.moves=[];
   this.name=name;
}

$(document).ready(function(){
   var noWinners=true,
       whoWon,
       playerPers,
       playerMach,
       possibleFig={
          'xis' : 'X',
          'circle' : 'O'
       };

   ShowDialog();

   $('button').on("click", function(){
      var chosen =this.id;
      var idMachine =  (chosen == 'xis') ? 'circle' : 'xis';
      playerPers = new Player(chosen,possibleFig[chosen], 'you');
      playerMach = new Player (idMachine,possibleFig[idMachine], 'machine');
      HideDialog();
      playMachine();
   });

   $("div").on("click",function(){
      var spot=this.id;
      var element =$("#"+spot+"");
      if (!element.html()){
         element.html(playerPers.figure);
         playerPers.moves.push(parseInt(spot));
      }
      hasWinner(playerPers);
      if (noWinners){
         playMachine();
      }
   });   

   function playMachine(){
      var aleat = Math.floor((Math.random() * 9) + 1);
      var element = $("#"+aleat+"");
      while (element.html()){
         aleat = Math.floor((Math.random() * 9) + 1);
         element =$("#"+aleat+"");
      } 
      element.html(playerMach.figure);   
      playerMach.moves.push(aleat);
      hasWinner(playerMach);
   }


   function hasWinner(player){
      if(player.moves.length>=3){
         verify(player.moves, player.name);  
      }
      if (!hasMoreGames()&&noWinners){
         alert("Nobody won! try again!!");
         location.reload(true);
      }
      else if(noWinners){
         return;
      } else {
         alert(whoWon+" won!");
         location.reload(true);
      }
   }  

   function verify(playerMoves,playerName){
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
         noWinners=false; 
         whoWon=playerName;
      }
   }

   function ShowDialog(){
      $("#overlay").show();
      $("#dialog").fadeIn();
   }

   function HideDialog(){
      $("#overlay").hide();
      $("#dialog").fadeOut();
   }

   function hasMoreGames(){
      if (playerMach.moves.length+playerPers.moves.length==9){
         return false;
      }
      return true;
   }
});   