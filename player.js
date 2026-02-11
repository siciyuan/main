// player.js - 音频播放器核心模块
class AudioPlayer {
    constructor(config) {
        this.playlist = config.playlist || [];
        this.audio = new Audio();
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.7;
        
        // 事件回调数组
        this.onProgressCallbacks = [];
        this.onTrackChangeCallbacks = [];
        this.onPlayStateChangeCallbacks = [];
        
        this.initAudioEvents();
    }
    
    initAudioEvents() {
        // 音频加载完成事件
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
        });
        
        // 播放时间更新事件
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
            this.onProgressCallbacks.forEach(callback => callback({
                currentTime: this.currentTime,
                duration: this.duration,
                progress: this.getProgress()
            }));
        });
        
        // 音频结束事件
        this.audio.addEventListener('ended', () => {
            this.next();
        });
        
        // 播放事件
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.onPlayStateChangeCallbacks.forEach(callback => callback(true));
        });
        
        // 暂停事件
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.onPlayStateChangeCallbacks.forEach(callback => callback(false));
        });
        
        // 错误处理
        this.audio.addEventListener('error', (e) => {
            console.error('音频播放错误:', e);
            console.log('音频源:', this.audio.src);
        });
    }
    
    // 加载并播放指定曲目
    loadTrack(trackIndex) {
        if (trackIndex < 0 || trackIndex >= this.playlist.length) {
            console.error('无效的曲目索引');
            return false;
        }
        
        this.currentTrackIndex = trackIndex;
        const track = this.playlist[trackIndex];
        
        if (!track.audio) {
            console.error('曲目没有音频URL:', track);
            return false;
        }
        
        console.log('加载音频:', track.audio);
        this.audio.src = track.audio;
        this.audio.load();
        this.currentTime = 0;
        
        // 通知曲目变化
        this.onTrackChangeCallbacks.forEach(callback => callback(track));
        
        return true;
    }
    
    // 播放
    async play() {
        try {
            await this.audio.play();
            return true;
        } catch (error) {
            console.error('播放失败:', error);
            return false;
        }
    }
    
    // 暂停
    pause() {
        this.audio.pause();
    }
    
    // 切换播放/暂停
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    // 下一首
    next() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        if (this.loadTrack(nextIndex)) {
            this.play();
        }
    }
    
    // 上一首
    prev() {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        if (this.loadTrack(prevIndex)) {
            this.play();
        }
    }
    
    // 跳转到指定时间
    seek(time) {
        if (this.audio) {
            this.audio.currentTime = Math.max(0, Math.min(time, this.duration));
        }
    }
    
    // 根据百分比跳转
    seekByPercentage(percentage) {
        if (this.audio && this.duration > 0) {
            const time = (percentage / 100) * this.duration;
            this.audio.currentTime = time;
        }
    }
    
    // 设置音量
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        this.audio.volume = this.volume;
    }
    
    // 获取当前曲目
    getCurrentTrack() {
        return this.playlist[this.currentTrackIndex];
    }
    
    // 获取播放进度百分比
    getProgress() {
        if (this.duration <= 0) return 0;
        return (this.currentTime / this.duration) * 100;
    }
    
    // 格式化时间显示
    formatTime(seconds) {
        if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // 注册进度回调
    onProgress(callback) {
        this.onProgressCallbacks.push(callback);
    }
    
    // 注册曲目变化回调
    onTrackChange(callback) {
        this.onTrackChangeCallbacks.push(callback);
    }
    
    // 注册播放状态变化回调
    onPlayStateChange(callback) {
        this.onPlayStateChangeCallbacks.push(callback);
    }
    
    // 清理资源
    destroy() {
        this.audio.pause();
        this.audio.src = '';
        this.audio = null;
    }
}