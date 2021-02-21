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
	 * 通过刷新当前登录用户的信息
	 * @return {Object} 
	 */
	refreshCurrentUser: function(newCurrentUser){
		var str = JSON.stringify(newCurrentUser)
		plus.storage.removeItem("currentUser");
		plus.storage.setItem("currentUser",str);
	},
	
	/**
	 * 将好友列表存到本地
	 * @return {Object} 
	 */
	setFriendList: function(friendList){
		var str = JSON.stringify(friendList)
		plus.storage.removeItem("friendList");
		plus.storage.setItem("friendList",str);
	},
	
	/**
	 * 读取好友列表
	 * @return {Object} 
	 */
	 getFriendList: function(){
		return JSON.parse(plus.storage.getItem("friendList"));
	},
	
	
	/**
	 * 和后端的枚举对应
	 */
	CONNECT: 1, 	// 第一次(或重连)初始化连接
	CHAT: 2, 		// 聊天消息
	SIGNED: 3, 		// 消息签收
	KEEPALIVE: 4, 	// 客户端保持心跳
	PULL_FRIEND:5,	// 重新拉取好友
	
	/**
	 * 和后端的 ChatMsg 聊天模型对象保持一致
	 * @param {Object} senderUsername
	 * @param {Object} recipientUsername
	 * @param {Object} msg
	 * @param {Object} msgId
	 */
	ChatMsg: function(senderUsername, recipientUsername, msg, msgId){
		this.senderUsername = senderUsername;
		this.recipientUsername = recipientUsername;
		this.msg = msg;
		this.id = msgId;
	},
	
	/**
	 * 构建消息 DataContent 模型对象
	 * @param {Object} action
	 * @param {Object} chatMsg
	 * @param {Object} extand
	 */
	DataContent: function(action, chatMsg, extand){
		this.action = action;
		this.chatMsg = chatMsg;
		this.extand = extand;
	},
	
	/**
	 * 单个聊天记录的对象
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} flag
	 */
	ChatHistory: function(myId, friendId, msg, flag){
		this.myId = myId;
		this.friendId = friendId;
		this.msg = msg;
		this.flag = flag;
	},
	
	/**
	 * 快照对象
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} isRead	用于判断消息是否已读还是未读
	 */
	ChatSnapshot: function(myId, friendId, msg, isRead){
		this.myId = myId;
		this.friendId = friendId;
		this.msg = msg;
		this.isRead = isRead;
	}
	
}