$(document).ready(function(){
   var noWinners=true,
       xis=[],
       bola=[],
       chosen,
       figure,
       figureMachine,
       idPerson,
       whoWon,
       idMachine;

   ShowDialog();

   $('button').on("click", function(){
      chosen =this.id;
      figure = (chosen == 'xis') ? 'X' : 'O';
      idPerson =  (chosen == 'xis') ? 'xis' : 'circle';
      figureMachine =  (chosen == 'xis') ? 'O' : 'X';
      idMachine =  (chosen == 'xis') ? 'circle' : 'xis';
      HideDialog();
      playMachine(figureMachine, idMachine);
   });

   $("div").on("click",function(){
      var spot=this.id;
      var element =$("#"+spot+"");
      if (!element.html()){
         element.html(figure);
         if (idPerson=='xis'){
            xis.push(parseInt(spot));
         } else{ bola.push(parseInt(spot));}
      }

      hasWinner("person");
      if (!hasMoreGames()&&noWinners){
         alert("Nobody won! try again!!");
         location.reload(true);
      } else if(noWinners){
         playMachine(figureMachine, idMachine);
      } else {
         congrats();
      }    
   });   

   function playMachine(figureMachine, idMachine){
      var aleat = Math.floor((Math.random() * 9) + 1);
      var element = $("#"+aleat+"");
      while (element.html()){
         //chose other
         aleat = Math.floor((Math.random() * 9) + 1);
         element =$("#"+aleat+"");
      } 
      element.html(figureMachine);   
      if (idMachine=='xis'){
         xis.push(aleat);
      } else { bola.push(aleat);}

      hasWinner("machine");
      if (!hasMoreGames()&&noWinners){
         alert("Nobody won! try again!!");
         location.reload(true);
      }
      else if(noWinners){
         return;
      } else {
         congrats();
      }
   }


   function hasWinner(winner){
      if (xis.length>=3) {
         verify(xis,winner);
      }  
      if (bola.length>=3){
         verify(bola,winner);
      }
   }

   function verify(array,winner){
      var greatPlay=[[1,2,3],[1,4,7],[1,5,9],[4,5,6],[7,8,9],[2,5,8],[3,6,9],[3,5,7]];

      greatPlay.forEach(function(arr){
         containsAll(arr,array);
      });

      function containsAll(greatArray, allplay){    
         for(var i = 0 , len = greatArray.length; i < len; i++){
            if($.inArray(greatArray[i], allplay) == -1) {
               return false;
            }
         }
         noWinners=false; 
         whoWon=winner;
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

   function congrats(){
      if (whoWon=="machine"){
         alert("Sorry, you lost! :(");
         location.reload(true);
      } 
      if (whoWon=="person"){
         alert("congratulations!!! :D");   
         location.reload(true);
      }

   }

   function hasMoreGames(){
      xGames=xis.length;
      oGames=bola.length;
      if (xGames+oGames==9){
         return false;
      }
      return true;
   }

   function resetVariables(){
      xis=[];
      bola=[];
      noWinners=true;
      whoWon="";
      for(var i=1; i<=9; i++){
         $("#"+i).html("");
      }
      playMachine(figureMachine, idMachine);
   }
});   