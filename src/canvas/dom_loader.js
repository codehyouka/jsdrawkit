
    drawkit_cnv=function(dom,setting){
        if(_ct.has(dom) == false)
        return false;
        this.main_uniq = _ct.getUniq();
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
       var get_uniq = _ct.getUniq();
     
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
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousemove,touchmove",function(e){
            func.call(this,e);
        });
    }

     drawkit_cnv.prototype.onMouseUp = function(func){
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mouseup,touchend",function(e){
            func.call(this,e);
        });
    }

    drawkit_cnv.prototype.onMouseDown = function(func){
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousedown,touchstart",function(e){
            func.call(this,e);
        });
    }
    drawkit_cnv.prototype.onMouseDrag = function(){
        
         if(_ct.has(func) == false)
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
                    if(_ct.has(drawkit_cnv.prototype,i) == false)
                   drawkit_cnv.prototype[i]=root.drawkit_canvas.module[i];
                }

            }
        }
    });
    
    
    var init_load = bootloader();
    
    ct("ready",function(){
        init_load.init_loader_module();
    });
    