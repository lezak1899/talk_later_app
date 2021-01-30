window.myCropper = {
	// var canvas = document.createElement('canvas');
	
	
	
	
	
	cutToSquare: function(img) {//截取一个正方形的图片
	
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');//指定了二维绘图
		var width = img.width;
		var height= img.height;
		var index_x_start=0;
		var index_y_start=0
		var index_x_end=0;
		var index_y_end=0;
		var maxSize=0; //长边
		var minSize=0;//短边
		// var base64_img="";
		//护短解截取
		if(height>=width){
			minSize = width;
			maxSize = height;
			index_x_start=0;
			index_y_start=(maxSize/2)-(minSize/2);
			index_x_end=minSize;
			index_y_end=(maxSize/2)+(minSize/2);
			console.log("高长")
		}else{
			minSize = height;
			maxSize = width;
			index_x_start=(maxSize/2)-(minSize/2);
			index_y_start=0;
			index_x_end=(maxSize/2)+(minSize/2);
			index_y_end=minSize;
			console.log("宽长")
			
		}
		canvas.style.width=minSize+"px";
		canvas.style.height=minSize+"px";
		// //如果大于800，进行压缩
		// if(size>800){zheshiyhsoyjiandande1xiaoqiange,rnawoozheshanxiangnishi    
		// 	size=800;
		// }
		// 清除画布
		context.clearRect(0, 0, minSize, minSize);
		//将图片渲染到画板上
		// context.drawImage(img, 0, 0, maxSize, maxSize);
		context.drawImage(img,index_x_start,index_y_start,minSize,minSize,0,0,minSize,minSize); 
		//设定裁剪区
		// context.rect(index_x_start,index_y_start,index_x_end,index_y_end);
		// console.log("index_x_start"+index_x_start+"index_y_start"+index_y_start+"index_x_end"+index_x_end+"index_y_end"+index_y_end);
		// //进行裁剪
		// context.clip();
		
		var newImg = canvas.toDataURL("image/png");
		
		
		// context.drawImage(newImg, 0, 0, minSize, minSize);
		// console.log("裁剪结束1，with="+img.width+",heigth="+img.height);
		// var newImg2 = canvas.toDataURL("image/png");
		 
		return newImg;
	
		//转换为base64格式，并且mimeType表示canvas导出来的base64图片的类型，默认是png格式，
		//qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92
		// base64_img =  canvas.toDataURL(mimeType, qualityArgument);

		// return base64_img;
	},
	//压缩正方形的图片
	compress:function(img,size){
		
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');//指定了二维绘图
	
		var width = img.width;
		var height= img.height;
		//如果不是正方形的图片直接返回
		if(width!=height){return ;}
		// 清除画布
		context.clearRect(0, 0, width, height);
		// 图片压缩
		context.drawImage(img, 0, 0, size, size);		
	}
	
}







