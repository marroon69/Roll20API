on("chat:message", function(msg) {
    
  if(msg.type == "api" && msg.content.indexOf("!giveCard ") !== -1 || msg.content.indexOf("!takeCard ") !== -1) {
    var args;
    var command;
    if (msg.content.indexOf("!giveCard ") !== -1){  
        args = msg.content.replace("!giveCard ", "");
        command = "give";
    } else {
         args = msg.content.replace("!takeCard ", "");
         command="take";
    }
    log(command);
    var cardName = args.split(" ")[0];
    var error = "";
    var errorMessage="&{template:default}{{name=Give Card Doc}}{{doc=please use following format !giveCard cardname and make sure you have a token selected and that token has an owner}}{{API command=!giveCard cardname}}{{cardname=The name of the card you wish to deal}} {{Error Message=";
    
    log(cardName);
    if (!cardName)
    {
         error = "Missing Card Name";
         sendChat(msg.who, errorMessage+error+"}}");
         return;
    }
    var controlleredBy = getTokenControlledby(msg.selected);
    log(controlleredBy);
    if (!controlleredBy)
    {
        error = "Issue with the Token controlled By Setting";
        sendChat(msg.who, errorMessage+error+"}}");
        return;
    }
    
    var card = findObjs({type:'card',name: cardName})[0];
    if (!card)
    {
        error = "Card not Found";
        sendChat(msg.who, errorMessage+error+"}}");
        return;
    }
    
    var cardid = card.get("_id");
    if (!cardid)
    {
        error = "Card not Found";
       sendChat(msg.who, errorMessage+error+"}}");
       return;
    }
    
        if(cardid){
           log(cardid);
           if (command=="give"){
            giveCardToPlayer(cardid, controlleredBy);
           } else {
            takeCardFromPlayer(controlleredBy, {cardid: cardid} )
           }
        }
  }
});
