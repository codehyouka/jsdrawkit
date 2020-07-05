
function svg_init(value,main_uniq,reference_value){
    var main_value =  value;
    this.setting =  {};
    this.active =  true;
    this.canva_ps = main_value.main_svg;
     this.canva_dom = main_value.main_svg.element[0];
  
    this.default_value = reference_value;
     
    this.default_init_class = [];
    this.setting = function(setting){
        if (_ct.getTypeof(setting) == "json"){
            this.setting =  setting;
        }
         var dimes_details = _ct.varExtend({
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

            return "<rect "+_ct.delimiter(glb,"="," ")+"  />";
        },
        circle:function(glb){

            return  "<circle "+_ct.delimiter(glb,"="," ")+"/>";
        },
        ellipse:function(glb){
             return "<ellipse "+_ct.delimiter(glb,"="," ")+"/>";
        },
        line:function(glb){
             return "<line "+_ct.delimiter(glb,"="," ")+"/>";
        },
        polyline:function(glb){
             return "<polyline "+_ct.delimiter(glb,"="," ")+"/>";
        },
        polygon:function(glb){
            return "<polygon "+_ct.delimiter(glb,"="," ")+"/>";
        },
        path:function(glb){
            return "<path "+_ct.delimiter(glb,"="," ")+"/>";
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


            return "<text "+_ct.delimiter(glb_attr,"="," ")+">"+glb.text+str_substr+"</text>";
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
            if(_ct.has(cls_action,sub_act.action)){
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
       
        ct("svg[layer_inq = "+get_uniq+" ]").attr({"x":val_ref.coords.coordX,"y":val_ref.coords.coordY});
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
     ct("dom","svg[layer_inq = "+get_uniq+" ]").attr({
        "x":parseInt(coordX),
        "y":parseInt(coordY)
     })
   // ct("dom","svg[layer_inq = "+get_uniq+" ]").each(function(i,k){
    //    var attr = ct("dom",i).attr(["ind",'x','y']);
    //    if(_ct.indexOf(list_ar,attr['ind'])==-1){
    //        ct("dom",i).attr({"x":parseInt(coordX)+parseInt(attr['x']),"y":parseInt(attr['y'])+parseInt(coordY)});
    //    }
    //    list_ar.push(attr['ind'])
    //});
 
}