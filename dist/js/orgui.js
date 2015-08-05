/**
 * UI 控件库
 * @module UI(User Interface Controls)
 * @requires <br>jquery-2.1.1.js<br>
 * @requires bootstrap-3.2.css<br>
 * @requires bootstrap-3.2.js<br>
 * @requires font-awesome-4.2.css<br>
 * @requires orgui-1.0.css
 */
/**
 * <h3>CheckBox</h3>
 * 	<b>Date:</b> 2014-10-27<br>
 * 	<b>Modify:</b> 2014-11-12<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
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
		 * @return {object} 键集合
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
 * 	<b>Pen:</b> angelop007@gmail.com<br>
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
		 * 获取选中项键
		 * @method val
		 * @return {string} 选中项键
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
 * 	<b>Pen:</b> angelop007@gmail.com<br>
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
				fun:{
					'change':function(){}
				},//预留
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
			_.now=$.now();//当前时间
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
				/*选中后回调*/
				if($.isFunction(_.cfg.fun.change)){
					/*回调选中后方法*/
					_.cfg.fun.change({
						key:object_li.key,
						val:object_li.val
					});
				}
				object_li=null;
			});
		}
	};
	//注册调用方法
	_.refun={
		/**
		 * 获取选中项键
		 * @method val
		 * @return {string} 选中项键
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
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 *	<script>
 *	$(function(){
 *		$("div#method_treeUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-tree":"tree1"})
 *			)
 *		);
 *		$("<ul>").treeUI({
 * 			key:"tree1",
 * 			data:[
 * 				{key:"1",val:"AAA",badge:"3",child:[
 * 					{key:"1-1",val:"CCC"},
 * 					{key:"1-2",val:"DDD",child:[
 * 						{key:"1-2-1",val:"FFF"},
 * 						{key:"1-2-2",val:"GGG"}
 * 					]},
 * 					{key:"1-3",val:"EEE"}
 * 				]},
 * 				{key:"2",val:"BBB",select:2,child:[
 * 					{key:"2-1",val:"HHH"},
 * 					{key:"2-2",val:"III",select:1},
 * 					{key:"2-3",val:"JJJ",select:1,badge:"2",child:[
 * 						{key:"2-2-1",val:"KKK",select:1,icon:"fa-gamepad"},
 * 						{key:"2-2-2",val:"LLL",select:1}
 * 					]}
 * 				]}
 * 			],
 * 			of:$("div[data-tree=\"tree1\"]")
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
 * 	@param {boolean} [_object_cfg.click=true] 文本点击
 * 		1. true：可以点击
 * 		2. false：不可点击
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
 * 		key:'tree1',
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
 * 				{key:'2-2',val:'III',select:1},
 * 				{key:'2-3',val:'JJJ',select:1,child:[
 * 					{key:'2-2-1',val:'KKK',select:1,badge:'2',icon:'fa-gamepad'},
 * 					{key:'2-2-2',val:'LLL',select:1}
 * 				]}
 * 			]}
 * 		],
 * 		of:li1
 * 	});
 *	//or
 * 	var li2=$('<li>').appendTo($('body>ol#__logs'));
 * 	$('<ul>').treeUI({
 * 		key:'tree2',
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
		//_=_.prevObject;//本行代码正常使用控件时需开启，注释仅为api文档使用模式
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
				if(!_.cfg.click){//设置节点文本可否点击
					return false;
				}
				var a_this=$(this);
				if(a_this.hasClass('bg-info')){//取消选中当前节点
					a_this.removeClass('bg-info').find('>div.btn-group').hide('fast');
					_.val.val('').removeData('val');
				}else{//选中当前节点移除其他节点选中状态
					_.controls.find('li').find('>a:eq(2)').removeClass('bg-info').find('>div.btn-group').hide('fast');
					a_this.addClass('bg-info').find('>div.btn-group').show('fast');
					var li_this=a_this.closest('li'),li_parent=li_this.parent().parent(),object_result={key:li_this.attr('key'),val:li_this.attr('title'),parentKey:li_parent.attr('key'),parentVal:li_parent.attr('title'),type:0==li_this.find('>a:eq(2)>i[class*="fa-folder-"]').length?2:1};
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
			//选中回调
			if($.isFunction(_.cfg.fun.check)){
				//回调选中方法
				_.cfg.fun.check();
			}
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
			//选中回调
			if($.isFunction(_.cfg.fun.uncheck)){
				//回调选中方法
				_.cfg.fun.uncheck();
			}
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
				
				if(0!=this.select&&_.cfg.check){//当前节点全选或半选
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
				click:true,
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
					nodeRemove:null,
					check:null,
					uncheck:null
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
		 * 获取选中节点信息
		 * @method val
		 * @return {object} 选中节点信息
		 * @example
		 * 	var string_val1=object_tree1.treeUI('val');
		 * 	//or
		 * 	var string_val2=object_tree1.treeUI();
		 */
		val:function(){
			return _.val.data('val');
		},
		/**
		 * 获取所有节点集合
		 * @method allVal
		 * @return {object} 节点集合
		 * @example
		 * 	var object_val=object_tree1.treeUI('allVal');
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
		 * @method checkVal
		 * @return {object} CheckBox选中值集合
		 * @example
		 * 	var object_val=object_tree1.treeUI('checkVal');
		 */
		checkVal:function(){
			return _.checkVal.data('val');
		},
		/**
		 * 获取所有变更节点集合
		 * @method changeVal
		 * @return {object} 所有变更节点集合
		 * @example
		 * 	var object_val=object_tree1.treeUI('changeVal');
		 */
		changeVal:function(){
			return _.changeVal.data('val');
		},
		/**
		 * 删除变更标记 
		 * @method removeTag
		 * @chainable
		 * @return {jquery object} 当前节点
		 * @example
		 * 	_object_data.this.removeTag();
		 */
		removeTag:function(){
			this.find('>i.fa-tag').remove();
			return this;
		},
		/**
		 * 打开正在加载显示层
		 * @method openLoading
		 * @chainable
		 * @return {jquery object} 当前节点
		 * @example
		 *	_object_data.this.openLoading();
		 */
		openLoading:function(){
			_.controls.find('>div').show();
			return this;
		},
		/**
		 * 关闭正在加载显示层
		 * @method closeLoading
		 * @chainable
		 * @return {jquery object} 当前节点
		 * @example
		 *	_object_data.this.closeLoading();
		 */
		closeLoading:function(){
			_.controls.find('>div').hide();
			return this;
		},
		/**
		 * 设置节点key值
		 * @method setKey
		 * @chainable
		 * @param {string} _str_key 传入参数
		 * @return {jquery object} 当前节点
		 * @example
		 *	_object_data.this.setKey('10001');
		 */
		setKey:function(_str_key){
			this.closest('li').attr('key',_str_key);
			return this;
		},
		/**
		 * 设置默认值
		 * @method setDefault
		 * @chainable
		 * @return {jquery object} 当前节点
		 * @example
		 *	_object_data.this.setDefault();
		 */
		setDefault:function(){
			return this.attr('v',this.text());
		},
		/**
		 * 清空所有变更值集合
		 * @method removeChangeVal
		 * @example
		 *	object_tree1.treeUI('removeChangeVal');
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
/**
 * <h3>Alert</h3>
 * 	<b>Date:</b> 2014-12-05<br>
 * 	<b>Modify:</b> 2014-12-05<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 *	<script>
 *	$(function(){
 * 		var fun={
 * 			pubClick:function(){$(this).closest(".org-alert").remove()}
 * 		};
 *		$("div#method_alertUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-alert":"alert1"})
 *			)
 *		);
 * 		$("<a>",{"class":"btn btn-success","style":"margin-right:10px","click":function(){
 * 			$("<div>").alertUI({
 * 				title:"成功",
 * 				body:"删除成功！",
 * 				mode:1,
 * 				btns:[
 * 					{val:"确定",icon:"fa-check",class:"btn btn-success",click:fun.pubClick},
 * 					{val:"取消",icon:"fa-ban",click:fun.pubClick}
 * 				]
 * 			});
 * 		}}).html("success").appendTo($("div[data-alert=\"alert1\"]"));
 * 		$("<a>",{"class":"btn btn-info","style":"margin-right:10px","click":function(){
 * 			$("<div>").alertUI({
 * 				title:"提示",
 * 				body:"提示信息！",
 * 				mode:2,
 * 				btns:[
 * 					{val:"确定",icon:"fa-check",class:"btn-info",click:fun.pubClick},
 * 					{val:"取消",icon:"fa-ban",click:fun.pubClick}
 * 				]
 * 			});
 * 		}}).html("info").appendTo($("div[data-alert=\"alert1\"]"));
 * 		$("<a>",{"class":"btn btn-warning","style":"margin-right:10px","click":function(){
 * 			$("<div>").alertUI({
 * 				title:"警告",
 * 				body:"警告信息！",
 * 				mode:3,
 * 				btns:[
 * 					{val:"确定",icon:"fa-check",class:"btn-warning",click:fun.pubClick},
 * 					{val:"取消",icon:"fa-ban",click:fun.pubClick}
 * 				]
 * 			});
 * 		}}).html("warning").appendTo($("div[data-alert=\"alert1\"]"));
 * 		$("<a>",{"class":"btn btn-danger","click":function(){
 * 			$("<div>").alertUI({
 * 				title:"删除",
 * 				body:"确定删除选中数据？",
 * 				btns:[
 * 					{val:"删除",icon:"fa-trash",class:"btn-danger",click:fun.pubClick},
 * 					{val:"取消",icon:"fa-ban",click:fun.pubClick}
 * 				]
 * 			});
 * 		}}).html("danger").appendTo($("div[data-alert=\"alert1\"]"));
 *	});
 *	</script>
 * @class alertUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {string} [_object_cfg.mode=0] 显示主题
 * 		0. 红色（默认）
 * 		1. 绿色
 * 		2. 蓝色
 * 		3. 黄色
 * 	@param {string} [_object_cfg.title=''] 提示标题
 * 	@param {string} [_object_cfg.body=''] 提示内容
 * 	@param {object} [_object_cfg.btns] 按钮组
 * 		@param {string} [_object_cfg.btns.icon=''] 图标
 * 		@param {string} [_object_cfg.btns.iconAlign=''] 图标显示方向
 * 			1. left：居左（默认）
 * 			2. right：居右
 * 		@param {string} [_object_cfg.btns.val=''] 文本
 * 		@param {string} [_object_cfg.btns.class=''] 自定义样式
 * 		@param {function} [_object_cfg.btns.click] 绑定单击事件
 * @constructor
 * @chainable
 * @example
 * 	var alert1=$('<li>').appendTo($('body>ol#__logs'));
 * 	$('<a>',{'href':'javascript:;','html','删除'}).click(function(){
 * 		$('<div>').alertUI({
 * 			title:'删除',
 * 			body:'确定删除选中数据？',
 * 			btns:[
 * 				{val:'删除',icon:'fa-trash',class:'btn-danger',click:function(){
 * 					alert('删除！');
 * 					$(this).closest('.org-alert').remove();
 * 				}},
 * 				{val:'取消',icon:'fa-ban',click:function(){
 * 					alert('取消！');
 * 					$(this).closest('.org-alert').remove();
 * 				}}
 * 			]
 * 		});
 * 	}).appendTo(alert1);
 */
$.fn.alertUI=function(_object_cfg){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg](_object_par);
	}
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:$('body'),
				'class':'',
				mode:0,
				body:'',
				title:'',
				fun:{},//预留
				btns:{
					iconAlign:'',
					icon:'',
					val:'',
					'class':'',
					click:function(){}
				}
			};//默认参数
			_.cfg=$.extend(true,{},_.par,_object_cfg);//初始化参数
			//遍历按钮参数
			if(_object_cfg.btns){
				$.each(_object_cfg.btns,function(i){
					_.cfg.btns[i]=$.extend({},_.par.btns,this);
				});
			}
		},
		//初始化控件
		ui:function(){
			//绑定控件参数及样式
			_.controls=_.attr({key:_.cfg.key,'class':'org-alert '+_.cfg['class']}).css({'top':$('body').scrollTop(),'height':$('body').height()+'px'}).appendTo(_.cfg.of);
			_.alert=$('<div>',{'class':_.fun.addClass()}).appendTo(_.controls);//控件
			$('<a class="close"><i class="fa fa-close"></i></a>').appendTo(_.alert).click(function(){
				_.controls.remove();
			});//关闭按钮
			$('<h4>',{html:_.cfg.title}).appendTo(_.alert);//标题
			$('<p>',{html:_.cfg.body}).appendTo(_.alert);//内容
			
			_.btns=$('<p>',{'class':'text-right'}).appendTo(_.alert);//按钮组
			
			var par={};
			$.each(_.cfg.btns,function(){//循环生成按钮
				par.a=$('<a>',{'class':'btn btn-default '+this['class'],click:this.click}).append(
					this.val
				).appendTo(_.btns);//按钮对象
				if(this.icon){
					par.i='<i class="fa '+this.icon+'"></i>';
					switch(this.iconAlign){
						case 'right'://居右
							par.a.append(par.i);
							break;
						default://居左
							par.a.prepend(par.i);
							break;
					}
				}
			});
			par=null;
			try{_.controls.alert();}catch(e){}
			$(window).resize(_.fun.scrollResize).scroll(_.fun.scrollResize);
		},
		//添加主题
		addClass:function(){
			var string_class='alert alert-';
			switch(_.cfg.mode){
				case 1://绿色
					string_class+='success';
					break;
				case 2://蓝色
					string_class+='info';
					break;
				case 3://黄色
					string_class+='warning';
					break;
				default://红色
					string_class+='danger';
					break;
			}
			return string_class+' fade in';
		},
		//根据窗体滚动
		scrollResize:function(){
			_.controls.css({'top':$('body').scrollTop(),'height':$('body').height()+'px'});
		}
	};
	_.refun={};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	return _.controls;//返回当前控件
};
/**
 * <h3>Grid</h3>
 * 	<b>Date:</b> 2014-11-26<br>
 * 	<b>Modify:</b> 2014-01-04<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 *	<script>
 *	$(function(){
 *		$("div#method_gridUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-grid":"grid1","style":"height:400px"})
 *			)
 *		);
 *		var div_grid=$("<div>").gridUI({
 * 			key:"grid1",
 * 			btns:[
 * 				{val:"添加",icon:"fa-credit-card",click:function(){
 * 					var article_add = div_grid.gridUI("getAside",{class:"add"});
 * 					//判断添加页面是否存在，如存在则清空
 * 					if(1==article_add.length){
 * 						article_add.remove();
 * 					}
 * 					//注册添加页面
 * 					article_add = $("<article>");
 * 					div_grid.gridUI("setAside",{class:"add",div:article_add});
 * 					pubFun.load({url:"http:\/\/www.baidu.com",suc:function(_data){
 * 						article_add.html(_data);
 * 						article_add.find("a").not("[href]").attr("href","javascript:;");
 * 					}});
 * 				}},
 * 				{val:"修改",icon:"fa-edit",click:function(){
 * 					var a_selectList = div_grid.gridUI("val");
 * 					//判断选中数据条数
 * 					if(1!=a_selectList.split(",").length||""==a_selectList.split(",")[0]){
 * 						$("<div>").msgUI({msg:"请选择一条数据进行修改操作！",mode:2});
 * 						return false;
 * 					}
 * 					var article_edit = div_grid.gridUI("getAside",{class:"edit"});
 * 					//判断修改页面是否存在，如存在则清空
 * 					if(1==article_edit.length){
 * 						article_edit.remove();
 * 					}
 * 					//注册修改页面
 * 					div_grid.gridUI("setAside",{
 * 						class:"edit",
 * 						div:$("<div>",{html:"test"})
 * 					});
 * 				}},
 * 				{val:"删除",icon:"fa-trash-o",click:function(){
 * 					var a_selectList = div_grid.gridUI("val");
 * 					//判断选中数据条数
 * 					if(""==a_selectList.split(",")[0]){
 * 						$("<div>").msgUI({msg:"请至少选择一条数据进行删除操作！",mode:2});
 * 						return false;
 * 					}
 * 					$("<div>").alertUI({
 * 						winClass:"alert-danger",
 * 						title:"删除",
 * 						body:"确定删除选中数据？",
 * 						btns:[
 * 							{val:"删除",icon:"fa-trash",class:"btn-danger",click:function(){
 * 								alert(div_grid.gridUI("val"));
 * 								div_grid.gridUI("removeTrash");
 * 								$(this).closest(".org-alert").remove();
 * 							}},
 * 							{val:"取消",icon:"fa-ban",click:function(){
 * 								$(this).closest(".org-alert").remove();
 * 							}},
 * 						]
 * 					});
 * 				}},
 * 				{key:"_select",val:"选中",icon:"fa-shopping-cart",click:function(){
 * 					div_grid.gridUI("getAside",{class:"_select"});
 * 				}}
 * 			],
 * 			head:[
 * 				{val:"编号",field:"id",type:"1"},
 * 				{val:"文件名称",field:"name",width:"100px"},
 * 				{val:"文件类型",field:"type"},
 * 				{val:"文件路径",field:"path",width:"100px"},
 * 				{val:"修改时间",field:"mtime",type:"3",width:"100px"},
 * 				{val:"创建时间",field:"ctime",type:"3"}
 * 			],
 * 			data:[
 * 				[
 * 					{field:"id",val:"1"},
 * 					{field:"name",val:"aaa"},
 * 					{field:"type",val:"jpg"},
 * 					{field:"path",val:"c:/ddd"},
 * 					{field:"mtime",val:"2014-11-27 17:55"},
 * 					{field:"mtime",val:"2014-11-26 17:50"}
 * 				],
 * 				[
 * 					{field:"id",val:"2"},
 * 					{field:"name",val:"bbb"},
 * 					{field:"type",val:"png"},
 * 					{field:"path",val:"c:/ddd"},
 * 					{field:"mtime",val:"2014-11-27 17:55"},
 * 					{field:"mtime",val:"2014-11-26 17:50"}
 * 				]
 * 			],
 * 			fun:{
 * 				search:function(_object_search){
 * 					$("<div>").msgUI({msg:_object_search.val(),mode:3});
 * 					return true;
 * 				}
 * 			},
 * 			of:$("div[data-grid=\"grid1\"]")
 * 		});
 *	});
 *	</script>
 * @class gridUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {boolean} [_object_cfg.bordered=false] 表格边框
 * 	@param {boolean} [_object_cfg.striped=true] 条纹状表格
 * 	@param {boolean} [_object_cfg.hover=true] 鼠标悬停
 * 	@param {boolean} [_object_cfg.scrollHover=true] 鼠标悬停滚动条
 * 	@param {boolean} [_object_cfg.pagination=true] 分页
 * 	@param {boolean} [_object_cfg.search=false] 搜索
 * 	@param {boolean} [_object_cfg.condensed=false] 紧缩表格
 * 	@param {object} [_object_cfg.fun] 绑定事件
 * 		@param {function} [_object_cfg.fun.search] 查询提交前回掉方法
 * 		@param {function} [_object_cfg.fun.close] 关闭侧边栏回调方法
 * 		@param {function} [_object_cfg.fun.filter] 查询过滤回调方法
 * 	@param {object} [_object_cfg.ajax] 异步请求
 * 		@param {string} [_object_cfg.ajax.url=''] 请求地址
 * 		@param {object} [_object_cfg.ajax.data] 请求参数
 * 			@param {int} [_object_cfg.ajax.data.page=1] 当前页数
 * 			@param {int} [_object_cfg.ajax.data.count=15] 每页数据行
 * 			@param {string} [_object_cfg.ajax.data.mark='id'] 选中项标识列
 * 	@param {object} [_object_cfg.btns] 按钮组
 * 		@param {string} [_object_cfg.btns.icon=''] 按钮图标
 * 		@param {string} [_object_cfg.btns.iconAlign=''] 图标显示方向
 * 			1. left：居左（默认）
 * 			2. right：居右
 * 		@param {string} [_object_cfg.btns.val=''] 文本
 * 		@param {string} [_object_cfg.btns.class=''] 自定义样式
 * 		@param {function} [_object_cfg.btns.click] 绑定单击事件
 * 	@param {object} _object_cfg.head 表头
 * 		@param {string} _object_cfg.head.val 列名
 * 		@param {string} _object_cfg.head.field 绑定字段
 * 		@param {string} [_object_cfg.head.type='2'] 列类型
 * 			1. "1"：数字
 * 			2. "2"：字符串（默认）
 * 			3. "3"：时间
 * 		@param {string} [_object_cfg.head.width] 列宽（设定后，内容超出设定宽度会自动缩略，并鼠标在其格悬停时浮动显示完整内容）
 * 		@param {string} [_object_cfg.head.placement='top'] 提示显示方向
 * 			1. top：上（默认）
 * 			2. bottom：下
 * 			3. left：左
 * 			4. right：右
 * 		@param {int} [_object_cfg.head.get=0] 本列定制标识
 * 			0. 不定制（默认）
 * 			1. 定制
 * 		@param {string} [_object_cfg.head.class=''] 自定义样式
 * 		@param {boolean} [_object_cfg.head.tooltip=true] 列提示
 * 			0. false：不显示
 * 			1. true：显示（默认）
 * 	@param {object} [_object_cfg.data] 本地数据
 * 		@param {string} [_object_cfg.data.field] 绑定字段
 * 		@param {string} [_object_cfg.data.val] 内容
 * @param {object} [_object_par] 调用方法传入参数
 * @constructor
 * @chainable
 * @example
 * 	var grid1=$('<li>').appendTo($('body>ol#__logs'));
 * 	var div_grid=$('<div>').gridUI({
 * 		key:'grid1',
 * 		btns:[
 * 			{val:'添加',icon:'fa-credit-card',click:function(){
 * 				var article_add = div_grid.gridUI('getAside',{class:'add'});
 * 				//判断添加页面是否存在，如存在则清空
 * 				if(1==article_add.length){
 * 					article_add.remove();
 * 				}
 * 				//注册添加页面
 * 				article_add = $('<article>');
 * 				div_grid.gridUI('setAside',{class:'add',div:article_add});
 * 					pubFun.load({url:'http://www.baidu.com',suc:function(_data){
 * 					article_add.html(_data);
 * 					article_add.find('a').not('[href]').attr('href','javascript:;');
 * 				}});
 * 			}},
 * 			{val:'修改',icon:'fa-edit',click:function(){
 * 				var a_selectList = div_grid.gridUI('val');
 * 				//判断选中数据条数
 * 				if(1!=a_selectList.split(',').length||''==a_selectList.split(',')[0]){
 * 					$('<div>').msgUI({msg:'请选择一条数据进行修改操作！',mode:2});
 * 					return false;
 * 				}
 * 				var article_edit = div_grid.gridUI('getAside',{class:'edit'});
 * 				//判断修改页面是否存在，如存在则清空
 * 				if(1==article_edit.length){
 * 					article_edit.remove();
 * 				}
 * 				//注册修改页面
 * 				div_grid.gridUI('setAside',{
 * 					class:'edit',
 * 					div:$('<div>',{html:'test'})
 * 				});
 * 			}},
 * 			{val:'删除',icon:'fa-trash-o',click:function(){
 * 				var a_selectList = div_grid.gridUI('val');
 * 				//判断选中数据条数
 * 				if(""==a_selectList.split(',')[0]){
 * 					$('<div>').msgUI({msg:'请至少选择一条数据进行删除操作！',mode:2});
 * 					return false;
 * 				}
 * 				$('<div>').alertUI({
 * 					winClass:'alert-danger',
 * 					title:'删除',
 * 					body:'确定删除选中数据？',
 * 					btns:[
 * 						{val:'删除',icon:'fa-trash',class:'btn-danger',click:function(){
 * 							alert(div_grid.gridUI('val'));
 * 							div_grid.gridUI('removeTrash');
 * 							$(this).closest('.org-alert').remove();
 * 						}},
 * 						{val:'取消',icon:'fa-ban',click:function(){
 * 							$(this).closest('.org-alert').remove();
 * 						}},
 * 					]
 * 				});
 * 			}},
 * 			{key:'_select',val:'选中',icon:'fa-shopping-cart',click:function(){
 * 				div_grid.gridUI('getAside',{class:'_select'});
 * 			}}
 * 		],
 * 		head:[
 * 			{val:"编号",field:"id",type:"1"},
 * 			{val:"文件名称",field:"name",width:"100px"},
 * 			{val:"文件类型",field:"type"},
 * 			{val:"文件路径",field:"path",width:"100px"},
 * 			{val:"修改时间",field:"mtime",type:"3",width:"100px"},
 * 			{val:"创建时间",field:"ctime",type:"3"}
 * 		],
 * 		data:[
 * 			[
 * 				{field:"id",val:"1"},
 * 				{field:"name",val:"aaa"},
 * 				{field:"type",val:"jpg"},
 * 				{field:"path",val:"c:/ddd"},
 * 				{field:"mtime",val:"2014-11-27 17:55"},
 * 				{field:"mtime",val:"2014-11-26 17:50"}
 * 			],[
 * 				{field:"id",val:"2"},
 * 				{field:"name",val:"bbb"},
 * 				{field:"type",val:"png"},
 * 				{field:"path",val:"c:/ddd"},
 * 				{field:"mtime",val:"2014-11-27 17:55"},
 * 				{field:"mtime",val:"2014-11-26 17:50"}
 * 			]
 * 		],
 * 		fun:{
 * 			search:function(_object_search){
 * 				$('<div>').msgUI({msg:_object_search.val(),mode:3});
 * 				return true;
 * 			}
 * 		},
 * 		of:grid1
 * 	});
 */
$.fn.gridUI=function(_object_cfg,_object_par){
	var _=this;//控件
	//返回已选中选项值
	if(!_object_cfg){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		//_=_.prevObject;//本行代码正常使用控件时需开启，注释仅为api文档使用模式
		return _.refun[_object_cfg](_object_par);
	}
	//注册内部方法
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:$('body'),
				tooltip:false,
				'class':'',
				bordered:false,
				striped:true,
				hover:true,
				scrollHover:true,
				pagination:true,
				search:true,
				condensed:false,
				fun:{
					search:null,
					close:null,
					filter:null
				},
				ajax:{
					url:'',
					data:{
						page:1,
						count:15,
						mark:'id'
					}
				},
				btns:{
					iconAlign:'left',
					icon:'',
					val:'',
					key:''
				},
				head:{
					field:'',
					val:'',
					'class':'',
					width:'',
					type:'2',
					get:0,
					placement:'top',
					tooltip:false
				},
				data:{
					field:'',
					val:''
				}
			};//默认参数
			_.cfg=$.extend(true,{},_.par,_object_cfg);//初始化参数
			//遍历按钮参数
			$.each(_object_cfg.btns,function(i){
				_.cfg.btns[i]=$.extend({},_.par.btns,this);
			});
			//遍历表头参数
			$.each(_object_cfg.head,function(i){
				_.cfg.head[i]=$.extend({},_.par.head,this);
			});
			//遍历列参数
			if(_object_cfg.data){
				$.each(_object_cfg.data,function(a){
					_.cfg.data[a]={};
					$.each(this,function(b){
						_.cfg.data[a][b]=$.extend({},_.par.data,this);
					});
				});
			}
		},
		//初始化控件
		ui:function(){
			//绑定控件参数及样式
			_.controls=_.attr({key:_.cfg.key,'class':'org-grid panel panel-default '+_.cfg['class']}).appendTo(_.cfg.of);
			//功能菜单
			_.nav=$('<nav>',{'class':'panel-heading container-fluid'}).appendTo(_.controls);
			//内容
			_.section=$('<section>',{'class':'panel-body'}).appendTo(_.controls);
			if(_.cfg.pagination){
				//状态栏
				_.footer=$('<footer>',{'class':'panel-footer'}).appendTo(_.controls);
			}else{
				_.controls.addClass('no-footer');
			}
			//按钮-功能菜单
			_.btns=$('<div>',{'class':'btn-group pull-left'}).appendTo(_.nav);
			
			var par={};
			//遍历按钮
			$.each(_.cfg.btns,function(){
				par.a=$('<a>',{key:this.key,'class':'btn btn-default',html:'<label>'+this.val+'</label>',click:this.click}).appendTo(_.btns);
				if(''!=this.icon){
					switch(this.iconAlign){ 
						case 'right'://居右
							par.a.append('<i class="fa '+this.icon+'"></i>');
							break;
						default://居左
							par.a.prepend('<i class="fa '+this.icon+'"></i>');
							break;
					}
				}
			});
			//如果是选中按钮,则加入开启选中列事件
			_.btns.find('>a[key="_select"]').click(function(){
				_.aside_select.show();
				_.aside.show();
			});
			
			//搜索-功能菜单
			if(_.cfg.search){
				_.search=$('<div class="input-group col-xs-2 pull-right"><input type="search" class="form-control input-sm" placeholder="请输入查询条件！"><div class="input-group-btn"><a class="btn btn-default"><i class="fa fa-search"></i></a><a class="btn btn-default"><i class="fa fa-filter"></i></a></div></div>').appendTo(_.nav);
				_.search.find('input').keyup(function(e){
					if(13==e.keyCode){//Enter事件
						_.fun.search();
					}
				}).click(function(){
					_.btns.fadeOut('slow',function(){
						_.search.addClass('max').find('input').animate({width:'100%'},'slow');
					});
				}).blur(function(){
					$(this).animate({width:'110px'},'slow',function(){
						_.search.removeClass('max');
						_.btns.fadeIn('slow');
					});
				});
                _.search.find('a>i.fa-search').parent().click(function(){
                    _.fun.search();
                });
                _.search.find('a>i.fa-filter').parent().click(function(){
					_.fun.filter();
                });
			}
			//主内容-内容
			_.article=$('<article>',{'class':_.cfg.scrollHover?'scrollHover':''}).appendTo(_.section);
			//数据表格-主内容-内容
			_.table=$('<table>',{'class':'table'}).appendTo(_.article);
			//表格边框
			if(_.cfg.bordered){
				_.table.addClass('table-bordered');
			}
			//斑马条纹
			if(_.cfg.striped){
				_.table.addClass('table-striped');
			}
			//鼠标悬停
			if(_.cfg.hover){
				_.table.addClass('table-hover');
			}
			//紧缩表格
			if(_.cfg.condensed){
				_.table.addClass('table-condensed');
			}

			_.thead=$('<thead>',{html:'<tr>'}).appendTo(_.table);
			_.tbody=$('<tbody>').appendTo(_.table);
			//遍历表头
			$.each(_.cfg.head,function(i){
				par.th=$('<th>',{html:this.val}).appendTo(_.thead.find('tr'));
				if(''!=this.width){
					par.th.css('width',this.width);
				}
			});
			par=null;
			
			_.fun.dataMode();//加载数据
			_.fun.aside();//侧边栏-主内容-内容

			_.controls.find('a').not('[href]').attr('href','javascript:;');

			//body滚动条
			_.article.scroll(function(){
				if('static'==_.thead_clone.css('position')){
					return false;
				}
				if(_.article.scrollTop()>5){
					_.thead_clone.show().css('left',-_.article.scrollLeft());
					_.thead.css('opacity',0);
				}else{
					_.thead_clone.hide();
					_.thead.css('opacity',1).find('th').css('padding-bottom','8px');
				}
			});
			//窗体发生变化
			$(window).resize(function(){
				_.thead.find('th').each(function(i){
					_.thead_clone.find('th:eq('+i+')').width($(this).width());
				});
			});
		},
		//查询
		search:function(){
			if($.isFunction(_.cfg.fun.search)){
				if(!_.cfg.fun.search(_.search.find('input'))){//根据回调方法返回判断是否进行查询
					return false;
				}
			}
			_.cfg.ajax.data.search=$.trim(_.search.find('input').val());//设置查询内容
			_.cfg.ajax.data.page=1;//设定查询后默认显示页
			_.fun.dataMode();//查询并加载数据
		},
		//过滤
		filter:function(){
			if($.isFunction(_.cfg.fun.filter)){
				_.cfg.fun.filter();
			}
		},
		//数据加载模式
		dataMode:function(){
			if(''!=_.cfg.ajax.url){//ajax加载
				pubFun.ajax({
					url:_.cfg.ajax.url,
					data:_.cfg.ajax.data,
					suc:function(_data){//成功
						if('suc'==_data.msg){
							_.cfg.data=_data.data.data;
							_.sum=_data.data.sum;
							_.tbody.find('td').tooltip('destroy');
							_.tbody.empty();
							_.fun.data();
							_.fun.head();
							_.fun.page();
						}else{
							console.log('suc-err:  ',_data);
							$('<div>').msgUI({msg:'加载数据失败！'});
						}
					},bes:function(){//请求前
						
					},cpl:function(){//请求返回
						
					},err:function(_data){//请求失败
						console.log('err:  ',_data);
						$('<div>').msgUI({msg:'加载数据失败！'});
					}
				});
			}else{//本地加载
				_.tbody.find('td').tooltip('destroy');
				_.tbody.empty();
				_.fun.data();
				_.fun.head();
				//分页-状态栏
				_.sum=parseInt(_.cfg.data.length/_.cfg.ajax.data.count)+(0==_.cfg.data.length%_.cfg.ajax.data.count?0:1);
				_.fun.page();
			}
		},
		//表头浮动
		head:function(){
			if(_.thead_clone){//移除以前浮动表头
				_.thead_clone.remove();
			}
			_.thead_clone=_.thead.clone().hide();//添加浮动表头
			//遍历浮动表头
			_.thead.find('th').each(function(i){
				_.thead_clone.find('th:eq('+i+')').width($(this).outerWidth());
			});
			_.thead_clone.appendTo(_.table);
			if(_.article.scrollTop()>5){//设置表头浮动
				_.thead_clone.show().css('left',-_.article.scrollLeft());
				_.thead.css('opacity',0);
			}
		},
		//加载数据
		data:function(){
			var par={};
			$.each(_.cfg.data,function(i){
				if(1==_.cfg.ajax.data.page){//判断当前页数
					if(i>=_.cfg.ajax.data.page*_.cfg.ajax.data.count){return false}//遍历第1页数据
				}else{
					if(i>=_.cfg.ajax.data.page*_.cfg.ajax.data.count||i<(_.cfg.ajax.data.page-1)*_.cfg.ajax.data.count){return true}//遍历当前页数据
				}
				par.datas=this;//设置数据
				par.customize={};//定制数据集合
				par.row=$('<tr>',{key:par.key}).appendTo(_.tbody);
				//根据表头遍历数据
				$.each(_.cfg.head,function(){//遍历表头
					for(var i in par.datas){//遍历数据
						if(this.field==par.datas[i].field){//数据与表头一致
							par.data=par.datas[i];
							break;
						}
					}
					if(_.cfg.ajax.data.mark==this.field){//判断标识列
						par.row.attr('key',par.data.val);
						if(!(undefined==_.div_select||0==_.div_select.find('>a[key="'+par.data.val+'"]').length)){
							par.row.addClass('info');
						}
					}
					if(1==this.get){//判断本列是否定制
						par.customize[this.field]=par.data.val;
					}
					par.td=$('<td>',{html:par.data.val}).appendTo(par.row);//绑定表格内容
					if(''!=this.width){//判断是否设置列宽
						par.td.html('<div style="width:'+this.width+'">'+par.td.html()+'</div>');
					}
					if(this.tooltip){//为当前格绑定完整内容提示
						par.td.attr({'data-toggle':'tooltip','data-container':'body','title':par.data.val}).tooltip();
					}
				});
				par.row.click(function(){//设定表格数据行点击事件
					var tr_this=$(this),//当前行对象
						str_key=tr_this.attr('key');//当前行标识
					if(tr_this.hasClass('info')){//选中
						tr_this.removeClass('info');//移除选中样式
						_.div_select.find('>a[key="'+str_key+'"]').remove();//从选中列表移除
						if(!(0!=_.div_select.find('>a').length||1!=_.a_select.find('>i.fa-unlock').length)){//判断全选按钮状态
							_.a_select.find('>i').removeClass('fa-unlock').next().html('全选');
						}
					}else{//未选中
						tr_this.addClass('info');//添加选中样式
						$('<a>',{key:str_key,href:'javascript:;','class':'list-group-item'}).appendTo(_.div_select).append(//添加当前选中列表
							$('<a>',{'class':'btn pull-left',html:'<i class="fa fa-lock"></i>'}).click(function(){//选项锁按钮
								var i_this=$(this).find('>i');
								if(i_this.hasClass('fa-unlock')){//反选
									i_this.removeClass('fa-unlock');
									if(0==_.div_select.find('>a>a>i.fa-unlock').length){
										_.a_select.find('>i').removeClass('fa-unlock').next().html('全选');
									}
								}else{//全选
									i_this.addClass('fa-unlock');
									if(1==_.div_select.find('>a>a>i.fa-unlock').length){
										_.a_select.find('>i').addClass('fa-unlock').next().html('反选');
									}
								}
								i_this=null;
							})
						).append(//选项标识列内容
							'<label>'+str_key+'</label>'
						).append(//取消按钮
							$('<a>',{'class':'btn pull-right',html:'<i class="fa fa-ban"></i>'}).click(function(){
								_.tbody.find('>tr[key="'+$(this).parent().attr('key')+'"]').removeClass('info');//移除选中样式
								if(!(0!=$(this).parent().siblings().length||1!=_.a_select.find('>i.fa-unlock').length)){//判断全选按钮状态
									_.a_select.find('>i').removeClass('fa-unlock').next().html('全选');
								}
								$(this).parent().remove();//从选中列表移除
							})
						).data('par',tr_this.data('par'));//保存定制数据集合到本列
					}
					tr_this=str_key=null;
				}).data('par',par.customize);//保存定制数据集合
			});
			par=null;
		},
		//添加侧边栏
		aside:function(){
			_.aside=$('<aside>').appendTo(_.section);
			_.div_select=$('<div>',{'class':'list-group'});//选中列侧边栏对象
			_.a_select=$('<a>',{'class':'btn btn-default pull-right',html:'<i class="fa fa-lock"></i><label>全选</label>'}).click(function(){//全选按钮
				if(0!=_.div_select.find('>a').length){//判断是否存在选中项
					var i_this=$(this).find('>i');
					if(i_this.hasClass('fa-unlock')){//反选
						i_this.removeClass('fa-unlock').next().html('全选');
						_.div_select.find('>a>a>i.fa-unlock').removeClass('fa-unlock');
					}else{//全选
						i_this.addClass('fa-unlock').next().html('反选');
						_.div_select.find('>a>a>i.fa-lock:not([class*="fa-unlock"])').addClass('fa-unlock');
					}
					i_this=null;
				}
			});
			_.aside_select=_.refun.setAside({
				'class':'_select',
				div:_.div_select,
				display:false
			}).hide();//绑定选中列侧边栏
			_.aside_select.find('>nav>div').append(
				$('<a>',{'class':'btn btn-default pull-right',href:'javascript:;',html:'<i class="fa fa-trash"></i><label>清空</label>'}).click(function(){//清空选中列按钮
					_.div_select.empty();
					_.tbody.find('>tr.info').removeClass('info');
					if(1==_.a_select.find('>i.fa-unlock').length){
						_.a_select.find('>i').removeClass('fa-unlock').next().html('全选');
					}
				})
			).append(_.a_select);

			_.aside.hide();
		},
		//加载页数
		page:function(){
			if(!_.cfg.pagination){return;}//判断是否显示分页
			if(0==_.footer.children().length){//初次添加分页组件
				_.input_go=$('<input>',{type:'text',placeholder:'Go','class':'form-control input-sm'}).keyup(function(e){//go文本框键盘弹起事件
					if(13==e.keyCode){//Enter事件
						$(this).siblings('div').find('>a').click();//调用转到按钮点击事件
					}
				});
				$('<div>',{'class':'input-group pull-left'}).append(//添加go文本框
					_.input_go
				).append(
					'<span class="input-group-addon">/ '+_.sum+'</span>'//添加总页数
				).append(
					$('<div>',{'class':'input-group-btn'}).append(//添加转到按钮
						$('<a>',{'class':'btn btn-default',html:'<i class="fa fa-reply-all"></i><label>转到</label>'}).click(function(){
							var par={val:$.trim(_.input_go.val())};
							if(0>=par.val.length){return}//不可为空
							if(!/^[0-9]*$/g.test(par.val)){_.input_go.select();return;}//不可输入非数字字符
							par.intVal=parseInt(par.val);
							if(0>=par.intVal||par.intVal>_.sum){_.input_go.select();return;}//不可小于0且不可大于总页数
							
							_.cfg.ajax.data.page=par.intVal;//设定页面
							_.fun.dataMode();//加载数据
							par=null;
						})
					)
				).appendTo(_.footer);
				
				$('<div>',{'class':'btn-group'}).append(//首页
					$('<a>',{html:'<i class="fa fa-angle-double-left"></i><label>首页</label>','class':'btn btn-default',disabled:'disabled'}).click(function(){
						_.cfg.ajax.data.page=1;
						_.fun.dataMode();
					})
				).append(//上一页
					$('<a>',{html:'<i class="fa fa-angle-left"></i><label>上一页</label>','class':'btn btn-default',disabled:'disabled'}).click(function(){
						_.cfg.ajax.data.page--;
						_.fun.dataMode();
					})
				).append(//下一页
					$('<a>',{html:'<i class="fa fa-angle-right"></i><label>下一页</label>','class':'btn btn-default'}).click(function(){
						_.cfg.ajax.data.page++;
						_.fun.dataMode();
					})
				).append(//末页
					$('<a>',{html:'<i class="fa fa-angle-double-right"></i><label>末页</label>','class':'btn btn-default'}).click(function(){
						_.cfg.ajax.data.page=_.sum;
						_.fun.dataMode();
					})
				).appendTo(_.footer);
				
				_.footer.find('a').not('[href]').attr('href','javascript:;');
				
				if(1==_.sum){//判断总页数，如只有一页，则禁止所有分页组件事件
					_.footer.find('>div.btn-group>a:gt(1)').attr('disabled','disabled');
				}
			}else{
				_.input_go.val(_.cfg.ajax.data.page);//设定当前页数
				_.input_go.next().html('/ '+_.sum);//设定总页数
				_.footer.find('>div.btn-group>a').removeAttr('disabled');//解除分页组件禁止的事件
				if(1==_.cfg.ajax.data.page){//如当前为第一页，则禁止首页、上一页事件
					_.footer.find('>div.btn-group>a:lt(2)').attr('disabled','disabled');
				}
				if(_.cfg.ajax.data.page==_.sum){//如当前为最后一页，则禁止下一页、末页事件
					_.footer.find('>div.btn-group>a:gt(1)').attr('disabled','disabled');
				}
			}
		}
	};
	//注册调用方法
	_.refun={
		/**
		 * 刷新数据列表
		 * @method refresh
		 * @example
		 * 	grid1.gridUI('refresh');
		 */
		refresh:function(){
			_.fun.dataMode();
		},
		/**
		 * 关闭侧边栏
		 * @method refresh
		 * @example
		 * 	grid1.gridUI('closeAside');
		 */
		closeAside:function(){
			_.controls.removeClass('org-grid-aside');//移除自适应标识
			_.aside.hide().find('>div').hide();
		},
		/**
		 * 获取选中数据集合
		 * @method getAllVal
		 * @return {jquery object} 选中数据对象集合
		 * @example
		 * 	grid1.gridUI('getAllVal');
		 */
		getAllVal:function(){
			return _.aside.find('>div._select div.list-group>a');
		},
		/**
		 * 获取侧边栏
		 * @method getAside
		 * @param {object} _object_par 传入参数
		 * 	@param {string} _object_par.class 侧边栏Class名称
		 * @return {jquery object} 侧边栏对象
		 * @example
		 * 	grid1.gridUI('getAside',{class:'_select'});
		 */
		getAside:function(_object_par){
			_object_par._div= _.aside.find('>div.'+_object_par['class']);
			_object_par._div.siblings().hide();
			if(!_.controls.hasClass('org-grid-aside')){
				_.controls.addClass('org-grid-aside');
			}
			return _object_par._div;
		},
		/**
		 * 添加侧边栏
		 * @method setAside
		 * @param {object} _object_par 传入参数
		 * 	@param {string} _object_par.class 侧边栏Class名称
		 * 	@param {string} [_object_par.url] 加载页面链接地址
		 * 	@param {string|object} [_object_par.div] 加载html字符串或jquery对象
		 * 	@param {function} [_object_par.fun] 加载页面后回掉方法
		 * 	@param {boolean} [_object_par.display] 侧边栏默认是否显示
		 * 		1. true： 显示（默认）
		 * 		2. false: 隐藏
		 * @return {jquery object} 加载侧边栏内嵌html后返回侧边栏对象
		 * @example
		 * 	grid1.gridUI('setAside',{class:'add1',url:'http://www.google.com'});
		 * 	//or
		 * 	grid1.gridUI('setAside',{class:'add2',url:'http://www.google.com',fun:function(_object_aside){
		 * 		console.log(_object_aside);//侧边栏对象
		 * 	}});
		 * 	//or
		 * 	grid1.gridUI('setAside',{class:'add3',div:'<div>test</div>'});
		 * 	//or
		 * 	grid1.gridUI('setAside',{class:'add4',div:$('<div>',{html:'test'})});
		 * 	//or
		 * 	var object_aside_add5 = grid1.gridUI('setAside',{class:'add5',div:$('<div>',{html:'test'})});
		 * 	console.log(object_aside_add5);//侧边栏对象
		 */
		setAside:function(_object_par){
			if(_.aside.is(':hidden')){//判断侧边栏容器是否隐藏
				_.aside.show();//显示侧边栏容器
			}
			_.aside.find('>div').hide();//隐藏所有侧边栏
			_object_par._div=_.aside.find('>div.'+_object_par['class']);//获取要添加的侧边栏
			if(1==_object_par._div.length){//判断要添加的侧
				if(!_.controls.hasClass('org-grid-aside')){
					_.controls.addClass('org-grid-aside');
				}
				return _object_par._div.show();
			}
			//生成侧边栏
			_object_par._div=$('<div>',{'class':'panel panel-default '+_object_par['class']}).appendTo(_.aside).append(
				$('<nav>',{'class':'panel-heading container-fluid'}).append(
					$('<div>',{'class':'btn-group'}).append(
						$('<a>',{'class':'btn btn-default',href:'javascript:;',html:'<i class="fa fa-close"></i><label>关闭</label>'}).click(function(){
							if($.isFunction(_.cfg.fun.close)){//判断是否含有回调函数
								_.cfg.fun.close($(this).closest('.panel'));
							}else{
								_.controls.removeClass('org-grid-aside');//移除自适应标识
								_.aside.hide().find('>div').hide();
							}
						})
					)
				)
			).append(
				$('<section>',{'class':'panel-body'})
			);
			if(undefined==_object_par.display||true==_object_par.display){//如果不存在或已经显示则添加自适应标识
				_.controls.addClass('org-grid-aside');
			}
			_object_par._div.show();//显示侧边栏
			if(_object_par.url){//加载侧边栏内嵌页面
				pubFun.load({url:_object_par.url,suc:function(_data){
					_object_par._div.find('>section').html(_data).find('a').not('[href]').attr('href','javascript:;');
					_object_par.fun(_object_par._div);
				}});
			}else{//加载侧边栏内嵌html
				_object_par._div.find('>section').html(_object_par.div);
				return _object_par._div;
			}
		},
		/**
		 * 移除选中并锁定的数据列
		 * @method removeTrash
		 * @example
		 * 	grid1.gridUI('removeTrash');
		 */
		removeTrash:function(){
			_.div_select.find('>a>a>i.fa-lock:not([class*="fa-unlock"])').each(function(){
				_.tbody.find('>tr[key="'+$(this).closest('.list-group-item').attr('key')+'"]').removeClass('info');
			}).closest('.list-group-item').remove();
		},
		/**
		 * 获取选中项键集合
		 * @method val
		 * @return {jquery object} 选中项键集合
		 * @example
		 * 	var a_selectList = grid1.gridUI('val');
		 * 	if(1!=a_selectList.split(',').length||''==a_selectList.split(',')[0]){//判断选中数据条数并且是一条数据
		 * 		alert('请选择一条数据进行操作！');
		 * 	}
		 * 	//or
		 * 	if(''==a_selectList.split(',')[0]){//判断选中数据条数
		 * 		alert('请至少选择一条数据进行操作！');
		 * 	}
		 */
		val:function(){
			return _.div_select.find('>a>a>i.fa-lock:not([class*="fa-unlock"])').map(function(){return $(this).closest('.list-group-item').attr('key')}).get().join();
		},
		/**
		 * 获取选中项的定制数据集合
		 * @method getCustomizeVal
		 * @return {jquery object} 选中项键集合
		 * @example
		 * 	var a_customizeList = grid1.gridUI('getCustomizeVal');
		 * 	console.log(a_customizeList);//选中项定制数据键集合
		 */
		getCustomizeVal:function(){
			return _.div_select.find('>a>a>i.fa-lock:not([class*="fa-unlock"])').map(function(){
				return JSON.stringify($(this).closest('.list-group-item').data('par'));
			}).get().join();
		}
	};
	_.fun.init();/*初始化设置*/
	_.fun.ui();/*初始化控件*/
	_.controls.data('this',_.controls);//缓存当前控件对象
	return _.controls;/*返回当前控件*/
};
/**
 * <h3>Msg</h3>
 * 	<b>Date:</b> 2014-02-28<br>
 * 	<b>Modify:</b> 2014-12-10<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 * 	<script>
 *	$(function(){
 *		$("div#method_msgUI\>div.example\>h4").after(
 *			$("<div>",{class:"example-content prettyprint"}).append(
 *				$("<div>",{"data-msg":"msg1"})
 *			)
 *		);
 * 		$("<a>",{"class":"btn btn-success","style":"margin-right:10px","click":function(){
 * 			$("<div>").msgUI({msg:"操作成功！",mode:1});
 * 		}}).html("success").appendTo($("div[data-msg=\"msg1\"]"));
 * 		$("<a>",{"class":"btn btn-info","style":"margin-right:10px","click":function(){
 * 			$("<div>").msgUI({msg:"此项不可为空！",mode:2});
 * 		}}).html("info").appendTo($("div[data-msg=\"msg1\"]"));
 * 		$("<a>",{"class":"btn btn-warning","style":"margin-right:10px","click":function(){
 * 			$("<div>").msgUI({msg:"非法操作！",mode:3,time:3000});
 * 		}}).html("warning").appendTo($("div[data-msg=\"msg1\"]"));
 * 		$("<a>",{"class":"btn btn-danger","click":function(){
 * 			$("<div>").msgUI({msg:"操作失败！"});
 * 		}}).html("danger").appendTo($("div[data-msg=\"msg1\"]"));
 *	});
 * 	</script>
 * @class msgUI
 * @since 1.1.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {int} [_object_cfg.mode=0] 显示样式
 * 		0. 红色（默认）
 * 		1. 绿色
 * 		2. 蓝色
 * 		3. 橙色
 * 	@param {string} [_object_cfg.msg=''] 提示信息
 * 	@param {int} [_object_cfg.width=300] 显示宽度
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {jquery object} [_object_cfg.parent=$(window)] 依附容器
 * 	@param {boolean} [_object_cfg.close=ture] 自动关闭
 * 		1. true 自动关闭（默认）
 * 		2. false 不自动关闭
 * 	@param {int} [_object_cfg.time=5000] 显示时间，配合自动关闭
 * @constructor
 * @chainable
 * @example 
 * 	$('<div>').msgUI({msg:'操作成功！',mode:1});
 * 	//or
 * 	$('<div>').msgUI({msg:'此项不可为空！',mode:2,close:false});
 * 	//or
 * 	$('<div>').msgUI({msg:'非法操作！',mode:3,time:3000});
 * 	//or
 * 	$('<div>').msgUI({msg:'操作失败！'});
 */
$.fn.msgUI=function(_object_cfg,_object_par){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg](_object_par);
	}
	//注册内部方法
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				mode:0,
				msg:'',
				width:300,
				of:$('body'),
				parent:$(window),
				close:true,
				time:5000
			};//默认参数
			_.cfg=$.extend({},_.par,_object_cfg);//初始化参数
		},
		//初始化控件
		ui:function(){
			//绑定控件参数及样式
			_.controls=_.attr({key:_.cfg.key,'class':_.fun.addClass(_.cfg.mode)}).appendTo(_.cfg.of).append(
				$('<buuton>',{type:'button','class':'close','data-dismiss':'alert',html:'×'}).click(function(){
					if(null!=_._c){clearTimeout(_._c);_._c=null}
				})
			).append('<h7>'+_.cfg.msg+'</h7>').width(_.cfg.width).slideDown('slow',_.fun.slideDown);
			_.fun.setPosition();//设定初始位置
			$(window).scroll(_.fun.setPosition).resize(_.fun.setPosition);//根据窗体及滚动条移动
		},
		//添加样式
		addClass:function(){
			var string_class='alert alert-';
			switch(_.cfg.mode){
				case 1://绿色
					string_class+='success';
					break;
				case 2://蓝色
					string_class+='info';
					break;
				case 3://橙色
					string_class+='warning';
					break;
				default://红色（默认）
					string_class+='danger';
					break;
			}
			return string_class+' fade in org-msg';
		},
		//定位
		setPosition:function(){
			_.controls.css({'left':(_.cfg.parent.width()-_.cfg.width)/2,'top':_.cfg.parent.scrollTop()});
		},
		//滑动显示
		slideDown:function(){
			if(_.cfg.close){//判断是否自动关闭
				_._c=setTimeout(function(){
					_._c=null;
					_.controls.slideUp('slow',function(){$(this).remove()});//滑动关闭
				},_.cfg.time);//根据设定时间自动关闭
			}
		}
	};
	_.refun={};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	return _.controls;//返回当前控件
};
/**
 * <h3>Dialog</h3>
 * 	<b>Date:</b> 2015-01-30<br>
 * 	<b>Modify:</b> 2015-01-30<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 * 	<script>
 * 	$(function(){
 * 		$("div#method_dialogUI\>div.example\>h4").after(
 * 			$("<div>",{class:"example-content prettyprint"}).append(
 * 				$("<div>",{"data-dialog":"dialog1"})
 * 			)
 * 		);
 * 		$("<a>",{"class":"btn btn-primary","click":function(){
 * 			$("<div>").dialogUI({
 * 				key:"dialog1",
 * 				title:"标题",
 * 				body:"内容",
 * 				btns:[
 * 					{val:"保存",icon:"fa-save","class":"btn-primary",click:function(){
 * 						$(this).closest(".org-dialog").modal("hide");
 * 					}},{val:"取消",icon:"fa-ban",click:function(){
 * 						$(this).closest(".org-dialog").modal("hide");
 * 					}}
 * 				],
 * 				of:$("body")
 * 			});
 * 		}}).html("对话框").appendTo($("div[data-dialog=\"dialog1\"]"));
 *	});
 * 	</script>
 * @class dialogUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {string|jquery object} [_object_cfg.title=''] 标题
 * 	@param {string|jquery object} [_object_cfg.body=''] 内容
 * 	@param {boolean|string} [_object_cfg.backdrop=true] 设定阴影点击是否可关闭
 * 		1. true：可关闭（默认）
 * 		2. 'static'：不可关闭
 * 	@param {object} [_object_cfg.btns] 按钮组
 * 		@param {string} [_object_cfg.btns.icon=''] 图标样式
 * 		@param {string} [_object_cfg.btns.iconAlign=''] 图标显示方向
 * 			1. left：居左（默认）
 * 			2. right：居右
 * 		@param {string} [_object_cfg.btns.val=''] 文本
 * 		@param {string} [_object_cfg.btns.class=''] 自定义样式
 * 		@param {function} [_object_cfg.btns.click] 绑定单击事件
 * @constructor
 * @chainable
 * @example 
 * 		$('<div>').dialogUI({
 * 			key:'dialog1',
 * 			title:'标题',
 * 			body:'内容',
 * 			btns:[
 * 				{val:'保存',icon:'fa-save','class':'btn-primary',click:function(){
 * 					$(this).closest('.org-dialog').modal('hide');
 * 				}},{val:'取消',icon:'fa-ban',click:function(){
 * 					$(this).closest('.org-dialog').modal('hide');
 * 				}}
 * 			],
 * 			of:$('body')
 * 		});
 */
$.fn.dialogUI=function(_object_cfg,_object_par){
	var _=this;/*控件*/
	/*返回已选中选项值*/
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	/*根据参数，调用相应方法*/
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg](_object_par);
	}
	//注册内部方法
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				key:'',
				of:$('body'),
				'class':'',
				body:'',
				backdrop:true,
				title:'&nbsp;',
				btns:{
					iconAlign:'',
					icon:'',
					val:'',
					'class':'',
					click:function(){}
				}
			};/*默认参数*/
			_.cfg=$.extend(true,{},_.par,_object_cfg);/*初始化参数*/
			/*遍历选项参数*/
			if(_object_cfg.btns){
				$.each(_object_cfg.btns,function(i){
					_.cfg.btns[i]=$.extend({},_.par.btns,this);
				});
			}
		},
		//初始化控件
		ui:function(){
			/*绑定控件参数及样式*/
			_.controls=_.attr({key:_.cfg.key,'class':'org-dialog modal fade '+_.cfg['class']}).appendTo(_.cfg.of).append('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"></h4></div><div class="modal-body"><p></p></div></div></div>');
			if(''!=_.cfg.title){//判断是否绑定标题
				_.title=_.controls.find('h4.modal-title').append(_.cfg.title);
			}
			if(''!=_.cfg.body){//判断是否绑定内容
				_.body=_.controls.find('div.modal-body>p').append(_.cfg.body);
			}
			if(!(!$.isArray(_.cfg.btns)||0==_.cfg.btns.length)){//是否绑定底部按钮组
				_.footer=$('<div class="modal-footer"></div>').appendTo(_.controls.find('div.modal-content'));
				var par={};
				$.each(_.cfg.btns,function(){//循环绑定按钮
					par.a=$('<a>',{'class':'btn btn-default '+this['class'],click:this.click}).append(
						this.val
					).appendTo(_.footer);
					if(this.icon){//设置按钮图标
						par.i='<i class="fa '+this.icon+'"></i>';
						switch(this.iconAlign){//设置图标显示方向
							case 'right'://右边
								par.a.append(par.i);
								break;
							default://左边
								par.a.prepend(par.i);
								break;
						}
					}
				});
				par=null;
			}
			_.controls.modal({backdrop:_.cfg.backdrop});//创建对话框
		}
	};
	_.refun={};
	_.fun.init();/*初始化设置*/
	_.fun.ui();/*初始化控件*/
	return _.controls;/*返回当前控件*/
};
/**
 * <h3>SelectTree</h3>
 * 	<b>Date:</b> 2015-02-02<br>
 * 	<b>Modify:</b> 2015-03-01<br>
 * 	<b>Pen:</b> angelop007@gmail.com<br>
 * 	<script>
 * 	$(function(){
 * 		$("div#method_selectTreeUI\>div.example\>h4").after(
 * 			$("<div>",{class:"example-content prettyprint"}).append(
 * 				$("<div>",{"data-selectTree":"selectTree1"})
 * 			)
 * 		);
 * 		$("<div>").selectTreeUI({
 * 			"key":"selectTree",
 * 			"class":"width-auto",
 * 			tree:{
 * 				key:"tree",
 * 				check:true,
 * 				data:[
 * 					{key:"1",val:"AAA",badge:"3",child:[
 * 						{key:"1-1",val:"CCC"},
 * 						{key:"1-2",val:"DDD",child:[
 * 							{key:"1-2-1",val:"FFF"},
 * 							{key:"1-2-2",val:"GGG"}
 * 						]},
 * 						{key:"1-3",val:"EEE"}
 * 					]},
 * 					{key:"2",val:"BBB",select:2,child:[
 * 						{key:"2-1",val:"HHH"},
 * 						{key:"2-2",val:"III",select:1},
 * 						{key:"2-3",val:"JJJ",select:1,badge:"2",child:[
 * 							{key:"2-2-1",val:"KKK",select:1,icon:"fa-gamepad"},
 * 							{key:"2-2-2",val:"LLL",select:1}
 * 						]}
 * 					]}
 * 				]
 * 			},
 * 			of:$("div[data-selectTree=\"selectTree1\"]")
 * 		});
 *	});
 * 	</script>
 * @class selectTreeUI
 * @since 1.0.0
 * @param {object|string} _object_cfg 控件配置参数 | 调用方法
 * 	@param {jquery object} [_object_cfg.of=$('body')] 控件父级
 * 	@param {string} [_object_cfg.key=''] 控件名称
 * 	@param {string} [_object_cfg.class=''] 自定义样式
 * 	@param {boolean} [_object_cfg.tooltip=true] 完整选定内容提示
 * 		1. true： 显示（默认）
 * 		2. false： 不显示
 * 	@param {string} [_object_cfg.placement='top'] 提示显示方向
 * 		1. top：上（默认）
 * 		2. bottom：下
 * 		3. left：左
 * 		4. right：右
 * 	@param {object} [_object_cfg.default] 默认数据集合
 * 		@param {string} [_object_cfg.default.key='no'] 选项键
 * 		@param {string} [_object_cfg.default.val='请选择！'] 选项值
 * 	@param {object} [_object_cfg.tree] 树节点参数（参考treeUI控件相关参数）
 * @constructor
 * @chainable
 * @example
 * 	var li1=$('<li>').appendTo($('body>ol#__logs'));
 * 	$('<div>').selectTreeUI({
 * 		'key':'selectTree',
 * 		'class':'width-auto',
 * 		tree:{
 * 			key:'tree',
 * 			check:true,
 * 			data:[
 * 				{key:"1",val:"AAA",badge:"3",child:[
 * 					{key:"1-1",val:"CCC"},
 * 					{key:"1-2",val:"DDD",child:[
 * 						{key:"1-2-1",val:"FFF"},
 * 						{key:"1-2-2",val:"GGG"}
 * 					]},
 * 					{key:"1-3",val:"EEE"}
 * 				]},
 * 				{key:"2",val:"BBB",select:2,child:[
 * 					{key:"2-1",val:"HHH"},
 * 					{key:"2-2",val:"III",select:1},
 * 					{key:"2-3",val:"JJJ",select:1,badge:"2",child:[
 * 						{key:"2-2-1",val:"KKK",select:1,icon:"fa-gamepad"},
 * 						{key:"2-2-2",val:"LLL",select:1}
 * 					]}
 * 				]}
 * 			]
 * 		},
 * 		of:li1
 * 	});
 */
$.fn.selectTreeUI=function(_object_cfg,_object_par){
	var _=this;//控件
	//返回已选中选项值
	if($.isEmptyObject(_object_cfg)){
		_=_.prevObject;
		return _.refun.val();
	}
	//根据参数，调用相应方法
	if(!$.isPlainObject(_object_cfg)){
		_=_.prevObject;
		return _.refun[_object_cfg](_object_par);
	}
	//注册内部方法
	_.fun={
		//初始化设置
		init:function(){
			_.par={
				key:'',
				'default':{
					key:'no',
					val:'请选择！'
				},
				of:$('body'),
				tooltip:true,
				placement:'top',
				'class':'',
				tree:{
					check:false,
					badge:false,
					click:false,
					fun:{
						nodeClick:null
					}
				}
			};//默认参数
			_.cfg=$.extend(true,{},_.par,_object_cfg);//初始化参数
			_.now=$.now();//当前时间
		},
		//初始化控件
		ui:function(){
			_.controls=_.attr({key:_.cfg.key,'class':'org-selectTree '+_.cfg['class']}).appendTo(_.cfg.of);//绑定控件参数及样式
			_.lable=$('<label>',{'key':_.cfg['default'].key,'html':_.cfg['default'].val});//下拉菜单显示框
			_.a=$('<a>',{'class':'btn btn-default'}).append(
				'<i class="fa fa-caret-down"></i>'
			).append(
				_.lable
			).appendTo(_.controls);//下拉菜单按钮
			if(_.cfg.tooltip){
				_.a.attr({'title':_.cfg['default'].val,'data-toggle':'tooltip','data-placement':_.cfg.placement}).tooltip();//开启提示
			}
			
			_.div_tree=$('<div>',{'class':'dropdown-menu'}).appendTo(_.controls);//下拉菜单
			_.cfg.tree.of=_.div_tree;//设置树
			var fun={};
			if(_.cfg.tree.fun.nodeClick){//是否设置节点点击事件
				fun.nodeClick=_.cfg.tree.fun.nodeClick;
				_.cfg.tree.fun.nodeClick=function(_object_par){
					if(2!=_object_par.type){//非文件类型节点不执行本次点击节点操作
						return false;
					}
					if($.isFunction(fun.nodeClick)){//选中后回调
						fun.nodeClick($.extend({},_object_par,{'this':_.ul_tree}));//回调选中后方法
					}
					_.div_tree.hide();//关闭下拉菜单
					if(_.cfg.tooltip){//设置完整选定内容提示
						_.a.attr({'title':_object_par.val,'data-original-title':_object_par.val});
					}
					_.lable.attr('key',_object_par.key).html(_object_par.val);//设置下拉树显示框选中键及内容
				};
			}
			if(_.cfg.tree.check){//多选
				fun.check=function(){//多选框选中回调方法
					var json_checkVal=_.ul_tree.treeUI('checkVal');//获取所有选中值集合
					_.lable.attr('key',_.cfg['default'].key).html($.isEmptyObject(json_checkVal)?_.cfg['default'].val:'');//设置默认值
					for(var d in json_checkVal){//遍历选中值集合
						if(2==json_checkVal[d].type){//判断当前节点是否为文件类型
							if(_.cfg['default'].key==_.lable.attr('key')){//第一个设置显示选中内容
								_.lable.attr('key','').html(json_checkVal[d].val);
							}else{//除第一个外累加设置显示选中内容
								_.lable.html(_.lable.text()+','+json_checkVal[d].val);
							}
						}
					}
					if(_.cfg.tooltip){//判断是否显示提示信息
						if(!$.isEmptyObject(json_checkVal)){//判断是否含有选中内容
							_.a.attr({'title':_.lable.text(),'data-original-title':_.lable.text()});
						}
					}
					json_checkVal=null;
				};
				_.cfg.tree.fun.check=fun.check;//设置多选框选中回调方法
				_.cfg.tree.fun.uncheck=fun.check;//设置多选框取消选中回调方法
			}
			_.ul_tree=$('<ul>').treeUI(_.cfg.tree);//生成树
			_.fun.fun();//设置事件并设置默认选中项到显示框内
		},
		//设置显示、隐藏下拉菜单事件设置默认选中项到显示框内
		fun:function(){
			var par={checkVal:null,i:0,checkVals:''};
			_.a.click(function(){//显示、隐藏菜单事件
				if(_.div_tree.is(':hidden')){
					_.div_tree.show();//显示
				}else{
					_.div_tree.hide();//隐藏
				}
			});
            if(_.cfg.tree.check){//多选
                par.checkVal = _.ul_tree.treeUI('checkVal');//获取所有选中值集合
                if(!$.isEmptyObject(par.checkVal)){
                    $.each(par.checkVal,function(){//遍历选中值集合
                        if(2==this.type){//判断当前节点是否为文件类型
                           par.checkVals+=(0==par.i?'':',')+this.val;//累加选中值
                           par.i=1;//设置是否为第1次进入有效循环
                        }
                    });
                    _.lable.attr('key','').html(par.checkVals);//设置显示框内容
                    if(_.cfg.tooltip){//判断是否设置提示信息
                        _.a.attr({'title':par.checkVals,'data-original-title':par.checkVals});
                    }
                }
            }else{//单选
                par.object = _.ul_tree.treeUI('val');//获取选中节点信息
                if(!$.isEmptyObject(par.object.val)){
                    _.lable.attr('key',par.object.key).html(par.object.val);//设置显示框内容
                    if(_.cfg.tooltip){//判断是否设置提示信息
                        _.a.attr({'title':par.object.val,'data-original-title':par.object.val});
                    }
                }
            }
            //设定页面点击事件，当点击的区域不是下拉菜单时，则关闭当前页面中打开的下拉菜单
            $(document).on('click',function(e){
                var div_select=$(e.target).closest('.org-selectTree'),div_menuSelect;
                if(0==div_select.length){//点击区域非下拉树
                    div_menuSelect=$('.org-selectTree>div:nth-child(2)');//获取所有下拉树
                }else{//点击区域为下拉树
                    div_menuSelect=$('.org-selectTree[key!="'+div_select.attr('key')+'"]>div:nth-child(2)');//获取当前下拉树
                }
                div_menuSelect=div_menuSelect.not(':hidden');//获取非隐藏菜单状态的下拉树
                if(0==div_menuSelect.length){//判断是否含有非隐藏菜单状态的下拉树
                    div_menuSelect=div_select=null;
                    return true;
                }
                if('1'==div_menuSelect.attr('st')){//判断是否正在动画中
                    div_menuSelect=div_select=null;
                    return true;
                }
                div_menuSelect.attr('st','1').stop().slideUp(function(){//设置开始动画标识，并停止上次动画，执行本次动画
                    $(this).removeAttr('st')//设置动画结束标识
                });
                div_menuSelect=div_select=null;
            });
            par=null;
		}
	};
	_.refun={};
	_.fun.init();//初始化设置
	_.fun.ui();//初始化控件
	return _.controls;//返回当前控件
};