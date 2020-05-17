on("chat:message", function(msg) {
    
    // Retrieves tjhe Token name form the seleected tokens
    function getTokenName(selected) {
        
        var name = '';
        if(selected && selected.length === 1) {
            var selected_id = selected[0]._id;
            var token = getObj('graphic',selected_id);
           
            if(token) {
                log(token.get('name'))    
                name = token.get('name');
            }
        }
        return name;
    }
  if(msg.type == "api" && msg.content.indexOf("!swr ") !== -1) {
    log(msg.content);
    var args = msg.content.replace("!swr ", "");
    var traitandDice = args.split(",");
    var allowedDice=['4','6','8','10','12'];
    var traitName=traitandDice[0];
    var numberofDice=traitandDice[1];
    var diceSize=traitandDice[2];
    if (traitandDice[3]){
        var bonus=traitandDice[3];
    }
    else
    {
        var bonus=0;
    }
    
    //Validate Inputs
    var errorMessage="&{template:default}{{name=Savage Worlds Roller Doc}}{{doc=please use following format !swr trait,#,#,#}}{{API command=!SWR}}{{trait=the trait you want to roll (ie Agility, Shooting)}}{{First #=number of dice (>0 but <7)}}{{Second #=The die type (4,6,8,10,12,12+1,12+2)}}{{Optional Third #=Add the bonus/penalty to the roll (ie 2 or-2)}}  ";
     if (!traitName || !numberofDice || isNaN(numberofDice) || numberofDice<1 || numberofDice > 5 ||!diceSize||!allowedDice.includes(diceSize)||isNaN(bonus)) {
       sendChat(msg.who, errorMessage);
       return;
    }
    
    //Build Template
    var template = "&{template:default}"; 
    var name="{{name=";
    var openBracket = "{{";
    var closeBracket = "}}";
    var trait = "[[1d"+diceSize+"!+"+bonus+"]]}}";
    var wildDie = "{{Wild Die=[[1d6!"+"+"+bonus+"]]}}";
    var token_name = getTokenName(msg.selected);
    if(!token_name) {
        token_name = msg.who;
    }
    var rollTemplate = template+name+token_name+" Rolls "+traitName+closeBracket;
    if (numberofDice <= 1){
        rollTemplate = rollTemplate + openBracket +traitName+" die " + "=" +trait;
    } else {
        var i=0;
        for (i = 0; i < numberofDice; i++) {
            var rollNumer = Number(i) + 1;
            rollTemplate = rollTemplate + openBracket +traitName+" die " + rollNumer + "=" +trait;
        }
    }
    rollTemplate = rollTemplate+wildDie;
    sendChat(msg.who, rollTemplate);
  }
});