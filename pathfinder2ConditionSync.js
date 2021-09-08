on('ready',function() {
    "use strict";

    if( state.PF2ConditionSync){
        state.PF2ConditionSync = {
            version: 'v1.0'
        };
    }
    log('-=> Loading Pathfinder 2 Condition Sync '+ state.PF2ConditionSync.version);

});

on('change:attribute', function(obj, prev) {
    
    
    let statues = ['Blinded','Clumsy','Concealed','Confused', 'Flat-Footed','Controlled','Dazzled','Deafened','Doomed','Drained',
    'Dying','Encumbered', 'Enfeebled','Fascinated','Fatigued', 'Fleeing','Frightened','Grabbed','Hidden','Immobilized','Invisible',
    'Paralyzed', 'Petrified','Prone', 'Quickened','Restrained','Sickened','Slowed', 'Stunned', 'Stupefied', 'Unconscious', 'Undetected',
    'Wounded'];
    let charId = obj.get('_characterid');
    
    
    if (statues.includes(obj.get('name'))){
        
        let token =  _.chain(findObjs({type:'graphic'}))
            .filter((o)=>o.get('represents')===charId)
            .value()[0];
        
        let status = libTokenMarkers.getStatus(obj.get('name').toLowerCase());
        let currentMarkers = token.get('statusmarkers').split(',');
        
        if (obj.get('current') === 'on'){
            if (! currentMarkers.includes(status.getTag())){
                currentMarkers.push(status.getTag());
                token.set('statusmarkers', currentMarkers.join(','));
            }
        } else {
            currentMarkers = currentMarkers.filter(function(item) {
                return !item.includes(status.getTag());
            });
           
            token.set('statusmarkers', currentMarkers.join(','));
        }
        
    } else if(obj.get('name').includes('conditionvalue')){
        
        let character = getObj('character',charId);
        let condition = obj.get('name').replace('conditionvalue', 'condition');
        let attribute = getAttrByName(character.id, condition).toLowerCase();
       
        
         let token =  _.chain(findObjs({type:'graphic'}))
            .filter((o)=>o.get('represents')===charId)
            .value()[0];
        
        let status = libTokenMarkers.getStatus(attribute.toLowerCase());
        
        let currentMarkers = token.get('statusmarkers').split(',');
        
        
        currentMarkers = currentMarkers.filter(function(item) {
              return !item.includes(attribute);
        });
       
        let newStatus = status.getTag()+'@'+obj.get('current');
       
        currentMarkers.push(newStatus);
       
        token.set('statusmarkers', currentMarkers.join(','));
        
    }
});
