window.utils = {
	/**
	 * 判断字符串是否为不为空
	 * @param {Object} str
	 * true：不为空
	 * false：为空
	 */
	isNotNull: function(str) {
		if (str != null && str != "" && str != undefined) {
			return true;
		}
		return false;
	},
	/**
	 * 判断字符串是否为空
	 * @param {Object} str
	 * true：为空
	 * false：不为空
	 */
	isNull: function(str) {
		if (str == null || str == "" || str == undefined) {
			return true;
		}
		return false;
	},
	/**
	 * 调用手机设备原生的消息提示框
	 * @param {Object} str

	 */
	popUpToast: function(msg) {
		plus.nativeUI.toast(msg, {verticalAlign:"center"});
		
	},
	/**
	 * 将当期登录用户添加到缓存中去,storge存储是以字符串格式来存的，需要先转换成字符串，
	 * 如果以对象存进去，会获取不到值
	 * @param {Object} 
	
	 */
	setCurrentUser: function(currentUser) {
		var str = JSON.stringify(currentUser)
		plus.storage.setItem("currentUser",str);
		// plus.storage.setItem("currentUser",currentUser);
	},
	/**
	 * 获得当前登录用户
	 * @return {Object} 
	
	 */
	getCurrentUser: function() {
		var str= plus.storage.getItem("currentUser")
		return JSON.parse(str);
	},
	/**
	 * 通过缓存重新登录
	 * @return {Object} 
	
	 */
	reLoginByStorage:function(){
		var currentUser = utils.getCurrentUser();
		if(currentUser!=null){
			mui.openWindow("index.html");
		}
	},
	/**
	 * 通过缓存重新登录
	 * @return {Object} 
	
	 */
	logOut:function(){
		mui.confirm("是否退出当前登录用户", "系统提示",['取消','确认'],function (e) {
			if(e.index==1){//'取消'按钮下标为1.确认按钮下标为2
				plus.storage.clear();
				mui.openWindow("login.html");
			}
			
		},'div')
	}
	
}