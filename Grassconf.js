var list_package_canvas =  [
    "src/canvas/globals.js", 
    "src/canvas/support_library.js", 
    "src/canvas/canvas_library.js", 
    "src/canvas/ext_test.js", 
    "src/canvas/canvas_init.js", 
    "src/canvas/dom_loader.js",
    
    
    ];
    
    var list_package_svg =  [ 
    "src/svg/globals.js", 
    "src/svg/support_library.js", 
    "src/svg/svg_library.js", 
    "src/svg/ext_test.js", 
    "src/svg/svg_init.js", 
    "src/svg/dom_loader.js",
    
    
    ];
    
exports.module=function(grassconf){   

  
   
      
        grassconf.load("canvas",function(grsm){
      
            grsm.setDirectory({
                "srcDir":list_package_canvas,
                "destDir":__dirname+"/dist/"
              });
            grsm.pipe("grass_composer",{
                "banner":{
                    "header":"(function(window){ \n" +
                    " /** \n" +
                    " /* This program was writtern by pein freccs. \n" +
                    " /* Please check my repository for more details and update \n" +
                    " /* https://github.com/codehyouka/jsdrawkit \n"+
                    " **/ \n",
                    "footer":"\n })(window);"
                }
              })
            grsm.pipe("grass_concat",__dirname+"/dist/jsdrawkit_canvas.js");
             
          })

          
      
          grassconf.load("svg",function(grsm){
      
            grsm.setDirectory({
                    "srcDir":list_package_svg,
                    "destDir":__dirname+"/dist/"
                });
            var local_filename = __dirname+"/dist/jsdrawkit_svg.js";

            grsm.pipe("grass_composer",{
                "banner":{
                    "header":"(function(window){ \n" +
                    " /** \n" +
                    " /* This program was writtern by pein freccs. \n" +
                    " /* Please check my repository for more details and update \n" +
                    " /* https://github.com/codehyouka/jsdrawkit \n"+
                    " **/ \n",
                    "footer":"\n })(window);"
                }
              })


            grsm.pipe("grass_concat",local_filename);
      
          });

    } 
      
exports.execute=function(){               
        return ['canvas','svg']
      }     
        
      