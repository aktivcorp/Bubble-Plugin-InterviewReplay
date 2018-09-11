function(instance, properties, context) {     
  if (properties.leftvideowidth) {
    instance.data.videoLeft.width(properties.leftvideowidth+'px');  
    instance.data.videoRight.css('left', parseInt(properties.leftvideowidth)+1+'px');
  }
  if (properties.leftvideoheight) {
    instance.data.videoLeft.height(properties.leftvideoheight+'px');  
  }
  if (properties.rightvideowidth) {
    instance.data.videoRight.width(properties.rightvideowidth+'px');  	
  }
  if (properties.rightvideoheight) {
    instance.data.videoRight.height(properties.rightvideoheight+'px');  
  }
}