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
  "src/svg/element_layer.js", 
  "src/svg/svg_library.js", 
  "src/svg/ext_test.js", 
  "src/svg/svg_init.js", 
  "src/svg/dom_loader.js",
  
  
  ];




exports.module=function(grassconf){   
var grass_concat = grassconf.require("grass_concat")
var grass_composer = grassconf.require("grass_composer");

grassconf.load("canvas",function(){
  
    return grassconf.src(list_package_canvas)
      .pipe(grass_composer( {
        "banner":{
            "header":"(function(window){ \n" +
            " /** \n" +
            " /* This program was writtern by pein freccs. \n" +
            " /* Please check my repository for more details and update \n" +
            " /* https://github.com/codehyouka/jsdrawkit \n"+
            " **/ \n",
        "footer":"\n })(window);"
        }
      } ) )
      .pipe(grass_concat(__dirname+"/dist/jsdrawkit_canvas.js",{
        istruncate:true
      }) );
  

})

grassconf.load("svg",function(test){


    return grassconf.src(list_package_svg)
      .pipe(grass_composer( {
        "banner":{
            "header":"(function(window){ \n" +
            " /** \n" +
            " /* This program was writtern by pein freccs. \n" +
            " /* Please check my repository for more details and update \n" +
            " /* https://github.com/codehyouka/jsdrawkit \n"+
            " **/ \n",
        "footer":"\n })(window);"
        }
      } ) )
      .pipe(grass_concat(__dirname+"/dist/jsdrawkit_svg.js",{
        istruncate:true
      }) );


});
} 

exports.execute=function( lib ){   
lib.default=function(strm){
strm.series("canvas").series("svg");
}


return lib;    
}       

