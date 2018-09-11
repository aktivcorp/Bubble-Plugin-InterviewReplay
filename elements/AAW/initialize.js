function(instance, context) {

  instance.data.videoLeft = $('<video></video>');   
  instance.data.videoLeft.width('50px');
  instance.data.videoLeft.height('50px');  
  instance.data.videoLeft[0].onloadedmetadata = function() {
    console.log('duration', instance.data.videoLeft[0].src, instance.data.videoLeft[0].duration);
  	instance.data.videoLeft[0].src = null;
  };
  instance.canvas.append(instance.data.videoLeft);

}