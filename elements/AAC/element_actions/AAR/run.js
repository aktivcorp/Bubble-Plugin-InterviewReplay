function(instance, properties, context) {
  if(instance.data.timeoutLeft) clearTimeout(instance.data.timeoutLeft);
  if(instance.data.timeoutRight) clearTimeout(instance.data.timeoutRight);

  instance.data.videoLeft[0].src = null;
  instance.data.videoRight[0].src = null;

  instance.data.currentIndexLeft = 0;
  instance.data.currentSecondLeft = 0;
  instance.data.currentIndexRight = 0;
  instance.data.currentSecondRight = 0; 
}