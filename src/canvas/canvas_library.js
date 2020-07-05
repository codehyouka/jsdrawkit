
function addLayerFillRect(setting,layer,pathX,pathY,width,height){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"fill_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}   
function addLayerClearRect(setting,layer,pathX,pathY,width,height){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"clear_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}
function addLayerStrokeRect(setting,layer,pathX,pathY,width,height){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"stroke_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}
function addLayerMoveTo(setting,layer,pathX,pathY){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"move_to_line","value":{"pathX":pathX,"pathY":pathY}};
        


}
function addLayerLineTo(setting,layer,pathX,pathY){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"line_to_line","value":{"pathX":pathX,"pathY":pathY}};
        


}   
function addLayerIsFill(setting,layer,bool,loc_setting){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;

     var local_setting = _ct.varExtend({
       
        "color":"#000000"        
    },
    
    loc_setting);
   
    this.layer[this.main_uniq]={"action":"is_fill_line","value":{"bool":bool,"setting":local_setting}};
        


}

function addLayerArc(setting,layer,pathX,pathY,radius,sAngle,eAngle,clockwise){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"circle_to_arc","value":{"pathX":pathX,"pathY":pathY,"radius":radius,"sAngle":sAngle,"eAngle":eAngle,"clockwise":clockwise}};
        


} 



function addLayerIsStroke(setting,layer,bool,linewidth,linecolor){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"is_stroke_line","value":{"bool":bool,"linewidth":linewidth,"linecolor":linecolor}};
        


}
function addLayerImage(setting,layer,pathX,pathY){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"img_to_img","value":{"img":img, "pathX":pathX,"pathY":pathY}};
        


}
function addLayerFillText(setting,layer,text,pathX,pathY,loc_setting){

    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    var local_setting = _ps.varExtend({
        "font-family":"12px Arial",
        "color":"#000000"        
    },
    
    loc_setting);
    this.layer[this.main_uniq]={"action":"text_to_fill","value":{"text":text, "pathX":pathX,"pathY":pathY,"setting":local_setting}};
    

}
function addLayerStrokeText(setting,layer,text,pathX,pathY,setting){

    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    var local_setting = _ps.varExtend({
        "font-family":"12px Arial",
        "color":"#000000"        
    },
    
    setting);
    this.layer[this.main_uniq]={"action":"text_to_stroke","value":{"text":text, "pathX":pathX,"pathY":pathY,"setting":local_setting}};
    

}

//====
function layerMain(setting,get_uniq,json_val){
    this.setting = setting;

    var main = this;
    this.posX=0;
    this.posY=0;

   

    this.init = function(conf){
        
    }


 

    this.clearCanvas = function(){
        
    }

    
    
    this.addLayerFillRect = function(pathX,pathY,width,height){
        return new addLayerFillRect(this.setting,json_val["layer"],pathX,pathY,width,height);
    }

    this.addLayerClearRect = function(pathX,pathY,width,height){
       // json_val["layer"].push({"action":"clear_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}});
         return new addLayerClearRect(this.setting,json_val["layer"],pathX,pathY,width,height);
    }

     this.addLayerStrokeRect = function(pathX,pathY,width,height){
         // json_val["layer"].push({"action":"stroke_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}});
       
         return new addLayerStrokeRect(this.setting,json_val["layer"],pathX,pathY,width,height);
    }

    this.addLayerMoveTo = function(pathX,pathY){
        //json_val["layer"].push({"action":"move_to_line","value":{"pathX":pathX,"pathY":pathY}});
        return new addLayerMoveTo(this.setting,json_val["layer"],pathX,pathY);    
    }

    this.addLayerLineTo = function(pathX,pathY){
       // json_val["layer"].push({"action":"line_to_line","value":{"pathX":pathX,"pathY":pathY}});
         return new addLayerLineTo(this.setting,json_val["layer"],pathX,pathY);   
    }

    this.addLayerIsFill = function(bool,setting){
       //  json_val["layer"].push({"action":"is_fill_line","value":{"bool":bool}});
        return new addLayerIsFill(this.setting,json_val["layer"],bool,setting);   
    }



    this.addLayerArc = function(pathX,pathY,radius,sAngle,eAngle,clockwise){
        
       // json_val["layer"].push({"action":"circle_to_arc","value":{"pathX":pathX,"pathY":pathY,"radius":radius,"sAngle":sAngle,"eAngle":eAngle,"clockwise":clockwise}});
       return new addLayerArc(this.setting,json_val["layer"],pathX,pathY,radius,sAngle,eAngle,clockwise);    
    }

    this.addLayerIsStroke = function(bool,linewidth,linecolor){
        // json_val["layer"].push({"action":"is_stroke_line","value":{"bool":bool}});
        return new addLayerIsStroke(this.setting,json_val["layer"],bool,linewidth,linecolor);   
    }


    this.addLayerImage = function(img,pathX,pathY){
        
        //json_val["layer"].push({"action":"img_to_img","value":{"img":img, "pathX":pathX,"pathY":pathY}});
        return new addLayerImage(this.setting,json_val["layer"],pathX,pathY);  
    }
    this.addLayerFillText = function(text,pathX,pathY,setting){
        
        //json_val["layer"].push({"action":"img_to_img","value":{"img":img, "pathX":pathX,"pathY":pathY}});
        return new addLayerFillText(this.setting,json_val["layer"],text,pathX,pathY,setting);  
    }

    this.addLayerStrokeText = function(text,pathX,pathY,setting){
        
        //json_val["layer"].push({"action":"img_to_img","value":{"img":img, "pathX":pathX,"pathY":pathY}});
        return new addLayerStrokeText(this.setting,json_val["layer"],text,pathX,pathY,setting);  
    }
     

    this.removeLayer = function(index){

    }
    this.updateRect = function(index,coordX,coordY){

    }
    this.addLayerInCoords = function(coordX,coordY){

        
        supporting_library.addActionBaseArgument(json_val["action"],json_val["layer"],json_val["inc_action"],{coordX:coordX,coordY:coordY,index:json_val["inc_action"]});
        this.posX=coordX;
        this.posY=coordY;
        this.setting.generate();
        json_val["inc_action"]++;

    }

    this.changeLayerInCoords = function(coordX,coordY){
        
        //console.log(this.posX,this.posY,this.posX/this.posY,"pos2");
        var val_ary = supporting_library.changeActionBaseArgument(json_val["action"],json_val["layer"],{coordX:(coordX-this.posX),coordY:(coordY-this.posY)});
        this.posX=coordX//-this.posX;
        this.posY=coordY//-this.posY;
        this.setting.generate();

    }
    this.getCoordX = function(){
        return this.posX;
    }
    this.getCoordY = function(){
        return this.posY;
    }

}
