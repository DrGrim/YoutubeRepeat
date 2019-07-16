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
   
var clicks = 0; 
//this function checksif repeat is on and if the url has changed , if changed the go back to the url saved in CurrentSongUrl variable
function CheckForEndOfSong() {
   
  if(isRepeatOn && window.location.href != CurrentSongUrl){
      window.history.back();
      if($('.ytp-play-button').attr('title') == 'Play (k)' || $('.ytp-play-button').attr('title') == 'Replay'){
          setTimeout(function(){ jQuery('.ytp-large-play-button, .ytp-play-button').click(); }, 1000);
      }
    }

    
         

}

function StopCheckingForEndOfSong() {
    clearInterval(Watcher);
}

//append button html c6ode to youtube's player
jQuery('.ytp-left-controls').append(RepeatButtonDesign);
jQuery('.ytd-app').css('background:red;')
