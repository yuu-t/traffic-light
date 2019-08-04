$( function() {
  obj = new TraficLight();

  obj.main();
})

var LightState = {
  poweroff: 0, 
  red: 1,
  blue: 2,
  blue_blink: 3,
};

var WaitTime = [
  100,
  10000,
  10000,
  4000
];

const kTimeInterval = 100;

class TraficLight {
  constructor() {
    this.state = LightState.poweroff;
    this.time = 0;
    this.handler = null;
    this.blink_state = 0;
    this.audio = document.getElementById('sound');
    this.image = $('.light');
  }

  main() {
    $('.cover').one('click', function() {
      $('.cover').hide();
      this.main_loop();
    }.bind(this));
  }

  main_loop() {
    this.time += kTimeInterval;
  
    if ( this.time >= WaitTime[ this.state ] ) {
      this.state += 1;
      if ( this.state > LightState.blue_blink ) {
        this.state = LightState.red;
      }
      this.time = 0;
      if ( this.state == LightState.red ){
        clearInterval( this.handler );
        this.handler = null;
        this.set_image('./img/W_002.png');
      } else if ( this.state == LightState.blue ) {
        this.audio.play();
        this.set_image('./img/W_001.png');
      } else if ( this.state == LightState.blue_blink ) {
        this.audio.pause();
        this.audio_rewind();
        this.blink_state = 0;
        this.handler = setInterval( this.blue_blink.bind(this), 250 );
      }
    }    
    setTimeout( function() {
      this.main_loop()
    }.bind(this), kTimeInterval );
  }

  audio_rewind() {
    this.audio.currentTime = 0;
  }

  set_image( url ) {
    this.image.attr( 'src', url );
  }

  blue_blink() {
    if( this.blink_state == 0 ) {
      this.set_image('./img/W_000.png');
      this.blink_state = 1;
    } else {
      this.set_image('./img/W_001.png');
      this.blink_state = 0;
    }
  }
}

