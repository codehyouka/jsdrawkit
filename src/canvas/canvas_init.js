
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
        if (_ct.getTypeof(setting) == "json"){
            this.setting =  setting;
        }
         var dimes_details = _ct.varExtend({
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
               
               if(_ct.getTypeof(glb.bool) == "boolean"){
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
               
               if(_ct.getTypeof(glb.bool) == "boolean"){
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
  _ct.each(obj_val.action,function(k,v){
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