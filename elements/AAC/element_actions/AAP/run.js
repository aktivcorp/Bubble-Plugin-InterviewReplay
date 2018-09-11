function(instance, properties, context) {  
  var ownerLeft = Object.keys(instance.data.list)[0];
  var ownerRight = Object.keys(instance.data.list)[1];
      
  var delay = instance.data.list[ownerLeft][instance.data.currentIndexLeft].timestamp-instance.data.currentSecondLeft;
  if (delay < 0) delay = 0;
  console.log('delay left', delay);
  instance.data.currentSecondLeft = delay;
  instance.data.timeoutLeft = setTimeout(function() {
    instance.data.videoLeft[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+instance.data.list[ownerLeft][instance.data.currentIndexLeft].recordfile;
    instance.data.videoLeft[0].play();
  }, delay);
  
  var delay = instance.data.list[ownerRight][instance.data.currentIndexRight].timestamp-instance.data.currentSecondRight;
  if (delay < 0) delay = 0;
  console.log('delay right', delay);
  instance.data.currentSecondRight = delay;
  instance.data.timeoutRight = setTimeout(function() {
    instance.data.videoRight[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+instance.data.list[ownerRight][instance.data.currentIndexRight].recordfile;
    instance.data.videoRight[0].play();
  }, delay);
}