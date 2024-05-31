const audioPlayer = uni.createInnerAudioContext();
let stopCallBack = null;
let endedCallBack = null;
let playCallBack = null;

audioPlayer.onStop((e)=>{
	typeof stopCallBack == 'function' && stopCallBack(e)
})
audioPlayer.onEnded((e)=>{
	typeof endedCallBack == 'function' && endedCallBack(e)
})
audioPlayer.onPlay((e)=>{
	typeof playCallBack == 'function' && playCallBack(e)
})
audioPlayer.onError((e)=>{
	console.log('error',e)
})

export const oncePlay = (src,p,e,s) =>{
	if(audioPlayer.paused){
		audioPlayer.src=src
		stopCallBack = (r)=>{
			stopCallBack = null;
			s&&s(r);
		};
		endedCallBack = (r)=>{
			endedCallBack = null;
			e&&e(r);
		};
		playCallBack =(r)=>{
			playCallBack= null;
			p&&p(r);
		} 
		audioPlayer.play();
	}else{

		stopCallBack()
		if(audioPlayer.src==src){
			audioPlayer.stop()
		}else{
			audioPlayer.src=src
			stopCallBack = (r)=>{
				stopCallBack = null;
				s&&s(r);
			};
			endedCallBack = (r)=>{
				endedCallBack = null;
				e&&e(r);
			};
			playCallBack =(r)=>{
				playCallBack= null;
				p&&p(r);
			} 
			audioPlayer.play();
		}
	}
}
export const stop=()=>{
	console.log('停止音无恶')
	audioPlayer.stop()
}
export const loopPlay = (src,p,s)=>{
	audioPlayer.stop();
	audioPlayer.loop=true;
	audioPlayer.src=src
	playCallBack =(r)=>{
		playCallBack= null;
		p&&p(r);
	}
	stopCallBack = (r)=>{
		audioPlayer.loop=false;
		stopCallBack = null;
		s&&s(r);
	};
	audioPlayer.play();
}
export const getPaused =()=>{
	return audioPlayer.paused
}
export default {
	stop,
	oncePlay,
	loopPlay,
	getPaused
}