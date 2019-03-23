/************************************************************************************************
* Editor for multisemiotic text production, dealing with multidevice and multimodal interaction *
*																							    *
* Copyright (C) see <link para equipe>														    *
*																							    *
* This program is free software; you can redistribute it and/or                                 *
* modify it under the terms of the GNU General Public License                                   *
* as published by the Free Software Foundation; either version 2                                *
* of the License, or (at your option) any later version.									    *
*																						        *
* This program is distributed in the hope that it will be useful,                               *
* but WITHOUT ANY WARRANTY; without even the implied warranty of                                *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                 *
* GNU General Public License for more details.                                                  *
*																							  	*
* You should have received a copy of the GNU General Public License								*
* along with this program.  If not, see <https://www.gnu.org/licenses/gpl-2.0.html>.			*
************************************************************************************************/
		var key=false;
		var keybox=false;
		var draw=false;

		var move=false;
		var del=false;

		var touch=false;

		var negrito=false;
		var sublinhado=false;
		var italico=false;

		var fonts = [
			"Arial",
			"Comic Sans",
			"Georgia",
			"Impact",
			"Lucida",
			"Lucidasans",
			"Monospace",
			"Opendys Lexic",
			"Palatino",
			"Sansserif",
			"Serif",
			"Symbol",
			"Tahoma",
			"Times New Roman",
			"Trebuchet",
			"Verdana",
			"Webdings",
			"Wingdings",
		];

		(function(){
			var ulFonts = document.getElementById("font-family");
			fonts.forEach(font => {
				var id = font.replace(/[\s]/g,"").toLocaleLowerCase();
				var li = document.createElement("li");
				var liA = document.createElement("a");
				liA.setAttribute("href", "javascript:setFontText('"+id+"','"+font+"');");
				liA.setAttribute("id", id);
				liA.append(font);
				li.appendChild(liA);
				ulFonts.appendChild(li);
			});
		})();
		// Adicionar espessura da linha
		(function(){
			var lineWeightDropdown = document.getElementById("line-weight");
			for(i=1;i<=10;i++){
				var li = document.createElement("li");
				var liA = document.createElement("a");
				var liDiv = document.createElement("div");
				liA.setAttribute("href", "javascript:setWidth("+i+");");
				liA.setAttribute("title", ""+i+"px");
				if(i<10){
					liA.setAttribute("id", "line0"+i);
					liDiv.setAttribute("class", "line");
					liDiv.style.height = i+"px";
				}
				else{
					liA.setAttribute("id", "line"+i)
					liDiv.setAttribute("class", "line");
					liDiv.style.height = i+"px";
				}
				liA.appendChild(liDiv);
				li.appendChild(liA); 
				lineWeightDropdown.appendChild(li);
			}
		})();
		// Adicionar tamanho da fonte
		(function(){
			var textSize = document.getElementById("text-size");
			for(i=10;i<=48;){
				var li = document.createElement("li");
				var liA = document.createElement("a");
				liA.setAttribute("href", "javascript:setSizeText("+i+");");
				liA.setAttribute("id", "tamanho"+i);
				liA.setAttribute("class", "tamanho");
				liA.append(i);
				li.appendChild(liA); 
				textSize.appendChild(li);
				i += 2;
			}
		})();

		$( document ).ready(function(){

			$("#habFont").hide("slow");   	  
			$("#habEstilo").hide("slow"); 	  
			$("#habMedida").hide("slow"); 	  
			$("#habOpcao").hide("slow");  	  
			$("#habMedidaSpan").hide("slow"); 
			$("#habFontSpan").hide("slow");   

			var linha = document.getElementById("line03");

			$("#linha").html(linha);

			$("#medida").html("20");

			$("#font").html("Arial");

			document.getElementById("draw").className = "btn btn-default";

	//======================================================================================

			$("#negrito").click(function(){
				if(negrito==false){
					document.getElementById("negrito").className = "btn btn-default";
					document.getElementById("negrito").href = "javascript:setStrokeText();";
					negrito=true;
				}else{
					document.getElementById("negrito").className = "buttonToolbar";
					negrito=false;
				}
			});

			$("#sublinhado").click(function(){
				if(sublinhado==false){
					document.getElementById("sublinhado").className = "btn btn-default";
					document.getElementById("sublinhado").href = "javascript:setDecoration();";
					sublinhado=true;
				}else{
					document.getElementById("sublinhado").className = "buttonToolbar";
					sublinhado=false;
				}
			});

			$("#italico").click(function(){
				if(italico==false){
					document.getElementById("italico").className = "btn btn-default";
					document.getElementById("italico").href = "javascript:setStyle();";
					italico=true;
				}else{
					document.getElementById("italico").className = "buttonToolbar";
					italico=false;
				}
			});

	//======================================================================================

			$("#move").click(function(){

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				if(move==false){
					document.getElementById("move").className = "btn btn-default";
					document.getElementById("move").href = "javascript:moveIt();";
					move=true;
				}else{
					document.getElementById("move").className = "desabilitado";
					document.getElementById("move").href = "javascript:desabilitado();";
					move=false;
				}

				$("#paletaCores").hide("slow");    
				$("#habOpcao").hide("slow");       
				$("#habMedida").hide("slow");      
				$("#habFont").hide("slow");        
				$("#habEstilo").hide("slow");      
				$("#habEspessSpan").hide("slow");  
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#habEspess").hide("slow");      

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#delete").click(function(){

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				if(del==false){
					document.getElementById("delete").className = "btn btn-default";
					document.getElementById("delete").href = "javascript:deleteIt();";
					del=true;
				}else{
					document.getElementById("delete").className = "desabilitado";
					document.getElementById("delete").href = "javascript:desabilitado();";
					del=false;
				}

				$("#paletaCores").hide("slow");    
				$("#habOpcao").hide("slow");       
				$("#habMedida").hide("slow");      
				$("#habFont").hide("slow");        
				$("#habEstilo").hide("slow");      
				$("#habEspessSpan").hide("slow");  
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#habEspess").hide("slow");      

				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#menu-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled");
			});

			$("#touch").click(function(){
				if(touch==false){
					document.getElementById("touch").className = "btn btn-default";
					document.getElementById("touch").href = "javascript:device();";
					touch=true;
				}else{
					document.getElementById("touch").className = "desabilitado";
					touch=false;
				}
			});

	//======================================================================================

			$("#keyboard").click(function(){

				$("#habFont").show("slow");   	   
				$("#habEstilo").show("slow"); 	   
				$("#habMedida").show("slow"); 	   
				$("#habFontSpan").show("slow");    
				$("#habMedidaSpan").show("slow");  
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").hide("slow");  
				$("#habEspess").hide("slow"); 	   
				$("#habOpcao").hide("slow");  	   

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				if(key==false){
					document.getElementById("keyboard").className = "btn btn-default";
					document.getElementById("keyboard").href = "javascript:createWrite();";
					key=true;
				}else{
					document.getElementById("keyboard").className = "buttonToolbar";
					document.getElementById("keyboard").href = "javascript:desabilitado();";
					key=false;
				}

				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("delete").className = "desabilitado";
				del=false;
			});

			$("#keybox").click(function(){

				$("#habFont").show("slow");   	   
				$("#habEstilo").show("slow"); 	   
				$("#habMedida").show("slow"); 	   
				$("#habFontSpan").show("slow");    
				$("#habMedidaSpan").show("slow");  
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").hide("slow");  
				$("#habEspess").hide("slow"); 	   
				$("#habOpcao").hide("slow");  	   

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("delete").className = "desabilitado";
				del=false;

				document.getElementById("keybox").href = "javascript:createBoxText();";

			});

			$("#draw").click(function(){
				$("#habFont").hide("slow");   	   
				$("#habEstilo").hide("slow"); 	   
				$("#habMedida").hide("slow");	   
				$("#habOpcao").hide("slow"); 	   
				$("#habMedidaSpan").hide("slow");  
				$("#habFontSpan").hide("slow");    
				$("#paletaCores").show("slow");    
				$("#habEspessSpan").show("slow");  
				$("#habEspess").show("slow"); 	   

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				if(draw==false){
					document.getElementById("draw").className = "btn btn-default";
					document.getElementById("draw").href = "javascript:createDraw();";
					draw=true;
				}else{
					document.getElementById("draw").className = "buttonToolbar";
					document.getElementById("draw").href = "javascript:desabilitado();";
					draw=false;
				}

				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("delete").className = "desabilitado";
				del=false;

			});

			$("#geometricshapes").click(function(){
				$("#habFont").hide("slow");   	  
				$("#habEstilo").hide("slow"); 	  
				$("#habMedida").hide("slow"); 	  
				$("#habMedidaSpan").hide("slow"); 
				$("#habFontSpan").hide("slow");   
				$("#paletaCores").show("slow");   
				$("#habEspess").show("slow"); 	  
				$("#habOpcao").show("slow"); 	  
				$("#habEspessSpan").show("slow"); 
			});

			$("#drop").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				document.getElementById("drop").href = "javascript:createPonto();";

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#circle").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				document.getElementById("circle").href = "javascript:createCircle();";

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#square").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				document.getElementById("square").href = "javascript:createRectangle();";

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#ellipse").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("line").className = "desabilitado";

				document.getElementById("ellipse").href = "javascript:createEllipse();";

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#line").click(function(){
				var img = $(this).find("img").clone();
				$("#selecionado").html(img);

				document.getElementById("circle").className = "desabilitado";
				document.getElementById("drop").className = "desabilitado";
				document.getElementById("square").className = "desabilitado";
				document.getElementById("ellipse").className = "desabilitado";

				document.getElementById("line").href = "javascript:createLine();";

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;
				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;
			});

			$("#inputFile").click(function(){
				$("#habOpcao").hide("slow");  

				document.getElementById("delete").className = "desabilitado";
				del=false;
				document.getElementById("move").className = "desabilitado";
				move=false;

				document.getElementById("keyboard").className = "buttonToolbar";
				key=false;
				document.getElementById("draw").className = "buttonToolbar";
				draw=false;

				document.getElementById("negrito").className = "buttonToolbar";
				negrito=false;
				document.getElementById("sublinhado").className = "buttonToolbar";
				sublinhado=false;
				document.getElementById("keybox").className = "buttonToolbar";
				keybox=false;
				document.getElementById("italico").className = "buttonToolbar";
				italico=false;
			});
			
		})