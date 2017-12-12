//function to create a new round in game
function newRound(){
  
  //takes current count from div element in page and converting to int
  var count = parseInt($('.options #counter').text());
  //new round equals +1 equal rounds
  count++;
  //if count less than 10, we add a 0 in front digit before updating count in div 
  if(count <= 9){
    count = "0" + count;
  }
  $('.options #counter').text(count);

  //we grab the new iteration color by grabing a random element
  //from the colors array, but make sure the current color
  //is not the same as last
  do{
    var color = colors[(Math.floor(Math.random() * 4))];
  }while(sequence.length !== 0 && color.color === sequence[sequence.length - 1].color)

  //add new iteration to the current sequence
  sequence.push(color);

  //run sequence for user to learn
  runSequence();
}


//function that runs the current game sequence each round
function runSequence(){  
  
  //counter created to keep track of sequence
  //and know which color to highlight
  var counter = 0;
  

  //interval created to iterate throught sequence periodically 
  var i = setInterval(function(){

    //if statement is true, remove highlighted class to previous highlihted button
    if(counter != 0){
      $(sequence[counter - 1].color).removeClass(sequence[counter - 1].class);
    }

    //audio variable to play unique sound for each button pressed
    var audio = new Audio(sequence[counter].sound);
    audio.play();

    //highlight current color
    $(sequence[counter].color).addClass(sequence[counter].class);
    
    //if statement true when in last iteration or game is on
    if(counter + 1 === sequence.length || !on){
      //no need to keep interval cound
      clearInterval(i);

      //wait some time before telling player he can play
      setTimeout(function(){
        //remove the highlighted color class
        $(sequence[counter].color).removeClass(sequence[counter].class);
        //if still turn on, tell player he can play new round
        if(on){
          //change button color to notify player its time to play
          $('.buttons').addClass('go');
          //grab score and change to "GO!"
          var currentScore = $('.options #counter').text();
          $('.options #counter').text('GO!');
          //wait a second before removing go class
          //and adding current score back
          setTimeout(function(){
            $('.buttons').removeClass('go');
            $('.options #counter').text(currentScore);
            //lets user click the buttons to play
            userTurn = true;
          }, 1000);
        }
      }, 1500);
    }else{
      //when false, sequence not done so add one to 
      //counter to keep track of which color to highlight
      counter++;
  }}, 1500);   
}

//event triggered when the power button is clicked
$(document).on('click', '.power .toggle',function(){
  
  //if off, turn on & add 00 to counter
    if(!on){
      
      on = true;
      $(this).find('.off').removeClass('toggleButton')
      .end('.off').find('.on').addClass('toggleButton');
      $('.options #counter').text('00');
    }else{
      //initialize variables to primary case and remove counter
      userTurn = false;
      userCorrect = 0;
      on = false;
      strict = false;
      $(this).find('.on').removeClass('toggleButton')
      .end('.on').find('.off').addClass('toggleButton');
      $('.options #counter').text('--');
      $('.options .col-xs-4:last-child .col-xs-12:first-child').removeClass('light');
    }
  
});

//event triggered when start button is clicked
$(document).on('click', '.options .col-xs-4:nth-child(2) .col-xs-12:first-child', function(){
  
  //starts or restarts game to first round
  if(on){ 
    sequence = [];
    $('.options #counter').text('00');
    newRound();
  }
});

//event triggered when strick button clicked
//it simply add a class to the above circle
//to show red "light"
$(document).on('click', '.options .col-xs-4:last-child .col-xs-12:nth-child(2)', function(){
  
  if(on){
    if(!strict){
    
    strict = true;
    $('.options .col-xs-4:last-child .col-xs-12:first-child').addClass('light');
  }else{
    
    strict = false;
    $('.options .col-xs-4:last-child .col-xs-12:first-child').removeClass('light');
  }
  }
});

//event triggered when user clicks one of the colors
$(document).on('click', '.buttons', function(){

  
  //grab the current color
  var color = $(this).attr('id');
  color = color[0].toUpperCase() + color.substr(1, color.length);
  //use this data to get the correct class name to highlight color
  var buttonClass = "toggled" + color;

  //true when its the user turn to click the correct sequence
  //if false, nothing happens
  if(userTurn){
    //highlights recently clicked color
    $(this).addClass(buttonClass);
    var that = $(this);
    //add a timeout to have button highlited for an x amount of time
    var i = setTimeout(function(){
      that.removeClass(buttonClass);
    }, 500);

    //true when user clicks on the correct iteration in the sequence
    if(("#"+$(this).attr('id')) === sequence[userCorrect].color){
      userCorrect++;
      //true when user correctly clicked the sequence
      if(userCorrect === sequence.length){  
        //app prepares for the next round
        userTurn = false;
        userCorrect = 0;
        setTimeout(function(){
          newRound();
        }, 1000);
      }
    }else{
      
      //if user clicks incorrect iteration, app tells the user
      // and then prepares to replay round or start from 00
      userTurn = false;
      userCorrect = 0;

      //tell the user is wrong
      var currentScore = $('.options #counter').text();
       $('.options #counter').text('XXX');
      $('.buttons').addClass('wrong');

      //if strict mode is on, reset game to 00
      if(strict){
          var i = setTimeout(function(){
            $('.buttons').removeClass('wrong');
            $('.options #counter').text('00');
          }, 3000);
      }else{
        //if not on, replay last sequence
        var i = setTimeout(function(){
            $('.buttons').removeClass('wrong');
            $('.options #counter').text(currentScore);
            runSequence();
          }, 3000);
      }
    }
  }
});