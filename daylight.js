on('ready',function() {
    "use strict";

    if( state.daylight){
        state.daylight = {
            version: 'v1.0'
        };
    }
    log('-=> Loading Daylight '+ state.displayMarkers.version);

});

on('chat:message',msg=>{
    if(msg.type === 'api'){
        if (msg.content.split(' ')[0].toLowerCase() === '!daylight'){
            let page = getObj('page', Campaign().get('playerpageid'));
            
            if (msg.content.split(' ')[1].toLowerCase() === 'dusk') {
                
                page.set('dynamic_lighting_enabled',true);
                page.set('daylight_mode_enabled', true);
                page.set('explorer_mode','on');
                page.set('lightupdatedrop',true);
                page.set('daylightModeOpacity',0.5);
                page.set('force_lighting_refresh',true);
                sendChat('daylight','The sun peaks over the horizon');
            } else if (msg.content.split(' ')[1].toLowerCase() === 'day') {
                
                page.set('dynamic_lighting_enabled',true);
                page.set('daylight_mode_enabled', true);
                page.set('explorer_mode','on');
                page.set('lightupdatedrop',true);
                page.set('daylightModeOpacity',1.0);
                page.set('force_lighting_refresh',true);
                sendChat('daylight','The Sun is blazing in the sky');
            } else if (msg.content.split(' ')[1].toLowerCase() === 'night') {
                
                page.set('dynamic_lighting_enabled',true);
                page.set('daylight_mode_enabled', true);
                page.set('explorer_mode','on');
                page.set('lightupdatedrop',true);
                page.set('daylightModeOpacity',0.0);
                page.set('force_lighting_refresh',true);
                sendChat('daylight','The dark of night falls');
            } else if (msg.content.split(' ')[1].toLowerCase() === 'moonlight') {
                
                page.set('dynamic_lighting_enabled',true);
                page.set('daylight_mode_enabled', true);
                page.set('explorer_mode','on');
                page.set('lightupdatedrop',true);
                page.set('daylightModeOpacity',0.2);
                page.set('force_lighting_refresh',true);
                sendChat('daylight','The moon shines bright');
            } else if (msg.content.split(' ')[1].toLowerCase() === 'off') { 
                
                page.set('dynamic_lighting_enabled',false);
                page.set('daylight_mode_enabled', false);
                page.set('explorer_mode','off');
                page.set('lightupdatedrop',false);
                page.set('daylightModeOpacity',0.0);
                page.set('force_lighting_refresh',true);
                sendChat('daylight','Turning off UDL');
            }
        }
    }
  });
