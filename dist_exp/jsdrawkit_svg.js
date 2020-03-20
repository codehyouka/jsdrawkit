 (function(window){ 
 /** 
 /* This program was writtern by pein freccs. 
 /* Please check my repository for details and update 
 /* https://github.com/codehyouka/jsdrawkit 
 **/ 
 var root = window;
 var dwk_global=root[Math.random().toString(36).replace(/[^a-z]+/g, '')]={};
 dwk_global.svg_reference_value = {};
  //  dwk_global.load_element=[]; 
  //  dwk_global.load_event={}; 
     

    
    var supporting_library = { 
        get_svg_details:function(dom){
            var dom_main = ps("dom",dom).eq(0);
            var main_tagname = dom_main.getTagName().toLowerCase();
            var uniq_id = _ps.getUniq();

              console.log(main_tagname);  

              if(main_tagname == "svg"){
                  dom_main.attr({"ref_draw_id":uniq_id});

              }else{
                  dom_main.html("<svg ref_draw_id = "+uniq_id+"></svg>")
              }
              var main_svg = ps("dom","*[ref_draw_id = "+uniq_id+"]");
              main_svg.attr({"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"});
           return{
               uniq_id:uniq_id,
               main_svg:main_svg
           }   
        }
        ,
        coordsExtends:function(loop_val,jsn_value){
            var jsn_resrv = {};

            for(var i in loop_val){
                jsn_resrv[i] = _ps.has(loop_val,i)?loop_val[i]:0;
            }

         //    for(var i in jsn_value){
         //        jsn_resrv[i] = _ps.has(jsn_value,i)?jsn_value[i]:0;
         //   }
           
            return supporting_library.coordsFunctionValue(jsn_resrv);
        }
        ,
        coordsFunctionValue:function(jsn_value){
            var join_key = _ps.getKey(jsn_value).join("|");// ["x1","y1","x2","y2","coordX","coordY","width","index","height","cx","cx2","cy","cy2","radius"].join("|");
             var restricted_key = ['points',"stroke","stroke-width","fill","style","transform"];
            for(var i in jsn_value){
                var reg_rexp_rest = new RegExp("("+restricted_key.join("|")+")","g");
                if (reg_rexp_rest.test(i) == false){
                 
                    if(_ps.getTypeof(jsn_value[i]) == "function"){
                        jsn_value[i] = jsn_value[i]();
                    }
                    if(_ps.getTypeof(jsn_value[i]) == "string"){
                        var reg_rexp = new RegExp("("+join_key+")","g");
                      
                        var value_repl = jsn_value[i].replace(reg_rexp,"glb.$1");
                    

                        var func_val = new Function("glb","return "+value_repl);
                        jsn_value[i] = func_val(jsn_value);
                    
                    }
               }
            }
            
            return jsn_value;
        }
        ,data_svg_method:function(jsons){
            
            return "'"+_ps.delimiter(jsons,":",";")+"'";

        } 
       ,addActionBaseArgument:function(array_pass,array_layer,inc_action,obj_val){
         
           var ref_sub_action = [];
            _ps.each(array_layer,function(k,v){
                
                var val_extend =supporting_library.coordsExtends(v.value,obj_val);
              
              ref_sub_action.push({"action":v.action,"value":val_extend,"inc_layer":k})
            });
            array_pass.push({
                "coords":obj_val,
                "inc_action":inc_action,
                "sub_action":ref_sub_action,
               //  "uniq_index":k
            })
        }

        ,changeActionBaseArgument:function(array_pass,array_layer,obj_val){
            var ref_array = [];
           
         
            for(var i = 0;i<array_pass.length;i++){
          
          
                var v_ac = array_pass[i];
                var v_lay = array_layer[v_ac.inc_layer];
                var ref_obj_val={} 
                ref_obj_val.coordX = parseInt(v_ac.coords.coordX)+parseInt(obj_val.coordX);
                ref_obj_val.coordY = parseInt(v_ac.coords.coordY)+parseInt(obj_val.coordY);
               //var val_extend = supporting_library.coordsExtends(v_lay.value,ref_obj_val);
             
                array_pass[i] = {
                "coords":ref_obj_val,
                "inc_action":v_ac.inc_action,
                "sub_action":v_ac.sub_action
            };
           }
        }
    };
    
    
     
    
   
    
    
   
    
    
    
    
    

function addLayerRectangle(setting,layer,width,height){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"rect","value":{"width":width,"height":height,"style":"'stroke:rgb(0,0,0)'"}};

   this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }     

} 

function addLayerCircle(setting,layer,coordX,coordY,radius){
    this.main_uniq = _ps.getUniq();
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
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"ellipse","value":{"cx":coordX,"cy":coordY,"rx":radiusX,"ry":radiusY,"style":"'stroke:rgb(0,0,0)'"}};
        
     this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }
} 

function addLayerLine(setting,layer,coordX1,coordY1,coordX2,coordY2){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"line","value":{"x1":coordX1,"y1":coordY1,"x2":coordX2,"y2":coordY2,"style":"'stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }    
} 

function addLayerPolygon(setting,layer,points){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
        
    this.layer[this.main_uniq]={"action":"polygon","value":{"points":"'"+points+"'","style":"'stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }  
} 
function addLayerPolyline(setting,layer,points){
     this.main_uniq = _ps.getUniq();
    this.layer=layer;
        
    this.layer[this.main_uniq]={"action":"polyline","value":{"points":"'"+points+"'","style":"'fill:none;stroke:rgb(0,0,0)'"}};
        
    this.setStyle=function(strs){
       this.layer[this.main_uniq]['value']['style']=supporting_library.data_svg_method(strs);
   }   
} 

function addLayerPath(setting,layer){
    this.main_uniq = _ps.getUniq();
    this.layer=layer;
    this.layer[this.main_uniq]={"action":"fill_rect","value":{}};
        

} 

function addLayerText(setting,layer,text,x,y){
    this.main_uniq = _ps.getUniq();
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
//==

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
      var ar_points = _ps.getTypeof(points)=="array"?points.join(","):points;
      return new addLayerPolyline(this.setting,json_val["layer"],ar_points)  
    }
    this.addLayerPolygon = function(points){
        //<polygon>
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"polygon","value":config_res });
      var ar_points = _ps.getTypeof(points)=="array"?points.join(","):points;
       return new addLayerPolygon(this.setting,json_val["layer"],ar_points)  
    }
    this.addLayerPath = function(config){
        // <path>
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"path","value":config_res });
     return new addLayerPath(this.setting,json_val["layer"],config)  
     }
    this.addLayerText = function(text,x,y){
        //text
     //    var config_res = config||{};
     //   json_val["layer"].push({"action":"text","value":config_res });
      return new addLayerText(this.setting,json_val["layer"],"'"+text+"'",x,y)  
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


 var dcw_module = {
        tests:function(){
            console.log(this.dom);
            alert("tests");
        }
    };

function svg_init(value,main_uniq,reference_value){
    var main_value =  value;
    this.setting =  {};
    this.active =  true;
    this.canva_ps = main_value.main_svg;
     this.canva_dom = main_value.main_svg.element[0];
  
    this.default_value = reference_value;
     
    this.default_init_class = [];
    this.setting = function(setting){
        if (_ps.getTypeof(setting) == "json"){
            this.setting =  setting;
        }
         var dimes_details = _ps.varExtend({
                            "width":"300",
                             "height":"150",   
                             }, this.setting);

        this.resizesvg(dimes_details.width,dimes_details.height);                                 
    }

    this.resizesvg=function(width,height){
         this.canva_dom.width = width;
         this.canva_dom.height  = height;

        this.canva_dom.style.width = width;
        this.canva_dom.style.height  = height;


        
    }
    this.is_active = function(active){
        this.active = active; 
    }

  

    
}   

svg_init.prototype.svgTemplate = function(){

    var cls_action = {
        rect:function(glb){

            return "<rect "+_ps.delimiter(glb,"="," ")+"  />";
        },
        circle:function(glb){

            return  "<circle "+_ps.delimiter(glb,"="," ")+"/>";
        },
        ellipse:function(glb){
             return "<ellipse "+_ps.delimiter(glb,"="," ")+"/>";
        },
        line:function(glb){
             return "<line "+_ps.delimiter(glb,"="," ")+"/>";
        },
        polyline:function(glb){
             return "<polyline "+_ps.delimiter(glb,"="," ")+"/>";
        },
        polygon:function(glb){
            return "<polygon "+_ps.delimiter(glb,"="," ")+"/>";
        },
        path:function(glb){
            return "<path "+_ps.delimiter(glb,"="," ")+"/>";
        },
        text:function(glb){
            var glb_attr = {
                "x":glb['x'],
                "y":glb['y'],
                "style":glb['style']
            };
            var str_substr="";
            for(var v in glb['tspan']){
                var sub_atrr= glb['tspan'][v];
                str_substr+='<tspan x="'+sub_atrr['x']+'" y="'+sub_atrr['y']+'">'+sub_atrr['text']+'</tspan>'
            }


            return "<text "+_ps.delimiter(glb_attr,"="," ")+">"+glb.text+str_substr+"</text>";
        }

    };
    return cls_action;
}
svg_init.prototype.svgAction = function(obj_val,get_uniq){

    var cls_action = this.svgTemplate();
  // this.canva_ps.append('<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />')
   var str_html = "";
    for(var k in obj_val.action){

        var val_ref = obj_val.action[k];

        var str_sub_val = "";
        for (var sk in val_ref.sub_action){
            var sub_act = val_ref.sub_action[sk];
       //     console.log(sub_act,"sub_act");
            if(_ps.has(cls_action,sub_act.action)){
               str_sub_val+= cls_action[sub_act.action](sub_act.value); 
            }
        }
        //console.log(val_ref);
        str_html+="<svg layer_inq = '"+get_uniq+"' x = '"+val_ref.coords.coordX+"' y = '"+val_ref.coords.coordY+"' ind = '"+k+"'>"+str_sub_val+"</svg>";
       
    }
    this.canva_ps.append(str_html);
}
svg_init.prototype.svgActionUpdate = function(obj_val,get_uniq){

    var cls_action = this.svgTemplate();
  // this.canva_ps.append('<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />')
   var str_html = "";
    for(var k in obj_val.action){
       
        ps("svg[layer_inq = "+get_uniq+" ]").attr({"x":val_ref.coords.coordX,"y":val_ref.coords.coordY});
        //str_html+="<svg layer_inq = '"+get_uniq+"' x = '"+val_ref.coords.coordX+"' y = '"+val_ref.coords.coordY+"' ind = '"+k+"'>"+str_sub_val+"</svg>";

    }
  
}

svg_init.prototype.AddInitClass = function(clas_s,get_uniq){
    this.default_init_class.push({clas_s:clas_s,get_uniq:get_uniq});
    
}

svg_init.prototype.AddValue = function(action,value){
    
}

svg_init.prototype.generate = function(){
    
    for(var i in this.default_init_class){
        var val_action =this.default_init_class[i];
       this.svgAction(this.default_value[val_action.get_uniq],val_action.get_uniq);
     
    }
}
 svg_init.prototype.updateCoords = function(get_uniq,coordX,coordY){
     var list_ar = [];
    ps("dom","svg[layer_inq = "+get_uniq+" ]").each(function(i,k){
        var attr = ps("dom",i).attr(["ind",'x','y']);
        if(_ps.indexOf(list_ar,attr['ind'])==-1){
            ps("dom",i).attr({"x":parseInt(coordX)+parseInt(attr['x']),"y":parseInt(attr['y'])+parseInt(coordY)});
        }
        list_ar.push(attr['ind'])
    });
 
}

    drawkit_svg=function(dom,setting){
        if(_ps.has(dom) == false)
        return false;
        this.main_uniq = _ps.getUniq();
        dwk_global.svg_reference_value[this.main_uniq] = {};
      
        var dom_details=supporting_library.get_svg_details(dom);    

        this.cls_main = new svg_init(dom_details,this.main_uniq,dwk_global.svg_reference_value[this.main_uniq]);
        this.cls_main.setting(setting);
       

      
    }
    drawkit_svg.prototype.setting = function(setting){
        this.cls_main.setting(setting);
    }
    drawkit_svg.prototype.is_active = function(bool){
         this.cls_main.is_active(bool);
    }
 

     drawkit_svg.prototype.layerNew = function(conf){
       var get_uniq = _ps.getUniq();
     
       dwk_global.svg_reference_value[this.main_uniq][get_uniq] = {};
        dwk_global.svg_reference_value[this.main_uniq][get_uniq]["action"]=[];
        dwk_global.svg_reference_value[this.main_uniq][get_uniq]["layer"]={};
   
       dwk_global.svg_reference_value[this.main_uniq][get_uniq]["inc_action"]=0;
       json_val =  dwk_global.svg_reference_value[this.main_uniq][get_uniq];
       var cls = new layerMain(this.cls_main,get_uniq,json_val);
       this.cls_main.AddInitClass(cls,get_uniq);
       cls.init(conf);

     return cls;
    }



     drawkit_svg.prototype.onMouseMove = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousemove,touchmove",function(e){
            func.call(this,e);
        });
    }

     drawkit_svg.prototype.onMouseUp = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mouseup,touchend",function(e){
            func.call(this,e);
        });
    }

    drawkit_svg.prototype.onMouseDown = function(func){
        if(_ps.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousedown,touchstart",function(e){
            func.call(this,e);
        });
    }
    drawkit_svg.prototype.onMouseDrag = function(){
        
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
        root.drawkit_svg = drawkit_svg;
        root.drawkit_svg.module = {};
        root.drawkit_svg.version="1.0.0.0"; 
    
        
        return {

            init_loader_module : function(){
                
                for(var i in root.drawkit_svg.module){
                    if(_ps.has(drawkit_svg.prototype,i) == false)
                   drawkit_svg.prototype[i]=root.drawkit_svg.module[i];
                }

            }
        }
    });
    
    
    var init_load = bootloader();
    
    ps("ready",function(){
        init_load.init_loader_module();
    });
     
 })(window); 