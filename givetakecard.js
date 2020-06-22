log("Starting up givetakecard version 1.0");


 function playerHasCard(playerId, cardid) {
        
       let hand = findObjs({                              
                _parentid: playerId,                              
                _type: "hand",                          
                })[0];
        let cards = hand.get("currentHand").split(",");
        return cards.includes(cardid);
    }

on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!giveCard ") !== -1 || msg.content.indexOf("!takeCard ") !== -1|| msg.content.indexOf("!toggleCard ") !== -1) {
    var args;
    var command;
    if (msg.content.indexOf("!giveCard ") !== -1){  
        args = msg.content.replace("!giveCard ", "");
        command = "give";
    } else if (msg.content.indexOf("!takeCard ") !== -1) {
         args = msg.content.replace("!takeCard ", "");
         command="take";
    } else if (msg.content.indexOf("!toggleCard ") !== -1) {
         args = msg.content.replace("!toggleCard ", "");
         command="toggle";
    }  
    
    var cardName = args.split(" ")[0];
    var error = "";
    var errorMessage="&{template:default}{{Error Message=";
    
    
    if (!cardName)
    {
         error = "Missing Card Name";
         sendChat(msg.who, errorMessage+error+"}}");
         return;
    }
    var controlleredBy = getTokenControlledby(msg.selected);
   
    if (!controlleredBy)
    {
        error = "Issue with the Token (either not selected or no controll set)";
        sendChat(msg.who, errorMessage+error+"}}");
        return;
    }
    
    var card = findObjs({type:'card',name: cardName})[0];
    if (!card)
    {
        error = "Card "+cardName+" not Found";
        sendChat(msg.who, errorMessage+error+"}}");
        return;
    }
    
    var cardid = card.get("_id");
    if (!cardid)
    {
       error = "Card "+cardName+" not Found";
       sendChat(msg.who, errorMessage+error+"}}");
       return;
    }
    
        if(cardid){
           
           if (command=="toggle"){
               if (playerHasCard(controlleredBy, cardid)){
                   command="take";
               } else {
                   command="give";
               }
           }
           if (command=="give"){
            giveCardToPlayer(cardid, controlleredBy);
           } else {
            takeCardFromPlayer(controlleredBy, {cardid: cardid} )
           }
        }
  }
});
