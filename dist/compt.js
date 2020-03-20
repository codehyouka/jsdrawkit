(function(window){ 
 /** 
 /* This program was writtern by pein freccs. 
 /* Please check my repository for details and update 
 /* https://github.com/codehyouka/compt 
 **/ 
if (typeof exports !== 'undefined') {
   var root = Object; 
   if (typeof window !== 'undefined' && typeof module !== 'undefined' && module.exports) {
   // var document = Object;
   }	
 
  }
else{
	var root = window;
   
} 


var ps_glbl=root[Math.random().toString(36).replace(/[^a-z]+/g, '')]={};
ps_glbl.src=[];	
ps_glbl.remove_list_action=[]

ps_glbl.report={};
ps_glbl.report.loadjs=[];
ps_glbl.report.loadjs_error=[];
ps_glbl.control={};

ps_glbl.global_setting={};
ps_glbl.controller_value={};
ps_glbl.control.delegation_record_list=[]; 



ps_glbl.config={};





ps_glbl.extension_load_element=[]; 
ps_glbl.extension_load_event={}; 
var main_dom={
  
	document_ready:function(func){

				
				var dom_rdy_ctt=0;

		if(dom_rdy_ctt===0){
		 if(root.attachEvent){
			 //DOMContentLoaded
		root.attachEvent("onload",dom_load_ready);	
		root.attachEvent("onreadystatechange",dom_load_ready);	
		}
		else if(root.addEventListener){
		root.addEventListener("load", dom_load_ready, false);

		}

		}
		var fails=false;

		function dom_load_ready(){

					if(document.readyState==="complete" && fails == false ){
					 func();
					 dom_rdy_ctt++;
					 fails=true;
						}
			}

		var set_intr=null;
		
		set_intr=setInterval(function(){

			if(document.readyState==="complete" && fails == false){
					 
					 dom_rdy_ctt++;
					 fails=true;
					 clearInterval(set_intr);
					 func();
						}
		},100);		
		
	},
	
	parentchild:function(pt_cld,de,cnt){
		var child_prnt=pt_cld;
	
	if(child_prnt===null){
		return true;
	}	
	else if(child_prnt==="first"){
		
		if(parseInt(cnt)===0)
			return true;
		else
			return false;	
	}
	else if(child_prnt==="last"){
		
		if((de.length-1)===parseInt(cnt))
			return true;
		else
			return false;	
	}
	else if(child_prnt==="haschild"){
		if(de[cnt].children.length>0)
			return true;
		else
			return false;	
	}
	else if(child_prnt==="hasChildNodes"){
		if(de[cnt].hasChildNodes())
			return true;
		else
			return false;	
	}
	else if(child_prnt==="odd" || child_prnt==="even"){
		var sel={"odd":1,"even":0};
		if(cnt%2==sel[child_prnt])
			return true;
		else
			return false;	
	}
	else if(child_prnt==="childNodes"){
		if(de.childNodes.length > 0)
			return true;
		else
			return false;	
	}
	},
		css:function(id,d){
		var elem_str_class="";
		var get_attr=(_ct.has(main_dom.get_attr(id,['style']).style))?main_dom.get_attr(id,['style']).style:"";
		var split_style=get_attr.toString().split(";");
	
		_ct.each(split_style,function(spk,spv){ 
			var elem_d=spv.split(":");
			if(_ct.count(elem_d)>0 && _ct.has(spv)){
				if(!_ct.has(d,elem_d[0]) && _ct.has(elem_d[1])){
			var ele_key=elem_d[0].replace(/\s/,"");
			var ele_val=elem_d[1].replace(/\s/,"");
			if(!_ct.has(d[ele_key]))
				d[ele_key]=ele_val;
		
				}
			}
		});		
	
		for(var v in d){
			
		elem_str_class+=(v+":"+d[v]+";");
	if(_ct.has(id)){	
try{
	
	if(_ct.has(id.style.setAttribute)){ id.style.setAttribute(v,d[v]); }	
	
}catch(e){ console.log(e); }
}
}
if(_ct.has(id) ){
	try{
	
	if(_ct.has(id.setAttributeNode)){
var creat_elem=document.createAttribute("style");
	creat_elem.value=elem_str_class;
	id.setAttributeNode(creat_elem);	
	}
	}catch(e){ console.log(e); }
		}
		},
		getcss:function(ele,prop){
		
		

	this.loopstyle=function(dom,style,intt){
		var golb={};
		var golb_st="";
	
		
				if (!root.getComputedStyle) {
				golb[style] = dom.currentStyle[style];
				golb_st= dom.currentStyle[style];
				} else {
			golb[style] = root.getComputedStyle(dom).getPropertyValue(style);
			golb_st= root.getComputedStyle(dom).getPropertyValue(style);
			}
			return golb_st;
		};
		
		
		if(_ct.getTypeof(prop)==="array"){
		var golb_ret={};
			for(var fn in prop){
			
		golb_ret[prop[fn]]=this.loopstyle(ele,prop[fn],"array");
			}
			
			}
		else if(_ct.getTypeof(prop)==="string"){
			golb_ret=this.loopstyle(ele,prop,"str");
		
				}
			 
			return golb_ret;
		},
		checkfile:function(s,s1){
			
		var r = new RegExp("(."+s+")$");
			if(r.test(s1)){
			return s1;
			}else{
				var bool_url=/[?]/gi.test(s1);
		
				var splt=s1.split("?");
		
				var url_site_rep=splt[0].replace(/[\/]$/i,"");
				
			return (bool_url===false)?(s1+"."+s):(url_site_rep+"."+s+"?"+splt[1]);
			}
		
		},
		checkurlvalid:function(s){
		if(/^(HTTP|HTTPS|SFTP|FTP|TCP|\/{2})/.test(s.toUpperCase())){
		
				return main_dom.url_filter_restriction(s);
			}
		else{
		//var proto=window.location.protocol;
		//var url=window.location.host;
	
			return s;//main_dom.url_filter_restriction(proto+"//"+url+"/"+s);
			}
		
		},
		checkurlvalid_ajax:function(s){
			if(/^(http|https|sftp|ftp|tcp|\/{2}){1,4}/.test(s.toLocaleLowerCase())){
				
				return main_dom.url_filter_restriction(s);
				}
			else{
				
				if(!_ct.has(ps_glbl.config)){
			
			var proto=root.location.protocol;
			var url=root.location.host;
				return main_dom.url_filter_restriction(proto+"//"+url+"/"+s);
				}else{
					var url_m=ps_glbl.config.url;

					return main_dom.url_filter_restriction(url_m+""+s);
				}	
				}
			
			},
		dom_offset:function(_el){
			var target = _el,
      			 target_width = target.offsetWidth,
      			 target_height = target.offsetHeight,
      			 target_left = target.offsetLeft,
       		target_top = target.offsetTop,
      			 gleft = 0,
   			    gtop = 0,
    			   rect = {};

       var lcwps = function( _parent ) {
        if (!!_parent) {
        	gleft += _parent.offsetLeft;
        	gtop += _parent.offsetTop;
        	lcwps( _parent.offsetParent );
        } else {
        	return rect = {
        	top: target.offsetTop + gtop,
        	left: target.offsetLeft + gleft,
        	bottom: (target.offsetTop + gtop) + target_height,
        	right: (target.offsetLeft + gleft) + target_width
        	};
        }
    };
        lcwps( target.offsetParent );
        return rect;
		},
		
		get_scroll_position:function(){

			return {
				"top":document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,
				"left":document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft
				};
		},
		ajax_controller:function(boo){
		var xdr;
		var xhr_type;
		if (root.XDomainRequest && boo===true)
      {
			xdr = new XDomainRequest();
			xhr_type="ie";
		}else{
		xhr_type="noneie";
			
			if(root.XMLHttpRequest){
			xdr=new XMLHttpRequest();
			}else{
			try{
			xdr=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err){
				try{
			xdr=new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(err){
			
			}
			}
			}
	
	
		}

		return {"xdr":xdr,"xhr_type":xhr_type};
		
		},
		js_event_type:function(xhr,htype,func,jsons,func_type){
		var retrn={};
			
		if(htype==="ie"){
		var ie=["error","timeout","progress","load"];
		 retrn.ie={};
		for(var i in ie){
		retrn.ie[ie[i]]=(function(fnc){
	
						 xhr[fnc]=function(res){
						
						 	
						if(typeof(func)==="function"){
								
							
		if(xhr.status>=200 && xhr.status<300){
							
if(_ct.has(func_type,"success")){
func_type["success"](((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}
if(!_ct.has(func_type,"success") && !_ct.has(func_type,"error")){
func(((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}
}else{

if(_ct.has(func_type,"error")){

func_type["error"](((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}
}							}
						 }
							})("on"+ie[i]);
		}
		}
		else if(htype==="noneie"){
		retrn.noneie={};
			xhr.onreadystatechange=function(){
				
								
								if(xhr.readyState==4){ 
							if(typeof(func)==="function"){
								if(xhr.status>=200 && xhr.status<300){
								
								
if(_ct.has(func_type,"success")){
func_type["success"](((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}
if(!_ct.has(func_type,"success") && !_ct.has(func_type,"error")){
retrn.noneie["load"]=func(((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}
								}else{
								
								
if(_ct.has(func_type,"error")){

func_type["error"](((jsons==="false")?xhr.responseText:_ct.parseJson(xhr.responseText)),xhr);
}

								}
								}
								}
							}
		}
		return retrn;
		
		
		},
			js_json_delimiters:function(jsn){
					
					if(_ct.getTypeof(jsn)=="json"){
						return _ct.delimiter(jsn,"=","&");
						}
					else if(_ct.getTypeof(jsn)=="array"){
						var arry_cth=[];
						_ct.each(jsn,function(ck,cv){
						
								arry_cth.push(_ct.getKey(cv)+"="+_ct.getValue(cv).toString());
						});
						
						return arry_cth.join("&");
					}else{
						return jsn;
					}
					
					}
		,setLibrary:function(mth,d){
			if(_ct.indexOf(ps_internal_libry.config,mth)>=0){
				if(_ct.has(ps_internal_libry.logic,mth)){
				ps_internal_libry.logic[mth](d);
				}
			}
		},get_element_exist_attr:function(res){
				var attr_elem={};
			for (var att, i = 0, atts = res.attributes, n = atts.length; i < n; i++){
			    att = atts[i];
    			
				attr_elem[att.nodeName]=att.nodeValue;
			}
			return attr_elem;
		}
		,get_attr:function(meth,d){
			var	attr_type=((_ct.getTypeof(d)=="array")?d:[d]);
			var globl={};
	 	if(_ct.has(meth)){
			if(_ct.has(meth.getAttributeNode)){
			
				_ct.each(attr_type,function(ky,vl){
					
					if(meth.getAttributeNode(vl))
					globl[vl]=meth.getAttributeNode(vl).value;		
				});
				
			}else{
				
				_ct.each(attr_type,function(ky,vl){
					if(meth.getAttribute)
					globl[vl]=meth.getAttribute(vl);
				});
			}
              }
			return globl; 
			},
			url_filter_restriction:function(url){
				var ur1=url.toLowerCase().replace(/^(https:)/g,"");
				return ur1;
			},
			domio_type:function(type,dom,htmll){

			var main_dom=null;
				
				if(/\b(val)\b/g.test(type)){ 
					var alt_val=this.get_attr(dom,"ps_alt_value");
					if(_ct.has(htmll)){  
						dom.value=htmll;
					}
					if(_ct.has(alt_val,"ps_alt_value") && dom.value.trim().length==0){
					return alt_val.ps_alt_value;
					}else{
					return dom.value;
					}
					 
					
				}
				if(/\b(html)\b/g.test(type)){
					if(_ct.has(htmll)){ 
						dom.innerHTML=htmll;
					} return dom.innerHTML;
						}
				if(/\b(text)\b/g.test(type)){
					if(_ct.has(htmll)){ 
						(!_ct.has(dom.innerText))?dom.textContent:dom.innerText=htmll;
					} return (!_ct.has(dom.innerText))?dom.textContent:dom.innerText;		
					
				}if(/\b(outerhtml)\b/g.test(type)){
					if(_ct.has(htmll)){ 
						dom.outerHTML=htmll;
					} return dom.outerHTML;					
				}		
			},
			initFadeElement:function(meth,typ_s,intrvl_s,func){
				var ot={"fadein":100,"fadeout":0,"fadeto":100};
				var timetofade={"fadein":"ot-20","fadeout":"ot+20","fadeto":"100"};
				var timetoequal={"fadein":"ot<10","fadeout":"ot>90","fadeto":"ot==100"};

				if(/(fadeout)/g.test(typ_s) ){
						
						main_dom.css(meth,{"display":""});
						
						}
		if(/(fadeto)/g.test(typ_s)){
						main_dom.css(meth,{"display":""});
						fadefun(meth,intrvl_s.time/10);
						if(_ct.has(func) && (intrvl_s.time/10)==1) func();
						}
		else{
		var intval=setInterval(function(){
				var func_check=new Function("ot","return "+timetoequal[typ_s]);
					if(func_check(ot[typ_s])){
						clearInterval(intval);

						if(/(fadein)/g.test(typ_s)){
						main_dom.css(meth,{"display":"none"});
							if(_ct.has(func) ) func();
						}
																		
					}
			
					if(/(fadein|fadeout)/g.test(typ_s)){
							fadefun(meth,ot[typ_s]);

					}
				var func_ot=new Function("ot","return "+timetofade[typ_s]);
				ot[typ_s]=func_ot(ot[typ_s]);
				},intrvl_s.time);
		}
					function fadefun(meth,fade){
						var agenttype=new ps_agenttype();
						if(agenttype.useragent().browser.msie){
					main_dom.css(meth,{"filter":("alpha(opacity=" + (fade) + ")")});
						}else{ 
					main_dom.css(meth,{"opacity":(fade/100)});
						}
					}
			},
			dom_select_option:function(main,bol,type){
				var opt;
				var sel_opt='';
				var sel_opt_ar=[];
				var opt_cnt=0;
				var select_count=0;
				var booln=bol||false;
				main.each(function(td,meth){
					opt=meth[td].options;
			if(_ct.has(opt)){
			    for(var i=0;i<opt.length;i++){
				
				if(opt[i].selected==true){
					if(/\b(value)\b/g.test(type)){
						sel_opt=opt[i].value;
						sel_opt_ar.push(opt[i].value);
					}
					if(/\b(text)\b/g.test(type)){
						sel_opt=opt[i].text;
						sel_opt_ar.push(opt[i].text);
					}
					if(/\b(count)\b/g.test(type)){
						select_count=i;
					}
					opt_cnt++;
				}
			}
			}
			});
    		 if(/(value|text)/g.test(type)){
			if(booln==false)
			return (opt_cnt>1)?sel_opt_ar:sel_opt;
			else return sel_opt_ar;
		}else{
		return select_count;
			}
		},
		assign_element_distinction:function(dom,assn,bools){
			
			var assn_splt=_ct.ifUndefined(assn,"").split("::");
			
			function glg_func(bools,glb,key,valu){ 
				if(_ct.getTypeof(bools)=="array"){
					glb.push(valu[key]);
				}else{
					glb[key]=valu;
				}
			}
			var glb=bools;
			if(assn_splt.length==1){
				
				for (var td in dom) {
					
					glg_func(bools,glb,td,dom);
				}
				
			return bools;	
			}else if(assn_splt.length==2){
				
				var spl2=assn_splt[1];
		
				var fltr=["first","haschild","hasChildNodes","last","even","odd"];
					var cnt=0;
					for (var td1 in dom) {
						if(dom.length>cnt){	
							
						if(_ct.indexOf(fltr,spl2)>=0){
							if(main_dom.parentchild(spl2,dom,td1)){
							
							glg_func(bools,glb,td1,dom);
							}		
					
						}
						}
						var type_pos="";
						var index_pos="";
						if(/([\w\-\_]{1,})(\(\d\))/g.test(spl2)){
							var replc=spl2.replace(/([\w\-\_]{1,})\((\d)\)/g,function(g,g1,g2){
							
								type_pos=g1;
								index_pos=g2;
							});
							
							
							if(type_pos=="eq"){
								glb[index_pos]=dom;
								glg_func(bools,glb,index_pos,dom);
							}
							if(type_pos=="noteq"){
									if(td1!=index_pos){ 
									glg_func(bools,glb,td1,dom);
										}
							}
						}
						
						cnt++;
					}
				return glb;
			}
			else{
				
				return {};
			}
		},
		ajax_http_loader:function(main_jsn,xdr,method,url,parameter,dataform){

			

		try{
				var js_url=main_dom.checkurlvalid_ajax(url);
				try{
		if(_ct.indexOf(["get"],method)>=0){
			xdr.open(method,js_url+"?"+parameter,false);
			xdr.send(dataform); 
			}
		else if(_ct.indexOf(["post"],method)>=0){
			xdr.open(method,js_url,false);

			
			var arr_ref=[];
			if(_ct.has(xdr.setRequestHeader)){
			
			
				if(_ct.count(main_jsn.request_header)>0){
					_ct.each(main_jsn.request_header,function(rk,rv){
						xdr.setRequestHeader(rk,rv);
						arr_ref.push(rk);	
					});
				}
			}
			if(_ct.count(main_jsn.request_header)>0){
				if(_ct.has(xdr.setRequestHeader)){
				
				
					_ct.each(main_jsn.request_header,function(rk,rv){
						if(_ct.indexOf(arr_ref,rk)==-1){
							xdr.setRequestHeader(rk,rv);
						}
						

					});
				}
			}	
			if(!_ct.has(dataform)){
				if(_ct.indexOf(arr_ref,"Content-type")==-1){
					xdr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				}
				xdr.send(parameter); 
			}else{ 
			
				xdr.send(dataform);
			}
			
		}	
		else{ 
			xdr.open(method,js_url+"?"+parameter,false);
			xdr.send(dataform);
			}
			}catch(e){ console.log(xdr);
				
				console.log(e);
			}
		}catch(e){ console.log(xdr);
		
			console.log(e);
		}
	
		},
		is_where_element:function(tar_m,ar){
			var node=[];
			 var node=_ct.clone(ar);
			 var	attr_type=((_ct.getTypeof(tar_m)=="array")?tar_m:[tar_m]);
			 
			 ar.splice(0,ar.length);
			 for (var i in node) {
         
				var ct=0;
				_ct.each(attr_type,function(tk,tv){
						if (_ct.has(node[i],tv)) {
                           
							if (node[i][tv]) {
                                ct++;
                            }
                        }
						});
				if (ct===_ct.count(attr_type)) {
                    
					ar.push(node[i]);
				}
				
             }
		},
	event_iniate:function(main,spltt,fn,bools){

	

		for(var v=0;v<spltt.length;v++){
		
			(function(main,m1,m2,m3,func){
			
				 main_dom.event_loop(main,m1,m2,m3,func,bools);
			
			
			})(main,spltt[v]+'','on'+spltt[v]+'','none',fn);
		}
		return main;
	},
	event_loop:function(elthis,c1,c2,c3,func,act_bool){
		
		var var_elthis = elthis;
		 elthis.each(function(elemm,td){
		 	var_elthis=elemm;
		if(act_bool){
		 main_dom.actionevent(elemm,c1,c2,c3,func);

		 return elthis;
		}
		else{

			 ps_glbl.remove_list_action.push(elemm);
			 return elthis;
		}
		});
			return var_elthis;
		},	
	elem_delegate_event:function(agentype,agentversion,elem,evnt,func,bools){
		
				
						
						var cnt_e=0;
						ct("dom",elem).on(evnt,function(e){
							
				
									
							if (e.target){
								var elem_index = _ct.indexOf(ps_glbl.control.delegation_record_list,e.target);
								
								if(elem_index==-1){
										func.call(this,e);
										ps_glbl.control.delegation_record_list.push(e.target);
								}
								
									
							}
								
						
							cnt_e+=1
						});

						
				
			},
	actionevent:function(elems11,ch,ie,mo,func){		
		
		
		
		if (elems11.attachEvent)
		{ 
		(function(elems11,ff,mob){elems11.attachEvent(ie,function(se){
			if ( _ct.indexOf(ps_glbl.remove_list_action,elems11)==-1)
			ff.call(elems11,se)},true)})(elems11,func,ie);  
		}else{

		if(elems11.addEventListener){	
		
	
			(function(elems11,ff,mob){elems11.addEventListener(ch,(function(e){
		if(typeof(e.targetTouches)!=="object" && _ct.indexOf(ps_glbl.remove_list_action,elems11)==-1){
				
				ff.call(this,e);
			}
			
			}),true)})(elems11,func,ch);
	
			if(mo!=="none"){
			(function(elems11,ff,mob){elems11.addEventListener(mo,(function(e){	
				if ( _ct.indexOf(ps_glbl.remove_list_action,elems11)==-1)
				ff.call(this,e);
			}),true)})(elems11,func,mo);
			}
			}
		}

		},

		find_element:function(tar_m_sub,ar,bool){
		
			var tar_m_split=tar_m_sub.split("=>");			
			var tar_m=(tar_m_split.length==0?tar_m_sub:tar_m_split[0]).trim();
			if (bool) {
			var node=_ct.clone(ar);
		
            
			   ar.splice(0,ar.length);
				
            }else{
				var node=[];		
						
					node.push(document);	
			}

			var tar=tar_m.split(",");
		
			for( var ni in node ){
			   for( var ti in tar_m ){
						if(/\[/g.test(tar[ti])){
							
				var fl_m="";
				var fl_type="where";
				var fl_va=[];
				var fl_va_cntnt={};
				var fl_va_cntnt_all=[];
				var fl_va_attr_all=[];
						var replc_str=tar[ti].replace(/([a-zA-Z\-\_]{0,}|\*)\[([\w\s\d\=\_\-\[\]\'\"\;\:]{1,})\]/gm,function(m,m1,m2,m3){
						
							
					
						   var m2_split_count=m2.split(";");
						   
							_ct.each(m2_split_count,function(sck,scv){
							  var m2_split_cnt=scv.split("=");
				
								if(_ct.count(m2_split_cnt)==1){
									fl_va_attr_all.push(m2_split_cnt[0].trim());
								}
							if(_ct.count(m2_split_cnt)>=2){
							
								fl_va.push(m2_split_cnt[0].trim());
								if(_ct.has(m2_split_cnt[1].trim())){
									
									fl_va_cntnt[m2_split_cnt[0].trim()]=m2_split_cnt[1].trim().replace(/[\'\"]{0,}/g,"");
								}
								else{
									
									fl_va_cntnt_all.push(m2_split_cnt[1].trim());

								}
							}
						}); 
						fl_type="where";
						
							fl_m=m1;
						
						return "asd";
					});
					
					
					var fl_m_tot=fl_m;
					
						
				if(_ct.has(node[ni].getElementsByTagName(fl_m_tot))){
							
					var node_elem=node[ni].getElementsByTagName(fl_m_tot);
					 for(var i=0,j=node_elem.length; i<j; i++){
						
							if(fl_type=="where"){
								if(_ct.count(fl_va_cntnt)>0 || _ct.count(fl_va_cntnt_all)>0 || _ct.count(fl_va_attr_all)>0 ){
							var get_attr=main_dom.get_attr(node_elem[i],fl_va);
							
								if(_ct.count(fl_va_cntnt_all)>0){
									
									var get_attr_key=_ct.getKey(get_attr);
									if(_ct.count(get_attr_key)==_ct.count(fl_va_cntnt_all) && _ct.count(_ct.where(get_attr,fl_va_cntnt))>0){
										
											ar.push(node_elem[i]);
									}
								
								}else{
									
								if(_ct.count(_ct.where(get_attr,fl_va_cntnt))>0  ){
									ar.push(node_elem[i]);
									}
								}
								if(_ct.count(fl_va_attr_all)>0){
									for(var kl in fl_va_attr_all){
									var get_attr=main_dom.get_attr(node_elem[i],fl_va_attr_all[kl]);
									
									if(_ct.has(get_attr,fl_va_attr_all[kl])){
									
										ar.push(node_elem[i]);
									}
									}
								
								}
								}	


							}
								if( fl_type=="all"){ 
									ar.push(node_elem[i]);
								}			
						}
				}
	
			}
			else if(/#/g.test(tar[ti])){
		
							var replce_dom=tar[ti].toString().replace(/^[#]/g,"");
							var idd_m=document.getElementById(replce_dom);
					if(_ct.has(idd_m)){
					
						ar.push(idd_m);
							}		
			}
			else if(/([a-zA-Z\-\_]{0,}\.[a-zA-Z0-9_\-]{1,})/g.test(tar[ti])){
			
				
				var s_node =document;
				var match_dom=tar[ti].toString().match(/([a-zA-Z\-\_]{0,}\.[a-zA-Z0-9_\-]{1,})/g,"");
		

					if (match_dom.length==0)
						return false;

					var main_class = match_dom[0].split(".")	
			

					if(/\w/g.test(main_class[0])){	
						cls_name=main_class[1];
						cls_tag=main_class[0];
					
					}else{
						cls_name=main_class[1];
						cls_tag="*";
					
					}
	
					if(s_node.getElementsByTagName(cls_tag)!=null && s_node.getElementsByTagName(cls_tag)!=undefined){ 
					var els = s_node.getElementsByTagName(cls_tag);
					
					for(var i=0,j=els.length; i<j; i++){
					
					
					var r = new RegExp("(?:^| )(" + cls_name + ")(?: |$)")
    				, m = (""+els[i].className).match(r);
			 		 var var_return = (m) ? true : false;
					 
					  if(var_return)
					  ar.push(els[i]);
						}	
						
					}
				
			}
			else{
			
			if(_ct.has(node[ni].getElementsByTagName(tar[ti]))){ 
				
				var els = node[ni].getElementsByTagName(tar[ti]);
	
     for(var i1=0,j1=els.length; i1<j1; i1++){


		
	
				ar.push(els[i1]);
			
		}
				}
			}
			      }	
			}
			
 		_ct.each(tar_m_split,function(cek,cev){
		
		if(cek>0) main_dom.find_element(cev,ar,bool);
		});
		
		}
		

	};	

function ps_extender(){
	
	}
	ps_extender.prototype.extend={
	class_extnd:function(clas,id){
		
		for ( var key in clas ){
		 id[key] = clas[key]; 
			}
		return id;	
	        },
		
		obj_extnd:function(id){
			var ps_ob=new ps_observer(id);
			return ps_ob;
	        }

	}
	
	ps_extender.prototype.dom={
		
		html:{
		hasClass: function(s, klass) {
  			var r = new RegExp("(?:^| )(" + klass + ")(?: |$)")
    				, m = (""+s).match(r);
			  return (m) ? m[1] : null;
			},
		tag_value:function(tar,ar){
		
			var tar_sub=tar.split("=>");

			_ct.each(tar_sub,function(eck,ecv){
				main_dom.find_element(ecv,ar,eck>0);
			
			});
			
			
			}
		
				
	
		},
	
		init:function(s,ar){
		var ar_s=[];
	
		
		
		var chd_dom=s.toString().match(/^[#.\w]{0,1}/g);
		
		var replce_dom=s.toString().replace(/^[#.]/g,"");
			
			if(chd_dom===null)
			return document;
			else{
				
				this.html.tag_value(s,ar_s);
				
		
		}
		
		return main_dom.assign_element_distinction(ar_s,s,ar); 
	
		}
	}

	

	
	
	
	
	function ps_observer(d){
	this.element=d;	

	this.parent_child=null;
	

	this.element_function=function(d){
		this.element=d;
	}
	this.addclass=function(d){
		var d_ary=_ct.getTypeof(d)=="array"?d:[d];
		this.each(function(meth,td){ 
		var clasd=meth.className.replace(/(\s)$/,"");
		meth.className=clasd+" "+d_ary.join(" ");
		});
			return this;
		}
	this.removeclass=function(d){
		var d_ary=_ct.getTypeof(d)=="array"?d:[d];
		this.each(function(meth,td){

		var clasd=meth.className.replace(/(\s)$/,"");

		var clasd_d=new RegExp("(" + d_ary.join(" ") + ")");
  
		var clasd_rpl=clasd.replace(clasd_d,"");
		meth.className=clasd_rpl;
		});
			return this;
	}
	this.is=function(elem){
		main_dom.is_where_element(elem,this.element);
		return this;	
	}
	this.findElem=function(elem){
		main_dom.find_element(elem,this.element,true);
		return this;
	}
	this.checked=function(d){
		var val_arry=[];	
		var cnt=0;
		
		this.each(function(meth,td){

			if(!_ct.has(d)){
			val_arry.push(meth.checked);

			}else{
		
			meth.checked=d;
			
			}
			cnt++;
		});
		
			if(!_ct.has(d)){
				return (cnt==1)?val_arry[0]:val_arry;
			}else{
				return this;
			}
	}
	
	this.remove=function(d){
var dom=((!_ct.has(d))?"none":document.querySelector(d));

		this.each(function(meth,td){
			if(dom!="none"){
	
				meth && meth.parentNode && meth.parentNode.removeChild(dom);
			}
			else{
		
				
				meth && meth.parentNode && meth.parentNode.removeChild(meth);
			}
			});
		
		return this;
	};
this.empty=function(){
		
		this.each(function(meth,td){
			
			while (meth.firstChild) meth.removeChild(meth.firstChild);
		});
		
		return this;
		
	}
this.fade=function(typ,intrvl,func){

var typ_s="";

var intrvl_s={};
	if(_ct.getTypeof(intrvl)=="json"){
		if(_ct.has(intrvl.time)){
			intrvl_s.time=intrvl.time;
			}	
		
	}else{
		if(_ct.getTypeof(intrvl)=="number"){
			intrvl_s.time=intrvl;
		}
		if(_ct.getTypeof(intrvl)=="string"){
			var jsn_spd_type={"slow":400,"fast":200,"faster":100,"slower":500};
			if(_ct.has(jsn_spd_type,intrvl)){
			intrvl_s.time=jsn_spd_type[intrvl];
			}else{
			intrvl_s.time=400;

			}

		}
	}
	
	this.each(function(meth,td){
		if(/(fadetoggle)/g.test(typ)){
		typ_s=(main_dom.getcss(meth,"display")=="none")?"fadeout":"fadein";
		
	}else{
		typ_s=typ;
	}
		main_dom.initFadeElement(meth,typ_s,intrvl_s,func);
	});
	return this;
}

this.css=function(d,c){
	var typeofs = _ct.getTypeof(d) == "json"?true:false;

	var cntt=((!_ct.has(c))?0:c-1);
	var val_g={};


	this.each(function(meth,td){
		if (typeofs)
		main_dom.css(meth,d);
		else{
		if(parseInt(td)<=cntt){
		
		val_g[td]=main_dom.getcss(meth,d);

			}
		}
	});
		
			return typeofs ? this : ((cntt===0)?val_g[0]:val_g);
		};
	this.show_hide=function(d){
		var d_var=d||"";
		this.each(function(meth,td){

	var elem=meth.style.display||main_dom.getcss(meth,"display");
		main_dom.css(meth,{display:((elem=="none")?d_var:"none")});

		});
		return this;
	}

	this.hide=function(){
	
		this.each(function(meth,td){

		main_dom.css(meth,{display:"none"});
		});
		return this;
	};
	this.show=function(){
	
		this.each(function(meth,td){

		main_dom.css(meth,{display:""});
		});
		return this;
	}
	this.attr=function(d,bol){
		var cnt=0;
		var globl={},globl_all=[];
		var var_bol=bol||false;
		

		var is_where_attr = _ct.has(d);
	
	var	attr_type=((_ct.getTypeof(d)=="array")?d:[d]);

	var typeofs = _ct.getTypeof(d) == "json"?false:true;
	
		this.each(function(meth,td){

			if(is_where_attr){

				if(typeofs){
					var get_attr=main_dom.get_attr(meth,attr_type);
					if( var_bol==true){
					
					if(_ct.count(get_attr)>0 ){
						globl[cnt]={};
						globl[cnt]=get_attr;		
								cnt++;
					}
						}else{
						globl[cnt]={};
						globl[cnt]=get_attr;		
								cnt++;

						}
				}else{
					for(var v in d){
						var crte_elem=document.createAttribute(v);	
							crte_elem.value = d[v];

					if(meth.setAttribute)
						meth.setAttribute(v,d[v]);	
					else
						meth.setAttributeNode(crte_elem);
					}
				}		
			}else{
				globl_all.push(main_dom.get_element_exist_attr(meth));
			}	
		});	
			if( is_where_attr==true){
				return typeofs==false ? this : ((cnt==1 || cnt==0)?((attr_type.length==1)?((typeof(globl[0])==="undefined")?"undefined":globl[0][d]):globl[0]):globl);
			}
			else{
				return _ct.count(globl_all)==0?-1:(_ct.count(globl_all)==1)?globl_all[0]:globl_all;
			}	
	}

	
	this.getindexattr=function(d){
		var cnt=0;
		var globl=[];
	
		if(_ct.getTypeof(d)!="json"){ return -1};
		var getkey=_ct.getKey(d);
		this.each(function(meth,td){
			var get_attr=main_dom.get_attr(meth,getkey);	
			var where_count=_ct.where(get_attr,d);
			
			if(_ct.count(where_count)>0){
			globl.push(cnt);	
			}
			cnt++;
		});
		
			return _ct.count(globl)==0?-1:(_ct.count(globl)==1)?globl[0]:globl;
		}
	
	this.removeattr=function(d){
		var attr_type=((_ct.getTypeof(d)=="array")?d:new Array(d));
		this.each(function(td,meth){
			if(meth.removeAttribute){
				_ct.each(attr_type,function(ky,vl){
				meth.removeAttribute(vl);
				});
			} 
		});

		}
	
	this.inserthtml=function(com,htm){
		var lst_adj={"after":"afterend","before":"beforebegin","prepend":"afterbegin","append":"beforeend",
				"afterend":"afterend","beforebegin":"beforebegin","afterbegin":"afterbegin","beforeend":"beforeend"			
				};
		this.each(function(meth,td){
                     try{
			if(_ct.has(lst_adj,com) && _ct.has(meth))
			meth.insertAdjacentHTML(lst_adj[com],htm);
			}catch(e){

			}
			});
			
	
		return this;
		}
	this.getdom=function(com,htm){
		var id_dm=[];
		this.each(function(meth,td){
	
			id_dm.push(meth);
		});
	return id_dm;
	}
	
	
    this.tagName=function(){
			var arry_pl=[];
			this.each(function(meth,td){
				
				arry_pl.push(meth.tagName);
			});
			return _ct.count(arry_pl)==1?arry_pl[0]:arry_pl;
		}
	
	this.setselected=function(val){
		var opt;
		
		this.each(function(meth,td){
			opt=meth.options;
		
			for(var i=0;i<opt.length;i++){

					opt[i].selected=(opt[i].value==val);			
				
			}
		});
		return this;
	}
	this.getselected=function(bol){
		return main_dom.dom_select_option(this,bol,"value");
	}
	this.getselectedtext=function(bol){
		return main_dom.dom_select_option(this,bol,"text");
	}
	this.getselectedcount=function(bol){
		return main_dom.dom_select_option(this,bol,"count");
	} 
	this.getparent=function(){
	
		var arry_pl=[];
			this.each(function(meth,td){
				
				arry_pl.push(meth.parentElement);
			});
			return _ct.count(arry_pl)==1?arry_pl[0]:arry_pl;

	} 
	this.getserializearray=function(){
	var form_name=this.element;
	var valr=((form_name.length>1)?[]:{});
	var valr_output=[];
	var html_form;
	var valr_oupt;
	this.each(function(html_form,td){
	
	 valr_oupt=((_ct.count(form_name)>1)?(valr[td]={}):valr);
	 
	for(var i=0;i<this.getlength();i++){
	
	
		var glb_arry={};
		var type_opt=['checkbox','radio'];
		if(_ct.has(html_form.type) && html_form.name.length>0){
		if(_ct.indexOf(type_opt,html_form.type)>-1){
				
			if(html_form.checked && _ct.has(html_form.value)&& _ct.has(html_form.name)){ 
				glb_arry[html_form.name]=ct("dom",html_form).val();	
				
			}else{
				var alt_val=main_dom.get_attr(html_form,"ps_alt_value");
				if(_ct.has(alt_val,"ps_alt_value") && _ct.has(html_form.name)){
				glb_arry[html_form.name]=alt_val.ps_alt_value;	
				
				}
			}

		}else{
			if(_ct.has(html_form.name)){
				if(_ct.has(html_form.value) ){
				if(html_form.value.trim().split("").length>0){
					glb_arry[html_form.name]=ct("dom",html_form).val();		
				}	
				else{
				var alt_val=main_dom.get_attr(html_form,"ps_alt_value");
				if(_ct.has(alt_val,"ps_alt_value")){
				glb_arry[html_form.name]=alt_val.ps_alt_value;	
				
				}else{
				glb_arry[html_form.name]=ct("dom",html_form).val();	
				}
				}
				
				}
			}
		}
		}	if(_ct.count(glb_arry)>0)
			valr_output.push(glb_arry);

			}
		});
			return valr_output;
		
			
			
	};
	this.eq=function(d){


		this.parent_child="node::eq("+d+")";

		return this;
		};
	this.noteq=function(d){


		this.parent_child="node::noteq("+d+")";

		return this;
		};
	this.on=function(f,fn){
	
		main_dom.event_iniate(this,f.split(","),fn,true)
		return this;
	};
	this.off=function(f,fn){
	
		main_dom.event_iniate(this,f.split(","),fn,false)
		return this;
	};
		
	

	this.delegate=function(evnt,target_element,func){
var evnt_splt=evnt.split(",");
	var main=this;
	var agentype = ct("agenttype").useragent({browser:'msie'});
	var agen_version = ct("agenttype").checkversion('msie');
	
			main.on("click,touchstart",function(e){
		
		
		ct("dom",target_element).each(function(ev,ek){
			main_dom.elem_delegate_event(agentype,agen_version,ev,evnt,func,false);
		


			});
	
		});

		

			return this;
	}	
	this.index=function(doms){
		var arry_dm=[];
		this.each(function(elemm,td){
			
			arry_dm.push(elemm);
			});
		
	
		 return _ct.indexOf(arry_dm,doms)	
	}
	this.isDomNull=function(){
		var bool=false;
		this.each(function(elemm,td){
			
			if(elemm==null){
				bool=true;
			}
		});
		return bool;
	}
	this.childposition=function(){
		 var i=1;
		
		 var node=((!_ct.has(this.element[0]))?this.element:this.element[0]);
			console.log(this.element)
		    while(node.previousSibling){
		        node = node.previousSibling;
		        if(node.nodeType === 1){
		            i++;
		        }
		    }
		    return i-1;
	};
	this.getElementDimension=function(){
		var arry_elem=[];
			
		this.each(function(elemm,td){
	
			if(_ct.has(elemm.getBoundingClientRect())){
		
			var gtrect=elemm.getBoundingClientRect();
			arry_elem.push({
				"bottom":gtrect.bottom,
				"height":gtrect.height,
				"left":gtrect.left,
				"right":gtrect.right,
				"top":gtrect.top,
				"width":gtrect.width
				});
			}
		});
		
		return _ct.count(arry_elem)==1?arry_elem[0]:arry_elem;
	}
	this.getElementOffSet=function(){

		var arry_elem=[];
			
		this.each(function(td,elemm){
			var gtelem=elemm[td];
			arry_elem.push(main_dom.dom_offset(gtelem));

		
		});
		return _ct.count(arry_elem)==1?arry_elem[0]:arry_elem;
	}
	this.getScrollPositon=function(){

		var arry_elem=[];
			
		this.each(function(element,td){
		
		
		var rect = element.getBoundingClientRect();
		var elementLeft,elementTop; //x and y
		var scrollTop =  main_dom.get_scroll_position().top;

		var scrollLeft = main_dom.get_scroll_position().left;
			elementTop = rect.top+scrollTop;
			elementLeft = rect.left+scrollLeft;
			arry_elem.push({"top":elementTop,"left":elementLeft  });

		
		});
		return _ct.count(arry_elem)==1?arry_elem[0]:arry_elem;

	}
	this.domview=function(dom,htm){
		var domee=this.getlength();
			var str=((domee)>1?[]:"");
			this.each(function(meth,td){
			var dom_type=_ct.indexOf(["checkbox","radio"],_ct.ifUndefined(meth.type,"-"))>-1?meth.checked:true;
				if(dom_type){
				if(domee>1){	
					str.push(main_dom.domio_type(dom,meth,htm));
				}else{
					str=main_dom.domio_type(dom,meth,htm)+"";
				}
				
				main_dom.domio_type(dom,meth,htm);
				}
				});
			if(_ct.has(htm)){	
				return this;
				}else{
					if(_ct.getTypeof(str)=="array")
					return _ct.count(str)==1?str[0]:str;	
					else
					return str;
				}

	}
	this.getlength=function(){
	var cnt_i=0;
	
	this.each(function(td,elemm){

	cnt_i++;
	});
	return cnt_i;
	};
	
	this.each=function(func){
	
	var cnt=0;
	var ele_cnt=this.element;
	var prnt_chld=this.parent_child;
	

		var ass_elem=main_dom.assign_element_distinction(this.element,prnt_chld,{});
			for (var td in ass_elem) {
				(function(func,d,m){
				if(ele_cnt.length>cnt){	
					
						func(m[d],d);
			
					}
					cnt++;
				})(func,td,this.element);	
		
			}


		}
		};	
		


var devnt=['scroll','focus','blur','change','abort','error','click','dblclick','mousemove','mouseout','mouseover','mousedown','mouseup','mouseenter','mouseleave','resize','keydown','keyup','keypress','touchstart','touchmove','touchend','contextmenu',
			'drag','dragstart','dragend','dragover','dragenter','dragleave','drop',
			'd_focus','d_blur','d_change','d_abort','d_error','d_click','d_dblclick','d_mousemove','d_mouseout','d_mouseover','d_mousedown','d_mouseup','d_resize','d_keydown','d_keyup','d_keypress','d_touchstart','d_touchmove','d_touchend','d_contextmenu'];		
var child={0:["firstChild","first"],1:["haschild","haschild"],2:["hasChildNodes","hasChildNodes"],3:["childNodes","hasChildNodes"],4:["lastChild","last"],5:["even","even"],6:["odd","odd"]};		
var appendhtml={0:["after","afterend"],1:["before","beforebegin"],2:["prepend","afterbegin"],3:["append","beforeend"]};
var styletype=['width','display','height','visible'];
var domview=['val','html','text','outerhtml'];
var elemfade=['fadein','fadeout','fadeto','fadetoggle'];

for(var f1 in devnt){
		var check_mobile=(/(touchstart|touchmove|touchend)/.test(devnt[f1]))?devnt[f1]:"none";
		  (function(m,m1,m2,m3){		
		
		ps_observer.prototype[m]=function(func){
		
			main_dom.event_loop(this,m1,m2,m3,func,true);
			return	this
		}	
		 })(devnt[f1]+'',devnt[f1]+'','on'+devnt[f1]+'',check_mobile);
	}	




for(var f2 in child){
	
	(function(m1,m2){
	ps_observer.prototype[m1]=function(){
		this.parent_child="node::"+m2;
				return this;
					}
	})(child[f2][0],child[f2][1]);
		}
		
for(var f3 in appendhtml){	
		
		(function(m1,m2){	
		ps_observer.prototype[m1]=function(html){
			
				this.inserthtml(m2,html);
			return this;
				}
		})(appendhtml[f3][0],appendhtml[f3][1]);			
		}
		
for(var f4 in styletype){
			
			(function(m){
			
				ps_observer.prototype["get"+m]=function(cnt){
			
			return this.css(m,cnt);
				}
			
			})(styletype[f4]);
			}
for(var f5 in domview){
			
			(function(m){
			
				ps_observer.prototype[m]=function(cnt){
			
			return this.domview(m,cnt);
				}
			
			})(domview[f5]);
			}

for(var f6 in elemfade){
			
			(function(m){
			
				ps_observer.prototype[m]=function(intrvl,fncmthd){			
			return this.fade(m,intrvl,fncmthd);
				}
			
			})(elemfade[f6]);
			}
function ps_config(d){
	
	}

	ps_config.prototype.setconfig=function(key,val){
		
		ps_glbl.config[key]=val
	}

	ps_config.prototype.getconfig=function(fnc){
		
		//fnc(ps_glbl.config);
		
		
	
	}
var ps_core;
		ps_core=(function(){
			
			doc_set=function(idss){
			var domm=[];	
			
			try{
				var ps_ext=new ps_extender();
			if(_ct.getTypeof(idss)==="object"){
			domm.push(idss);
			}
			else if(_ct.getTypeof(idss)==="array"){
		
			_ct.each(idss,function(k,v){
				if(_ct.getTypeof(v)==="object"){

				domm.push(v);
				}
				else if(_ct.getTypeof(v)==="string"){
			ps_ext.dom.init(v,domm);
				
				}
				
				});
			}	
			else{
			
			var doc_loop=idss.toString().split(",");
			
			for (var t in doc_loop) {
			
					ps_ext.dom.init(doc_loop[t],domm);
				
				
			}
			
			}
			}catch(e){}	
		return ps_ext.extend.obj_extnd(domm);
		
			
			}
			doc_set_docall=function(idss){
			var domm=[];	
			
			try{
				var ps_ext=new ps_extender();
			if(_ct.getTypeof(idss)==="object"){
			domm.push(idss);
			}
			else if(_ct.getTypeof(idss)==="array"){
			_ct.each(idss,function(k,v){
				if(_ct.getTypeof(v)==="object"){

				domm.push(v);
				}else if(_ct.getTypeof(v)==="string"){
			ps_ext.dom.init(v,domm);
				
				}
				
				});
			}
			else{
			var doc_loop=idss.toString().split(",");
			if(doc_loop.length===0){
			domm.push(document.body.querySelectorAll(idss));
			}else{
		for(var itnd in doc_loop){
			domm.push(document.body.querySelectorAll(doc_loop[itnd]));
			}
			
			}
			}
			}catch(e){}	
		return ps_ext.extend.obj_extnd(domm[0]);
		
			
			}
			document_ready_exist=function(func){
				main_dom.document_ready(func);

			}
			
			
			return {
				
				doc:function(id){
				return doc_set(id);
					},
				docall:function(id){
				return doc_set_docall(id);
					},
				dom_ready:function(func){	
				return document_ready_exist(func);	
						}
			
								
				};				
				})();	

	
				
function ps_element(d){
	this.main=d;

	this.ScrollPosition=function(){
		return main_dom.get_scroll_position();
	}
	this.EventScrollResize=function(fnc){
			ct("dom",root).on("resize,scroll",function(e){
				if(_ct.has(fnc)){
				fnc(this);
				}
			});
		}
		
	this.UrlQueryString=function(){
		var pairs = root.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");    
    if(!_ct.has(obj[decodeURIComponent( pair[0] )])){
         obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }else{
        if(_ct.getTypeof(obj[ decodeURIComponent( pair[0] ) ])=="array"){
            obj[ decodeURIComponent( pair[0] ) ].push(decodeURIComponent( pair[1] ));
        }
       else{
            var value=obj[ decodeURIComponent( pair[0] ) ];
             obj[ decodeURIComponent( pair[0] ) ]=[];
              obj[ decodeURIComponent( pair[0] ) ].push(value);
             obj[ decodeURIComponent( pair[0] ) ].push(decodeURIComponent( pair[1] ));
       }
    }  
  }

  return obj;
	}	
	}
function ps_ajax(d){
	

this.dataform;
this.data=d;
this.setcnnt={};
this.iecross=false;
this.ajx=main_dom.ajax_controller(this.iecross);
this.is_abort=false;		 
this.set_type="none";
this.time=0;
this.jsones="false";	
this.request_header={};
	}
	ps_ajax.prototype.setcontenttype=function(val){
		var main_jsn=this;
		_ct.each(val,function(k,v){
			main_jsn.request_header[k]=v;
		
		});
		return this;
	}
	ps_ajax.prototype.setRequestHeader=function(jsn){
		var req_hdr=this.request_header;
		_ct.each(jsn,function(kk,vv){

			req_hdr[kk]=vv;
		});
		return this;
	}
	ps_ajax.prototype.json=function(){
		this.jsones="true";
		return this;
	}
	ps_ajax.prototype.setFormData=function(formda,bols){
		var boolsdata=bols||false;

		
			if(formda instanceof Object){
				
				this.dataform=formda;		
			

		}else{
			
			this.dataform= new FormData(ct("dom",formda).element[0]);
		}
		return this;
	}
	
	ps_ajax.prototype.timeout=function(v){
		this.set_type="timeout";
		this.time=parseInt(v);
		return this;
	}
	ps_ajax.prototype.interval=function(v){
		this.set_type="interval";
		this.time=parseInt(v);
	return this;
	}
	ps_ajax.prototype.iecrosssite=function(){
		this.iecross=true;
		this.ajx=main_dom.ajax_controller(this.iecross);
		return this;
	}
	ps_ajax.prototype.abort=function(bools){
		
	//	ajx.xhr.onreadystatechange = null;
	//	ajx.xdr.send();
		
		this.ajx.xdr.abort();
		ps_glbl.is_ajax_abort=true;
		var loc_bools=bools||true;
		if (loc_bools==true)
		this.ajx=main_dom.ajax_controller(this.iecross);
		return this;
	}
	ps_ajax.prototype.ajax=function(config){ 
	var method=((!_ct.has(config.method))?"get":config.method);
	var jsons=this.jsones; 
	var main_ajx=this;
	var ajx=this.ajx;
	
try{
	if(typeof(config.value)=="function"){
	var js_event=main_dom.js_event_type(ajx.xdr,ajx.xhr_type,config.value,jsons,config);
		 js_event[ajx.xhr_type].load;
		
		}else if(typeof(config.value)=="object"){
	
		 _ct.each(config.value,function(i,v){
		
		var js_event=main_dom.js_event_type(ajx.xdr,ajx.xhr_type,v,jsons,config);
	 js_event[ajx.xhr_type][i];
		});
		}
		if(typeof(config.functions)=="function"){
		var js_event=main_dom.js_event_type(ajx.xdr,ajx.xhr_type,config.functions,jsons,config);
	 js_event[ajx.xhr_type].load;
	
		}else if(typeof(config.functions)=="object"){
		
		for (var i in config.functions){ 
		var v=config.functions[i];
		var js_event=main_dom.js_event_type(ajx.xdr,ajx.xhr_type,v,jsons,config.functions);
	 js_event[ajx.xhr_type][i];
		
		}
		}
		}catch(e){
		}
		var s_type=this.set_type;
		var s_time=this.time;
		var s_ajax=main_dom.ajax_http_loader;
		var s_data=this.data;
		var s_dataform=this.dataform;
		
		if (s_dataform instanceof Object) {
			
			if (_ct.getTypeof(config.value)==="json") {
						
					_ct.each(config.value,function(frmk,frmv){
						s_dataform.append(frmk,frmv);	
					});
			}
			
		}
		console.log(config.value,"config.value");
		if(s_type==="timeout"){
		setTimeout(function(){
	s_ajax(main_ajx,ajx.xdr,method,s_data,main_dom.js_json_delimiters(((typeof(config.value)=="function")?"":config.value)),s_dataform);
			},s_time);
	}
		else if(s_type==="interval"){
		setInterval(function(){
	s_ajax(main_ajx,ajx.xdr,method,s_data,main_dom.js_json_delimiters(((typeof(config.value)=="function")?"":config.value)),s_dataform);
			},s_time);
	}else{
	s_ajax(main_ajx,ajx.xdr,method,s_data,main_dom.js_json_delimiters(((typeof(config.value)=="function")?"":config.value)),s_dataform);
	
	}
	
	}
	var ajax_type = ['put','get','post',"delete","insert"];
	for(var f1 in ajax_type){
		(function(m,ps_ajax){
			ps_ajax.prototype[m]=function(value,func,bool){
				var jsn_fn={};
				jsn_fn["method"]=m;
				jsn_fn["value"]=value||{};
				jsn_fn["is_success"]=bool||false;
				if(typeof(func)=="function"){

				jsn_fn["functions"]=func;	
				}	
				this.ajax(jsn_fn);
				return this;
			}

		})(ajax_type[f1],ps_ajax)
	}
ps_ajax.prototype.returnvalue=function(value_s,func,bool){
		var main_arr={};
		var val;
		var value =value_s||{};
		
		main_arr['method']=(_ct.has(value,"method"))?"get":value["method"];
		main_arr['value']=(_ct.has(value,"value"))?{}:value["value"];
		jsn_fn["is_success"]=bool||false;
		main_arr['functions']=function(res){
			val=res;
		}
		this.ajax(main_arr);
		return val;
	}
	ps_ajax.prototype.error=function(){
	
	
	
	}
	
function ps_agenttype(d){
	var nav_browser=navigator.userAgent||navigator.vendor||root.opera;
	var nav_browser_lowerstr=nav_browser.toLowerCase();

	this.useragent=function(d){
	
		var br_p=[];
		var _browser = {};
		_browser.firefox = /mozilla/.test(nav_browser_lowerstr) && /firefox/.test(nav_browser_lowerstr);
		_browser.chrome = /webkit/.test(nav_browser_lowerstr) && /chrome/.test(nav_browser_lowerstr);
		_browser.safari = /applewebkit/.test(nav_browser_lowerstr) && /safari/.test(nav_browser_lowerstr)&& !/chrome/.test(nav_browser_lowerstr);
		_browser.opera = /opera/.test(nav_browser_lowerstr);
		_browser.msie = /msie/.test(nav_browser_lowerstr);
		
		var _os = {};
		_os.android = /android/.test(nav_browser_lowerstr);
		_os.blackBerry = /blackBerry/.test(nav_browser_lowerstr);
		_os.ios = /iphone|ipad|ipod/.test(nav_browser_lowerstr);
		_os.opera = /opera mini/.test(nav_browser_lowerstr);
		_os.windows_m = /iemobile/.test(nav_browser_lowerstr);
		_os.windows = /windows/.test(nav_browser_lowerstr);
		_os.mac = /mac/.test(nav_browser_lowerstr);
		_os.linux = /linux/.test(nav_browser_lowerstr);
		
		//https://code.google.com/p/mobileesp/source/browse/JavaScript/mdetect.js

		_ct.each(_browser,function(k,v){
			if(v==true){
				br_p.push(k);
			}
		});
		
		if(_ct.has(d) ){
			
			_ct.each(d,function(dk,dv){
				
				var dn_splt=dk.split("|");
				
				_ct.each(dn_splt,function(ddk,ddv){
					if(_ct.indexOf(br_p,ddv)!=-1){
						
						if(typeof(dv)==="function"){
							dv.call({'browser':ddv});
						}						
					}
				});								
			});			
		}


		



		if(_ct.has(d)){
		if( _ct.has(_browser,d['browser']) || _ct.has(_os,d['os'])){
			var jsn;
		
			if(_ct.has(_browser,d['browser']) )jsn=_browser[d['browser']];
			else if(_ct.has(_os,d['os']) )jsn=_os[d['os']];
			
			return jsn;
		}		
		}else{ return {"browser":_browser,"os":_os}};
	//	os
	}
	
	this.ismobile=function(){
		var bol=false;
		/** reference http://detectmobilebrowsers.com/	**/
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(nav_browser)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(nav_browser.substr(0,4))){
		bol=true;
		}
		
		
		return bol;
	}					
	this.checkversion=function(d){
		var vers={};
		var _browser=this.useragent();
		
		if (!(_browser.msie || _browser.firefox || _browser.chrome ||_browser.safari || _browser.opera))
				{
				if (/trident/.test(nav_browser_lowerstr)) {
				
				vers['msie']=11;
				}
				}
		for (x in _browser) {
		
			if (_browser[x]) {
				
			
				_ct.each(_browser[x],function(kk,vv){
			
				if(vv==true){
					var brwse_vrsn=nav_browser_lowerstr.match(new RegExp("(" + kk + ")( |/)([0-9]+)"));	
				if(brwse_vrsn!=null)
				vers[kk] = brwse_vrsn[3];
				}
				});
			}
			}
		
		return _ct.has(d)?(_ct.has(vers,d)?vers[d]:0):vers;
	}
	};
var bootstrap={
			
			
			dom:function(d){		
			
			return ps_core.doc(d);
		
			},
			dom_all:function(d){		
			return ps_core.docall(d);
		
			},
            
			ready:function(func){
					return ps_core.dom_ready(func);
			},
			element:function(){
					return new ps_element();			
			},
			ajax:function(d){
			return new ps_ajax(d);
			
			},
			agenttype:function(d){
				
			        return new ps_agenttype(d);				
			},
			
			require:function(d,bol){
			
				return new ps_amd(d,bol);
				
			},
			config:function(d){
			
				return new ps_config(d);
			}
			,
			ext:function(d){
				
				var dom = ps_core.doc(d);
			
				var cls_ext_return = extension_loader(dom).extend_ext_module()

				return cls_ext_return;
			}
			
			
			
			
			};
	root.ct=function(d,f,f1){
	if(_ct.has(d)){

	return	bootstrap[d](f,f1);
}};	


	
	root.ct$=function(d){
		return bootstrap["dom"](d);
	};
	root.ct$$=function(d){
		return bootstrap["dom_all"](d);
	};

		 
	root.ct.version="1.0.0.0";

	
var c=0;
	var amd_is_ready = false;
	function ps_amd(d,bol_clear_cache){
	var check_exist= (!_ct.has(d) || d==="" )?false:true;
	if(check_exist===true){
	
	ps_glbl.src.push(main_dom.checkurlvalid(d));
	var url = main_dom.checkurlvalid(d);
	
	this.dms=d;
	this.js_url=main_dom.checkurlvalid(main_dom.checkfile("js",d));
	var loadd=false;
	var caches_bol=!_ct.has(bol_clear_cache)?false:bol_clear_cache;

	var url_sep=/[\?]{1,}/.test(this.js_url);
	var url_sep1=/[\&]{1,}/.test(this.js_url);
	
	
	var caches=(caches_bol==true)?((url_sep==false?"?":(url_sep1==true?"&":""))+"jscache="+_ct.getUniq().substr(0,7)):"";
	var ps = document.createElement('script'); 
		ps.type = 'text/javascript';	
		ps.src=this.js_url+caches;
		ps.async = true;
		ps.onload=function(e){
		loadd=true;
	
		ps_glbl.report.loadjs.push(ps.src);
		};
		
		ps.onerror=function(e){
			loadd=true;
		
			ps_glbl.report.loadjs_error.push(ps.src);
			};
		(document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0]).appendChild(ps);
		
this.bool_load=loadd;

		}
	
	
	this.checkloop=function(s){
	
	
	}
		
		
	}
ps_amd.prototype.ready=function(func){
var eroor=this.js_url;
var loadd=this.bool_load;

document.onreadystatechange=function(){

if(document.readyState == "complete"){
		
	load_js(func);
	amd_is_ready = true;
}
	};
	
if(amd_is_ready){
	load_js(func);
}

		return this;

};

function load_js(func){

	if(_ct.has(func)){
	try{
	if(typeof(func)==="function"){func();}
	else{

		
		var setds=setInterval(function(){
			
			if(_ct.indexOf(ps_glbl.report.loadjs,eroor)>-1 || _ct.indexOf(ps_glbl.report.loadjs_error,eroor)>-1){
					
	var ref_succsee=_ct.indexOf(ps_glbl.report.loadjs,eroor);
	var ref_error=_ct.indexOf(ps_glbl.report.loadjs_error,eroor);
	if(typeof(func.success)==="function"){
	
	if(ref_succsee>-1){func.success();clearInterval(setds);}
	}
	if(typeof(func.failed)==="function"){
	if(ref_error>-1){func.failed();clearInterval(setds);}
	}
	
	}
		},100);
	}}
	catch(e){
	
	}
	
	}
	
}
root.ct.extension = function(name,cb){
     
     if(_ct.isFunction(cb)){
         var glb_meth = {}
         cb(glb_meth)

         if(!_ct.has(ps_glbl.extension_load_event,name)){

             //var    
             ps_glbl.extension_load_event[name]=glb_meth;
         }
     }
 };
 function ps_extension(dom){
     this.element = dom.element
 }
extension_loader = (function(dom){
   
    
    var load_event = ps_glbl.extension_load_event;
     var var_cls = new ps_extension(dom);

    load_extend_module = function(name){
           _ct.each(load_event,function(k,v){

                if(_ct.has(v,name)){
                 
                    ps_extension.prototype[k]=v[name]
                }
                
            });
    }


    return{
        extend_ext_module:function(){
            
             load_extend_module("module")
            return var_cls
        },
        load_controller_module:function(){
             load_extend_module("dom_control")
        }

    }
    





 })
var main_helper={
		getTypeof:function(s){
			if(Object.prototype.toString.call(s)==="[object Object]"){
				return "json";
			}
			else if(Object.prototype.toString.call(s)==="[object Array]"){
				return "array";
			}

			else{
				return typeof(s);
			}
		},
		has:function(jsn,key){
			if(typeof(key)=="undefined")
			return jsn!=null && typeof(jsn)!="undefined" ;
			else
			return jsn!=null && typeof(jsn[key])!="undefined" ; 
		},
		count:function(jsn,bol){

				var cnt=0;
				var bol_d=bol||false;
				var get_json=main_helper.getTypeof(jsn);
				if(get_json=="object" && main_helper.has(jsn,"style") && main_helper.has(jsn,"nodeType")  && main_helper.has(jsn,"ownerDocument")){
				for(var i in jsn){
					
					if(parseInt(i).toString()!="NaN"){
					cnt++;	
					}else{
						break;
					}
					
				}	

				}else{
				main_helper.for_loop(jsn,function(i,m){
					cnt++;
				});
					
				}

					if(get_json=="json" && bol_d==true){
					
						var jsn_parse= jsn;//_ct.parseString(jsn).match(/(:{)/gi);
						var cnts=0;
						main_helper.for_loop(jsn_parse,function(jk,jv){
							cnts+=1;
							});
						return cnts;
					}else{
					return cnt;
					}
		}, 
		indexOf:function(jsn,val){
			var jsn_type=main_helper.getTypeof(jsn);
			if(main_helper.getTypeof(jsn)=="array"){
					for(var i=0; i<main_helper.count(jsn); i++){
							if(jsn[i]==val)
								return i;          
						}
						return -1;
			}else
			return -1;	
		},
		
		for_loop:function(jsn,func){
			
				var re_loop=[];
				var typeofs = main_helper.getTypeof(jsn);
				if(typeofs ==="json" || typeofs ==="array" ){

				for(var ins in jsn){
					var bool_func = true;
				if( main_helper.getTypeof(jsn[ins])=="function"){
					
					if(/\b_/g.test(ins) ) { 
						bool_func= false
					}

				}	
					if(bool_func) {
					try{
						if(main_helper.has(func)){
								
								func(ins,jsn[ins]);
							
							}else{
							
							re_loop[ins]=jsn[ins];
								
							}
							}
							catch(e){
								console.log(e);
							}

					}
				}
				return re_loop
				}



		},

		random_key:function(){
			var d=new Date();
			var str_rand=  Math.random().toString(36).substr(2);
			var str_rand1=  Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);
			var gettme=d.getTime();
			
	
			return str_rand1;	
		}
		
		,datastring:function(str){
		
			var data_s="";

			if(typeof(str)=="string"){ 
			if(str.indexOf("'"))
			data_s='&quot;'+(str)+'&quot;';
			else if(str.indexOf('"'))
			data_s='&quot;'+(str)+'&quot;';
			else
			data_s=str;
			}else{
			data_s=str;

			}
			return data_s;
		},returnLoop:function(d,f,dl){
			var str="";
				str+="object";
			return f(d)+""+dl;
		},
		dateEventFormat:function(reg,ints,nm){
				var regp=reg;
				var intr=ints;
				
				if(regp.test(nm.toString())){
			intr=nm;
			}		
		if(!main_helper.has(nm) || nm.toString()=="NaN"){
		intr=ints;
		
		}

			return intr;
		},
		getKeyVal:function(jsn,typ){
			var typ_s=typ,ky=[],vl=[];
			var list_raw = [];
			main_helper.for_loop(jsn,function(kk,vv){
				ky.push(kk);vl.push(vv);
				list_raw.push({
					"key":kk,
					"value":vv
				});
			});
			if(main_helper.indexOf(["key","value"],typ )>-1 ){
				var ars=(typ=="key")?ky:vl;
				return (main_helper.count(ars)==1)?ars[0]:ars;		
			}
			if(typ =="first_index"){
				return main_helper.count(list_raw)>0?list_raw[0]:null;
			}
			if(typ =="last_index"){
				return main_helper.count(list_raw)>0?list_raw[ main_helper.count(list_raw)-1 ]:null;
			}
		//	else if(){

		//	}
		//	else{

		//	}
			

		},
		group:function(type,jsn,val){
			var jsn_val={};
                        var jsn_val_count={};
	
			main_helper.for_loop(jsn,function(kk,vv){
				
				if(main_helper.getTypeof(vv)==="json"){
				   if(main_helper.has(vv[val])){
			
					if(!main_helper.has(jsn_val[vv[val]])){
					  jsn_val[vv[val]]=[];
					  jsn_val_count[vv[val]]=[];
                                         
					}
					jsn_val[vv[val]].push(vv);
                                        jsn_val_count[vv[val]]=main_helper.count(jsn_val[vv[val]]);
				   } 		
				}
				else{
				  if(!main_helper.has(jsn_val[vv])){
				
				     jsn_val[vv]=[];
				      jsn_val_count[vv]=[];
				   }	
				    jsn_val[vv].push(vv);
                                     jsn_val_count[vv]=main_helper.count(jsn_val[vv]);		
				}
					
			});
			if(type=="count"){
			  return jsn_val_count;
			 }
			if(type=="content"){
			  return jsn_val;
			}
			

		},
		getdata:function(jsn,split_str){

			var spl_len=split_str.split(":");
			var spl=[];
			var jsn_total={};
			var jsn_cnt=0;

				if(!main_helper.has(jsn)){
					return "";
				}

				main_helper.for_loop(spl_len,function(i,v){
				
					spl.push(v);
				});
						
				main_helper.for_loop(spl,function(i,v){
					
						try{
					if(main_helper.has(jsn[v])){
					if(/^\s+$/.test(jsn[v])==false){
					
					jsn_total=jsn[v];
						jsn_cnt++; 
								}
					}else{
					
							if(main_helper.has(jsn_total)  ){
						if( main_helper.has(jsn_total[v])){
							
							jsn_total=jsn_total[v];
							jsn_cnt++;	

						}}else{

					
						}
					}
					}
					catch(e){ console.log(e);
				
					}
					});
				return (main_helper.count(spl)==jsn_cnt)?jsn_total:{};	
		},
		template_value:function(str_raw,reg){

				var str=str_raw;
				try{
				function queryJSString(txt,reg)
				{

				//var fnc_js=/[\r\t\n]{0,}<!([^-]{0})[\r\t\n\s](.*?)!>[\r\t\n]{0,}/g;
				//if(fnc_js.test(txt)){	
			
				//}else{
					return txt;
			//	}
				}	
				var strs=str;
				
			try{
				
					var regs=new RegExp("[\\r\\t\\n\\s]{0,}<![-]\\s{0,}(.*?)\\s{0,}!>[\\r\\t\\n\\s]{0,}","g");
						strs=strs.replace(regs,function(f,m,m1){
							var strs_perd=m.replace(".",":");
							var gtdata=main_helper.getdata(reg,strs_perd);
						
							return main_helper.getTypeof(gtdata)=="json"?"":gtdata;
						});		
			}catch(e){
				console.log(e);
			}		}catch(e){
					console.log(e);
				}
					var strs_finl=strs;//String(queryJSString(strs,reg));
			//strs_finl.replace(/f(!\s{0,}[A-Za-z0-9_]{0,}\s{0,}!)/gi,"");
						return 	strs_finl;//.replace(/<![-_=]{0,}\s{0,}(.*?)\s{0,}!>/gi,"");

			},
		repeat:function(strs,rpt){
					
		var nm_rpt=rpt||0;
		var nm_str=strs||"";
			if(nm_rpt>0)
			return new Array(nm_rpt+1).join(nm_str);
			else
			return "";
		},
		unserialize:function(data){

				//  discuss at: https://locutus.io/php/unserialize/
			// original by: Arpad Ray (mailto:arpad@php.net)
			// improved by: Pedro Tainha (https://www.pedrotainha.com)
			// improved by: Kevin van Zonneveld (https://kvz.io)
			// improved by: Kevin van Zonneveld (https://kvz.io)
			// improved by: Chris
			// improved by: James
			// improved by: Le Torbi
			// improved by: Eli Skeggs
			// bugfixed by: dptr1988
			// bugfixed by: Kevin van Zonneveld (https://kvz.io)
			// bugfixed by: Brett Zamir (https://brett-zamir.me)
			// bugfixed by: philippsimon (https://github.com/philippsimon/)
			//  revised by: d3x
			//    input by: Brett Zamir (https://brett-zamir.me)
			//    input by: Martin (https://www.erlenwiese.de/)
			//    input by: kilops
			//    input by: Jaroslaw Czarniak
			//    input by: lovasoa (https://github.com/lovasoa/)
			//      note 1: We feel the main purpose of this function should be
			//      note 1: to ease the transport of data between php & js
			//      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
			//   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
			//   returns 1: ['Kevin', 'van', 'Zonneveld']
			//   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
			//   returns 2: {firstName: 'Kevin', midName: 'van'}
			//   example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
			//   returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}

	
	
	var serial_ver=(data.slice(0, 0+ 1)).toLowerCase();
	var arry_type=['i','b','d','n','s','a'];
	if(!main_helper.has(data) || main_helper.indexOf(arry_type,serial_ver)<0){
		return {};
	}
 
		
			  var that = this,
				utf8Overhead = function(chr) {
				
				  var code = chr.charCodeAt(0);
				  if (code < 0x0080) {
					return 0;
				  }
				  if (code < 0x0800) {
					return 1;
				  }
				  return 2;
				};
			  error = function(type, msg, filename, line) {
				throw new that.window[type](msg, filename, line);
				return {};
			  };
			  read_until = function(data, offset, stopchr) {
				var i = 2,
				  buf = [],
				  chr = data.slice(offset, offset + 1);

				while (chr != stopchr) {
				  if ((i + offset) > data.length) {
					error('Error', 'Invalid');
				  }
				  buf.push(chr);
				  chr = data.slice(offset + (i - 1), offset + i);
				  i += 1;
				}
				return [buf.length, buf.join('')];
			  };
			  read_chrs = function(data, offset, length) {
				var i, chr, buf;

				buf = [];
				for (i = 0; i < length; i++) {
				  chr = data.slice(offset + (i - 1), offset + i);
				  buf.push(chr);
				  length -= utf8Overhead(chr);
				}
				return [buf.length, buf.join('')];
			  };
			  _unserialize = function(data, offset) {
				var dtype, dataoffset, keyandchrs, keys, contig,
				  length, array, readdata, readData, ccount,
				  stringlength, i, key, kprops, kchrs, vprops,
				  vchrs, value, chrs = 0,
				  typeconvert = function(x) {
					return x;
				  };

				if (!offset) {
				  offset = 0;
				}
				dtype = (data.slice(offset, offset + 1))
				  .toLowerCase();

				dataoffset = offset + 2;

				switch (dtype) {
				  case 'i':
					typeconvert = function(x) {
					  return parseInt(x, 10);
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				  case 'b':
					typeconvert = function(x) {
					  return parseInt(x, 10) !== 0;
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				  case 'd':
					typeconvert = function(x) {
					  return parseFloat(x);
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				  case 'n':
					readdata = null;
					break;
				  case 's':
					ccount = read_until(data, dataoffset, ':');
					chrs = ccount[0];
					stringlength = ccount[1];
					dataoffset += chrs + 2;

					readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 2;
					if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
					  error('SyntaxError', 'String length mismatch');
					}
					break;
				  case 'a':
					readdata = {};

					keyandchrs = read_until(data, dataoffset, ':');
					chrs = keyandchrs[0];
					keys = keyandchrs[1];
					dataoffset += chrs + 2;

					length = parseInt(keys, 10);
					contig = true;

					for (i = 0; i < length; i++) {
					  kprops = _unserialize(data, dataoffset);
					  kchrs = kprops[1];
					  key = kprops[2];
					  dataoffset += kchrs;

					  vprops = _unserialize(data, dataoffset);
					  vchrs = vprops[1];
					  value = vprops[2];
					  dataoffset += vchrs;

					  if (key !== i)
						contig = false;

					  readdata[key] = value;
					}

					if (contig) {
					  array = new Array(length);
					  for (i = 0; i < length; i++)
						array[i] = readdata[i];
					  readdata = array;
					}

					dataoffset += 1;
					break;
				  default:
					error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
					break;
				}
				return [dtype, dataoffset - offset, typeconvert(readdata)];
			  };

			  return _unserialize((data + ''), 0)[2];
		
		},
		//Word in number
		main_utility:function(dom){
			this.variable=dom;
			
			this.separate_decimal=function(){
				var dec_m={
					"number":0,
					"decimal":0,				
					}
				 var split_s=this.variable.toString().split(".");
				
					if(_ct.count(split_s)===1){
						dec_m['number']=parseInt(split_s[0]);
						
					}
					if(_ct.count(split_s)===2){
						   dec_m['number']=parseInt(split_s[0]);
						   dec_m['decimal']=parseInt(split_s[1]);		
					}
				   return dec_m;	
				}
			},
		
		round_by_thousands:function(nbm,lmt,dcml){
			var nmbr=nbm.toString();
			var nmbr_len=nmbr.split("").length;
			
			
			return parseInt(1+_ct.repeat(dcml,(Math.ceil(nmbr_len/lmt)-1)));
		},
		tenth_by:function(nbm,bool){
			var bools=_ct.has(bool)?bool:true;
			var var_jsn={
			//    0:'zero'     ,
					1:'one'      ,
				2:'two'      ,
				3:'three'    ,
				4:'four'     ,
				5:'five'     ,
				6:'six'      ,
				7:'seven'    ,
				8:'eight'    ,
				9:'nine'     ,
				10:'ten'     ,
				11:'eleven'  ,
				12:'twelve'   ,
				13:'thirteen'  ,
				14:'fourteen'  ,
				15:'fifteen'   ,
				16:'sixteen'   ,
				17:'seventeen' ,
				18:'eighteen'  ,
				19:'nineteen'  ,
				20:'twenty'   ,
				30:'thirty'   ,
				40:'forty'    ,
				50:'fifty'    ,
				60:'sixty'    ,
				70:'seventy'  ,
				80:'eighty'   ,
				90:'ninety'   ,
				100:'hundred' ,
				1000:'thousand',
				1000000:'million',
				1000000000:'billion' 										
				};
			if(_ct.has(var_jsn,nbm) & bools===true){
			return 	var_jsn[nbm];
			}else{
			return "";	
			}
		},
		in_number_hunders_specify:function(nmb){
			
			var nmb_str="";
			var hndr_flr=Math.floor(nmb/100);	
			var tnth_flr=nmb-(hndr_flr*100);
			if(hndr_flr>0){
			nmb_str+=main_helper.tenth_by(hndr_flr)+" "+main_helper.tenth_by(100);
			nmb_str+=" "+main_helper.in_number_specify(tnth_flr)
			}else{
				if(tnth_flr>0){
					if(tnth_flr>10 && tnth_flr<20){
				
					nmb_str+=main_helper.tenth_by(tnth_flr);
				}else{
					
					var tnth_v=main_helper.tenth_by(Math.floor(tnth_flr/10)*10);
					var ones_v=main_helper.tenth_by(tnth_flr-(Math.floor(tnth_flr/10)*10));
				
					
				nmb_str+=(tnth_v+" "+ones_v);
					
					
				}
					
				}
			}	
			



			return nmb_str;
		},
		in_number_specify:function(nmb){
			var nmbr_str="";
			var whl_nmbr=Math.floor(nmb/main_helper.round_by_thousands(nmb,3,"000"));
			var rmdr_nmbr=Math.floor(nmb%main_helper.round_by_thousands(nmb,3,"000"));
			var thnd_str=main_helper.tenth_by(main_helper.round_by_thousands(nmb,3,"000"),main_helper.round_by_thousands(nmb,3,"000")!=1);
		
			nmbr_str+=main_helper.in_number_hunders_specify(whl_nmbr)+" "+thnd_str;


			if(rmdr_nmbr>0){
				
				nmbr_str+=" "+main_helper.in_number_specify(rmdr_nmbr);
			}
			
			

		return nmbr_str;
		},
		in_decimal_specify:function(nmb,cnt){
			var nmbr_str="";
			var nbm_len=(parseInt(nmb.toString().split("").length));
			var hunrth_cnt=parseInt(1+_ct.repeat("0",(nbm_len==1?1:0)));
				nmbr_str+=main_helper.in_number_hunders_specify(nmb*hunrth_cnt);
			
		return nmbr_str;
		}			
			
		
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = main_helper;
    }
   
  } 
var _ct=function(s){};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {

      exports = module.exports = _ct;
    }
	var main_helper =require("./functional_helper")
    exports._ct = _ct;
  } 

else{
	root._ct=_ct
}








_ct.has=function(jsn,key){
	return main_helper.has(jsn,key)
}
_ct.ifUndefined=function(jsn,nval,nval1){
	
	if(!_ct.has(nval1)){ 
		if(_ct.has(jsn)) return jsn;
		else return nval;
	}else{
		if(_ct.has(jsn,nval)) return jsn[nval];
		else return nval1;
	}
		
}

var list_datatype_of = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];

_ct.getTypeof=function(s){

	return main_helper.getTypeof(s)
}

_ct.indexOf=function(jsn,val){

	
	return main_helper.indexOf(jsn,val)
	
}

_ct.each=function(jsn,func){
	return main_helper.for_loop(jsn,func)
}

_ct.each(list_datatype_of, function(key,value) {
	
    _ct['is' + value] = function(obj) {
      return toString.call(obj) === '[object ' + value + ']';
    };
  });



_ct.varExtend=function(jsn,jsn_rpl){
	
	if(_ct.getTypeof(jsn)=="json" && _ct.getTypeof(jsn_rpl)=="json"){
		var jsn_s={};
		for (var k in jsn ){
				if(_ct.indexOf(['true','false'],jsn[k].toString().toLowerCase())>-1){
						var jsn_bool={"true":true,"false":false};
					
					jsn_s[k]=jsn_bool[jsn[k].toString().toLowerCase()];
				}else{
					jsn_s[k]=jsn[k];
				}
		}
		for (var k in jsn_rpl ){
		
			if(_ct.has(jsn_s,k)){
				
					jsn_s[k]=jsn_rpl[k];
				
				
			}
		};
		return jsn_s;
	}else{
		return jsn;
	}
}
_ct.repeat=function(strs,rpt){
	return main_helper.repeat(strs,rpt);
}	


_ct.numberFormat=function(val,zrl,zr2){
	var arry=[];
	var val_zro=zr2||0;
	var ssd_va=val.toString();
	var splt_dec=ssd_va.split(".");

	var reg_exp=new RegExp("(\\d)(?=(\\d{"+(zrl||3)+"})+(?:\\.\\d+)?$)","g");

	var num_deli=splt_dec[0].replace(reg_exp, "$1,");	

	var ssd_va=num_deli+(_ct.count(splt_dec)>1?("."+splt_dec[1]):"");
	if(val_zro>0){
	
		var str_dec=ssd_va.split(".");
		if(_ct.count(str_dec)==1){
			ssd_va=ssd_va+"."+_ct.repeat("0",val_zro);
		}else{
		
			var dec_num=str_dec[1];
			if(dec_num.length>=val_zro){ 
				ssd_va=str_dec[0]+"."+(dec_num.substr(0,val_zro));
			}else{
				ssd_va=str_dec[0]+"."+dec_num+_ct.repeat("0",dec_num.length-val_zro);
			}
		} 
	}	

	return ssd_va;
}
_ct.getUniq=function(){
	return main_helper.random_key();
}
_ct.parseString=function(s){

var str="";
var str_strt="";
var str_end="";
var inc=0;
var inc_main; 
 if(_ct.has(s)){
if(_ct.getTypeof(s)==="json"){
	str_strt="{";
	str_end="}";
	
	

	_ct.each(s,function(i,m){
	
inc_main=((inc<_ct.count(s)-1)?",":"");
	if(typeof(m)==="object" && m!=null){
	str+=main_helper.datastring(i)+":"+main_helper.returnLoop(m,_ct.parseString,inc_main);

	}else{
	str+=main_helper.datastring(i)+":"+main_helper.datastring(m)+""+inc_main;
	}
	inc++;
	});
	
}
else if(_ct.getTypeof(s)==="array"){

		str_strt="[";
		str_end="]";
		
	_ct.each(s,function(i,m){
		inc_main=((inc<_ct.count(s)-1)?",":"");
		if(typeof(m)==="object"){

		str+=main_helper.returnLoop(m,_ct.parseString,inc_main);
		}else{
		str+=main_helper.datastring(m)+""+inc_main;
		}
	inc++;
		});
}
}

return (str_strt+str+str_end).replace(/[\r\t\n\s]{1,}/g, "&nbsp;").replace(/(&quot;)/gi,'"');
};



_ct.parseJson=function(s_val){
var s=s_val.replace(/(&quot;)/gi,'"',s_val).replace(/(&nbsp;)/gi,' ',s_val);
var str_len=s.length;
var sub_str=s.substring(1,str_len-1);
var sub_str_split=sub_str.split(",");
var j;

if (/^[\],:{}\s]*$/.test(s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
					
					if(s.length>0 && !/^\s*$/.test(s)) j = eval('(' + s + ')');
						
						}
				return j;		
};
_ct.insert=function(jsn,val){
	
	if(_ct.has(jsn)){
	var jsn_type=_ct.getTypeof(val);
	if(jsn_type=="json"){
		_ct.each(val,function(k,v){
			jsn[k]=v;	
		});
	}else{
		jsn.push(val);
	}
}
}

_ct.getKey=function(jsn){
	return main_helper.getKeyVal(jsn,"key");

}
_ct.getValue=function(jsn){
	return main_helper.getKeyVal(jsn,"value");

}
_ct.update=function(jsn,where,val){
	if(_ct.has(jsn)){
	
		
	}
}	

_ct.getJSONVariable=function(s){
		
	if(_ct.getTypeof(s)==="json"){
		
		return {};
	}
	else if(_ct.getTypeof(s)==="array"){
	
		return [];
	}else{
		return s;
	}
	
}




_ct.template_html=function(domm,reg){
	var dom_main="";
	if(/(\=+\>)/.test(domm)){
			
			var elem_splt=domm.split("=>");
			var t_html=ct("dom",elem_splt[0].trim()).html();
		
			var ele_attr=elem_splt[1].trim();
			
			var elem_tag=ele_attr==null?elem_splt[1].trim():elem_splt[1].split("[")[0].trim();
			var el   = document.createElement("div");
			el.innerHTML = t_html;

				ct("dom",el).findElem(ele_attr).each(function(ev,ek){
				dom_main+=ct("dom",ev).html().replace(/(--){0,}/gi,"").replace(/\=('|")(<!.*?!>)('|")/g,"=$2");
				});
			
		
	}else{

		 dom_main=ct("dom",domm).html();

      
	}
	 return _ct.template_value(dom_main,reg);	
}
_ct.template_value=function(str_raw,reg,option){
str_raw = main_helper.template_value(str_raw,reg)
var default_option=_ct.varExtend({
                        evaluate:"<![^\=\-]([\\s\\S]+?)!>",
						interpolate:"<!\=([\\s\\S]+?)!>",
						escape:"<!\-([\\s\\S]+?)!>",
                         
                             },option);

var regexp = new RegExp(
	[
		default_option.evaluate,
		default_option.interpolate,
		default_option.escape
	].join("|")+"|$","g"
)
	

var source = "__p+='";
var index = 0;

var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };


str_raw.replace(regexp,function(match,evaluate,interpolate,escape,offset){
source+=str_raw.slice(index,offset).replace(escaper, escapeChar);

index = offset+match.length;

	if(evaluate){
		source+="';\n"+evaluate+"\n__p+='";
	}
	else if(interpolate){
		source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'";
	}
	else if(escape){
		source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'";
	}

	return match;
});
source+="';\n";



  //- source = "var __t,__p='',__j=Array.prototype.join," +
   source = "var __t,__p='',__j=[].join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + " return __p;\n";

    try {
		var val_source = "";

	 if(_ct.getTypeof(reg) == "json"){
		 for(var i in reg){
			 val_source+='var '+i+' = '+(_ct.indexOf(['array','json'],_ct.getTypeof(reg[i]))>-1? _ct.parseString(reg[i]):'"'+reg[i]+'"')+';';
		
	 }
	
	 }

      var render = new Function('obj', '_', val_source+source);
    } catch (e) {
		console.log(e );
      e.source = source;
      throw e;
    }
	return render.call(this, reg, _ct);

}
_ct.JsonToArray=function(jsn,val){
	var arry=[];
	_ct.each(jsn,function(k,v){
		if(!_ct.has(val)){
			arry.push(v);
		}else{
		if(_ct.has(v,val)){
		arry.push(v[val]);
		}
		}
		
	});
	return arry;
}
_ct.round_decimal=function(jsns,dmin,dmax){
	var jsn=jsns||0;
	var str_dec=jsn.toString().split(".");
	var s_dmin=dmin||1;
	var s_dmax=dmax||2;
	if(_ct.count(str_dec)==2){
	var p_cnts=_ct.count(str_dec[1].toString().split(""));
	var delmts=p_cnts<=s_dmin?s_dmin:s_dmax;
		
		var dec_s=Math.pow(10,delmts);
		return Math.round(parseFloat(jsn*dec_s))/dec_s;
	}else{
		return jsn;
	}
}

_ct.random=function(jsn,min,max){
var ran_var=[];
var ran_ctt=0;
var ran_min=(!_ct.has(min))?0:min;
var ran_max=(!_ct.has(max))?_ct.count(jsn):max+ran_min;

var jsn_var=_ct.getJSONVariable(jsn);
var math_random = Math.round(Math.random()*ran_max)
	_ct.each(jsn,function(k,v){	
			if( math_random ==k)
			ran_var = v ;	
		});
		return ran_var
}



_ct.delimiter=function(jsn,dlmtr,sprt){
var str="";
var cnt=0;
var sprt_r=((!_ct.has(sprt))?"":sprt);
var d_cnt=_ct.count(jsn);


		_ct.each(jsn,function(i,m){
		str+=(i+dlmtr+m);
		cnt++;	
	if(cnt<d_cnt)
	str+=sprt_r;	
		});
		
	return str;
	}

_ct.sort=function(jsn,index,ascs){
	var jsonn=jsn;
	var asc=(!_ct.has(ascs))?true:ascs;
	var pjsn=[];
		
	var js_m=(_ct.getTypeof(jsonn)=="json")?_ct.each(jsonn):jsonn;
	 jsonn=js_m.sort(function(a,b){
			if (asc) return (a[index] > b[index]);
        else return (b[index] > a[index]);
	
		});
		return jsonn;
}	
_ct.map=function(jsn,func){
	var value_arry=[];
	var cnt=0;
	console.log(jsn);
	var jsn_var=_ct.getJSONVariable(jsn);
	var jsn_type=_ct.getTypeof(jsn);
	_ct.each(jsn,function(k,v){
		if(_ct.has(func)){
		value_arry.push(func(v,k,cnt));
		cnt++;
		}
		
	});
	return value_arry;
}

_ct.first=function(jsn){
	return main_helper.getKeyVal(jsn,"first_index");
}	
_ct.last=function(jsn){
	return main_helper.getKeyVal(jsn,"last_index");
}
_ct.filter=function(jsn,func){


	var jsn_var=_ct.getJSONVariable(jsn);
	var jsn_type=_ct.getTypeof(jsn);
	
	_ct.each(jsn,function(k,v){
		
		if(_ct.has(func)){
			if(func(k,v)==true){
				if(/(json|array)/g.test(jsn_type)){
				_ct.append(jsn_var,v,k);
				}else{
					jsn_var=v;
				}
			}
		}
	});
	return jsn_var;
}


_ct.clone=function(jsn){
	var typeofs=_ct.getTypeof(jsn);
	var variable=_ct.getJSONVariable(jsn);
			_ct.each(jsn,function(k,v){
				_ct.append(variable,v,k);
			});
			
			return variable;	
}
_ct.append=function(jsn,val,key){
	var typeofs=_ct.getTypeof(jsn);
	var variable=_ct.getJSONVariable(jsn);
	
	if(typeofs=="json"){
		jsn[key]=val;
	}else if(typeofs=="array"){
		jsn.push(val);
	
	}
	return jsn;
}

_ct.append_isArrayExist=function(key,val){
	var outpt=[];
	var ary_type=_ct.getTypeof(key);
	var ary_type1=_ct.getTypeof(val);
	if(/(array)/g.test(ary_type) && /(array)/g.test(ary_type1)){
	_ct.each(val,function(k,v){
		if(_ct.indexOf(key,v)===-1){
		key.push(v);
		}
	});
	return key;
	}
	else{
		return [];
	}
	
}
_ct.isExact=function(key,val ,is_exist ){
	if (val==null) return false;
	var get_key=_ct.getValue(key);

	var local_is_exist = _ct.has(is_exist) & _ct.getTypeof(is_exist) =="boolean" ?is_exist:true;
	var val_s=/(json|array)/g.test(_ct.getTypeof(val))?val:[val];
	var key_s=/(json|array)/g.test(_ct.getTypeof(key))?key:[key];
		
	var obj = key;
	var cnt=0;

	_ct.each(key_s,function(kk,kv){

	
		if(_ct.getTypeof(val)=="json"){ 

			if(_ct.has(val_s[kk])){  
				var local_is_valid = local_is_exist?val_s[kk]==kv:val_s[kk]!=kv;
			   if(local_is_valid){
				cnt++;
				}	
			}
		}
		if(_ct.getTypeof(val)=="array"){ 
			var local_is_valid = local_is_exist? _ct.indexOf(val_s,kv)>-1 : _ct.indexOf(val_s,kv)==-1;
			if( local_is_valid ){
				cnt++;
			}
		}
	});


if (cnt==0)
return false;
else
return cnt==_ct.count(val);
}
function where_loop_execution( jsn,whr,func,is_where ){
	var jsn_val={};

		var jsn_s=(_ct.count(jsn,true)==0)?((_ct.getTypeof(jsn)=="array")?jsn:[jsn]):jsn;
		var whr_s=whr||{};
		var variable=_ct.getJSONVariable(jsn);
		
		_ct.each(jsn_s,function(jk,jv){
		
			if(_ct.getTypeof(jsn)=="array"){
				filter = [jv];
			}else{
				var filter = {};
				filter[jk]=jv;
			}

			if(_ct.isExact(filter,whr_s,is_where)){
			
				_ct.append(variable,jv,jk);
				if(_ct.has(func)){
					func(jv,jk);
				}

			}
		});

		return variable;
}

_ct.where=function(jsn,whr,func){
	return where_loop_execution(jsn,whr,func,true);
};

_ct.where_not=function(jsn,whr,func){
	return where_loop_execution(jsn,whr,func,false);	  
};

_ct.group_count=function(jsn,val){

return main_helper.group("count",jsn,val);
}
_ct.group_content=function(jsn,val){

return main_helper.group("content",jsn,val);
}
_ct.count=function(jsn,bol){
	return main_helper.count(jsn,bol)
};	
	
_ct.getdata=function(jsn,split_str){

	return main_helper.getdata(jsn,split_str);
}
_ct.unserialize=function(data){
	return main_helper.unserialize(data);
}
_ct.limit=function(jsn,s1,s2,func){
	var cnt=0;
	var glo_jsn={};
	var glo_indtfd;
var s1_m=((!_ct.has(s1))?0:s1);
var s2_m=((!_ct.has(s2))?_ct.count(jsn):s2);
	_ct.each(jsn,function(i,m){
	if(cnt>=s1_m && cnt<=s2_m){
	glo_jsn[i]=m;
		if(_ct.has(func)){
		glo_indtfd=func(i,m);
		if(_ct.has(glo_indtfd))
		glo_jsn[i]=glo_indtfd;		
		};		
	}
	cnt++;
	});
	return glo_jsn;
}
_ct.to_array=function(nm){
	var return_val = nm;
	if(_ct.getTypeof(return_val) !="array"){ 
		return_val = [nm]

	}
	return return_val;

}
_ct.to_double=function(nm){

			return parseFloat(main_helper.dateEventFormat(/(\d\.)/g,0.00,(nm==null)?0:nm));

}
_ct.to_integer=function(nm){
		
		return parseInt(main_helper.dateEventFormat(/(\d)/g,0,(nm==null)?0:nm));

}
_ct.array_sum=function(arry,dlmtr){
		var sum=0;
		var arry_s=arry||[];
		var dlmtrs=dlmtr||3;
		_ct.each(arry_s,function(ak,av){
			if(_ct.has(av))
			sum+=parseFloat(av);
		});
	return sum.toFixed(dlmtrs);
}
_ct.remove=function(arry,kys){
	var type_js=_ct.getTypeof(arry);
	
	if(type_js==="array"){
		var reslt=[];
		_ct.each(arry,function(ak,av){
			if(_ct.indexOf(arry,kys)<0){
				reslt.push(av);	
			}
		});
		return reslt;	
	}else if(type_js==="json"){
		var reslt={};
		var jsn_vw=[];
		_ct.each(arry,function(ak,av){
			_ct.where(arry,kys,function(jk,jv){
				jsn_vw.push(jk);
			});
		});

		_ct.each(arry,function(ak,av){
			if(_ct.indexOf(jsn_vw,ak)<0){
				reslt[ak]=av;
			}
		});
		return reslt;
	}
}
_ct.shuffle=function(jsn){
			var output=jsn;
			if (_ct.indexOf(["array","json"],_ct.getTypeof(jsn))>-1) {
			var counts=_ct.count(jsn)-1;
			var randomIndex;
			var temporaryValue;
		
				for (var currentIndex=counts;currentIndex>0;currentIndex--) {
                    //code               
						randomIndex = Math.floor(Math.random() * currentIndex);						
					if(_ct.getTypeof(jsn)=="array"){
					
						temporaryValue = output[currentIndex];
						output[currentIndex]=output[randomIndex];
						output[randomIndex] = temporaryValue;			
				}
				}
            }
		return output;
}
_ct.range=function(max,min){
			var min_s=_ct.has(min)?min:0;
			var max_s=_ct.has(max)?max:10;
			var output=[];
			
			for (var i=min_s;i<=max_s;i++) {
              output.push(i);
            }
			return output;
}

_ct.money_in_words=function(nmb){
	if(!_ct.has(nmb) && _ct.getTypeof(nmb)!=="number")
	  return "zero";
				
	var main =new main_helper.main_utility(nmb);		
	var number_assign=main.separate_decimal()
	var number_s=number_assign.number;	
	var decimal_s=number_assign.decimal;	

	if (nmb===0)
	return "zero";

	if(decimal_s>0){
	return main_helper.in_number_specify(number_s)+" and "+main_helper.in_decimal_specify(decimal_s,0);
	}
	else{
	return main_helper.in_number_specify(number_s);
	}

}

function extend_route(){
    var var_location = location;

    this.get_protocol = function(){
        return var_location.protocol.replace(/(\:)/,"");

    }

    this.each = function(data,func){
     
        for(var i in data){
           
          
               var value = data[i];
             
                if(_ct.has(value,"route") && _ct.has(value,"function")){
                    func(value['route'],value['function']);
                }
           
        }

    }
     this.get_url_search=function(){

				var var_sn={};
				var glbl_vsn=var_location.search.substring(1,var_location.search.length).split("&");
				for(var f in glbl_vsn){
					
			if(typeof(glbl_vsn[f])!="function" && _ct.has(glbl_vsn[f])){
				try{
					var f1 = glbl_vsn[f].split("=");

				var_sn[f1[0]]=(typeof(f1[1])!="undefined")?f1[1]:"-";
			
				}catch(e){
					console.log(e)
				}}}
				return var_sn;

		}
        this.get_routes = function(){
			var val={};
				val['url']=var_location.protocol+"//"+var_location.host;
				val['protocol_noregexp']=var_location.protocol
				val['protocol']=this.get_protocol();

				val['search']=this.get_url_search();
				var oc=0;
				var modd=var_location.protocol+"//"+var_location.host+var_location.pathname;
				val['host_pathname']=modd;
                val['pathname']=modd;
				
			return val;
		}
}

var cls_extend_route = new extend_route();
init_route={
    Segment:function(config){
        if(_ct.getTypeof(config) != "array")
        return false;

        alert("Trial only");
       var routes = cls_extend_route.get_routes(); 
       cls_extend_route.each(config,function(k,v) {
           console.log(k);
       });
       
    },
    Lateral:function(config){
        if(_ct.getTypeof(config) != "array")
        return false;

        alert("Trial only");
        var routes = cls_extend_route.get_routes();
        cls_extend_route.each(config,function(k,v) {
            console.log(k);
       });
    },
    RegExp:function(config){
        if(_ct.getTypeof(config) != "array")
        return false;

        var routes = cls_extend_route.get_routes();
        cls_extend_route.each(config,function(k,v) {
           var reg=new RegExp(k);
			if(reg.test(routes.host_pathname)){
               v(routes);
            }
       });

    },
    Protocol:function(config){
       if(_ct.getTypeof(config) == "json"){
           var protocols = cls_extend_route.get_protocol()

           if(_ct.has(config,protocols))
           config[protocols]();

       }
    }


}




init_collection = {
		set:function(ky,val){
		if(!_ct.has(ps_glbl.global_setting))
	ps_glbl.global_setting={};
		try{	
			
			if(typeof(ky)!="object"){
			
		ps_glbl.global_setting[ky]=val;
		}
	else	
		ps_glbl.global_setting=ky;
	
	}
	catch(e){
	console.log("date can`t log");
		}	
	
		},
		insert:function(where,val){
			if(!_ct.has(ps_glbl.global_setting))
				ps_glbl.global_setting={};
				
			var ech=ps_glbl.global_setting;
			var vall=_ct.getdata(ech,where);
			if(_ct.has(val))
					_ct.insert(vall,val);
		},
		
		get:function(ky){
			try{
	
			if(_ct.has(ky)){
				var ech=ps_glbl.global_setting;
				var vall=_ct.getdata(ech,ky);	
			return vall;
			}else{
			return ps_glbl.global_setting;
			}
			
			}
			catch(e){
		
			}
		},
		remove:function(ky){
			var ech=ps_glbl.global_setting;
			var vall=_ct.getdata(ech,ky);
			if(_ct.has(vall)){
				var typ_js=_ct.getJSONVariable(vall);
				vall=typ_js;
			}
		},
		get_all:function(){
			
			return ps_glbl.global_setting;
		},
		get_list:function(){
			var cntn=[];
			_ct.each(ps_glbl.global_setting,function(k,v){
				cntn.push(k);
			});
			return cntn;
		
		},
		count:function(d){
			var cnt=0;
			this.each(d,function(){
				cnt++;
			});
				return cnt;
		},
		each:function(d,func){
			try{
		var ech=ps_glbl.global_setting;
		var vall=_ct.getdata(ech,d);	
		if(_ct.has(func)){
			
			_ct.each(vall,function(i,v){
			
				func(i,v);			
			});
		}else
			
		return vall;
		}
		catch(e){
			console.log(e);
		}	
		}
	};
	
		


var devnt_controller_event = [];

for (var i in devnt){
    var val_evnt = devnt[i];
    devnt_controller_event.push("ps_events:"+val_evnt)
}

var controller_library = (function(property){


    return {

    }    
})


init_controller = (function(inits,options){

function extend_controller(){
   this.main_init = inits;
    this.main_option = {};
    this.main_option['require']=[];
    this.main_option['events']={};
    this.default_options = function(option_var) {
        
        if(_ct.has(option_var) && _ct.getTypeof(option_var) == "json"){
      
            if(_ct.has(option_var,"require")){
                this.main_option['require'] = _ct.getTypeof(option_var['require']) == "array"?option_var['require']:[];

            }
            if(_ct.has(option_var,"events")){
                this.main_option['events'] = option_var['events']

            }

        }
    }
}
extend_controller.prototype.get_view = function(params,value) {
    var dom_list_view =  ct("dom","*[ps_controller= "+this.main_init+"] => *[ps_views]");
    extension_loader(dom_list_view).load_controller_module()
    dom_list_view.each(function(htm){
        var attr_view = ct("dom",htm).attr("ps_views");

        if(_ct.has(params,attr_view)){
            params[attr_view].call(htm);
        }
    })
}
extend_controller.prototype.get_event = function(params,value) {
    
    var dom_list_events =  ct("dom","*[ps_controller= "+this.main_init+"] => *["+devnt_controller_event.join(";")+"]"); 
    var main_init_controller = this.main_init;
    var list_event_dom = [];
    dom_list_events.each(function(htm){
        if(_ct.indexOf(list_event_dom,htm)==-1){

             var attr_events = ct("dom",htm).attr(devnt_controller_event);


        _ct.each(attr_events,function(kk,vv){

            var events_key = kk.split(":")
            var events_val = vv




                        ct("dom","*[ps_controller= "+main_init_controller+"]").delegate(events_key[1],htm,function(e){
                            extension_loader(this).load_controller_module()
                            if(_ct.has(params,events_val)) 
                            params[events_val].call(htm,e);
                        });
                

        })

          list_event_dom.push(htm);
        }
       
      
        
        
    
    })


}

extend_controller.prototype.get_even_dom = function(params,value) {
    


for(var i in this.main_option['events']){
 
    var val_func = this.main_option['events'][i]
     var attr_events = i.split(":");
     
     if(attr_events.length == 2){
         ct("dom","body").delegate(attr_events[1],attr_events[0],function(e){
             extension_loader(this).load_controller_module()
             params[val_func].call(this,e);
         });
     }
}

}
extend_controller.prototype.amd = function() {

    for(var i in this.main_option['require']){
        ct("require",this.main_option['require'][i],true);
    }
}
extend_controller.prototype.Load=  function(func){

    ps_core.dom_ready(function(){     
       func();
   });
}


var cls_extend_controller = new extend_controller(inits);
cls_extend_controller.default_options(options);
function controller(inits){

    this.dom_controller =  ct("dom","*[ps_controller= "+inits+"]");
   
    this.main_init = inits;
    
   
}

controller.prototype.Load=  function(scop){
    cls_extend_controller.amd();
   $scope = {}
   var uniq_controller = _ct.getUniq();
   var uni_scope = $scope[uniq_controller]={}
   var contoller_value = ps_glbl.controller_value[uniq_controller];
   var library = controller_library(this)
    scop(uni_scope,library);
    cls_extend_controller.Load(function() {


        cls_extend_controller.get_view(uni_scope,contoller_value);
        cls_extend_controller.get_event(uni_scope,contoller_value);
        cls_extend_controller.get_even_dom(uni_scope,contoller_value);
    });
   
};



if(ct("dom","*[ps_controller= "+inits+"]").getlength()>0){
init = new controller(inits);
 return init; 
}
else{
    console.log("controller does not exist");
    return null;
}
});
root.ct.Control = {
    "Routes":init_route,
    "Controller":init_controller,
	"Collection":init_collection
};

	document_ready_exist(function() {
		var event_list = ["click","mouseover","keyup","keypress"];
		ct("dom",document.body).on(event_list.join(","),function(e) {
			if (e.target){
				var elem_indexof = _ct.indexOf(ps_glbl.control.delegation_record_list,e.target);
				if(elem_indexof>-1){
					ps_glbl.control.delegation_record_list.splice(elem_indexof,1);
				}
			}
		});	
	});		})(window)
