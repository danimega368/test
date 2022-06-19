/**
 * Water Reflection
 * Copyright (c) 2013 Maxtecb (http://codecanyon.net/user/maxtecb)
 * Version: 1.0
 */
 ;(function($) 
 {
     $.fn.waterreflection = function(options)
     {
         if(!options)
         {
             return;
         }
         this.imgWidth=0;
         this.imgHeight=0;
         this.reflectionOpacity=0.8;
         this.waterColor="#103221";
         this.imgUrl="";
         this.interval=66;
         this.frameCount=15;
         this.waveLengthX=2;
         this.waveLengthY=6;
         this.canvasSupport=false;
         this.staticReflection=false;
         this.img=new Image();
         
         var maxFrame=100;		
         var jWF=this;
         if(options)
         {
             if(!options["imageUrl"])
             {
                 return;
             }
             try 
             {
                 document.createElement("canvas").getContext("2d");
                 this.canvasSupport=true;
             }
             catch(e)
             {
                 this.canvasSupport=false;
             }
             if(options["width"])
             {
                 try
                 {
                     this.imgWidth=parseInt(options["width"]);
                 }catch(e){}
             }
             if(options["height"])
             {
                 try
                 {
                     this.imgHeight=parseInt(options["height"]);
                 }catch(e){}
             }
             if(options["reflectionOpacity"])
             {
                 this.reflectionOpacity=options["reflectionOpacity"]*1;
             }
             if(options["reflectionOpacity"])
             {
                 this.waterColor=options["waterColor"];
             }
             if(options["interval"])
             {
                 try
                 {
                     this.interval=parseInt(options["interval"]);
                 }catch(e){}
             }
             if(options["waveLengthX"])
             {
                 try
                 {
                     this.waveLengthX=parseInt(options["waveLengthX"]);
                 }catch(e){}
             }
             if(options["waveLengthY"])
             {
                 try
                 {
                     this.waveLengthY=parseInt(options["waveLengthY"]);
                 }catch(e){}
             }
             if(options["frameCount"])
             {
                 try
                 {
                     this.frameCount=parseInt(options["frameCount"]);
                 }catch(e){}
             }
             if(options["staticReflection"])
             {
                 this.staticReflection=options["staticReflection"];
             }
             if(this.frameCount<5){this.frameCount=5;}
             if(this.frameCount>maxFrame){this.frameCount=maxFrame;}
             
             this.imgUrl=options["imageUrl"];
             this.img.onload = function()
             {
                 if(jWF.imgWidth==0)
                 {
                     jWF.imgWidth=this.width;
                 }
                 if(jWF.imgHeight==0)
                 {
                     if(jWF.canvasSupport)
                     {
                         jWF.imgHeight=this.height*1.8|0;
                     }
                     else
                     {
                         jWF.imgHeight=this.height;
                     }		
                 }
                 if(jWF.canvasSupport)
                 {
                     drawWF(jWF);
                 }
                 else
                 {
                     showWF(jWF);
                 }
                 ;
             }
             this.img.src=this.imgUrl;
         }
     }	
     
     var WFContainers;
     if(!WFContainers)
     {
         WFContainers=new Object();
     }
 
     recReflection=function(jWF,binaryData,w,h)
     {
         var waterOpacity = 1-jWF.reflectionOpacity;
         var r=parseInt('0x'+jWF.waterColor.substring(1,3))*waterOpacity;
         var g=parseInt('0x'+jWF.waterColor.substring(3,5))*waterOpacity;
         var b=parseInt('0x'+jWF.waterColor.substring(5,7))*waterOpacity;
         
         for(var wi=0;wi<w;wi++)
         {
             for(var hj=0;hj<h;hj++)
             {
                     var i=(hj*w+wi)*4;
                     binaryData[i + 0]=(binaryData[i + 0])*jWF.reflectionOpacity+r;
                     binaryData[i + 1]=(binaryData[i + 1])*jWF.reflectionOpacity+g;
                     binaryData[i + 2]=(binaryData[i + 2])*jWF.reflectionOpacity+b;
             }
         }
     }
     fcReflection=function(jWF,binaryData,binaryDataB,w,h)
     {
         for(var wi=0;wi<w;wi++)
         {
             for(var hj=0;hj<h;hj++)
             {
                 var i=(hj*w+wi)*4;
                 var wip=wi;
                 var wip=wi+Math.round((0.5+jWF.waveLengthX*(h-hj)/h)*Math.sin(2*Math.PI*(wi+jWF.currentFrame)/jWF.frameCount));
                 if(wip<0){wip=0;}
                 if(wip>=w){wip=w-1;}
                 var hjp=hj;
                 var hjp=hj+Math.round((0.5+jWF.waveLengthY*hj/h)*Math.sin(2*Math.PI*(hj+jWF.currentFrame)/jWF.frameCount));
                 if(hjp<0){hjp=0;}
                 if(hjp>=h){hjp=h-1;}
                 var oi=(hjp*w+wip)*4;
                 binaryDataB[i + 0]=binaryData[oi + 0];
                 binaryDataB[i + 1]=binaryData[oi + 1];
                 binaryDataB[i + 2]=binaryData[oi + 2];
             }
         }
     }
     showWF=function(jWF)
     {
         jWF.prepend('<div style="position:relative;margin:0px;padding:0px;border-width:0px;overflow:hidden;background:transparent;width:'+jWF.imgWidth+'px;height:'+jWF.imgHeight+'px"></div>');
         jQuery(jWF.children()[0]).append('<img src="'+jWF.imgUrl+'" style="position:absolute;left:0px;top:0px;" />');
     }
     drawWF=function(jWF)
     {
         jWF.prepend('<div style="position:relative;margin:0px;padding:0px;border-width:0px;overflow:hidden;background:transparent;width:'+jWF.imgWidth+'px;height:'+jWF.imgHeight+'px"></div>');
         jQuery(jWF.children()[0]).append('<img src="'+jWF.imgUrl+'" style="position:absolute;left:0px;top:0px;" />');
         var canvasId="WFCanvas"+Math.random().toString().substring(2,12);
         jWF.canvasId=canvasId;
         WFContainers[canvasId]=jWF;
         jQuery(jWF.children()[0]).append('<canvas id="'+canvasId+'" class="wfc" width="'+jWF.imgWidth+'" height="'+(jWF.imgHeight-jWF.img.height)+'" style="position:absolute;left:0px;top:'+jWF.img.height+'px;display:none;"></canvas>');
         var canvas = jQuery(jWF.children()[0]).children("canvas")[0];
         var ctx = canvas.getContext("2d");
     ctx.save();
         ctx.translate(0,jWF.img.height);
     ctx.scale(1,-1);
     ctx.drawImage(jWF.img,0,0);
     ctx.restore();
     if(jWF.reflectionOpacity<1)
     {
             var canvasData = ctx.getImageData(0,0,canvas.width,canvas.height);
             var binaryData = canvasData.data;
         recReflection(jWF,binaryData,canvas.width,canvas.height);
             ctx.putImageData(canvasData,0,0);
     }
 
        jWF.currentFrame=0;
        
        if(jWF.staticReflection)
        {
            jQuery(canvas).show();
        }   	
        else
        {
         setTimeout('WFRun("'+canvasId+'")',jWF.interval);
     }	
     }
     WFRun=function(canvasId)
     {
         var jWF=WFContainers[canvasId];
         var canvas=document.getElementById(canvasId);
 
         var canvasList=jWF.find(".wfc");
         jQuery(canvasList[jWF.currentFrame]).hide();
         if(jWF.currentFrame>=jWF.frameCount)
         {
             jWF.currentFrame=0;
         }
         jWF.currentFrame=jWF.currentFrame+1;
         if(canvasList.length<=jWF.currentFrame)
         {
             canvasList[jWF.currentFrame]=jQuery(canvas).clone(true).insertAfter(canvasList[canvasList.length-1])[0];
             jQuery(canvasList[jWF.currentFrame]).attr("id",canvasId+"_"+jWF.currentFrame);
             var canvasB=canvasList[jWF.currentFrame];
             var ctxB=canvasB.getContext("2d");
             var ctx = canvas.getContext("2d");
             var canvasData = ctx.getImageData(0,0,canvas.width,canvas.height);
             var binaryData = canvasData.data;
             ctxB.putImageData(canvasData,0,0);
             var canvasDataB = ctxB.getImageData(0,0,canvasB.width,canvasB.height);
             var binaryDataB = canvasDataB.data;
         fcReflection(jWF,binaryData,binaryDataB,canvas.width,canvas.height);
             ctxB.putImageData(canvasDataB,0,0);
         }
         jQuery(canvasList[jWF.currentFrame]).show();
         
     setTimeout('WFRun("'+canvasId+'")',jWF.interval);
     }
     
 })(jQuery);