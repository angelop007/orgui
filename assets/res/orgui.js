/**
 * UI 控件库
 * @module UI(User Interface Controls)
 * @requires jquery-2.1.1.js
 * @requires bootstrap-3.2.css
 * @requires bootstrap-3.2.js
 * @requires font-awesome-4.2.css
 * @requires orgui-1.0.css
 */
/**
 * <h3>CheckBox</h3>
 * 	<b>Date:</b> 2014-10-27<br>
 * 	<b>Modify:</b> 2014-11-12<br>
 * 	<b>Pen:</b> angelop007@gmail.com
 *	<script>
 *	$(function(){
 *		$("div#method_checkUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-check":"check1"})
 *			).append("<br>").append(
 *				$("<div>",{"data-check":"check2"})
 *			)
 *		);
 *		$("<div>").checkUI({
 * 			key:"check1",
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-check=\"check1\"]")
 * 		});
 *		$("<div>").checkUI({
 * 			mode:2,
 *			tooltip:true,
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-check=\"check2\"]")
 * 		});
 *	});
 *	</script>
 * @class checkUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {boolean} [_object_cfg.tooltip=false] 提示框
 *		1. true：显示
 *		2. false：不显示（默认）
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {int} [_object_cfg.mode=1] 显示模式
 *		1. 对号框组（默认）
 *		2. 按钮组
 * 	@param {int} [_object_cfg.compose=1] 排版模式
 *		1. 横向（默认）
 *		2. 纵向
 * 	@param {object} [_object_cfg.icon] 图标样式
 * 		@param {string} [_object_cfg.icon.default='fa-square-o'] 默认图标
 * 		@param {string} [_object_cfg.icon.nfull='fa-check-square-o'] 子集不完全选中图标
 * 		@param {string} [_object_cfg.icon.active='fa-check-square'] 选中图标
 * 	@param {object} [_object_cfg.fun] 绑定事件
 * 		@param {function} [_object_cfg.fun.check] 选中触发事件
 * 		@param {function} [_object_cfg.fun.uncheck] 取消选中触发事件
 * 	@param {object} _object_cfg.data 选项集合
 * 		@param {string} _object_cfg.data.key 键
 * 		@param {string} _object_cfg.data.val 值
 * 		@param {int} [_object_cfg.data.select=0] 选中项
 * 			0. 未中（默认）
 * 			1. 选中
 * 			2. 半选（树形控件使用）
 * 		@param {string} [_object_cfg.data.class=''] 自定义样式（按钮组模式下默认'btn-default'）
 * 		@param {string} [_object_cfg.data.placement='top'] 提示框显示方向
 * 			1. top：上（默认）
 * 			2. bottom：下
 * 			3. left：左
 * 			4. right：右
 * 		@param {string} [_object_cfg.data.href='javascript:;'] 链接（默认可防止页面本页滚动条置顶）
 * @param {object} [_object_par] 调用方法传入参数
 * @constructor
 * @chainable
 * @example
 * 	var li1=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_check1=$('<div>').checkUI({
 * 		key:'check1',
 * 		data:[
 * 			{key:'1',val:'A',select:1},
 * 			{key:'2',val:'B'}
 * 		],
 * 		of:li1
 * 	});
 * 
 * 	var li2=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_check2=$('<div>').checkUI({
 * 		mode:2,
 * 		tooltip:true,
 * 		data:[
 * 			{key:'1',val:'A',select:1},
 * 			{key:'2',val:'B'}
 * 		],
 * 		of:li2
 * 	});
 */
$.fn.checkUI=function(_object_cfg,_object_par){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg](_,_object_par);
	}
	//注册内部方法
	_.fun={
		//设置选中值
		val:function(){
			_.val.val(((1==_.cfg.mode)?_.a.find('>i').filter('.'+_.cfg.icon.active):_.a.filter('.active')).map(function(){return 1==_.cfg.mode?$(this).parent().attr('key'):$(this).attr('key')}).get().join());//设置选中值
		},
		//设置排版 compose [1：横向（默认），2：纵向]
		compose:function(){
			if(2==_.cfg.compose){
				_.a.addClass('compose');//设置纵向
			}
			if(_.cfg.tooltip){
				_.a.attr('data-toggle','tooltip').tooltip();//开启提示
			}else{
				_.a.removeAttr('title').removeAttr('data-placement');//关闭提示
			}
		},
		//设置事件
		fun:function(){
			_.a.click(function(){
				var a_this=$(this),i_this=a_this.find('>i');
				if(1==_.cfg.mode){//对号框组
					if(i_this.hasClass(_.cfg.icon.active)){//若当前选项已选中，则移除选中图标
						i_this.removeClass(_.cfg.icon.active);//移除选中图标
						_.cfg.fun.uncheck({a:a_this,cfg:_.cfg});
					}else{
						i_this.addClass(_.cfg.icon.active);//添加选中图标
						_.cfg.fun.check({a:a_this,cfg:_.cfg});
					}
				}else{//按钮组
					if(a_this.hasClass('active')){//若当前选项已选中，则移除选中样式
						a_this.removeClass('active');//移除选中样式
						_.cfg.fun.uncheck({a:a_this,cfg:_.cfg});
					}else{
						a_this.addClass('active');//添加选中样式
						_.cfg.fun.check({a:a_this,cfg:_.cfg});
					}
				}
				_.fun.val();//设置选中值
				a_this=i_this=null;
			});
		},
		//初始化控件
		ui:function(){
			_.controls=_.attr({key:_.cfg.key,class:'org-check '+_.cfg.class}).appendTo(_.cfg.of);//绑定控件参数及样式
			var par={};
			$.each(_.cfg.data,function(){//遍历选项
				par.a=$('<a>',{class:(!(1==_.cfg.mode||0==this.select)?'active ':'')+'btn '+this.class,title:this.val,key:this.key,'data-placement':this.placement,href:this.href}).appendTo(_.controls);
				if(1==_.cfg.mode){//对号框组
					switch(this.select){
						case 1://选中
							par.i=_.cfg.icon.default+' '+_.cfg.icon.active;
							break;
						case 2://非全选中
							par.i=_.cfg.icon.nfull;
							break;
						default://未选中
							par.i=_.cfg.icon.default;
							break;
					}
					par.a.append('<i class="fa fa-lg '+par.i+'"></i>');//创建选项图标
				}
				if(''!=this.val){//选项不为空则创建选项内容
					par.a.append('<label>'+this.val+'</label>');
				}
			});
			_.val=$('<input>',{type:'hidden',name:_.cfg.key}).appendTo(_.controls);//设置选中项存储
			_.a=_.controls.find('>a.btn');//声明选项集合对象
			_.fun.val();//设置选中默认值
			par=null;
		},
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:$('body'),
				tooltip:false,
				class:'',
				mode:1,
				compose:1,
				fun:{
					check:function(){},
					uncheck:function(){}
				},
				icon:{
					default:'fa-square-o',
					active:'fa-check-square',
					nfull:'fa-check-square-o'
				},
				data:{
					key:'',
					val:'',
					class:'',
					placement:'top',
					href:'javascript:;',
					select:0
				}
			};//默认参数
			_.cfg=$.extend({},_.par,_object_cfg);//初始化参数
			if(2==_.cfg.mode){//按钮组模式下，设置选项默认样式
				_.par.data.class='btn-default';
			}
			//遍历选项参数
			$.each(_object_cfg.data,function(i){
				_.cfg.data[i]=$.extend({},_.par.data,this);
			});
		}
	};
	//注册调用方法
	_.refun={
		/**
		 * 选中/取消点击事件
		 * @method click
		 * @param {object} _object_par 传入参数
		 * 	@param {int} _object_par.index 选项索引
		 * @example
		 * 	object_check1.checkUI('click',{index:0});
		 */
		click:function(_,_object_par){
			_.a.eq(_object_par.index).click();
		},
		/**
		 * 获取选项选中状态
		 * @method getSelect
		 * @param {object} _object_par 传入参数
		 * 	@param {int} _object_par.index 选项索引
		 * @return {int} 1：选中，0：未选
		 * @example
		 * 	var int_active=object_check1.checkUI('getSelect',{index:0});
		 */
		getSelect:function(_,_object_par){
			if(1==_.cfg.mode){
				return _.a.eq(_object_par.index).find('>i').hasClass(_.cfg.icon.active)?1:0;
			}else{
				return _.a.eq(_object_par.index).hasClass('active')?1:0;
			}
		},
		/**
		 * 获取选中项键集合
		 * @method val
		 * @return {string} 键集合
		 * @example
		 * 	var string_val1=object_check1.checkUI('val');
		 * 	//or
		 * 	var string_val2=object_check1.checkUI();
		 */
		val:function(){
			return _.val.val();
		}
	};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	_.fun.compose();//设置排版
	_.fun.fun();//设置事件
	return _.controls;//返回当前控件
};
/**
 * <h3>Radio</h3>
 * 	<b>Date:</b> 2014-10-29<br>
 * 	<b>Modify:</b> 2014-10-31<br>
 * 	<b>Pen:</b> angelop007@gmail.com
 *	<script>
 *	$(function(){
 *		$("div#method_radioUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-radio":"radio1"})
 *			).append("<br>").append(
 *				$("<div>",{"data-radio":"radio2"})
 *			).append("<br>").append(
 *				$("<div>",{"data-radio":"radio3","style":"width:100px"})
 *			)
 *		);
 *		$("<div>").radioUI({
 * 			key:"radio1",
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-radio=\"radio1\"]")
 * 		});
 *		$("<div>").radioUI({
 * 			mode:2,
 *			tooltip:true,
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-radio=\"radio2\"]")
 * 		});
 *		$("<div>").radioUI({
 * 			mode:3,
 * 			icon:{
 * 				default:"",
 * 				hover:"fa-child",
 * 				active:""
 * 			},
 * 			data:[
 * 				{key:"1",val:"男",icon:"fa-male",select:1,class:"btn-info"},
 * 				{key:"2",val:"女",icon:"fa-female",class:"btn-danger"}
 * 			],
 * 			of:$("div[data-radio=\"radio3\"]")
 * 		});
 *	});
 *	</script>
 * @class radioUI
 * @since 1.1.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {boolean} [_object_cfg.tooltip=false] 提示框
 *		1. true：显示
 *		2. false：不显示（默认）
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {int} [_object_cfg.mode=1] 显示模式
 *		1. 对号框组（默认）
 *		2. 按钮组
 *		3. 滑块组
 * 	@param {int} [_object_cfg.compose=1] 排版模式
 *		1. 横向（默认）
 *		2. 纵向
 * 	@param {object} [_object_cfg.icon] 图标样式
 * 		@param {string} [_object_cfg.icon.default='fa-circle-o'] 默认图标
 * 		@param {string} [_object_cfg.icon.hover='fa-circle'] 鼠标浮动图标
 * 		@param {string} [_object_cfg.icon.active='fa-dot-circle-o'] 选中图标
 * 	@param {object} [_object_cfg.fun] 绑定事件
 * 		@param {function} [_object_cfg.fun.check] 选中触发事件
 * 	@param {object} _object_cfg.data 选项集合
 * 		@param {string} _object_cfg.data.key 键
 * 		@param {string} _object_cfg.data.val 值
 * 		@param {int} [_object_cfg.data.select=0] 选中项
 * 			0. 未中（默认）
 * 			1. 选中
 * 		@param {string} [_object_cfg.data.class=''] 自定义样式（按钮组模式下默认'btn-default'）
 * 		@param {string} [_object_cfg.data.placement='top'] 提示框显示方向
 * 			1. top：上（默认）
 * 			2. bottom：下
 * 			3. left：左
 * 			4. right：右
 * 		@param {string} [_object_cfg.data.href='javascript:;'] 链接（默认可防止页面本页滚动条置顶）
 * @constructor
 * @chainable
 * @example
 * 	var li1=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_radio1=$('<div>').radioUI({
 * 		key:'radio1',
 * 		data:[
 * 			{key:'1',val:'A',select:1},
 * 			{key:'2',val:'B'}
 * 		],
 * 		of:li1
 * 	});
 * 
 * 	var li2=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_radio2=$('<div>').radioUI({
 * 		mode:2,
 * 		tooltip:true,
 * 		data:[
 * 			{key:'1',val:'A',select:1},
 * 			{key:'2',val:'B'}
 * 		],
 * 		of:li2
 * 	});
 * 
 * 	var li3=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_radio3=$('<div>').radioUI({
 * 		mode:3,
 * 		icon:{
 * 			default:'',
 * 			hover:'fa-child',
 * 			active:''
 * 		},
 * 		data:[
 * 			{key:'1',val:'男',icon:'fa-male',select:1,class:'btn-info'},
 * 			{key:'2',val:'女',icon:'fa-female',class:'btn-danger'}
 * 		],
 * 		of:li3
 * 	});
 */
$.fn.radioUI=function(_object_cfg){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg]();
	}
	//注册内部方法
	_.fun={
		//设置选中值
		val:function(){
			_.val.val(((1==_.cfg.mode)?_.a.find('>i').filter('.'+_.cfg.icon.active):_.a.filter('.active')).map(function(){return 1==_.cfg.mode?$(this).parent().attr('key'):$(this).attr('key')}).get().join());//设置选中值
		},
		//设置排版 compose [1：横向（默认），2：纵向]
		compose:function(){
			if(2==_.cfg.compose){
				_.a.addClass('compose');//设置纵向
			}
			if(_.cfg.tooltip){
				_.a.attr('data-toggle','tooltip').tooltip();//开启提示
			}else{
				_.a.removeAttr('title').removeAttr('data-placement');//关闭提示
			}
		},
		//设置事件
		fun:function(){
			_.turn = false;
			_.a.click(function(){
				var a_this=$(this),i_this=a_this.find('>i');
				switch(_.cfg.mode){
					case 1://对号框组
						if(!i_this.hasClass(_.cfg.icon.active)){//若当前选项未选中，则添加选中图标
							i_this.addClass(_.cfg.icon.active);//添加选中图标
							a_this.siblings('a').find('>i').removeClass(_.cfg.icon.active);//移除其他选项选中图标
							_.fun.val();//设置选中值
							_.cfg.fun.check({a:a_this,cfg:_.cfg});
						}
						break;
					case 2://按钮组
						if(!a_this.hasClass('active')){//若当前选项未选中，则添加选中样式
							a_this.addClass('active').siblings('a').removeClass('active');//添加选中样式，移除其他选项选中样式
							_.fun.val();//设置选中值
							_.cfg.fun.check({a:a_this,cfg:_.cfg});
						}
						break;
					case 3://滑块组
						if(a_this.hasClass('active')){//若当前选项已选中，则移除选中样式
							if(_.turn){return false;}
							_.turn = true;
							if(0==a_this.index()){//选中项为第一项，则移除选中样式，为第二项添加选中样式
								a_this.animate({'margin-left':'-50%'},function(){
									$(this).siblings('div').addClass('left').removeClass('right');
									_.turn = false;
									_.cfg.fun.check({a:$(this),cfg:_.cfg});
								}).removeClass('active').siblings('a').addClass('active');
							}else{//选中项为第二项，则移除选中样式，为第一项添加选中样式
								a_this.removeClass('active').siblings('a').animate({'margin-left':'0'},function(){
									$(this).siblings('div').addClass('right').removeClass('left');
									_.turn = false;
									_.cfg.fun.check({a:$(this),cfg:_.cfg});
								}).addClass('active');
							}
							_.fun.val();//设置选中值
						}
						break;
					default:break;
				}
				a_this=i_this=null;
			});
			if(3==_.cfg.mode){
				_.controls.hover(function(){//设定鼠标hover事件用以切换图标
					$(this).find('>a.active>i').addClass(_.cfg.icon.hover);
				},function(){
					$(this).find('>a.active>i').removeClass(_.cfg.icon.hover);
				});
				_.a.last().find('>i').addClass(_.cfg.icon.hover);//为第二项添加样式
				_.a.siblings('div').click(function(){//滑块组模式，添加遮挡按钮事件
					if(_.turn){return false;}
					var div_this=$(this),a_this=$(this).siblings('a.active');
					_.turn = true;
					if(0==a_this.index()){//选中项为第一项，则移除选中样式，为第二项添加选中样式
						a_this.animate({'margin-left':'-50%'},function(){
							$(this).siblings('div').addClass('left').removeClass('right');
							_.turn = false;
							_.cfg.fun.check({a:$(this),cfg:_.cfg});
						}).removeClass('active').siblings('a').addClass('active');
					}else{//选中项为第二项，则移除选中样式，为第一项添加选中样式
						a_this.removeClass('active').siblings('a').animate({'margin-left':'0'},function(){
							$(this).siblings('div').addClass('right').removeClass('left');
							_.turn = false;
							_.cfg.fun.check({a:$(this),cfg:_.cfg});
						}).addClass('active');
					}
					_.fun.val();//设置选中值
					div_this=a_this=null;
				});
			}else{
				_.a.hover(function(){//设定鼠标hover事件用以切换图标
					$(this).find('>i').addClass(_.cfg.icon.hover);
				},function(){
					$(this).find('>i').removeClass(_.cfg.icon.hover);
				});
			}
		},
		//初始化控件
		ui:function(){
			_.controls=_.attr({key:_.cfg.key,class:'org-radio '+_.cfg.class}).appendTo(_.cfg.of);//绑定控件参数及样式
			if(3==_.cfg.mode){//滑块组
				var div=null;
				$.each(_.cfg.data,function(i){//遍历选项
					var a=$('<a>',{class:'btn '+this.class,title:this.val,key:this.key,'data-placement':this.placement,href:this.href}).append('<i class="fa '+(''==_.cfg.icon.default?this.icon:_.cfg.icon.default)+' fa-lg"></i>'+(''==this.val?'':('<label>'+this.val+'</label>'))).appendTo(_.controls);
					if(0==i){//添加遮挡层
						div=$('<div>',{class:'btn btn-default',html:'&nbsp;'}).appendTo(_.controls);
					}
					if(1==this.select){//当前节点为选中项，设置遮挡层放置位置
						div.addClass(0==i?'right':'left');
						if(0!=i){
							_.controls.find('>a:eq(0)').css('margin-left','-50%');
						}
						a.addClass('active');
					}
				});
			}else{//非滑块组
				$.each(_.cfg.data,function(){//遍历选项
					$('<a>',{class:(!(1==_.cfg.mode||0==this.select)?'active ':'')+'btn '+this.class,title:this.val,key:this.key,'data-placement':this.placement,href:this.href}).append((1==_.cfg.mode?'<i class="fa '+_.cfg.icon.default+' fa-lg'+(0==this.select?'':' '+_.cfg.icon.active)+'"></i>':'')+(''==this.val?'':('<label>'+this.val+'</label>'))).appendTo(_.controls);
				});
			}
			_.val=$('<input>',{type:'hidden',name:_.cfg.key}).appendTo(_.controls);//设置选中项存储
			_.a=_.controls.find('>a.btn');//声明选项集合对象
			_.fun.val();//设置选中默认值
		},
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:$('body'),
				tooltip:false,
				class:'',
				mode:1,
				compose:1,
				fun:{
					check:function(){}
				},
				icon:{
					default:'fa-circle-o',
					active:'fa-dot-circle-o',
					hover:'fa-circle'
				},
				data:{
					key:'',
					val:'',
					class:'',
					icon:'',
					placement:'top',
					href:'javascript:;',
					select:0
				}
			};//默认参数
			_.cfg=$.extend({},_.par,_object_cfg);//初始化参数
			if(2==_.cfg.mode||3==_.cfg.mode){//按钮组模式下，设置选项默认样式
				_.par.data.class='btn-default';
			}
			if(3==_.cfg.mode){//滑块组模式下，设置选项默认样式
				_.cfg.class+=' switch';
			}
			//遍历选项参数
			$.each(_object_cfg.data,function(i){
				_.cfg.data[i]=$.extend({},_.par.data,this);
			});
		}
	};
	//注册调用方法
	_.refun={
		/**
		 * 获取选中项键集合
		 * @method val
		 * @return {string} 键集合
		 * @example
		 * 	var string_val1=object_radio1.radioUI('val');
		 * 	//or
		 * 	var string_val2=object_radio1.radioUI();
		 */
		val:function(){
			return _.val.val();
		}
	};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	_.fun.compose();//设置排版
	_.fun.fun();//设置事件
	return _.controls;//返回当前控件
};
/**
 * <h3>Select</h3>
 * 	<b>Date:</b> 2014-11-25<br>
 * 	<b>Modify:</b> 2014-11-26<br>
 * 	<b>Pen:</b> angelop007@gmail.com
 *	<script>
 *	$(function(){
 *		$("div#method_selectUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-select":"select1","style":"width:120px"})
 *			)
 *		);
 *		$("<div>").selectUI({
 * 			key:"select1",
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-select=\"select1\"]")
 * 		});
 *	});
 *	</script>
 * @class selectUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {boolean} [_object_cfg.tooltip=false] 提示框
 *		1. true：显示
 *		2. false：不显示（默认）
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {object} _object_cfg.data 选项集合
 * 		@param {string} _object_cfg.data.key 键
 * 		@param {string} _object_cfg.data.val 值
 * 		@param {int} [_object_cfg.data.select=0] 选中项
 * 			0. 未中（默认）
 * 			1. 选中
 * 		@param {string} [_object_cfg.data.class=''] 自定义样式（按钮组模式下默认'btn-default'）
 * 		@param {string} [_object_cfg.data.href='javascript:;'] 链接（默认可防止页面本页滚动条置顶）
 * @constructor
 * @chainable
 * @example
 * 	var li1=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_select1=$('<div>').selectUI({
 * 		key:'select1',
 * 		data:[
 * 			{key:'1',val:'A',select:1},
 * 			{key:'2',val:'B'}
 * 		],
 * 		of:li1
 * 	});
 */
$.fn.selectUI=function(_object_cfg){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg]();
	}
	//注册内部方法
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				key:'',
				default:{
					key:'',
					val:''
				},
				of:$('body'),
				tooltip:false,//预留
				class:'',
				fun:{},//预留
				data:{
					key:'',
					val:'',
					class:'',
					placement:'top',
					href:'javascript:;',
					select:0,
					icon:''
				}
			};//默认参数
			_.cfg=$.extend({},_.par,_object_cfg);//初始化参数
			_.now=$.now();
			//遍历选项参数
			$.each(_object_cfg.data,function(i){
				_.cfg.data[i]=$.extend({},_.par.data,this);
			});
		},
		//初始化控件
		ui:function(){
			_.controls=_.attr({key:_.cfg.key,class:'org-select dropdown '+_.cfg.class}).appendTo(_.cfg.of);//绑定控件参数及样式
			
			_.lable=$('<label>',{key:_.cfg.default.key,html:_.cfg.default.val});//设置默认显示
			_.a=$('<a>',{id:_.cfg.key+'_'+_.now,class:'btn btn-default','data-toggle':'dropdown'}).append(
				_.lable
			).append(
				'<i class="fa fa-caret-down"></i>'
			).appendTo(_.controls);//默认显示按钮
			_.ul=$('<ul>',{class:'dropdown-menu','aria-labelledby':_.cfg.key+'_'+_.now}).appendTo(_.controls);//选项列表
			
			var par={};
			$.each(_.cfg.data,function(){//遍历选项
				if(1==this.select){//默认选中
					_.lable.attr('key',this.key).html(this.val);
				}
				par.li=$('<li>',{key:this.key}).appendTo(_.ul);
				par.a=$('<a>',{href:'javascript:void(0)'}).appendTo(par.li);
				if(''!=this.icon){//选项图标
					$('<i>',{class:this.icon}).appendTo(par.a);
				}
				$('<label>',{html:this.val}).appendTo(par.a);//选项内容
				_.fun.select(par.a);//绑定选项事件
			});
			par.val={key:_.lable.attr('key'),val:_.lable.text()};//当前选中项信息集合
			//_.val=$('<input>',{type:'hidden',name:_.cfg.key}).val(JSON.stringify(par.val)).appendTo(_.controls).data('val',par.val);//设置选中项存储
			_.val=$('<input>',{type:'hidden',name:_.cfg.key}).val(par.val.key).appendTo(_.controls).data('val',par.val.key);//设置选中项存储
			par=null;
		},
		//选项事件
		select:function(_a_this){
			_a_this.click(function(){//选项单机事件
				_.lable.attr('key',$(this).parent().attr('key')).html($(this).text());//设定当前项为选中项
				var object_li={key:_.lable.attr('key'),val:_.lable.text()};//当前项信息集合
				//_.val.val(JSON.stringify(object_li)).data('val',object_li);
				_.val.val(object_li.key).data('val',object_li.key);//设置选中项存储
				object_li=null;
			});
		}
	};
	//注册调用方法
	_.refun={
		/**
		 * 获取选中项键集合
		 * @method val
		 * @return {string} 键集合
		 * @example
		 * 	var string_val1=object_select1.selectUI('val');
		 * 	//or
		 * 	var string_val2=object_select1.selectUI();
		 */
		val:function(){
			return _.val.data('val');
		}
	};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	return _.controls;//返回当前控件
};
/**
 * <h3>Tree</h3>
 * 	<b>Date:</b> 2014-11-04<br>
 * 	<b>Modify:</b> 2015-01-05<br>
 * 	<b>Pen:</b> angelop007@gmail.com
 *	<script>
 *	$(function(){
 *		$("div#method_selectUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-select":"select1","style":"width:120px"})
 *			)
 *		);
 *		$("<div>").selectUI({
 * 			key:"select1",
 * 			data:[
 * 				{key:"1",val:"A",select:1},
 * 				{key:"2",val:"B"}
 * 			],
 * 			of:$("div[data-select=\"select1\"]")
 * 		});
 *	});
 *	</script>
 * @class treeUI
 * @since 1.1.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {boolean} [_object_cfg.tooltip=false] 提示框
 * 		1. true：显示
 * 		2. false：不显示（默认）
 * 	@param {boolean} [_object_cfg.check=false] 复选框
 * 		1. true：显示
 * 		2. false：不显示（默认）
 * 	@param {boolean} [_object_cfg.badge=true] 子集统计
 * 		1. true：显示
 * 		2. false：不显示（默认）
 * 	@param {boolean} [_object_cfg.edit=false] 节点编辑
 * 		1. true：显示
 * 		2. false：不显示（默认）
 * 	@param {int} [_object_cfg.open=0] 节点展开
 * 		0. 闭合（默认）
 * 		1. 展开
 * 	@param {object} [_object_cfg.ajax] 异步请求设置
 * 		@param {string} [_object_cfg.ajax.url=''] 请求链接地址
 * 		@param {string} [_object_cfg.ajax.id='0'] 请求根节点编号
 * 		@param {boolean} [_object_cfg.ajax.async=false] 异步请求
 * 			1. true：使用
 * 			2. false：不使用ajax（默认）
 * 		@param {boolean} [_object_cfg.ajax.type=1] 异步请求类型
 * 			1. 加载所有根节点下的节点
 * 			2. 点击节点逐级加载节点
 * 	@param {object} [_object_cfg.file] 图标集合
 * 		@param {object} [_object_cfg.file.folder] 文件夹图标集合
 * 			@param {string} [_object_cfg.file.folder.close='fa-folder-o'] 文件夹关闭图标
 * 			@param {string} [_object_cfg.file.folder.open='fa-folder-open-o'] 文件夹打开图标
 * 		@param {object} [_object_cfg.file.file] 异步请求
 * 			@param {string} [_object_cfg.file.file.document='fa-file-o'] 文件图标
 * 	@param {object} [_object_cfg.fun] 绑定事件
 * 		@param {function} [_object_cfg.fun.inputBlur] 编辑框焦点丢失事件
 * 		@param {function} [_object_cfg.fun.nodeClick] 点击节点事件
 * 		@param {function} [_object_cfg.fun.loadEndCall] 控件初始化加载完毕事件
 * 		@param {function} [_object_cfg.fun.nodeRemove] 删除节点事件
 * 	@param {object} _object_cfg.data 选项集合
 * 		@param {string} _object_cfg.data.key='' 键
 * 		@param {string} _object_cfg.data.val='' 值
 * 		@param {string} [_object_cfg.data.badge=''] 统计子集值
 * 		@param {int} [_object_cfg.data.type=2] 节点类型
 * 			1. 文件夹
 * 			2. 文件（默认）
 * 		@param {boolean} [_object_cfg.data.edit=true] 节点编辑
 * 			1. true：显示（默认）
 * 			2. false：不显示
 * 		@param {object} [_object_cfg.data.par={}] 传入参数
 * 		@param {int} [_object_cfg.data.open=0] 节点编辑
 * 			0. 闭合
 * 			1. 展开（默认）
 * 		@param {string} [_object_cfg.data.class=''] 自定义样式
 * 		@param {string} [_object_cfg.data.placement='top'] 提示框显示方向
 * 			1. top：上（默认）
 * 			2. bottom：下
 * 			3. left：左
 * 			4. right：右
 * 		@param {string} [_object_cfg.data.href='javascript:;'] 链接（默认可防止页面本页滚动条置顶）
 * 		@param {string} [_object_cfg.data.icon=''] 自定义图标
 * 		@param {int} [_object_cfg.data.select=0] 选中项
 * 			0. 未中（默认）
 * 			1. 选中
 * @constructor
 * @chainable
 * @example
 * 	var li1=$('<li>').appendTo($('body>ol#__logs'));
 * 	var object_tree1=$('<ul>').treeUI({
 * 		data:[
 * 			{key:'1',val:'AAA',badge:'2',child:[
 * 				{key:'1-1',val:'CCC'},
 * 				{key:'1-2',val:'DDD',child:[
 * 					{key:'1-2-1',val:'FFF'},
 * 					{key:'1-2-2',val:'GGG'}
 * 				]},
 * 				{key:'1-3',val:'EEE'}
 * 			]},
 * 			{key:'2',val:'BBB',select:2,child:[
 * 				{key:'2-1',val:'HHH'},
 * 				{key:'2-2',val:'III'},
 * 				{key:'2-3',val:'JJJ',child:[
 * 					{key:'2-2-1',val:'KKK',badge:'2',icon:'fa-gamepad'},
 * 					{key:'2-2-2',val:'LLL'}
 * 				]}
 * 			]}
 * 		],
 * 		of:li1
 * 	});
 *
 * 	var li2=$('<li>').appendTo($('body>ol#__logs'));
 * 	$('<ul>').treeUI({
 * 		key:'async',
 * 		ajax:{
 * 			url:'test/data',
 * 			async:true,
 * 			id:'0',
 * 			type:2
 * 		},fun:{
 * 			loadEndCall:function(_object_data){
 * 				//console.log(_object_data.this);// treeUI 控件对象，ajax后方可返回此对象
 * 			}
 * 		},
 * 		of:li2
 * 	});
 */
$.fn.treeUI=function(_object_cfg){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg]();
	}
	//注册内部方法
	_.fun={
		//设置checkbox选中集合缓存
		setCheckVal:function(_str_key,_object_this){
			var object_check=_.checkVal.data('val');
			object_check[_str_key]=_object_this;
			_.checkVal.val(JSON.stringify(object_check)).data('val',object_check);
			_str_key=_object_this=object_check=null;
		},
		//设置节点变更集合缓存
		setChangeVal:function(_str_key,_object_this){
			var object_change=_.changeVal.data('val');
			object_change[_str_key]=_object_this;
			_.changeVal.val(JSON.stringify(object_change)).data('val',object_change);
			_str_key=_object_this=object_change=null;
		},
		//加载数据
		data:function(_fun,_a_this){
			if(_.cfg.ajax.async){//异步数据
				pubFun.ajax({
					url:_.cfg.ajax.url,
					data:{
						id:_.cfg.ajax.id,
						type:_.cfg.ajax.type
					},suc:function(_data){//请求成功
						if('suc'==_data.msg){
							_.cfg.data=[];
							//遍历节点参数
							$.each(_data.data,function(i){
								_.cfg.data[i]=$.extend({},_.par.data,this);
								_.fun.child(this,_.cfg.data[i]);
							});
							//回调方法
							_fun();
						}else{
							console.log('suc-err:  ',_data);
							if(_a_this){//节点加载失败则设置当前节点不可用
								_a_this.attr('disabled','disabled').find('>i').removeClass('fa-plus').addClass('fa-ban text-danger');
							}
						}
					},bes:function(){//请求返回前
						if(_a_this){//节点请求设置loading显示
							_a_this.find('>i').addClass('fa-spinner fa-spin');
						}else{//初始化请求设置loading显示
							_.append('<div><span><i class="fa fa-spinner fa-spin fa-3x"></i></span></div>');
						}
					},cpl:function(){//请求返回后
						if(_a_this){//节点请求设置loading移除
							_a_this.find('>i').removeClass('fa-spinner fa-spin');
						}else{//初始化请求设置loading隐藏
							_.controls.find('>div').hide();
						}
					},err:function(_data){//请求失败
						console.log('err:  ',_data);
					}
				});
			}else{//本地数据
				//遍历节点参数
				$.each(_.cfg.data,function(i){
					_.cfg.data[i]=$.extend({},_.par.data,this);
					_.fun.child(this,_.cfg.data[i]);
				});
				//回调方法
				_fun();
			}
		},
		//设置事件
		fun:function(_li){
			_li.find('>a:eq(0):not(:empty)').click(_.fun.fold);//节点折叠按钮事件
			_li.find('>a:eq(2)').dblclick(function(){//节点双击折叠事件
				_.fun.fold($(this).siblings('a:first'));
			});
			_li.find('>a:eq(2)').click(function(){//节点单击事件
				var a_this=$(this);
				if(a_this.hasClass('bg-info')){//取消选中当前节点
					a_this.removeClass('bg-info').find('>div.btn-group').hide('fast');
					_.val.val('').removeData('val');
				}else{//选中当前节点移除其他节点选中状态
					_.controls.find('li').find('>a:eq(2)').removeClass('bg-info').find('>div.btn-group').hide('fast');
					a_this.addClass('bg-info').find('>div.btn-group').show('fast');
					var li_this=a_this.closest('li'),li_parent=li_this.parent().parent(),object_result={key:li_this.attr('key'),val:li_this.attr('title'),parentKey:li_parent.attr('key'),parentVal:li_parent.attr('title')};
					_.val.val(JSON.stringify(object_result)).data('val',object_result);
					//选中节点回调
					if($.isFunction(_.cfg.fun.nodeClick)){
						//回调选中节点方法
						_.cfg.fun.nodeClick(object_result);
					}
					object_result=li_parent=li_this=null;
				}
				a_this=null;
			}).find('>div.btn-group>button:eq(0)').click(function(e){//编辑当前节点
				var label_this=$(this).parent().prev();
				_.fun.input(label_this).appendTo(label_this.empty()).select();
				label_this=null;
				e.stopPropagation();
			}).next().click(function(e){//创建子级
				var li_this=$(this).closest('li'),ul_this=li_this.find('>ul'),a_this=li_this.find('>a:eq(0)');
				if(0==ul_this.length){
					ul_this=$('<ul>').appendTo(li_this);
					_.fun.node([$.extend({},_.par.data,{val:'',type:2})],ul_this);
					a_this.attr({class:'btn',href:'javascript:;'}).html('<i class="fa fa-plus fa-lg"></i>').click(_.fun.fold).siblings('a:last').find('>i').removeClass('fa-file-o').addClass('fa-folder-o');
					li_this.attr('change',1);
				}else{
					_.fun.node([$.extend({},_.par.data,{val:'',type:2})],ul_this);
					li_this.attr('change',0);
				}
				var label_child=ul_this.find('>li:last>a:last>label');
				_.fun.open({a:a_this,ul:ul_this});
				_.fun.input(label_child).appendTo(label_child).select();				
				e.stopPropagation();
			}).next().click(function(e){//删除本级及子级节点
				var li_this=$(this).closest('li');
				//焦点消失回调
				if($.isFunction(_.cfg.fun.nodeRemove)){
					//回调焦点消失方法
					_.cfg.fun.nodeRemove({
						this:li_this,
						key:li_this.attr('key')
					});
				}
				li_this=null;
				e.stopPropagation();
			});
		},
		//编辑框
		input:function(_label_this){
			return $('<input>',{type:'text',class:'form-control input-sm',value:_label_this.text(),placeholder:_label_this.text(),dblclick:function(e){
				e.stopPropagation();
			},click:function(e){
				e.stopPropagation();
			},blur:function(){//丢失焦点
				var par={
					str_val:$.trim($(this).val()),//输入内容
					label_this:$(this).parent(),//父级标签
					str_ph:$(this).attr('placeholder')//上次数据
				};
				par.str_original=par.label_this.attr('v');//初始数据
				//移除错误状态
				if(par.label_this.hasClass('has-error')){
					par.label_this.removeClass('has-error');
				}
				if(0==par.str_val.length){//本次未输入
					if(par.str_ph==par.str_original){//上次数据和初始数据一致
						if(0==par.str_original.length){//初始数据为空
							par.label_this.addClass('has-error');
						}else{//恢复节点内容为初始化数据
							_label_this.html(par.str_original).closest('li').attr('title',par.str_original);
						}
					}else{//恢复节点内容为上次数据
						_label_this.html('<i class="fa fa-tag text-danger"></i>'+par.str_ph).closest('li').attr('title',par.str_ph);
					}
				}else{//本次输入
					if(par.str_val==par.str_original){//本次输入和初始化数据一致，则节点状态不变
						_label_this.html(par.str_val).closest('li').attr('title',par.str_val);
					}else{//节点内容设置为本次输入，并增加变动状态
						_label_this.html('<i class="fa fa-tag text-danger"></i>'+par.str_val).closest('li').attr('title',par.str_val);
					}
				}
				//如果本次输入、上次数据、初始化数据均为空，则提示错误并跳出结束本方法
				if(par.label_this.hasClass('has-error')){
					return false;
				}
				par.li_this=par.label_this.closest('li');//当前节点对象
				if(0==_label_this.find('>i.fa-tag').length){//本次操作未变数据
					var object_change=_.changeVal.data('val');
					if(object_change[par.li_this.attr('key')]){//判断变更数据缓存中是否含有上次数据，如存在则剔除
						delete object_change[par.li_this.attr('key')];
						_.changeVal.val(JSON.stringify(object_change)).data('val',object_change);
					}
					object_change=null;
					return false;
				}

				par.li_parent=par.li_this.parent().parent();//当前节点父级节点
				par.li_prev=par.li_this.prev();//当前节点的前一个节点
				if(''==par.li_this.attr('key')){//当前节点编号不存在，则视为新创建节点并按照规则创建其编号
					par.li_this.attr('key',par.li_parent.attr('key')+(0==par.li_prev.length?'-x1':('-x'+(parseInt(par.li_prev.attr('key').split('x')[1])+1))));//若前一节点存在则将前节点编号+1赋予当前节点，若前一节点不存在则默认1赋予当前节点
				}

				par.vals=_.fun.getVal({li:par.li_this,object:{}});
				par.vals.val.key=par.li_this.attr('key');
				_.fun.setChangeVal(par.vals.val.key,par.vals.val);
				
				if($.isFunction(_.cfg.fun.inputBlur)){//焦点消失回调
					//设置暴漏方法
					par.label_this.removeTag=_.refun.removeTag;//删除内容变更标记
					par.label_this.openLoading=_.refun.openLoading;//打开正在加载显示层
					par.label_this.closeLoading=_.refun.closeLoading;//隐藏正在加载显示层
					par.label_this.setKey=_.refun.setKey;//设置节点key值
					par.label_this.setDefault=_.refun.setDefault;//设置默认值
					par.label_this.cleanChangeVal=_.refun.removeChangeVal;//清空所有变更值集合
					//回调焦点消失方法
					_.cfg.fun.inputBlur({
						this:par.label_this,
						type:0==par.li_parent.find('>a:eq(2)>i[class*="fa-folder-"]').length?2:1,
						val:par.str_val,
						key:par.li_this.attr('key'),
						parent:par.li_parent,
						parentKey:par.li_parent.attr('key'),
						parentVal:par.li_parent.attr('title')
					});
				}
				par=null;
			}});
		},
		//节点展开、闭合
		fold:function(_a_this){
			var a_this=_a_this.type?$(this):_a_this,//当前节点
				ul_child=a_this.siblings('ul');//当前节点子集
			if(ul_child.is(':hidden')){//子集隐藏时
				if(2==_.cfg.ajax.type&&_.cfg.ajax.async){//ajax并且使用模式2进行异步加载节点
					if(1!=a_this.attr('state')){//初次加载本节点数据
						_.cfg.ajax.id=a_this.parent().attr('key');//设置加载节点编号
						_.fun.data(function(){//装载数据
							_.fun.node(_.cfg.data,ul_child.empty());//绑定子节点数据
							_.fun.open({a:a_this,ul:ul_child});//展开节点
						},a_this.attr('state',1));
					}else{
						_.fun.open({a:a_this,ul:ul_child});//展开节点
					}
				}else{
					_.fun.open({a:a_this,ul:ul_child});//展开节点
				}
			}else{//子集显示时
				if(2==_.cfg.ajax.type&&_.cfg.ajax.async){//ajax并且使用模式2进行异步加载节点
					if(1!=a_this.attr('state')){//未加载本节点数据
						if(0==ul_child.find('i[class*="fa-tag"]').length&&0==ul_child.find('label[class*="has-error"]').length){//未存在新节点或变更节点
							_.fun.close({a:a_this,ul:ul_child});//闭合节点
						}
					}else{
						_.fun.close({a:a_this,ul:ul_child});//闭合节点
					}
				}else{
					_.fun.close({a:a_this,ul:ul_child});//闭合节点
				}
			}
		},
		//展开节点
		open:function(_object_this){
			_object_this.a.find('>i').addClass('fa-minus');//设置展开减号图标
			_object_this.a.siblings('a:last').find('>i').addClass('fa-folder-open-o');//设置展开文件夹图标
			_object_this.ul.show();//显示子集所有节点
		},
		//闭合节点
		close:function(_object_this){
			_object_this.a.find('>i').removeClass('fa-minus');//移除减号图标
			_object_this.a.siblings('a:last').find('>i').removeClass('fa-folder-open-o');//移除展开文件夹图标
			_object_this.ul.hide();//隐藏子集所有节点
		},
		//checkbox选中
		check:function(_object_this){
			var par={
				li_this:_object_this.a.closest('li'),//当前节点
				bool_all:true//标识同级是否已选中（true：未选中，false：选中）
			};
			var fun={
				//遍历父级选中状态
				parent:function(_li_this){
					par.ul_this=_li_this.parent();//当前节点父级对象
					par.i_icon=par.ul_this.siblings('a').eq(1).find('>div.org-check i');//当前节点父级图标对象
					if(!par.i_icon.hasClass(_object_this.cfg.icon.active)){//当前节点父级未选中
						if(par.bool_all){//同级节点不含选中项
							par.i_icon.addClass(_object_this.cfg.icon.active);//设置父级节点为全选中图标
						}else{//同级节点含有选中项
							par.i_icon.removeClass(_object_this.cfg.icon.default).addClass(_object_this.cfg.icon.nfull);//设置父级节点为非全选中图标
						}
					}
					if(!par.ul_this.hasClass('org-tree')){//递归父级节点直到根节点为止
						fun.sibling(par.ul_this.parent());//遍历父级节点的同级节点选中状态
						fun.parent(par.ul_this.parent());//遍历父级的父级节点选中状态
					}
				},
				//遍历同级选中状态
				sibling:function(_li_this){
					_li_this.siblings('li').each(function(){//遍历同级节点
						if(!$(this).find('>a>div.org-check i').hasClass(_object_this.cfg.icon.active)){//当前节点未被选中
							par.bool_all=false;
							return false;
						}
					});
				},
				//遍历子集选中状态
				child:function(_li_this){
					_li_this.find('ul>li').each(function(){//遍历子集节点
						$(this).find('>a:eq(1)>div.org-check i').removeClass(_object_this.cfg.icon.nfull).addClass(_object_this.cfg.icon.active);//设置子节点全部为全选中图标
					});
				}
			};
			fun.sibling(par.li_this);//遍历同级选中状态
			fun.child(par.li_this);//遍历节点参数
			fun.parent(par.li_this);//遍历父级选中状态
			_.fun.setCheck();//重置缓存check选中项
			par=fun=null;
		},
		//checkbox取消选中
		uncheck:function(_object_this){
			var par={
				li_this:_object_this.a.closest('li'),//当前节点
				bool_all:true//标识同级是否已选中（true：未选中，false：选中）
			};
			var fun={
				//遍历父级选中状态
				parent:function(_li_this){
					par.ul_this=_li_this.parent();//当前节点父级对象
					par.i_icon=par.ul_this.siblings('a').eq(1).find('>div.org-check i');//当前节点父级图标对象
					if(par.i_icon.hasClass(_object_this.cfg.icon.active)){//当前节点父级选中
						if(par.bool_all){//同级节点不含选中项
							par.i_icon.removeClass(_object_this.cfg.icon.active).addClass(_object_this.cfg.icon.default);//设置父级节点为默认图标
						}else{//同级节点含有选中项
							par.i_icon.removeClass(_object_this.cfg.icon.default).removeClass(_object_this.cfg.icon.active).addClass(_object_this.cfg.icon.nfull);//设置父级节点为非全选中图标
						}
					}
					if(par.i_icon.hasClass(_object_this.cfg.icon.nfull)){//父级节点为非全选中图标
						if(par.bool_all){//同级节点不含选中项
							par.i_icon.removeClass(_object_this.cfg.icon.nfull).addClass(_object_this.cfg.icon.default);//设置父级节点为默认图标
						}
					}
					if(!par.ul_this.hasClass('org-tree')){//递归父级节点直到根节点为止
						fun.sibling(par.ul_this.parent());//遍历父级节点的同级节点选中状态
						fun.parent(par.ul_this.parent());//遍历父级的父级节点选中状态
					}
				},
				//遍历同级选中状态
				sibling:function(_li_this){
					_li_this.siblings('li').each(function(){//遍历同级节点
						if($(this).find('>a>div.org-check i').hasClass(_object_this.cfg.icon.active)){//当前节点被选中
							par.bool_all=false;
							return false;
						}
					});
				},
				//遍历子集选中状态
				child:function(_li_this){
					_li_this.find('ul>li').each(function(){//遍历子集节点
						$(this).find('>a:eq(1)>div.org-check i').removeClass(_object_this.cfg.icon.active).removeClass(_object_this.cfg.icon.nfull).addClass(_object_this.cfg.icon.default);//设置子节点全部为默认图标
					});
				},
				//恢复当前节点默认图标
				self:function(_li_this){
					_li_this.find('>a:eq(1)>div.org-check i').removeClass(_object_this.cfg.icon.nfull).addClass(_object_this.cfg.icon.default);
				}
			};
			fun.self(par.li_this);//恢复当前节点默认图标
			fun.sibling(par.li_this);//遍历同级选中状态
			fun.child(par.li_this);//遍历子集选中状态
			fun.parent(par.li_this);//遍历父级选中状态
			//重置缓存check选中项
			_.fun.setCheck();
			par=fun=null;
		},
		//遍历节点
		node:function(_object_data,_object_of){
			$.each(_object_data,function(){//遍历选项
				//节点
				var par={
					select:'',
					li:$('<li>',{class:this.class,key:this.key,title:$.isPlainObject(this.val)?'':this.val,'data-toggle':'tooltip','data-placement':this.placement}),
					folder:'<a class="btn" href="javascript:;"><i class="fa fa-plus '+(1==this.open?'fa-minus':'')+' fa-lg"></i></a>',
					file:'<a class="nobox"></a>',
					icon:''
				};

				par.li.appendTo(_object_of).data('par',this.par);//缓存传入参数

				//折叠按钮
				if(1==this.type||this.child){//文件夹或是含有子集
					if(2==_.cfg.ajax.type&&_.cfg.ajax.async){//异步请求并且是一层节点加载请求模式
						if(this.child){//含子集
							par.li.append(par.file);//无折叠按钮
						}else{//不含子集
							par.li.append(par.folder);//折叠按钮
						}
					}else{//本地数据
						if(this.child){//含子集
							par.li.append(par.folder);//折叠按钮
						}else{//不含子集
							par.li.append(par.file);//无折叠按钮
						}
					}
				}else{
					par.li.append(par.file);//无折叠按钮
				}
				
				//图标，文本，操作组
				if(''==this.icon){
					if(1==this.type||this.child){//指定文件夹或含有子集
						par.icon=_.cfg.file.folder.close;//文件夹图标
					}else{
						par.icon=_.cfg.file.file.document;//文件图标
					}
				}else{
					par.icon=this.icon;//自定义图标
				}
				par.li.append(
					'<a></a>'//复选
				).append(
					$('<a>',{class:'btn',href:this.href}).append(
						'<i class="fa '+par.icon+' fa-lg"></i>'//图标
					).append(
						'<label v="'+this.val+'">'+this.val+'</label>'//内容
					).append(
						_.cfg.edit?(this.edit?'<div class="btn-group"><button class="btn" type="button"><i class="fa fa-pencil-square-o fa-fw"></i></button><button class="btn" type="button"><i class="fa fa-code-fork fa-fw"></i></button><button class="btn" type="button"><i class="fa fa-trash-o fa-fw"></i></button></div>':''):''//编辑按钮组
					)
				);
				
				//子集统计
				if(''!=this.badge){
					par.li.append('<span class="badge">'+this.badge+'</span>');
				}

				//复选
				if(_.cfg.check){
					$('<div>').checkUI({
						fun:{
							check:_.fun.check,
							uncheck:_.fun.uncheck
						},
						data:[{select:this.select,icon:'fa-check-square-o'}],
						of:par.li.find('>a:eq(1)')
					});
				}
				
				//子集节点
				if(1==this.type||this.child){
					if(2==_.cfg.ajax.type&&_.cfg.ajax.async){
						$('<ul>',{'style':(1==this.open?'':'display:none')}).appendTo(par.li);
					}else{
						if(this.child){//含有子集
							_.fun.node(this.child,$('<ul>',{'style':(1==this.open?'':'display:none')}).appendTo(par.li));//遍历所有子集
						}
					}
				}
				_.fun.fun(par.li);//设置事件
				
				var fun={
					//展开节点事件
					open:function(_li_this){
						par.parentUL=_li_this.parent();//父级对象
						if(!par.parentUL.hasClass('org-tree')&&par.parentUL.is(':hidden')){//非根节点和父级节点未显示
							_.fun.fold(_li_this.find('>a:first'));//展开当前节点
							_.fun.fold(par.parentUL.siblings('a:first'));//展开父级节点
							this.open(par.parentUL.parent());//展开父级节点
						}
					}
				};
				
				if(!(2==_.cfg.ajax.type&&_.cfg.ajax.async)){//本地数据
					if(1==this.select&&!_.cfg.check){//设置选中当前节点
						par.li.find('>a:eq(2)').click();
					}
					if(1==this.open){//设置展开当前节点并展开其父级一直到根节点
						fun.open(par.li);
					}
				}
				
				if(0!=this.select){//当前节点全选或半选
					par=_.fun.getVal({li:par.li,object:{}});//当前获取节点信息
					par.val.key=this.key;
					_.fun.setCheckVal(this.key,par.val);//设置checkbox选中集合缓存
				}
				par=fun=null;
			});
		},
		//初始化控件
		ui:function(){
			_.controls=_.attr({key:_.cfg.key,class:'org-tree '+_.cfg.class}).appendTo(_.cfg.of);//绑定控件参数及样式
			_.val=$('<input>',{type:'hidden',name:_.cfg.key+'_val'}).appendTo(_.controls).data('val',{});//获取选中值
			_.changeVal=$('<input>',{type:'hidden',name:_.cfg.key+'_changeVal'}).appendTo(_.controls).data('val',{});//获取所有变更值集合
			if(_.cfg.check){
				_.checkVal=$('<input>',{type:'hidden',name:_.cfg.key+'_checkVal'}).appendTo(_.controls).data('val',{});//获取所有CheckBox选中值集合
			}
			_.fun.node(_.cfg.data,_.controls);//遍历节点

			//提示
			if(_.cfg.tooltip){
				_.controls.find('li').attr('data-toggle','tooltip').tooltip();//开启提示
			}else{
				_.controls.find('li').removeAttr('title').removeAttr('data-placement');//关闭提示
			}
		},
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:'body',
				class:'',
				tooltip:false,
				check:true,
				badge:true,
				edit:false,
				open:0,
				ajax:{
					url:'',
					async:false,
					id:'0',
					type:1
				},file:{
					//switch:true,
					folder:{
						close:'fa-folder-o',
						open:'fa-folder-open-o'
					},
					file:{
						document:'fa-file-o'
					}
				},fun:{
					inputBlur:null,
					nodeClick:null,
					loadEndCall:null,
					nodeRemove:null
				},data:{
					key:'',
					val:'',
					badge:'',
					type:2,
					edit:true,
					par:{},
					open:0,
					class:'',
					placement:'top',
					href:'javascript:;',
					icon:'',
					select:0
				}
			};//默认参数
			_.cfg=$.extend({},_.par,_object_cfg);//初始化参数
		},
		//获取节点参数
		child:function(_object_data,_object_cfgData){
			if(_object_data.child){
				$.each(_object_data.child,function(i){
					_object_cfgData.child[i]=$.extend({},_.par.data,this);
					_.fun.child(this,_object_cfgData.child[i]);
				});
			}
		},
		//获取节点选中类型
		select:function(_li_this){
			var i_check=_li_this.find('>a:eq(1)>div.org-check i');//当前节点checkbox图标
			if(i_check.hasClass('fa-check-square')){//全选
				return 1;
			}else if(i_check.hasClass('fa-check-square-o')){//半选
				return 2;
			}else{//未选
				return 0;
			}
		},
		//获取节点信息
		getVal:function(_object_par){
			_object_par.a=_object_par.li.find('>a:eq(2)');//当前节点内容按钮
			_object_par.val={
				par:_object_par.li.data('par'),//当前节点传入参数
				val:_object_par.a.find('>label').text(),//当前节点内容
				type:0==_object_par.a.find('>i[class*="fa-folder-"]').length?2:1//当前节点类型
			};
			if(_.cfg.check){
				_object_par.val.select=_.fun.select(_object_par.li);//当前节点选中类型
			}
			if(_object_par.li.parent().is('ul.org-tree')){//父级为根节点
				_object_par.val.parentKey=_.cfg.ajax.id;//设置父级编号
			}else{//父级不为根节点
				_object_par.parent=_object_par.li.parent().parent();//父级节点对象
				_object_par.val.parentKey=_object_par.parent.attr('key');//父节点编号
				_object_par.val.parentVal=_object_par.parent.attr('title');//父节点内容
				if(_.cfg.check){
					_object_par.val.parentSelect=_.fun.select(_object_par.parent);//父节点选中类型
				}
			}
			return _object_par;
		},
		//设置所有CheckBox选中值
		setCheck:function(){
			var par={
				active:_.controls.find('li>a:nth-child(2)>div.org-check i.fa-check-square'),//子集选中集合
				nfull:_.controls.find('li>a:nth-child(2)>div.org-check i.fa-check-square-o'),//半选选中集合
				object:{}//缓存选中集合
			},fun={
				//遍历选中节点
				each:function(){
					par.li=$(this).closest('li');
					par=_.fun.getVal(par);
					par.object[par.li.attr('key')]=par.val;
				}
			};
			if(0==par.active.length&&0==par.nfull.length){
				_.checkVal.val('').data('val',{});//清空选中集合缓存
			}else{
				par.active.each(fun.each);//遍历全选节点
				par.nfull.each(fun.each);//遍历半选节点
				_.checkVal.val(JSON.stringify(par.object)).data('val',par.object);//设置所有选中节点信息集合
			}
			par=fun=null;
		}
		
	};
	//注册调用方法
	_.refun={
		/**
		 * 获取选中值
		 */
		val:function(){
			return _.val.data('val');
		},
		/**
		 * 获取所有节点集合
		 */
		allVal:function(){
			var par={
				object:{}
			};
			_.controls.find('li').each(function(){
				par.li=$(this);
				par=_.fun.getVal(par);
				par.object[par.li.attr('key')]=par.val;
			});
			return par.object;
		},
		/**
		 * 获取所有CheckBox选中值集合
		 */
		checkVal:function(){
			return _.checkVal.data('val');
		},
		/**
		 * 获取所有变更值集合
		 */
		changeVal:function(){
			return _.changeVal.data('val');
		},
		/**
		 * 删除变更标记 
		 */
		removeTag:function(){
			this.find('>i.fa-tag').remove();
			return this;
		},
		/**
		 * 打开正在加载显示层
		 */
		openLoading:function(){
			_.controls.find('>div').show();
			return this;
		},
		/**
		 * 关闭正在加载显示层
		 */
		closeLoading:function(){
			_.controls.find('>div').hide();
			return this;
		},
		/**
		 * 设置节点key值
		 */
		setKey:function(_str_key){
			this.closest('li').attr('key',_str_key);
			return this;
		},
		/**
		 * 设置默认值
		 */
		setDefault:function(){
			return this.attr('v',this.text());
		},
		/**
		 * 清空所有变更值集合
		 */
		removeChangeVal:function(){
			_.changeVal.val('').data('val',{});
		}
	};
	_.fun.init();//初始化设置
	_.fun.data(function(){//装载数据
		_.fun.ui();//初始化控件
				
		if($.isFunction(_.cfg.fun.loadEndCall)){//加载数据后调用回调方法
			_.cfg.fun.loadEndCall({this:_.controls});
		}
	});
	return _.controls;//返回当前控件
};