/**
 * <h4><b>工具类</b></h4>
 * 	<b>Date：</b> 2014-10-27<br>
 * 	<b>Modify:</b> 2015-03-02<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 * @module function
 * @class pubFun
 * @since 1.1.0
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
			url:pubParma.url+_object_par.url,
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
		_int_timestamp=object_date=null;
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
	 * @example
	 * 	pubFun.load({url:'test.html',suc:function(_data){
	 * 		$('body>.page').html(_data);
	 * 	}});
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
	},
	/**
     * md5加密
     * @method md5
     * @param {object} _string_val 参数对象
     * @return {string} 返回值
     * @example
     * 	var string_val=pubFun.md5('123456');
     *  console.log('out: ',string_val); //out: utf-8
     *  log(string_val);
     */
    md5:function(_string_val){
        var hexcase=0;
        function md5(a){ if(a=="") return a; return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return sx_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
		return md5(_string_val);
	}
};