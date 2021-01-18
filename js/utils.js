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
	
}