
    
    var supporting_library = { 
        get_canvas_details:function(dom){
            var dom_main = ct("dom",dom).eq(0);
            var main_tagname = dom_main.tagName().toLowerCase();
            var uniq_id = _ct.getUniq();

              console.log(main_tagname);  

              if(main_tagname == "canvas"){
                  dom_main.attr({"ref_draw_id":uniq_id});

              }else{
                  dom_main.html("<canvas ref_draw_id = "+uniq_id+"></canvas>")
              }
              var main_canvas = ct("dom","*[ref_draw_id = "+uniq_id+"]");
           return{
               uniq_id:uniq_id,
               main_canvas:main_canvas
           }   
        }
        ,
        coordsExtends:function(loop_val,jsn_value){
            var jsn_resrv = {};

            for(var i in loop_val){
                jsn_resrv[i] = _ct.has(loop_val,i)?loop_val[i]:0;
            }

             for(var i in jsn_value){
                 jsn_resrv[i] = _ct.has(jsn_value,i)?jsn_value[i]:0;
            }
             //   console.log(jsn_resrv,":jsn_resrv")
            return supporting_library.coordsFunctionValue(jsn_resrv);
        }
        ,
        coordsFunctionValue:function(jsn_value){
            var join_key = _ct.getKey(jsn_value).join("|");
          
            for(var i in jsn_value){
  
                if(_ct.getTypeof(jsn_value[i]) == "function"){
                    jsn_value[i] = jsn_value[i]();
                }
                //console.log(_ct.getTypeof(jsn_value[i]),jsn_value[i]);
                if(_ct.getTypeof(jsn_value[i]) == "string"){

                    if (/[\{\}]{1}/g.test(jsn_value[i])){
                        var value_repl_cmd = jsn_value[i].replace(/[\{\}]{1}/g,"");
                        var reg_rexp = new RegExp("("+join_key+")","g");
                        var value_repl = value_repl_cmd.replace(reg_rexp,"glb.$1");
                    

                        var func_val = new Function("glb","return "+value_repl);
                        jsn_value[i] = func_val(jsn_value);
                    }
                    
                   
                }
                if(_ct.getTypeof(jsn_value[i]) == "number"){
                        if(i=="pathY"){
                            jsn_value[i] = jsn_value[i] +jsn_value["coordY"]; 
                        }
                        if(i=="pathX"){
                            jsn_value[i] = jsn_value[i] +jsn_value["coordX"]; 
                        }
                }
               
            }
            return jsn_value;
        }
       
        ,addActionBaseArgument:function(array_pass,array_layer,inc_action,obj_val){
            _ct.each(array_layer,function(k,v){
            
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
                ref_obj_val.coordX =  parseInt(v_ac.value.coordX)+parseInt(obj_val.coordX);
                ref_obj_val.coordY = parseInt(v_ac.value.coordY)+parseInt(obj_val.coordY);
               var val_extend = supporting_library.coordsExtends(v_lay.value,ref_obj_val);
             //   console.log(val_extend,":val_extend");
                array_pass[i] = {"action":v_ac.action,"value":val_extend,"inc_action":v_ac.inc_action,"inc_layer":v_ac.inc_layer,"uniq_key":v_ac.uniq_key};
           }
        }
    };
    
    
     
    
   
    
    
   
    
    
    
    
    
