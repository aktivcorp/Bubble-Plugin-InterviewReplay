function(instance, properties, context) {

	if(properties.recordfile && properties.recordfile != '') {      
      instance.data.videoLeft[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+properties.recordfile;
      instance.data.videoLeft[0].load();
    }

}