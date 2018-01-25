//client id = gb5w9x3k0ocfvipz8tklcp53x7dkjv; api = 'https://api.twitch.tv/kraken/channels/freecodecamp?client_id=gb5w9x3k0ocfvipz8tklcp53x7dkjv
/*global $*/

//run the jquery
$(document).ready(function() {
  //global variables
  var api = 'https://api.twitch.tv/kraken/streams/';
  var clientid = 'gb5w9x3k0ocfvipz8tklcp53x7dkjv';
  var streams = ["ESL_SC2", "OgamingSC2", "myskerm", "freecodecamp", "lordminion777", "rocketleague", "RobotCaleb", "esl_csgo", "throwdowntv", "jacksepticeye", "markiplier"];
  
  //call api JSON data for FCC Status
  $.getJSON(api + 'freecodecamp?client_id=' + clientid).done(function(data) {
    //console.log(data);
    if(data.stream === null) {
      $('#fccStatus').html(' is OFFLINE!');
    } else {
      $('#fccStatus').html(' is ONLINE!');
    } 
  });
  
  //call ajax JSON data for channels
  for(var i = 0; i < streams.length; i++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + streams[i],
      headers: {
      'client-ID': clientid
      },
      
      //instructions for successful data call
      success: function(dataI) {
        //console.log(dataI);
      
        $.getJSON(api + dataI.name + '?client_id=' + clientid).done(function(data2) {
          //console.log(data2);
          
          var usrname = data2._links.self.slice(37);
          //console.log(usrname);
         
          //if the user is not currently streaming, this is what displays for each heading
          if(data2.stream === null) {
            $('#user').append('<a href="' + dataI.logo + '" target="_blank"><img src="' + dataI.logo + '" width = 40 height = 40></a>   <a target = "blank" href = "https://www.twitch.tv/' + usrname +'"> ' + usrname + '</a><br><br><br>');
            $('#status').append('OFFLINE! <br><br><br>');
            $('#game').append('N/A <br><br><br>');
            $('#followers').append(dataI.followers+ '<br><br><br>');
          } 
          //if the user is streaming, this is what displays for each heading
          else {
            $('#user').append('<a href="' + dataI.logo + '" target="_blank"><img src="' + dataI.logo + '" width = 40 height = 40>  <a target = "blank" href = "https://www.twitch.tv/' + usrname +'"> ' + usrname + '</a><br><br><br>');
            $('#status').append('ONLINE! <br><br><br>');
            $('#game').append(data2.stream.game + '<br><br><br>');
            $('#followers').append(dataI.followers+ '<br><br><br>');
          } 
        });
      
      },
      //error function if user data is not found      
      error: function(err) {
        alert('Error: User Not Found!');
        $('#user').append(streams[i] + '<br><br><br>');
        $('#status').append('Not Found! <br><br><br>');
        $('#game').append('N/A <br><br><br>');
        $('#followers').append('N/A <br><br><br>');
      },
    });
        
  }
    
});