/**
 * <h4><b>工具类</b></h4>
 * 	<b>Date：</b> 2014-10-27<br>
 * 	<b>Modify:</b> 2014-11-12<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 * @module function
 * @class pubFun
 * @since 1.0.0
 * @requires jquery-2.1.1.js
 * @constructor
 * @example
 *	pubFun.function([object]);
 */
var pubFun={
	/**
	 * ajax请求方法
	 * @method ajax
	 * @async
	 * @param {object} _object_par 请求参数
	 * 	@param {string} _object_par.url 请求连接
	 * 	@param {string} [_object_par.ct='application/x-www-form-urlencoded'] 提交内容编码类型
	 * 	@param {string} [_object_par.type='post'] 请求类型
	 * 	@param {object} [_object_par.data] 请求参数
	 * 	@param {string} [_object_par.dt='jsonp'] 返回参数类型
	 * 	@param {boolean} [_object_par.pd=true] 如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
	 * 	@param {function} [_object_par.bes] 请求前回调函数
	 * 	@param {function} [_object_par.cpl] 请求后回调函数
	 * 	@param {function} [_object_par.suc] 请求成功回调函数
	 * 	@param {function} [_object_par.err] 请求失败回调函数
	 * @example
	 * 	pubFun.ajax({
	 * 		url:'login/validat',
	 * 		data:{
	 * 			name:'yourName',
	 * 			password:'yourPwd'
	 * 		},suc:function(_data){
	 * 			if(undefined!==_data){
	 * 				console.log('success: ','login success!');
	 * 			}else{
	 * 				console.log('success: ','login error!');
	 * 			}
	 * 		},err:function(_data){
	 * 			console.log('error: ',_data);
	 * 		}
	 * 	});
	 */
	ajax:function(_object_par){
		var object_par={
			pd:true,
			ct:'application/x-www-form-urlencoded',
			type:'post',
			dt:'jsonp',
			bes:function(){},
			suc:function(){},
			err:function(){},
			cpl:function(){}
		};
		_object_par=$.extend({},object_par,_object_par);
		if(_object_par.pd){
			object_par={_n:$.now()};
			if('jsonp'==_object_par.dt){
				object_par.getType='jsonp';
			}
			_object_par.data=$.extend({},object_par,_object_par.data);
		}else{
			_object_par.url=_object_par.url+'?_n='+$.now();
		}
		object_par=null;
		$.ajax({
			url:_object_par.url,
			data:_object_par.data,
			type:_object_par.type,
			error:_object_par.err,
			success:_object_par.suc,
			dataType:_object_par.dt,
			complete:_object_par.cpl,
			beforeSend:_object_par.bes,
			processData:_object_par.pd,
			contentType:_object_par.ct
		});
	},
	/**
	 * 格式化时间
	 * @method dateformat
	 * @param {int} _int_timestamp 时间戳
	 * @param {string} [_string_format] 时间格式('yyyy-MM-dd HH:mm:ss.S')
	 * @return {string} 格式化后时间默认'2000-01-01 00:00:00.0'
	 * @example
	 * 	var string_date=pubFun.dateformat(new Date().getTime(),'yyyy-MM-dd HH:mm:ss.S');
	 *	console.log('out: ',string_date);
	 * 	log(string_date);
	 *
	 * 	var string_date=pubFun.dateformat($.now(),'yyyy-MM-dd HH:mm:ss.S');
	 *	console.log('out: ',string_date);
	 * 	log(string_date);
	 */
	dateformat:function(_int_timestamp,_string_format){
		_int_timestamp=new Date(_int_timestamp);
		var object_date={
			'M+':_int_timestamp.getMonth()+1,
			'd+':_int_timestamp.getDate(),
			'H+':_int_timestamp.getHours(),
			'm+':_int_timestamp.getMinutes(),
			's+':_int_timestamp.getSeconds(),
			'q+':Math.floor((_int_timestamp.getMonth()+3)/3),
			'S':_int_timestamp.getMilliseconds()
		};
		if(!_string_format){
			_string_format='yyyy-MM-dd HH:mm:ss.S';
		}
		if(/(y+)/.test(_string_format)){
			_string_format=_string_format.replace(
				RegExp.$1,
				(_int_timestamp.getFullYear()+'').substr(4-RegExp.$1.length)
			);
		}
		for(var key in object_date){
			if(new RegExp("("+key+")").test(_string_format)){
				_string_format=_string_format.replace(
					RegExp.$1,
					RegExp.$1.length==1?object_date[key]:('00'+object_date[key]).substr((''+object_date[key]).length)
				);
			}
		}
		return _string_format;
	},
	/**
	 * 加载页面
	 * @method load
	 * @async
	 * @param {object} _object_par 请求参数 
	 * 	@param {string} _object_par.url 请求连接
	 * 	@param {object} [_object_par.data] 请求参数
	 * 	@param {function} [_object_par.bes] 请求前回调函数
	 * 	@param {function} [_object_par.cpl] 请求后回调函数
	 * 	@param {function} [_object_par.suc] 请求成功回调函数
	 * 	@param {function} [_object_par.err=null] 请求失败回调函数
	 */
	load:function(_object_par){
		_object_par=$.extend({},{
			data:{_date:$.now()},
			bes:function(){},
			suc:function(){},
			err:null,
			cpl:function(){}
		},_object_par);
		$.ajax({
			type:'get',
			url:_object_par.url,
			data:_object_par.data,
			beforeSend:_object_par.bes,
			complete:_object_par.cpl,
			success:_object_par.suc,
			error:function(_data){
				if(!$.isFunction(_object_par.err)){
					console.log('404 无法找到内容！');
				}
			}
		});
	},
	/**
	 * String转Json对象
	 * @method toJson
	 * @param {string} _string_json Json字符串
	 * @return {array|object} Json对象
	 * @example
	 * 	var object_json=pubFun.toJson('[{key:"1",value:"a"},{key:"2",value:"b"}]');
	 *	console.log('out: ',object_json);
	 * 	log(object_json);
	 *
	 * 	object_json=pubFun.toJson('[{"key":"1","value":"a"},{"key":"2","value":"b"}]');
	 *	console.log('out: ',object_json);
	 * 	log(object_json);
	 */
	toJson:function(_string_json){
		return new Function('return '+_string_json)();
	},
	/**
	 * 获取URL参数
	 * @method urlParam
	 * @param {object} _obj_par 参数对象
	 * 	@param {string} _obj_par.url 链接
	 * 	@param {string} _obj_par.key 获取键
	 * @return {string} 键值
	 * @example 
	 * 	var string_val=pubFun.urlParam({url:'http://www.baidu.com/s?ie=utf-8&f=8',key:'ie'});
	 * 	console.log('out: ',string_val); //out: utf-8
	 * 	log(string_val);
	 */
	urlParam:function(_obj_par){
		var object_reg = new RegExp("(^|&)" + _obj_par.key + "=([^&]*)(&|$)");
		var string_param = _obj_par.url.substr(_obj_par.url.indexOf('?')+1);
		string_param = string_param.match(object_reg);
		object_reg=null;
		return string_param!=null?unescape(string_param[2]):'';
	}
};