function(instance, context) {
  instance.data.videoLeft = $('<video></video>');   
  instance.data.videoLeft.width(Math.floor(instance.canvas[0].offsetWidth/2)+'px');
  instance.data.videoLeft.height(instance.canvas[0].offsetHeight+'px');  
  instance.canvas.append(instance.data.videoLeft);
  
  instance.data.videoRight = $('<video></video>');
  instance.data.videoRight.width(Math.floor(instance.canvas[0].offsetWidth/2)+'px');
  instance.data.videoRight.height(instance.canvas[0].offsetHeight+'px');  
  instance.data.videoRight.css('position', 'absolute');
  instance.data.videoRight.css('left', Math.floor(instance.canvas[0].offsetWidth/2+1)+'px');
  instance.canvas.append(instance.data.videoRight);
  
  instance.data.timeline = $('<div></div>');
  instance.data.timeline.css('width', instance.canvas[0].offsetWidth+'px');
  instance.data.timeline.css('height', '100px');
  instance.data.timeline.css('background-color', 'lightgray');
  instance.data.ilines = $('<div id="ilines"></div>');
  instance.data.ilines.css('width', instance.canvas[0].offsetWidth+'px');
  instance.data.ilines.css('height', '60px');
  instance.data.ilines.css('padding', '10px');
  
  instance.data.i1line = $('<div id="i1line"></div>');
  instance.data.i1line.css('width', instance.canvas[0].offsetWidth-20+'px');
  instance.data.i1line.css('height', '20px');  
  instance.data.i2line = $('<div id="i2line"></div>');
  instance.data.i2line.css('width', instance.canvas[0].offsetWidth-20+'px');
  instance.data.i2line.css('height', '20px');
  
  instance.data.ilines.append(instance.data.i1line);
  instance.data.ilines.append(instance.data.i2line);
  instance.data.timeline.append(instance.data.ilines);
  
  instance.data.ilinesWidth = instance.canvas[0].offsetWidth-20;
  
  instance.data.ipoint = $('<div></div>');
  instance.data.ipoint.css('width', '1px');
  instance.data.ipoint.css('height', '40px');
  instance.data.ipoint.css('border', '1px solid white');
  instance.data.ipoint.css('position', 'relative');
  instance.data.ipoint.css('z-index', '999');
  instance.data.ipoint.css('left', '0');
  instance.data.ipoint.css('top', '-40px');
  instance.data.ilines.append(instance.data.ipoint);
  
  instance.data.ilines.click(function(event) {    
    if(instance.data.fintime) {        
      var tx = event.offsetX;
      if(event.target.id != 'ilines' && event.target.id != 'i1line' && event.target.id != 'i2line') {
        tx = parseFloat($(event.target).css('left').replace('px','')-10)+tx;
      }
      var destMSec = instance.data.fintime*tx/instance.data.ilinesWidth;
      instance.data.currentTime = destMSec;
      instance.data.ipoint.css('left', tx+'px');
      instance.data.btime.text((new Date(destMSec)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);
      
      var videos = [{src: null, seek: 0},{src: null, seek: 0}];
      var tvi = 0;
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
        for (var til in list) {
          var rf = list[til];
          if (destMSec >= rf.timestamp && destMSec <= rf.timestamp + rf.duration*1000) {
              videos[tvi] = {'src': rf.recordfile, 'seek': destMSec - rf.timestamp};
          }
        }
        tvi = 1;
      }
            
      instance.data.videoLeft[0].pause();
      instance.data.videoLeft[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[0].src;
      instance.data.videoLeft[0].currentTime = videos[0].seek/1000;
      if(!instance.data.paused && videos[0].src) instance.data.videoLeft[0].play();
      
      instance.data.videoRight[0].pause();
      instance.data.videoRight[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[1].src;
      instance.data.videoRight[0].currentTime = videos[1].seek/1000;
      if(!instance.data.paused && videos[1].src) instance.data.videoRight[0].play();
      
    }
  });
  
  instance.data.paused = true;
  
  instance.data.bplay = $('<i class="ba-videoplayer-icon-play"></i>');
  instance.data.bplay.css('margin','10px');
  instance.data.bplay.hide();
  instance.data.bplay.click(function() {
    instance.data.paused = false;
    instance.data.videoLeft[0].play();
    instance.data.videoRight[0].play();    
    instance.data.bpause.show();
    instance.data.bplay.hide();
  });
  instance.data.timeline.append(instance.data.bplay);
  instance.data.bpause = $('<i class="ba-videoplayer-icon-pause"></i>');
  instance.data.bpause.css('margin','10px');
  instance.data.bpause.hide();
  instance.data.bpause.click(function() {
    instance.data.videoLeft[0].pause();
    instance.data.videoRight[0].pause();
    instance.data.paused = true;
    instance.data.bplay.show();
    instance.data.bpause.hide();
  });
  instance.data.timeline.append(instance.data.bpause);
  instance.data.btime = $('<span></span>');
  instance.data.btime.css('margin','10px');
  instance.data.timeline.append(instance.data.btime);
  instance.data.bttime = $('<span></span>');
  instance.data.timeline.append(instance.data.bttime);
    
  instance.canvas.append(instance.data.timeline);
  instance.data.currentTime = 0;
  setInterval(function() {
    if (!instance.data.paused && instance.data.fintime) {
      instance.data.currentTime += 1000;
      if (instance.data.currentTime > instance.data.fintime) {
        instance.data.paused = true; return;
      }
      instance.data.ipoint.css('left', instance.data.ilinesWidth*instance.data.currentTime/instance.data.fintime+'px');
      instance.data.btime.text((new Date(instance.data.currentTime)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);
      
      var videos = [{src: null, seek: 0},{src: null, seek: 0}];
      var tvi = 0;
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
        for (var til in list) {
          var rf = list[til];
          if (instance.data.currentTime >= rf.timestamp && instance.data.currentTime <= rf.timestamp + rf.duration*1000) {
              videos[tvi] = {'src': rf.recordfile, 'seek': instance.data.currentTime - rf.timestamp};
          }
        }
        tvi = 1;
      }      
      
      if (instance.data.videoLeft[0].src != 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[0].src) {
        instance.data.videoLeft[0].pause();
        instance.data.videoLeft[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[0].src;
        instance.data.videoLeft[0].currentTime = videos[0].seek/1000;
        if(!instance.data.paused && videos[0].src) instance.data.videoLeft[0].play();
      }
      
      if (instance.data.videoRight[0].src != 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[1].src) {
        instance.data.videoRight[0].pause();
        instance.data.videoRight[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+videos[1].src;
        instance.data.videoRight[0].currentTime = videos[1].seek/1000;
        if(!instance.data.paused && videos[1].src) instance.data.videoRight[0].play();
      }
    }
  }, 1000);
}