on('chat:message', msg => {
    if(msg.type === 'api' && msg.content === '!GMD') {
        let sheetname='GM dashboard';
        let header='<p><a href=\"!GMD\">refresh</a><br></p>';
        let table = '<table class= "userscript-table userscript-table-bordered" style="border: 1px solid black;"><tbody>';
        let tableRowEven = '<tr style= "border: 1px solid black; background-color: #f2f2f2;">';
        let tableRowOdd = '<tr style= "border: 1px solid black; ">';
        let tableRow = "";
        let tableCell = '<td style="border: 1px solid black;">';
        let columnNames =['Name', 'HP','HP Max', 'AC', 'Perception', 'Stealth','Fort', 'Refex', 'Will','Lore']
        let attributes = ['character_name', 'hit_points','hit_points_max','armor_class', 'group$perception$perception_proficiency_display',
        'group$stealth$stealth_proficiency_display','saving_throws_fortitude', 'saving_throws_reflex', 'saving_throws_will', 'repeating_lore_$0_lore_name'];
        let footer='</tbody></table><p><br></p>'
        let body='';
        let gmnotes;
        let gmnote;
        let allCharacters;
        let sheet_type='npc';
        let repeatingDelimiter='$0_';
        var loreList=[];
        header = header.concat(table);
        
        gmnotes = findObjs({ type:'handout',name:sheetname});

       if (Array.isArray(gmnotes) && gmnotes.length === 0){
            gmnote = createObj('handout', {name: sheetname});
        } else {
            gmnote= gmnotes[0]
        }
    //    gmnote.get("notes", function(notes) {
    //        log(notes); //do something with the character bio here.
    //    });
    
        header = header.concat(tableRow);
        columnNames.forEach(function (item,index) {
            header = header.concat('<th style=" background-color: #04AA6D;border: 2px solid black;">'+item+'</th>');
        });
        header.concat('</tr>');
        allCharacters=findObjs({ type: 'character'});
        allCharacters.forEach(function (item, index) {
            if(index % 2 == 0) {
                tableRow = tableRowEven;
            } else{
                tableRow = tableRowOdd;
            }
             body = body.concat(tableRow);
            if (getAttrByName(item.id, "sheet_type") !== sheet_type){
                attributes.forEach(function (attribute,index) {
                    if (attribute.includes('_max')){
                        attribute= attribute.replace('_max','');
                        body = body.concat(tableCell+getAttrByName(item.id, attribute,'max')+'</td>');
                        
                    } else if (attribute.includes('repeating')){
                        repeatList=[];
                        let repeating_attrribute = attribute.split(repeatingDelimiter)[1];
                        
                        let repeating = findObjs({_type: 'attribute',_characterid:item.id});
                        repeating.forEach(function (item, index) {
                            
                            let name = item.get('name');
                            
                            if (name.includes(repeating_attrribute)){
                                
                                repeatList.push(item.get('current'));
                            }
                        });
                       ;
                        body = body.concat(tableCell);
                        repeatList.forEach(function(item,index){
                            body = body.concat(item+'<br>');
                        })
                        body = body.concat('</td>');
                    } else if (attribute.includes('group$')){
                        attribute= attribute.replace('group$','');
                        let groupAttributes=attribute.split('$');
                        body = body.concat(tableCell);
                        groupAttributes.forEach(function(groupedAtrribute,index){
                            body = body.concat(getAttrByName(item.id, groupedAtrribute));
                        })
                        body = body.concat('</td>');

                    }
                    else{
                        
                        body = body.concat(tableCell+getAttrByName(item.id, attribute)+'</td>');
                    }
                });
            }
             body = body.concat('</tr>');
        });
        gmnote.set('notes', header+body+footer);
    }
});
