var list_event = ["click","dblclick"];
var list_action = ["setAttr"];

function newElementLayerCore(setting,dom){
    console.log(setting.cls_main.canva_dom,"setting");
    console.log(dom,"dom");

    this.main_sub_element = ct$(setting.cls_main.canva_dom).findElem(dom);
    //ct$(setting.cls_main.canva_dom).findElem(dom).each(function(v,k){
    //    console.log(v,k,"---");

    //})
    var main = this;
 //   console.log(this.main_sub_element,"main_sub_element");
   
        _ct.each(list_event,function(k,v){
            //console.log(v,k,"v,k")
            (function(np,event,main_cls){
                np[event] = function(func){
                    var main = this;  
                    main.main_sub_element.on(event,function(e){
                        var cls_elem_sub = new sub_element_attr(this , main_cls);
                        func.call(cls_elem_sub,e);
                    })
                }
            })(newElementLayerCore.prototype,v , main.main_sub_element)
        })

        console.log(this.main_sub_element,"main_cls1")
        var cls_elem_sub = new sub_element_attr(main.main_sub_element , main.main_sub_element);
        _ct.each(list_action,function(k,v){
            //console.log(v,k,"v,k")
            (function(np,event,cls_elem_sub){
                console.log(cls_elem_sub,"main_cls2")
                
                np[event] =  function(){
                    cls_elem_sub[event].apply(cls_elem_sub,arguments)//( glb );
                }//cls_elem_sub[event]
            })(newElementLayerCore.prototype,v , cls_elem_sub)
        })
}

//newElementLayerCore.prototype.targetElement = function(){


//}

newElementLayerCore.prototype.eachChild = function(func){
    var main = this;  
    this.main_sub_element.each(function(k,v){
       
                 var cls_elem_sub = new sub_element_attr(v,main.main_sub_element);
                func.call(cls_elem_sub);
           })

}




function sub_element_attr(dom,main_dom){
    console.log(dom,main_dom,"doms,main_dom")
    this.dom = dom;
    this.main_dom = main_dom;

    this.setAttr = function(glb){
        this.dom.css(glb);
        //console.log(this.dom,"dom");
    }
}