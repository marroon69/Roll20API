    // Retrieves the Token name form the seleected tokens
    function getTokenName(selected) {
        
        var name = '';
        if(selected && selected.length === 1) {
            var selected_id = selected[0]._id;
            var token = getObj('graphic',selected_id);
           
            if(token) {

                name = token.get('name');
            }
        }
        return name;
    }
    
     function isTokenStatusSet(selected,status) {
        
        var statusSet = "";
        var statusName;
        var isStatusSet;
        if(selected && selected.length === 1) {
            var selected_id = selected[0]._id;
            var token = getObj('graphic',selected_id);
            if(token) {

                statusSet = token.get("statusmarkers").split(",");
               
                for (index = 0; index < statusSet.length; index++) {
                    statusName = statusSet[index].split("::");
               
                    if (statusName[0] == status){
                        isStatusSet=true;
                    }
                }
               
            }
        }
        return isStatusSet;
    }
    
    function getTokenControlledby(selected) {
        
        var controlledby = '';
        if(selected && selected.length === 1) {
           var selected_id = selected[0]._id;
           var token = getObj('graphic',selected_id);
          
            if(token) {
               controlledby = token.get('controlledby');
                if (controlledby !='all'){
                    var represents = token.get('represents');
                    
                    //use the character represents not the controlled by
                    if (represents){
                        var charcater = getObj('character',represents);
                        controlledby = charcater.get('controlledby');
                       
                    }
                } else {
                    controlledby = '';
                }
            }
        }
        return controlledby;
    }
    
     function playerHasCard(playerId, cardid) {
        
       let hand = findObjs({                              
                _parentid: playerId,                              
                _type: "hand",                          
                })[0];
        let cards = hand.get("currentHand").split(",");
        return cards.includes(cardid);
    }
