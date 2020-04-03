<template>
	<div>
		<h1>appName: {{ appName }} user: {{ name }}</h1>
		<div id="pages" @click="handleMsg">
			msg: {{ msg }} <button>(点我)</button>
		</div>
		<h5>计算属性 - computed: {{ computedMsg }}</h5>
		<h5>
			计算属性 - computed - getter/setter: {{ computedDiyMsg }} 
			<button @click="handleDiyMsg">
				(点我)
			</button>
		</h5>
		<h5>监视属性 - watch: {{ watchMsg }}</h5>
		<!-- # 8. class & style-->
		<br>
		<br>
		<br>
		<div style="color: red">
			style
		</div>
		<!-- 后者无效 -->
		<div :style="[defaultStyle, overrideStyle, { color: 'yellow' }]" style="color: gray">
			style
		</div>
		<div class="default">
			class
		</div>
		<div :class="{ default: defaultClass, active: activeClass }" class="bg">
			class
		</div>

		<!-- # 9. v-if & v-show & v-for -->
		<br>
		<br>
		<br>
		<!-- 使用key, 避免输入框数据不清空 -->
		<template v-if="typeIf === 'A'">
			<label>A</label>
			<input key="A" placeholder="v-if">
		</template>
		<template v-else-if="typeIf === 'B'">
			<label>Email</label>
			<input key="B" placeholder="v-if">
		</template>
		<template v-else>
			<label>Email</label>
			<input key="C" placeholder="v-if">
		</template>
		<h1 v-show="isShow">
			v-show
		</h1>
		<!-- # 10. v-for -->
		<br>
		<br>
		<br>
		<template v-for="(item, index) in listFor">
			<div v-if="String(index)" :key="index">
				{{ index }} - {{ item }}
			</div>
		</template>
		<button @click="handleAddItem">
			(添加)
		</button>

		<!-- # 11. v-model -->
		<br>
		<br>
		<br>
		<input v-model="msg" placeholder="编辑我">
		<p>msg is: {{ msg }}</p>

		<!-- # 12. component/嵌套/全局组件/ 待处理，多个子组件，组件作为参数传递，实例组件传递 -->
		<br>
		<br>
		<br>
		<slot name="first" />
		<slot name="second" />

		<!-- # 13. is 动态组件 + keep-alive -->
		<br>
		<br>
		<br>
		<div @click="handleChange(currentView)">
			切换组件
		</div>
		<keep-alive>
			<component :is="currentView" />
		</keep-alive>
	</div>
</template>

<script>	
export default {
	// # 0. 组件名称
	name: 'basic',
	// # 1. 组件
	components: {
		MyComponent1: {
			template: `<div>111</div>`
		},
		MyComponent2: {
			template: `<div>222</div>`
		}
	},
	// # 2. 父层传递参数 -> react - props + props-type 
	props: {
		// String、Number、Boolean、Function、Object、Array、Symbol、自定义的构造函数
		appName: String,
		name: String,
		dev: Boolean,
		diy: {
			type: Object,
			default() {
				return { value: 9 };
			},
			validator(it) {
				return it.value < 10;
			}
		}
		// 无效声明, 因为使用的是v-on
		// diyEvent: Function
	},
	// # 3. 当前组件参数 -> react - state， 和根配置不同（new Vue），data必须是函数
	data() {
		return {
			msg: 'Hello World!',
			watchMsg: '',

			// style
			defaultStyle: {
				color: 'red'
			},
			overrideStyle: {
				color: 'blue'
			},

			defaultClass: true,
			activeClass: true,

			// if/show/for
			typeIf: 'A',
			isShow: true,
			listFor: ['v-for', 'v-for', 'v-for'],
			currentView: 'my-component-1'
		};
	},
	// # 4. 计算属性
	computed: {
		/**
		 * 只要使用到this.msg, msg一改变，函数会被调起;
		 * 说明：第一次执行this.computedMsg，因为我们使用了this.msg, 相当于给 msg 的 setter, 再订阅一个事件，当msg改变时，这个事件回调会被触发
		 * 优点：this.msg不改变，this.computedMsg不会进行重复计算
		 */
		computedMsg() {
			console.log(this.msg, `\n请注释我\n测试改变msg, computedMsg 是否被调起`);
			return new Date();
		},
		/**
		 * 计算属性默认为只有getter，但您也可以在需要时提供setter;
		 * 少用
		 */
		computedDiyMsg: {
			// getter
			get() {
				return `diy - ${this.msg}`;
			},
			// setter
			set(value) {
				this.msg = value;
			}
		}
	},
	// # 5. 监视属性
	watch: {
		/**
		 * 相当于给 msg 的 setter, 再订阅一个事件，当msg改变时，这个事件回调会被触发
		 * 假如msg连续被set, 可以使用防抖 + 异步形式减少频率
		 */
		msg(value) {
			this.watchMsg = `watchMsg: ${value}`;
		}
	},
	// # 6. 生命周期 
	created() {
		console.log(this.$global);
	},
	// # 7. 事件或其他方法
	methods: {
		handleMsg() {
			this.msg = Math.random();

			// 触发父组件方法
			this.$emit("diyEvent");
		},
		handleDiyMsg() {
			this.computedDiyMsg = `computedDiyMsg - 测试`;
		},
		// # 10. v-for
		handleAddItem() {
			/**
			 * Vue包装观察数组的变异方法: push() pop() shift() unshift() splice() sort() reverse()
			 * 变异方法会改变它们被调用的原始数组
			 */
			this.listFor.push(`↑↑↑↑${Math.random()}↑↑↑↑`);

			/**
			 * Vue非诱变方法: filter()，concat()，slice()
			 * 不发生变异原数组，但总是返回一个新的数组
			 */
			this.listFor = this.listFor.filter((item, index) => {
				// 去除第一个
				return !!index;
			});

			/**
			 * Vue 无法检测到对数组的以下更改
			 * 前提：先注释掉前面两个，因为渲染是异步的
			 */
			// 1. 用索引直接设置一个项目
			this.listFor[0] = `无法改变哦`;
			// 解决方案：
			this.$set(this.listFor, 0, '可以改变');

			// 2. 修改数组的长度
			this.listFor.length = 4;
			// 解决方案：
			this.listFor.splice(4);


			/**
			 * 过滤的三种形式
			 */
			// 1. 使用computed, 使用新的字段
			// 2. 设计一个方法，如模版中 v-for="(item, index) in toFilter(listFor)"
			// 3. 使用v-if
		},
		handleChange(currentView) {
			this.currentView = `my-component-${currentView.substr(-1) == 1 ? 2 : 1}`;
		}
	},
};
</script>

<style lang="scss">
#test {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	display: flex;
	justify-content: center;
	transform: scale(1);
	a {
		color: red;
	}
}
.default {
	color: gray;
}
.active {
	font-weight: bold;
	font-size: 20px
}
.bg {
	background: white
}
</style>