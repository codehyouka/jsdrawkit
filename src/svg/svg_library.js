function addLayerRectangle(setting,layer,width,height){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"rect","value":{"width":width,"height":height,"style":"'stroke:rgb(0,0,0)'"}};

   this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }     

} 

function addLayerCircle(setting,layer,coordX,coordY,radius){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"circle","value":{"cx":coordX,"cy":coordY,"r":radius,"stroke":"","stroke-width":"","fill":""}};
        
    this.setStroke=function(strs){
       this.layer[this.main_uniq]['value']['stroke']=strs
   }   
   this.setStrokeWidth=function(strs){
       this.layer[this.main_uniq]['value']['stroke-width']=strs
   } 

    this.setFill=function(strs){
       this.layer[this.main_uniq]['value']['fill']="'"+strs+"'"
   }     
} 

function addLayerEllipse(setting,layer,coordX,coordY,radiusX,radiusY){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"ellipse","value":{"cx":coordX,"cy":coordY,"rx":radiusX,"ry":radiusY,"style":"'stroke:rgb(0,0,0)'"}};
        
     this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }
} 

function addLayerLine(setting,layer,coordX1,coordY1,coordX2,coordY2){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"line","value":{"x1":coordX1,"y1":coordY1,"x2":coordX2,"y2":coordY2,"style":"'stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }    
} 

function addLayerPolygon(setting,layer,points){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
        
    this.layer[this.main_uniq]={"action":"polygon","value":{"points":"'"+points+"'","style":"'stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }  
} 
function addLayerPolyline(setting,layer,points){
     this.main_uniq = _ct.getUniq();
    this.layer=layer;
        
    this.layer[this.main_uniq]={"action":"polyline","value":{"points":"'"+points+"'","style":"'fill:none;stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }   
} 

function addLayerPath(setting,layer){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"fill_rect","value":{}};
        

} 

function addLayerText(setting,layer,text,x,y){
    this.main_uniq = _ct.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"text","value":{"text":text,"x":x,"y":y,"style":"'fill:black;'","tspan":[]}};
    var reference_val = [];       
    this.setTransform=function(strs){
       this.layer[this.main_uniq]['value']['transform']=strs
   } 

   this.setSpanText=function(text,x,y){
       var glb_var = {text:text,x:x,y:y};
       //var strs=supporting_library.data_svg_method(glb_var)
       this.layer[this.main_uniq]['value']['tspan'].push(glb_var);
   } 

    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['fill']=supporting_library.data_svg_method(strs);
   } 
} 



function layerMain(setting,get_uniq,json_val){
this.setting = setting;
this.get_uniq = get_uniq;
   var event_class = {
            test:function(){
                alert("DSA");
            }


    };

var add_layer = [];
    var event_action = [];

  
    this.init = function(conf){
        
    }

    this.clearSvg = function(){
        
    }

   this.removeLayer = function(index){

    }
    


 
 


    this.addLayerRectangle = function(width,height){
        
        // <rect>
       // var config_res = config||{};
       // json_val["layer"].push({"action":"rect","value":config_res });
       return new addLayerRectangle(this.setting,json_val["layer"],width,height)
    }
    this.addLayerCircle = function(coordX,coordY,radius){
        // <circle>
       //  var config_res = config||{};
       // json_val["layer"].push({"action":"circle","value":config_res });
       return new addLayerCircle(this.setting,json_val["layer"],coordX,coordY,radius)
     }
    this.addLayerEllipse = function(coordX,coordY,radiusX,radiusY){
        // <ellipse>
    //     var config_res = config||{};
    //    json_val["layer"].push({"action":"ellipse","value":config_res });   
    return new addLayerEllipse(this.setting,json_val["layer"],coordX,coordY,radiusX,radiusY) 
    }
    this.addLayerLine = function(x1,y1,x2,y2){
        //<line>
   //      var config_res = config||{};
    //    json_val["layer"].push({"action":"line","value":config_res }); 
     return new addLayerLine(this.setting,json_val["layer"],x1,y1,x2,y2);    
    }
    this.addLayerPolyline = function(points){
        //<polyline>
      //   var config_res = config||{};
      //  json_val["layer"].push({"action":"polyline","value":config_res });
      var ar_points = _ct.getTypeof(points)=="array"?points.join(","):points;
      return new addLayerPolyline(this.setting,json_val["layer"],ar_points)  
    }
    this.addLayerPolygon = function(points){
        //<polygon>
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"polygon","value":config_res });
      var ar_points = _ct.getTypeof(points)=="array"?points.join(","):points;
       return new addLayerPolygon(this.setting,json_val["layer"],ar_points)  
    }
    this.addLayerPath = function(config){
        // <path>
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"path","value":config_res });
     return new addLayerPath(this.setting,json_val["layer"],config)  
     }
     
     this.addLayerText = function(text,x,y){
        // <path>
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"path","value":config_res });
     return new addLayerText(this.setting,json_val["layer"],text,x,y)  
     } 


    
    this.updateMove = function(index,coordX,coordY){

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
      //  this.posX=coordX//-this.posX;
      //-  this.posY=coordY//-this.posY;
        this.setting.updateCoords(this.get_uniq,coordX,coordY);

    }
}

