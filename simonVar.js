var interval;
var on = false;
var strict = false;
var userTurn = false;
var userCorrect = 0;
var sequence = [];
var colors =[
{
    color: "#green",
    sound: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    class: "toggledGreen"
},
{
    color:"#red",
    sound: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    class: "toggledRed"
}, 
{
    color:"#blue",
    sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    class: "toggledBlue"
}, 
{
    color:"#yellow",
    sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    class: "toggledYellow"
}];