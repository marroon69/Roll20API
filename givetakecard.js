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
  if(msg.type == "api" && msg.content.indexOf("!card ") !== -1) {
    var args;
    var command;
    var allowedComands=["give","take","toggle"];
    args = msg.content.replace("!card ", "");
    var command = args.split(" ")[0];
    
    var cardName = args.split(" ")[1];
    
    var error = "";
    var errorMessage="&{template:default}{{Error Message=";
    
    if (!command || !allowedComands.includes(command)){
         error = "Valid Commands are : give, take, toggle";
         sendChat(msg.who, errorMessage+error+"}}");
         return;
    }
    
    if (!cardName)
    {
         error = "Missing Card Name";
         sendChat(msg.who, errorMessage+error+"}}");
         return;
    }
    var controlleredBy = getTokenControlledby(msg.selected);
   
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
           
           if (command=="toggle"){
               if (playerHasCard(controlleredBy, cardid)){
                   command="take";
               } else {
                   command="give";
               }
           }
           if (command=="give"){
                if (!playerHasCard(controlleredBy, cardid)){
                    giveCardToPlayer(cardid, controlleredBy);
                }
           } else {
                takeCardFromPlayer(controlleredBy, {cardid: cardid} )
           }
        }
  }
});
