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
    
    function getTokenControlledby(selected) {
        
        var controlledby = '';
        if(selected && selected.length === 1) {
           var selected_id = selected[0]._id;
           var token = getObj('graphic',selected_id);
          
            if(token) {
                controlledby = token.get('controlledby');
                var represents = token.get('represents');
                //use the character represents not the controlled by
                if (represents){
                    var charcater = getObj('character',represents);
                    controlledby = charcater.get('controlledby');
                }
            }
        }
        return controlledby;
    }
