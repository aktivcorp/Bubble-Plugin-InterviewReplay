function(instance, properties, context) {
  instance.data.list = {};
  var recordfiles = properties.recordfiles.get(0,properties.recordfiles.length());
  var timestamps = properties.timestamps.get(0,properties.timestamps.length());
  var owners = properties.owners.get(0,properties.owners.length());
  
  var startTime = timestamps[0].getTime();  
  timestamps.forEach(function(timestamp, idx) {
    timestamps[idx] = timestamp.getTime()-startTime;
  });
  
  var numFiles = recordfiles.length;
  console.log(numFiles);

  recordfiles.forEach(function(recordfile, idx) {
    var timestamp = timestamps[idx];
    var owner = owners[idx];
    
    if(!instance.data.list[owner]) instance.data.list[owner] = [];
    
    var t_record = {
      idx: idx,
      recordfile: recordfile,
      timestamp: timestamp,
      duration: null
    };
    instance.data.list[owner].push(t_record);
    
    var t_video = $('<video id="v_'+idx+'"></video>');   
    t_video.css('width','10px');    
    t_video[0].onerror = function() {
      //console.log('error', t_video[0].src, this.id);
      numFiles--;
    };
    t_video[0].onloadedmetadata = function() {
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
      
        for (var til in list) {
          var rf = list[til];
          if(''+rf.idx == this.id.replace('v_','')) {
            rf.duration = t_video[0].duration;
            //console.log('idx', rf.idx, rf.duration);
          }
        }
      }
      t_video.remove();
      numFiles--;
    };
    t_video[0].src = 'https://s3.eu-central-1.amazonaws.com/skillum.com/video/'+t_record.recordfile;
    t_video.load();
  });    
  
  instance.data.currentIndexLeft = 0;
  instance.data.currentSecondLeft = 0;
  instance.data.currentIndexRight = 0;
  instance.data.currentSecondRight = 0;
  
  var waitInfo = setInterval(function() {    
  	if(numFiles == 0) {
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
		var rml = [];
        for (var til in list) {
          var rf = list[til];
          console.log(til, rf.idx, rf.duration, rf.duration==null);
          if(rf.duration == null) {
            rml.splice(0,0,til);
          }
        }
        for(var til in rml) {
          list.splice(rml[til], 1);
        }
      }      
      clearInterval(waitInfo);
      console.log('got all info', instance.data.list);
      
      var maxfin = 0;
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
        for (var til in list) {
          var rf = list[til];
          if(rf.timestamp+rf.duration*1000 > maxfin) maxfin = rf.timestamp+rf.duration*1000;
        }
      }  
      instance.data.fintime = maxfin;
      instance.data.btime.text(' 00:00:00 ');
      instance.data.bttime.text(' / '+(new Date(maxfin)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);
      instance.data.bplay.show();
      
	  var tiline = instance.data.i1line;
      for(var tio in instance.data.list) {
        var list = instance.data.list[tio];
        for (var til in list) {
          var rf = list[til];
          var tbox = $('<div></div>');
          tbox.css('background-color', 'green');
          tbox.css('position', 'absolute');
          tbox.css('width', Math.round(instance.data.ilinesWidth*rf.duration*1000/instance.data.fintime)+'px');
          tbox.css('left', Math.round(10+instance.data.ilinesWidth*rf.timestamp/instance.data.fintime)+'px');
          tbox.css('height', '20px');
          tiline.append(tbox);
        }
        tiline = instance.data.i2line;
      }  
    }
  },1000);
}