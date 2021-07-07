log("Starting up savageworldroller version 1.0");
on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!swr ") !== -1) {
    
    //constant for dice allowed
    var allowedDice=['4','6','8','10','12'];
    var errorMessage="&{template:default}{{name=Savage Worlds Roller Doc}}{{doc=please use following format !swr trait #d#+/-#}}{{API command=!SWR}}{{trait=the trait you want to roll (ie Agility, Shooting)}}{{First #=number of dice (>0 but <7)}}{{Second #=The die type (4,6,8,10,12)}}{{Optional Third #=Add the bonus/penalty to the roll (ie 2 or-2)}}";
    
    var args = msg.content.replace("!swr ", "");
    var traitandDice = args.split(" ");
   //Parse input
    var traitName=traitandDice[0];
    if (traitandDice[1]){
        var roll=traitandDice[1].split("d");
        var numberofDice=roll[0];
        if (roll[1]){
            if (roll[1].includes('-')){
                var diceSizeandBonous=roll[1].split("-");
                var diceSize=diceSizeandBonous[0];
                var bonus="-"+diceSizeandBonous[1];
            } else if (roll[1].includes('+')){
                var diceSizeandBonous=roll[1].split("+");
                var diceSize=diceSizeandBonous[0];
                var bonus=diceSizeandBonous[1];
            } else{
                var diceSize=roll[1];
                var bonus=0;
            }
        }
    }
    //Validate Inputs
    
     if (!traitName || !numberofDice || isNaN(numberofDice) || numberofDice<1 || numberofDice > 6 || !diceSize || !allowedDice.includes(diceSize) || isNaN(bonus)) {
       sendChat(msg.who, errorMessage);
       return;
    }
    
    //Build Template
    var template = "&{template:default}"; 
    var name = "{{name=";
    var openBracket = "{{";
    var closeBracket = "}}";
    var trait = "[[1d" + diceSize + "!+" + bonus + "]]}}";
    var wildDie = "{{Wild Die=[[1d6!" + "+" + bonus + "]]}}";
    var token_name = getTokenName(msg.selected);
    if(!token_name) {
        token_name = msg.who;
    }
    var rollTemplate = template + name + token_name + " Rolls " + traitName + closeBracket;
    if (numberofDice <= 1){
        rollTemplate = rollTemplate + openBracket + traitName +" die " + "=" + trait;
    } else {
        var i=0;
        for (i = 0; i < numberofDice; i++) {
            var rollNumer = Number(i) + 1;
            rollTemplate = rollTemplate + openBracket + traitName + " die " + rollNumer + "=" +trait;
        }
    }
    rollTemplate = rollTemplate+wildDie;
    sendChat(msg.who, rollTemplate);
  }
});
