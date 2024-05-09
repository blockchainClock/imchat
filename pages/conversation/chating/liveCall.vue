<template>
	<div style="padding: 40px 40px;">
		
		<web-view
		style="position: fixed;width: 100%;height: 100vh;left:-2px;top: -2px;background-color: #000;"
		@message="getmessage"
		:src="gamepath"></web-view>
	</div>
	<!-- that.gamepath -->
</template>

<script>
	
	export default {
		name: 'liveCall',
		async onLoad(option) {
			const data = JSON.parse(option.data);
			this.gamepath = '/hybrid/html/index.html?token=' + data.token + '&url=' + data.url
			
		},
		
		data(){
			return{
				gamepath:'',
				prevRouter:'',
				gamedata:{}
			}
		},
		methods:{
			getmessage:function(res){
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped="scoped">
	
	
	
</style>
