
    
    var supporting_library = { 
        get_svg_details:function(dom){
            var dom_main = ct("dom",dom).eq(0);
            var main_tagname = dom_main.tagName().toLowerCase();
            var uniq_id = _ct.getUniq();

              console.log(main_tagname);  

              if(main_tagname == "svg"){
                  dom_main.attr({"ref_draw_id":uniq_id});

              }else{
                  dom_main.html("<svg ref_draw_id = "+uniq_id+"></svg>")
              }
              var main_svg = ct("dom","*[ref_draw_id = "+uniq_id+"]");
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
                jsn_resrv[i] = _ct.has(loop_val,i)?loop_val[i]:0;
            }

         //    for(var i in jsn_value){
         //        jsn_resrv[i] = _ps.has(jsn_value,i)?jsn_value[i]:0;
         //   }
           
            return supporting_library.coordsFunctionValue(jsn_resrv);
        }
        ,
        coordsFunctionValue:function(jsn_value){
            var join_key = _ct.getKey(jsn_value).join("|");// ["x1","y1","x2","y2","coordX","coordY","width","index","height","cx","cx2","cy","cy2","radius"].join("|");
             var restricted_key = ['points',"stroke","stroke-width","fill","style","transform"];
            for(var i in jsn_value){
                var reg_rexp_rest = new RegExp("("+restricted_key.join("|")+")","g");
                if (reg_rexp_rest.test(i) == false){
                 
                    if(_ct.getTypeof(jsn_value[i]) == "function"){
                        jsn_value[i] = jsn_value[i]();
                    }
                    if(_ct.getTypeof(jsn_value[i]) == "string"){
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
            
            return "'"+_ct.delimiter(jsons,":",";")+"'";

        } 
       ,addActionBaseArgument:function(array_pass,array_layer,inc_action,obj_val){
         
           var ref_sub_action = [];
            _ct.each(array_layer,function(k,v){
                
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
    
    
     
    
   
    
    
   
    
    
    
    
    
