//Set button style
var ButtonStyle = 'color: #fff;cursor: pointer;width: 55px!Important;background-image: url(https://drgrim.github.io/YoutubeRepeat/repeat.svg); background-size: 60%;background-position: center center;background-repeat: no-repeat; background-color:transparent;';

//Button html code
var RepeatButtonDesign = '<input type="button" id="rptSong" class="ytp-button" style="'+ButtonStyle+'" />';

//GLOBALS
var isRepeatOn = false;
var CurrentSongUrl = "";
var Watcher; 


jQuery( "body" ).on('click','#rptSong',function() {
  
  //Check if background-color:transparent
  if(jQuery('#rptSong').attr('style').indexOf('background-color:transparent') > -1){
     
     /*if font color is #fff then set isRepeatOn to true 
                                      change font color to #52f310
                                      start Watcher interval
                                      set CurrentSongUrl to current URL
     */
     jQuery('#rptSong').attr('style',jQuery('#rptSong').attr('style').replace('background-color:transparent','background-color:red'));
     isRepeatOn = true;

     CurrentSongUrl = window.location.href;
     Watcher = setInterval(CheckForEndOfSong, 100);
    

  }else if(jQuery('#rptSong').attr('style').indexOf('background-color:red') > -1){
   	 
   	 /*if font color is #fff then set isRepeatOn to false 
                                      change font color to #fff
                                      stop Watcher interval
                                      unset CurrentSongUrl to current URL
     */
     jQuery('#rptSong').attr('style',jQuery('#rptSong').attr('style').replace('background-color:red','background-color:transparent'));
     isRepeatOn = false;

     CurrentSongUrl = "";
     StopCheckingForEndOfSong();
  }
  });
   
 
//this function checksif repeat is on and if the url has changed , if changed the go back to the url saved in CurrentSongUrl variable
function CheckForEndOfSong() {

  if(isRepeatOn && window.location.href != CurrentSongUrl){
      window.history.back();
      //setTimeout(function(){jQuery('.ytp-play-button').click();}, 500);
    }

      if(jQuery('.ytp-play-button').attr('Title')){
          
          jQuery('.ytp-play-button').click();
      
      if(jQuery('.ytp-play-button').attr('Title') == 'Replay'){

         jQuery('.ytp-large-play-button').click();
         
      }

    }

}

function StopCheckingForEndOfSong() {
    clearInterval(Watcher);
}

//append button html code to youtube's player
jQuery('.ytp-left-controls').append(RepeatButtonDesign);
