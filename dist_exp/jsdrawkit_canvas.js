 (function(window){ 
 /** 
 /* This program was writtern by pein freccs. 
 /* Please check my repository for details and update 
 /* https://github.com/codehyouka/jsdrawkit 
 **/ 
 var root = window;
 var dwk_global=root[Math.random().toString(36).replace(/[^a-z]+/g, '')]={};
 dwk_global.canvas_reference_value = {};
  //  dwk_global.load_element=[]; 
  //  dwk_global.load_event={}; 
     

    
    var supporting_library = { 
        get_canvas_details:function(dom){
            var dom_main = ps("dom",dom).eq(0);
            var main_tagname = dom_main.getTagName().toLowerCase();
            var uniq_id = _ps.getUniq();

              console.log(main_tagname);  

              if(main_tagname == "canvas"){
                  dom_main.attr({"ref_draw_id":uniq_id});

              }else{
                  dom_main.html("<canvas ref_draw_id = "+uniq_id+"></canvas>")
              }
              var main_canvas = ps("dom","*[ref_draw_id = "+uniq_id+"]");
           return{
               uniq_id:uniq_id,
               main_canvas:main_canvas
           }   
        }
        ,
        coordsExtends:function(loop_val,jsn_value){
            var jsn_resrv = {};

            for(var i in loop_val){
                jsn_resrv[i] = _ps.has(loop_val,i)?loop_val[i]:0;
            }

             for(var i in jsn_value){
                 jsn_resrv[i] = _ps.has(jsn_value,i)?jsn_value[i]:0;
            }

            return supporting_library.coordsFunctionValue(jsn_resrv);
        }
        ,
        coordsFunctionValue:function(jsn_value){
            var join_key = _ps.getKey(jsn_value).join("|");
          
            for(var i in jsn_value){
  
                if(_ps.getTypeof(jsn_value[i]) == "function"){
                    jsn_value[i] = jsn_value[i]();
                }
                if(_ps.getTypeof(jsn_value[i]) == "string"){

                    if (/[\{\}]{1}/g.test(jsn_value[i])){
                        var value_repl_cmd = jsn_value[i].replace(/[\{\}]{1}/g,"");
                        var reg_rexp = new RegExp("("+join_key+")","g");
                        var value_repl = value_repl_cmd.replace(reg_rexp,"glb.$1");
                    

                        var func_val = new Function("glb","return "+value_repl);
                        jsn_value[i] = func_val(jsn_value);
                    }
                    
                   
                }
               
            }
            return jsn_value;
        }
       
        ,addActionBaseArgument:function(array_pass,array_layer,inc_action,obj_val){
            _ps.each(array_layer,function(k,v){
            
                var val_extend = supporting_library.coordsExtends(v.value,obj_val);
              
            
              array_pass.push({"action":v.action,"value":val_extend,"inc_action":inc_action,"inc_layer":k,"uniq_key":k})
            });
            
        }

        ,changeActionBaseArgument:function(array_pass,array_layer,obj_val){
            var ref_array = [];
           
         
            for(var i = 0;i<array_pass.length;i++){
          
          
                var v_ac = array_pass[i];
             
                var v_lay = array_layer[v_ac.uniq_key];
                var ref_obj_val={} 
                ref_obj_val.coordX = parseInt(v_ac.value.coordX)+parseInt(obj_val.coordX);
                ref_obj_val.coordY = parseInt(v_ac.value.coordY)+parseInt(obj_val.coordY);
               var val_extend = supporting_library.coordsExtends(v_lay.value,ref_obj_val);
             
                array_pass[i] = {"action":v_ac.action,"value":val_extend,"inc_action":v_ac.inc_action,"inc_layer":v_ac.inc_layer,"uniq_key":v_ac.uniq_key};
           }
        }
    };
    
    
     
    
   
    
    
   
    
    
    
    
    


function addLayerFillRect(setting,layer,pathX,pathY,width,height){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"fill_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}   
function addLayerClearRect(setting,layer,pathX,pathY,width,height){
     this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"clear_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}
function addLayerStrokeRect(setting,layer,pathX,pathY,width,height){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"stroke_rect","value":{"pathX":pathX,"pathY":pathY,"width":width,"height":height}};
        

}
function addLayerMoveTo(setting,layer,pathX,pathY){
     this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"move_to_line","value":{"pathX":pathX,"pathY":pathY}};
        


}
function addLayerLineTo(setting,layer,pathX,pathY){
     this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"line_to_line","value":{"pathX":pathX,"pathY":pathY}};
        


}   
function addLayerIsFill(setting,layer,bool,loc_setting){
     this.main_uniq = _ps.getUniq();
    this.layer=layer;

     var local_setting = _ps.varExtend({
       
        "color":"#000000"        
    },
    
    loc_setting);
   
    this.layer[this.main_uniq]={"action":"is_fill_line","value":{"bool":bool,"setting":local_setting}};
        


}

function addLayerArc(setting,layer,pathX,pathY,radius,sAngle,eAngle,clockwise){
     this.main_uniq = _ps.getUniq();
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

}

 var dcw_module = {
        tests:function(){
            console.log(this.dom);
            alert("tests");
        }
    };

function canvas_init(value,main_uniq,reference_value){
    var main_value =  value;
    this.setting =  {};
    this.active =  true;
    this.canva_ps = main_value.main_canvas;
     this.canva_dom = main_value.main_canvas.element[0];
    this.canva = this.canva_dom.getContext("2d");
    this.default_value = reference_value;
     
    this.default_init_class = [];
    this.setting = function(setting){
        if (_ps.getTypeof(setting) == "json"){
            this.setting =  setting;
        }
         var dimes_details = _ps.varExtend({
                            "width":"300",
                             "height":"150",
                             "is_pixel":true
                                
                             }, this.setting);

        this.resizeCanvas(dimes_details.width,dimes_details.height);                                 
    }

    this.resizeCanvas=function(width,height){
         this.canva_dom.width = width;
         this.canva_dom.height  = height;

        this.canva_dom.style.width = width;
        this.canva_dom.style.height  = height;


         this.pixelRatio();  
    }
    this.getCanvasHeight = function(){
       
       return this.canva_dom.height;
    }

    this.getCanvasWidth = function(){
       
       return this.canva_dom.width;
    }
    this.is_active = function(active){
        this.active = active; 
    }

    this.pixelRatio = function(){
        var is_pixel = this.setting['is_pixel'];
        if(is_pixel){

            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = this.canva.webkitBackingStorePixelRatio || this.canva.mozBackingStorePixelRatio || this.canva.msBackingStorePixelRatio || this.canva.oBackingStorePixelRatio || this.canva.backingStorePixelRatio || 1;

            var ratio =  devicePixelRatio/backingStoreRatio;
            
            if(devicePixelRatio !== backingStoreRatio){ 
                var oldWidth = this.canva_dom.width;
                var oldHeight = this.canva_dom.height;

                this.canva_dom.width = oldWidth*ratio;
                this.canva_dom.height  = oldHeight*ratio;

                this.canva_dom.style.width = oldWidth;
                this.canva_dom.style.height  = oldHeight;

                this.canva.scale(ratio,ratio);
            }
        }
    }

    
}   

canvas_init.prototype.canvasAction = function(obj_val){
    var main = this.canva;
    
     var event_class = {
          fill_rect:function(glb){
             main.fillRect(glb.pathX, glb.pathY, glb.width, glb.height);
            },
            clear_rect:function(glb){
              main.clearRect(glb.pathX, glb.pathY, glb.width, glb.height);
            },
            stroke_rect:function(glb){
               main.strokeRect(glb.pathX, glb.pathY, glb.width, glb.height);
           },

           move_to_line:function(glb){
               main.moveTo(glb.pathX, glb.pathY);
           }
           ,
           line_to_line:function(glb){
               main.lineTo(glb.pathX, glb.pathY);
           }
           ,
          
           circle_to_arc:function(glb){
               main.arc(glb.pathX, glb.pathY,glb.radius,glb.sAngle,glb.eAngle,glb.clockwise);
              
         },
           
           is_fill_line:function(glb){
               
               var local_bool = true;
               
               if(_ps.getTypeof(glb.bool) == "boolean"){
                   local_bool = glb.bool;
               }
               main.fillStyle =  glb.setting['color'];
               if(local_bool )
               main.fill();//(glb.pathX, glb.pathY);
           },
            is_stroke_line:function(glb){
                
              
                   main.lineWidth = parseInt(glb['linewidth']);
               if(glb.linecolor.toString() !="0" ){
                   main.strokeStyle = glb.linecolor; 
               }


               var local_bool = true;
               
               if(_ps.getTypeof(glb.bool) == "boolean"){
                   local_bool = glb.bool;
               }
               if(local_bool )
               main.stroke();//(glb.pathX, glb.pathY);
           }
           ,
            img_to_img:function(glb){
               main.drawImage(glb.img,glb.pathX, glb.pathY);//(glb.pathX, glb.pathY);
           },
           text_to_stroke:function(glb){

               main.font =  glb.setting['font-family'];

                main.strokeStyle =  glb.setting['color'];
               main.strokeText(glb.text,glb.pathX, glb.pathY);
           },
           text_to_fill:function(glb){

               main.font =  glb.setting['font-family'];

                main.fillStyle =  glb.setting['color'];
               main.fillText(glb.text,glb.pathX, glb.pathY);
           }
           

   };
   main.beginPath();
  _ps.each(obj_val.action,function(k,v){
            var attr = v;
           
            event_class[attr.action](attr.value);
        });
  
     main.save();
}


canvas_init.prototype.AddInitClass = function(clas_s,get_uniq){
    this.default_init_class.push({clas_s:clas_s,get_uniq:get_uniq});
    
}

canvas_init.prototype.AddValue = function(action,value){
    
}

canvas_init.prototype.generate = function(){
    this.canva.clearRect(0, 0,  this.canva_dom.width,  this.canva_dom.height);
    for(var i in this.default_init_class){
        var val_action =this.default_init_class[i];
       this.canvasAction(this.default_value[val_action.get_uniq]);
     
    }
}

    drawkit_cnv=function(dom,setting){
        if(_ps.has(dom) == false)
        return false;
        this.main_uniq = _ps.getUniq();
        dwk_global.canvas_reference_value[this.main_uniq] = {};
      
        var dom_details=supporting_library.get_canvas_details(dom);    

        this.cls_main = new canvas_init(dom_details,this.main_uniq,dwk_global.canvas_reference_value[this.main_uniq]);
        this.cls_main.setting(setting);
       

      
    }
    drawkit_cnv.prototype.setting = function(setting){
        this.cls_main.setting(setting);
    }
    drawkit_cnv.prototype.is_active = function(bool){
         this.cls_main.is_active(bool);
    }
 
    drawkit_cnv.prototype.getCanvasHeight = function(){
        this.cls_main.getCanvasHeight();
    }
    drawkit_cnv.prototype.getCanvasWidth = function(){
        this.cls_main.getCanvasWidth();
    }

 drawkit_cnv.prototype.layerNew = function(conf){
       var get_uniq = _ps.getUniq();
     
       dwk_global.canvas_reference_value[this.main_uniq][get_uniq] = {};
        dwk_global.canvas_reference_value[this.main_uniq][get_uniq]["action"]=[];
         dwk_global.canvas_reference_value[this.main_uniq][get_uniq]["inc_action"]=0;
  
        dwk_global.canvas_reference_value[this.main_uniq][get_uniq]["layer"]={};
       json_val =  dwk_global.canvas_reference_value[this.main_uniq][get_uniq];
       var cls = new layerMain(this.cls_main,get_uniq,json_val);
       this.cls_main.AddInitClass(cls,get_uniq);
       cls.init(conf);

     return cls;
    }



     drawkit_cnv.prototype.onMouseMove = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousemove,touchmove",function(e){
            func.call(this,e);
        });
    }

     drawkit_cnv.prototype.onMouseUp = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mouseup,touchend",function(e){
            func.call(this,e);
        });
    }

    drawkit_cnv.prototype.onMouseDown = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousedown,touchstart",function(e){
            func.call(this,e);
        });
    }
    drawkit_cnv.prototype.onMouseDrag = function(){
        
         if(_ps.has(func) == false)
        return false;

        var is_drag = false;
        this.cls_main.canva_ps.mousedown(function(e){
           is_drag = true;
        });

        this.cls_main.canva_ps.mouseup(function(e){
           is_drag = false;
        });

        this.cls_main.canva_ps.mousemove(function(e){
            if(is_drag)
           func.call(this,e);
        });
    }

    bootloader = (function(){
        root.drawkit_canvas = drawkit_cnv;
        root.drawkit_canvas.module = {};
        root.drawkit_canvas.version="1.0.0.0"; 
    
        
        return {

            init_loader_module : function(){
                
                for(var i in root.drawkit_canvas.module){
                    if(_ps.has(drawkit_cnv.prototype,i) == false)
                   drawkit_cnv.prototype[i]=root.drawkit_canvas.module[i];
                }

            }
        }
    });
    
    
    var init_load = bootloader();
    
    ps("ready",function(){
        init_load.init_loader_module();
    });
     
 })(window); 