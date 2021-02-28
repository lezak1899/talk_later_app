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
	 * 根据用户id，从本地的缓存（联系人列表）中获取朋友的信息
	 */
	getFriendFromFriendList: function(friendUsername) {
		var FriendListStr = plus.storage.getItem("friendList");
		
		// 判断contactListStr是否为空
		if (this.isNotNull(FriendListStr)) {
			// 不为空，则把用户信息返回
			var friendList = JSON.parse(FriendListStr);
			for (var i = 0 ; i < friendList.length ; i ++) {
				var friend = friendList[i];
				if (friend.friendUsername == friendUsername) {
					return friend;
					break;
				}
			}
		} else {
			// 如果为空，直接返回null
			return null;
		}
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
	 * 保存用户的聊天记录,单条保存
	 * @param {Object} myUsername
	 * @param {Object} friendUsername
	 * @param {Object} msg
	 * @param {Object} flag	判断本条消息是我发送的，还是朋友发送的，1:我  2:朋友
	 */
	saveUserChatHistory: function(myUsername, friendUsername, msg, flag) {
		var me = this;//me指向utils对象
		var chatKey = "chat-" + myUsername + "-" + friendUsername;
		
		// 从本地缓存获取聊天记录是否存在
		var chatHistoryListStr = plus.storage.getItem(chatKey);
		var chatHistoryList;
		if (me.isNotNull(chatHistoryListStr)) {
			// 如果不为空
			chatHistoryList = JSON.parse(chatHistoryListStr);
		} else {
			// 如果为空，赋一个空的list
			chatHistoryList = [];
		}
		
		// 构建聊天记录对象
		var singleMsg = new me.ChatHistory(myUsername, friendUsername, msg, flag);
		
		// 向list中追加msg对象
		chatHistoryList.push(singleMsg);
		
		plus.storage.setItem(chatKey, JSON.stringify(chatHistoryList));
	},
	
	/**
	 * 获取用户聊天记录
	 * @param {Object} myUsername
	 * @param {Object} friendUsername
	 */
	getUserChatHistory: function(myUsername, friendUsername) {
		var me = this;
		var chatKey = "chat-" + myUsername + "-" + friendUsername;
		var chatHistoryListStr = plus.storage.getItem(chatKey);
		var chatHistoryList;
		if (me.isNotNull(chatHistoryListStr)) {
			// 如果不为空
			chatHistoryList = JSON.parse(chatHistoryListStr);
		} else {
			// 如果为空，赋一个空的list
			chatHistoryList = [];
		}
		
		return chatHistoryList;
	},
	
	// 删除我和朋友的聊天记录
	deleteUserChatHistory: function(myUsername, friendUsername) {
		var chatKey = "chat-" + myUsername + "-" + friendUsername;
		plus.storage.removeItem(chatKey);
	},
	
	/**
	 * 单个聊天记录的对象
	 * @param {Object} myUsername
	 * @param {Object} friendUsername
	 * @param {Object} msg
	 * @param {Object} flag,1表示是我发送的，2表示是朋友发送的
	 */
	ChatHistory: function(myUsername, friendUsername, msg, flag){
		this.myUsername = myUsername;
		this.friendUsername = friendUsername;
		this.msg = msg;
		this.flag = flag;
	},
	
	
	/**
	 * 聊天记录的快照，仅仅保存每次和朋友聊天的最后一条消息
	 */
	saveUserChatSnapshot: function(myUsername, friendUsername, msg, isRead) {
		var me = this;//指向utils对象
		var chatKey = "chat-snapshot" + myUsername;
		
		// 从本地缓存获取聊天快照的list
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			// 如果不为空
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			// 循环快照list，并且判断每个元素是否包含（匹配）friendUsername，如果匹配，则删除
			for (var i = 0 ; i < chatSnapshotList.length ; i ++) {
				if (chatSnapshotList[i].friendUsername == friendUsername) {
					// 删除已经存在的friendUsername所对应的快照对象
					chatSnapshotList.splice(i, 1);
					break;
				}
			}
		} else {
			// 如果为空，赋一个空的list
			chatSnapshotList = [];
		}
		
		
		// 构建聊天快照对象
		var singleMsg = new me.ChatSnapshot(myUsername, friendUsername, msg, isRead);
		
		// 向list中追加快照对象
		chatSnapshotList.unshift(singleMsg);
		
		plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
	},
	
	/**
	 * 删除本地的聊天快照记录
	 * @param {Object} myUsername
	 * @param {Object} friendUsername
	 */
	deleteUserChatSnapshot: function(myUsername, friendUsername) {
		var me = this;
		var chatKey = "chat-snapshot" + myUsername;
		
		// 从本地缓存获取聊天快照的list
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			// 如果不为空
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			// 循环快照list，并且判断每个元素是否包含（匹配）friendId，如果匹配，则删除
			for (var i = 0 ; i < chatSnapshotList.length ; i ++) {
				if (chatSnapshotList[i].friendUsername == friendUsername) {
					// 删除已经存在的friendId所对应的快照对象
					chatSnapshotList.splice(i, 1);
					break;
				}
			}
		} else {
			// 如果为空，不做处理
			return;
		}
		
		plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
	},
	
	/**
	 * 获取用户快照记录列表
	 */
	getUserChatSnapshot: function(myUsername) {
		var me = this;
		var chatKey = "chat-snapshot" + myUsername;
		// 从本地缓存获取聊天快照的list
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			// 如果不为空
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
		} else {
			// 如果为空，赋一个空的list
			chatSnapshotList = [];
		}
		
		return chatSnapshotList;
	},
	/**
	 * 标记未读消息为已读状态
	 * @param {Object} myId
	 * @param {Object} friendId
	 */
	readUserChatSnapshot: function(myUsername, friendUsername) {
		var me = this;
		var chatKey = "chat-snapshot" + myUsername;
		// 从本地缓存获取聊天快照的list
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			// 如果不为空
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			// 循环这个list，判断是否存在好友，比对friendUsername
			// 如果有，在list中的原有位置删除该 快照 对象，然后重新放入一个标记已读的快照对象
			for (var i = 0 ; i < chatSnapshotList.length ; i++) {
				var item = chatSnapshotList[i];
				if (item.friendUsername == friendUsername) {
					item.isRead = true;		// 标记为已读
					chatSnapshotList.splice(i, 1, item);	// 替换原有的快照
					break;
				}
			}
			// 替换原有的快照列表
			plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
		} else {
			// 如果为空
			return;
		}
	},
	
	/**
	 * 快照实体对象，isRead为false表示未读 ，为true表示已读
	 */
	ChatSnapshot: function(myUsername, friendUsername, msg, isRead){
		this.myUsername = myUsername;
		this.friendUsername = friendUsername;
		this.msg = msg;
		this.isRead = isRead;
	}
	
}