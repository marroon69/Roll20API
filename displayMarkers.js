on('ready',function() {
    "use strict";

    if( state.displayMarkers){
        state.displayMarkers = {
            version: 'v1.0'
        };
    }
    log('-=> Loading Display Markers '+ state.displayMarkers.version);

});

on('chat:message', msg => {
    if(msg.type === 'api' && msg.content.split(' ')[0].toLowerCase() === '!markers') {
        
        if(msg.selected && msg.selected.length >= 1) {
            
            let div = "<div style=border-style: solid>"
            msg.selected.forEach(function(selectedGraphic,index){
                
                let selected_id = selectedGraphic._id;
            
                let token = getObj('graphic',selected_id);
            
                if(token) {
                    let markers = token.get('statusmarkers').split(',');
                    let message = '<div style="border: 1px solid black; background-color: white; padding: 3px 3px;"> <div style="border: 1px solid black; background-color: #002766;  padding: 3px 3px;"> <h4 style ="color: white;">' + token.get('name')+'<br> Current Conditions </h4> </div>'; 
                    markers.forEach(function (item, index) {
                        let marker= item.split('@');
                        let name = marker[0];
                        let value = '';
                        if (marker.length === 2){
                            value = marker[1];
                        }
                        let tm = libTokenMarkers.getStatus(name);
                        message = message.concat('<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'+tm.getHTML() +tm.getName() + ' ' +value + '</div>');
                    })
                    message = message.concat('<div');
                    sendChat(token.get('name'),message,null,{noarchive:true});
                }
            })
        }
    }
});
