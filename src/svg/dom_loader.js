
    drawkit_svg=function(dom,setting){
        if(_ct.has(dom) == false)
        return false;
        this.main_uniq = _ct.getUniq();
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
    drawkit_svg.prototype.newElementLayer = function(dom){
        return new newElementLayerCore(this,dom);
    }        

     drawkit_svg.prototype.layerNew = function(conf){
       var get_uniq = _ct.getUniq();
     
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
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousemove,touchmove",function(e){
            func.call(this,e);
        });
    }

     drawkit_svg.prototype.onMouseUp = function(func){
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mouseup,touchend",function(e){
            func.call(this,e);
        });
    }

    drawkit_svg.prototype.onMouseDown = function(func){
        if(_ct.has(func) == false)
        return false;

      
        this.cls_main.canva_ps.on("mousedown,touchstart",function(e){
            func.call(this,e);
        });
    }
    drawkit_svg.prototype.onMouseDrag = function(){
        
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
        root.drawkit_svg = drawkit_svg;
        root.drawkit_svg.module = {};
        root.drawkit_svg.version="1.0.0.0"; 
    
        
        return {

            init_loader_module : function(){
                
                for(var i in root.drawkit_svg.module){
                    if(_ct.has(drawkit_svg.prototype,i) == false)
                   drawkit_svg.prototype[i]=root.drawkit_svg.module[i];
                }

            }
        }
    });
    
    
    var init_load = bootloader();
    
    ct("ready",function(){
        init_load.init_loader_module();
    });
    