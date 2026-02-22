
// 主应用入口
const { createApp, onMounted, reactive, computed, defineAsyncComponent, ref } = Vue;

// 全局配置
let globalConfig = {};

// 异步加载组件
const MusicPlayer = {
    template: `
        <!-- 桌面端播放器 -->
        <div class="player-container hidden md:block">
            <div class="floating-player glass-card p-4 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
                <div class="container mx-auto max-w-6xl">
                    <!-- 第一行：当前播放信息和播放列表按钮 -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-4 flex-1">
                            <div class="relative">
                                <img 
                                    :src="currentTrack.cover" 
                                    alt="专辑封面"
                                    class="w-12 h-12 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-110"
                                    :class="{ 'rotate-12': isPlaying }"
                                >
                                <div v-if="isPlaying" class="absolute inset-0 bg-black/20 rounded-lg animate-pulse"></div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-medium text-sm truncate transition-colors duration-300 hover:text-white">{{ currentTrack.title }}</h4>
                                <p class="text-xs opacity-80 truncate">{{ currentTrack.artist }}</p>
                            </div>
                        </div>
                        <div class="relative ml-3">
                            <button @click="showPlaylist = !showPlaylist" class="flex items-center space-x-1 hover:text-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white/10">
                                <i class="fas fa-list text-sm"></i>
                                <span class="hidden sm:inline text-xs">播放列表</span>
                            </button>
                            
                            <!-- 播放列表下拉 -->
                            <div 
                                v-if="showPlaylist" 
                                class="absolute bottom-full right-0 mb-3 w-64 sm:w-72 max-h-80 overflow-y-auto glass-card rounded-xl p-3 shadow-xl transform transition-all duration-300 scale-95 opacity-0" 
                                :class="{ 'scale-100 opacity-100': showPlaylist }"
                            >
                                <div 
                                    v-for="(track, index) in playlist" 
                                    :key="track.id"
                                    @click="playTrack(index)"
                                    class="p-3 rounded-lg hover:bg-white/20 cursor-pointer flex items-center space-x-3 transition-all duration-300 hover:translate-x-2"
                                    :class="{'bg-white/20': index === currentTrackIndex}"
                                >
                                    <img :src="track.cover" class="w-10 h-10 rounded shadow-sm" alt="封面">
                                    <div class="flex-1">
                                        <h4 class="font-medium text-sm truncate">{{ track.title }}</h4>
                                        <p class="text-xs opacity-80 truncate">{{ track.artist }}</p>
                                    </div>
                                    <i v-if="index === currentTrackIndex && isPlaying" class="fas fa-volume-up animate-pulse"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 第二行：播放控制和进度条 -->
                    <div class="flex items-center justify-between">
                        <!-- 播放控制 -->
                        <div class="flex items-center space-x-4">
                            <button @click="prevTrack" class="hover:text-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white/10">
                                <i class="fas fa-step-backward text-sm"></i>
                            </button>
                            <button @click="togglePlay" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-md transition-all duration-500 hover:bg-white/30 hover:scale-110">
                                <i v-if="isPlaying" class="fas fa-pause text-sm"></i>
                                <i v-else class="fas fa-play text-sm"></i>
                            </button>
                            <button @click="nextTrack" class="hover:text-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white/10">
                                <i class="fas fa-step-forward text-sm"></i>
                            </button>
                        </div>
                        
                        <!-- 进度条 -->
                        <div class="flex-1 mx-6">
                            <div class="flex items-center space-x-2">
                                <span class="text-xs">{{ formatTime(currentTime) }}</span>
                                <div class="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative">
                                    <div 
                                        class="h-full bg-white/70 rounded-full transition-all duration-300 ease-out"
                                        :style="{width: progress + '%'}"
                                    ></div>
                                    <div 
                                        class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform -translate-x-1/2 transition-all duration-300 ease-out"
                                        :style="{left: progress + '%'}"
                                    ></div>
                                </div>
                                <span class="text-xs">{{ formatTime(duration) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 手机端悬浮球播放器 -->
        <div class="md:hidden">
            <!-- 悬浮球 -->
            <div 
                class="fixed bottom-8 right-8 z-50 transform transition-all duration-500 ease-out" 
                :class="{'scale-100 opacity-100': showMobilePlayer, 'scale-0 opacity-0': !showMobilePlayer}"
            >
                <!-- 展开的播放器 -->
                <div class="glass-card rounded-2xl p-5 shadow-xl w-80 transform transition-all duration-500 hover:scale-[1.02]">
                    <!-- 当前播放信息 -->
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="relative">
                            <img 
                                :src="currentTrack.cover" 
                                alt="专辑封面"
                                class="w-14 h-14 rounded-lg shadow-md"
                                :class="{ 'rotate-12': isPlaying }"
                            >
                            <div v-if="isPlaying" class="absolute inset-0 bg-black/20 rounded-lg animate-pulse"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-sm truncate">{{ currentTrack.title }}</h4>
                            <p class="text-xs opacity-80 truncate">{{ currentTrack.artist }}</p>
                        </div>
                    </div>
                    
                    <!-- 播放控制 -->
                    <div class="flex items-center justify-between mb-4">
                        <button @click="prevTrack" class="hover:text-white/80 p-3 rounded-full transition-all duration-300 hover:bg-white/10">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button @click="togglePlay" class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-md transition-all duration-500 hover:bg-white/30 hover:scale-110">
                            <i v-if="isPlaying" class="fas fa-pause"></i>
                            <i v-else class="fas fa-play"></i>
                        </button>
                        <button @click="nextTrack" class="hover:text-white/80 p-3 rounded-full transition-all duration-300 hover:bg-white/10">
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                    
                    <!-- 进度条 -->
                    <div class="mb-4">
                        <div class="flex items-center space-x-2">
                            <span class="text-xs">{{ formatTime(currentTime) }}</span>
                            <div class="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                    class="h-full bg-white/70 rounded-full transition-all duration-300 ease-out"
                                    :style="{width: progress + '%'}"
                                ></div>
                            </div>
                            <span class="text-xs">{{ formatTime(duration) }}</span>
                        </div>
                    </div>
                    
                    <!-- 播放列表按钮 -->
                    <div class="text-center">
                        <button @click="showPlaylist = !showPlaylist" class="text-sm hover:text-white/80 py-2 px-4 rounded-full transition-all duration-300 hover:bg-white/10">
                            <i class="fas fa-list mr-1"></i> 播放列表
                        </button>
                    </div>
                    
                    <!-- 播放列表 -->
                    <div 
                        v-if="showPlaylist" 
                        class="mt-4 max-h-48 overflow-y-auto glass-card rounded-lg p-3 transform transition-all duration-300 scale-95 opacity-0" 
                        :class="{ 'scale-100 opacity-100': showPlaylist }"
                    >
                        <div 
                            v-for="(track, index) in playlist" 
                            :key="track.id"
                            @click="playTrack(index)"
                            class="p-3 rounded-lg hover:bg-white/20 cursor-pointer flex items-center space-x-3 transition-all duration-300 hover:translate-x-2"
                            :class="{'bg-white/20': index === currentTrackIndex}"
                        >
                            <img :src="track.cover" class="w-9 h-9 rounded shadow-sm" alt="封面">
                            <div class="flex-1">
                                <h4 class="font-medium text-xs truncate">{{ track.title }}</h4>
                                <p class="text-xs opacity-80 truncate">{{ track.artist }}</p>
                            </div>
                            <i v-if="index === currentTrackIndex && isPlaying" class="fas fa-volume-up text-xs animate-pulse"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 悬浮球按钮 -->
            <button 
                @click="showMobilePlayer = !showMobilePlayer"
                class="fixed bottom-8 right-8 z-40 glass-card w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 hover:bg-white/20"
            >
                <i v-if="isPlaying" class="fas fa-pause text-lg"></i>
                <i v-else class="fas fa-play text-lg"></i>
            </button>
        </div>
    `,
    props: {
        playlist: Array
    },
    data() {
        return {
            player: null,
            isPlaying: false,
            currentTrackIndex: 0,
            currentTime: 0,
            duration: 0,
            showPlaylist: false,
            showMobilePlayer: false
        };
    },
    computed: {
        currentTrack() {
            return this.playlist[this.currentTrackIndex] || {};
        },
        progress() {
            return (this.currentTime / (this.duration || 1)) * 100;
        }
    },
    mounted() {
        // 初始化播放器
        this.player = new MusicPlayerManager();
        this.player.init(this.playlist);
        
        // 设置进度更新回调
        this.player.onProgressUpdate = (data) => {
            this.currentTime = data.currentTime;
            this.duration = data.duration;
        };
    },
    methods: {
        togglePlay() {
            if (this.player) {
                this.player.togglePlay();
                this.isPlaying = this.player.isPlaying;
            }
        },
        prevTrack() {
            if (this.player) {
                this.player.prev();
                this.updateCurrentTrackIndex();
                this.isPlaying = this.player.isPlaying;
            }
        },
        nextTrack() {
            if (this.player) {
                this.player.next();
                this.updateCurrentTrackIndex();
                this.isPlaying = this.player.isPlaying;
            }
        },
        playTrack(index) {
            if (this.player && this.playlist[index]) {
                this.player.playTrack(this.playlist[index]);
                this.currentTrackIndex = index;
                this.isPlaying = this.player.isPlaying;
                this.showPlaylist = false;
            }
        },
        updateCurrentTrackIndex() {
            if (this.player.currentTrack) {
                this.currentTrackIndex = this.playlist.findIndex(track => track.id === this.player.currentTrack.id);
            }
        },
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }
};

// 主应用
createApp({
    components: {
        'music-player': MusicPlayer
    },
    setup() {
        const config = reactive({});
        const themeManager = new ThemeManager();
        
        // 特效相关的响应式数据
        const ripples = ref([]);
        const coreValueEffects = ref([]);
        const mouseParticles = ref([]);
        const currentTheme = ref(null);
        const particleCount = ref(0);
        const maxParticles = 30; // 减少最大粒子数，降低CPU占用
        
        // 加载配置
        const loadConfig = async () => {
            try {
                const response = await fetch('config.json');
                const data = await response.json();
                
                // 合并配置
                Object.assign(config, data);
                
                // 设置页面标题
                if (data.site?.title) {
                    document.title = data.site.title;
                }
                
                // 设置favicon
                if (data.site?.favicon) {
                    document.getElementById('favicon').href = data.site.favicon;
                }
                
                // 初始化主题
                if (data.settings?.defaultTheme) {
                    themeManager.init(data.themes, data.settings.defaultTheme);
                }
                
                // 初始化粒子效果
                if (data.settings?.enableParticles) {
                    setTimeout(() => themeManager.initParticles(), 100);
                }
                
                // 初始化特效
                if (data.settings?.enableClickEffects && data.coreValues) {
                    initEffects(data.coreValues, data.themes || [], themeManager.currentTheme);
                }
                
                return Promise.resolve();
            } catch (error) {
                console.error('加载配置失败:', error);
                // 使用默认配置
                Object.assign(config, {
                    profile: { name: '个人主页', bio: '加载配置失败', about: '请检查config.json文件' }
                });
                return Promise.resolve();
            }
        };
        
        // 加载诗词
        const loadPoem = async () => {
            const poemContent = document.getElementById('poem-content');
            const poemAuthor = document.getElementById('poem-author');
            const poemLoading = document.getElementById('poem-loading');
            const splashPoem = document.getElementById('splash-poem');
            
            if (!poemContent || !poemAuthor || !poemLoading || !splashPoem) return;
            
            // 显示加载状态
            poemLoading.style.display = 'block';
            poemContent.style.display = 'none';
            poemAuthor.style.display = 'none';
            
            // 预定义一些默认诗词，减少API请求失败的影响
            const defaultPoems = [
                { content: '江山代有才人出，各领风骚数百年。', author: '—— 赵翼《论诗》' },
                { content: '不识庐山真面目，只缘身在此山中。', author: '—— 苏轼《题西林壁》' },
                { content: '春蚕到死丝方尽，蜡炬成灰泪始干。', author: '—— 李商隐《无题》' },
                { content: '人生自古谁无死？留取丹心照汗青。', author: '—— 文天祥《过零丁洋》' },
                { content: '落红不是无情物，化作春泥更护花。', author: '—— 龚自珍《己亥杂诗》' }
            ];
            
            // 随机选择一首默认诗词
            const randomPoem = defaultPoems[Math.floor(Math.random() * defaultPoems.length)];
            
            try {
                // 尝试第一个API，使用Promise.race设置超时
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
                
                let response = await fetch('https://xiaojiyun1.world123.top/yiyan/?format=text', {
                    method: 'GET',
                    mode: 'cors',
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let poem = await response.text();
                
                // 解析诗词内容和作者
                const parts = poem.split('——');
                if (parts.length === 2) {
                    poemContent.textContent = parts[0].trim();
                    poemAuthor.textContent = parts[1].trim();
                } else {
                    poemContent.textContent = poem.trim();
                    poemAuthor.textContent = '—— 未知';
                }
            } catch (error) {
                console.error('API请求失败，使用默认诗词:', error);
                // 使用默认诗词
                poemContent.textContent = randomPoem.content;
                poemAuthor.textContent = randomPoem.author;
            } finally {
                // 隐藏加载状态，显示诗词
                poemLoading.style.display = 'none';
                poemContent.style.display = 'block';
                poemAuthor.style.display = 'block';
                
                // 显示诗词
                setTimeout(() => {
                    poemContent.style.opacity = '1';
                    poemAuthor.style.opacity = '1';
                }, 100);
                
                // 根据诗词长度调整显示时间
                const poemLength = poemContent.textContent.length;
                const displayTime = Math.max(2000, poemLength * 80); // 每个字至少显示80ms，减少显示时间
                
                // 显示完成后隐藏开屏
                setTimeout(() => {
                    splashPoem.style.opacity = '0';
                    setTimeout(() => {
                        splashPoem.style.display = 'none';
                    }, 800); // 减少过渡时间
                }, displayTime);
            }
        };
        
        // 节流函数
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
        
        // 使用requestAnimationFrame的动画函数
        const animate = (callback, duration, onComplete) => {
            const start = performance.now();
            
            const animation = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                callback(progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animation);
                } else if (onComplete) {
                    onComplete();
                }
            };
            
            requestAnimationFrame(animation);
        };
        
        // 字体懒加载函数
        const loadFont = () => {
            console.log('开始加载字体...');
            // 创建字体加载器
            const fontFace = new FontFace('CustomFont', 'url(font.ttf)');
            
            // 加载字体
            fontFace.load().then((font) => {
                console.log('字体加载成功:', font);
                // 添加字体到字体族
                document.fonts.add(font);
                
                // 更新所有元素的字体样式，但排除Font Awesome图标
                document.documentElement.style.fontFamily = 'CustomFont, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
                document.body.style.fontFamily = 'CustomFont, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
                
                // 添加一个样式规则，确保优先级，同时排除Font Awesome图标
                const style = document.createElement('style');
                style.textContent = '*:not(.fa):not(.fas):not(.far):not(.fal):not(.fad):not(.fab):not(.fa-classic):not(.fa-regular):not(.fa-solid) { font-family: "CustomFont", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important; }';
                document.head.appendChild(style);
                
                console.log('字体应用成功');
            }).catch((error) => {
                console.error('字体加载失败:', error);
            });
        };
        
        // Font Awesome 懒加载函数
        const loadFontAwesome = () => {
            console.log('开始加载 Font Awesome...');
            // 创建 link 元素
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
            link.crossOrigin = 'anonymous';
            
            // 监听加载完成事件
            link.onload = () => {
                console.log('Font Awesome 加载成功');
                // 添加一个样式规则，确保 Font Awesome 字体族的优先级，包括播放器中的图标
                const style = document.createElement('style');
                style.textContent = '.fa, .fas, .far, .fal, .fad, .fab, .player-container .fa, .player-container .fas, .player-container .far, .player-container .fal, .player-container .fad, .player-container .fab { font-family: "Font Awesome 6 Free", "Font Awesome 6 Brands" !important; font-weight: 400 !important; }';
                document.head.appendChild(style);
                console.log('Font Awesome 字体族优先级已设置，包括播放器中的图标');
            };
            
            // 监听加载错误事件
            link.onerror = () => {
                console.error('Font Awesome 加载失败');
            };
            
            // 添加到 head 元素
            document.head.appendChild(link);
        };
        
        // 特效管理方法
        const initEffects = (coreValues, themes, theme) => {
            currentTheme.value = theme;
            
            // 清理之前的事件监听器
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mousemove', handleMouseMove);
            
            // 添加新的事件监听器
            document.addEventListener('click', handleClick);
            document.addEventListener('mousemove', handleMouseMove);
        };
        
        // 生成唯一ID
        const generateId = () => {
            return Date.now() + Math.random().toString(36).substr(2, 9);
        };
        
        // 处理点击事件
        const handleClick = (event) => {
            createRippleEffect(event);
            createCoreValueEffect(event);
        };
        
        // 处理鼠标移动事件（使用节流函数）
        const handleMouseMove = throttle((event) => {
            if (particleCount.value >= maxParticles) return;
            createMouseParticle(event);
        }, 50); // 每50ms最多触发一次
        
        // 创建涟漪特效
        const createRippleEffect = (event) => {
            const rect = event.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            const ripple = {
                id: generateId(),
                size: size,
                x: x,
                y: y,
                opacity: 1
            };
            
            ripples.value.push(ripple);
            
            // 使用requestAnimationFrame实现动画
            animate((progress) => {
                const opacity = 1 - progress;
                const index = ripples.value.findIndex(r => r.id === ripple.id);
                if (index !== -1) {
                    ripples.value[index].opacity = opacity;
                }
            }, 600, () => {
                // 动画完成后移除涟漪
                ripples.value = ripples.value.filter(r => r.id !== ripple.id);
            });
        };
        
        // 创建核心价值观特效
        const createCoreValueEffect = (event) => {
            if (!config.coreValues || config.coreValues.length === 0) return;
            
            const value = config.coreValues[Math.floor(Math.random() * config.coreValues.length)];
            
            const effect = {
                id: generateId(),
                text: value,
                x: event.clientX,
                y: event.clientY,
                opacity: 0,
                floatX: 0,
                floatY: 0,
                rotation: 0
            };
            
            coreValueEffects.value.push(effect);
            
            // 动画参数
            const floatX = (Math.random() - 0.5) * 100;
            const floatY = -100 - Math.random() * 50;
            const rotation = (Math.random() - 0.5) * 20;
            
            // 淡入
            setTimeout(() => {
                const index = coreValueEffects.value.findIndex(e => e.id === effect.id);
                if (index !== -1) {
                    coreValueEffects.value[index].opacity = 1;
                }
            }, 10);
            
            // 使用requestAnimationFrame实现动画
            animate((progress) => {
                const index = coreValueEffects.value.findIndex(e => e.id === effect.id);
                if (index !== -1) {
                    coreValueEffects.value[index].floatX = floatX * progress;
                    coreValueEffects.value[index].floatY = floatY * progress;
                    coreValueEffects.value[index].rotation = rotation * progress;
                    coreValueEffects.value[index].opacity = 1 - progress;
                }
            }, 2000, () => {
                // 动画完成后移除特效
                coreValueEffects.value = coreValueEffects.value.filter(e => e.id !== effect.id);
            });
        };
        
        // 创建鼠标粒子特效
        const createMouseParticle = (event) => {
            const size = Math.random() * 8 + 4;
            const opacity = Math.random() * 0.8 + 0.2;
            
            const particle = {
                id: generateId(),
                size: size,
                x: event.clientX,
                y: event.clientY,
                opacity: opacity,
                floatX: 0,
                floatY: 0,
                scale: 1
            };
            
            mouseParticles.value.push(particle);
            particleCount.value++;
            
            // 动画参数
            const floatX = (Math.random() - 0.5) * 50;
            const floatY = (Math.random() - 0.5) * 50;
            const duration = Math.random() * 1000 + 1000;
            
            // 使用requestAnimationFrame实现动画
            animate((progress) => {
                const index = mouseParticles.value.findIndex(p => p.id === particle.id);
                if (index !== -1) {
                    mouseParticles.value[index].floatX = floatX * progress;
                    mouseParticles.value[index].floatY = floatY * progress;
                    mouseParticles.value[index].opacity = opacity * (1 - progress);
                    mouseParticles.value[index].scale = 1 - progress;
                }
            }, duration, () => {
                // 动画完成后移除粒子
                mouseParticles.value = mouseParticles.value.filter(p => p.id !== particle.id);
                particleCount.value--;
            });
        };
        
        // 更新主题
        const updateTheme = (theme) => {
            currentTheme.value = theme;
        };
        
        // 监听主题变化
        const originalChangeTheme = themeManager.changeTheme;
        themeManager.changeTheme = function(themeId) {
            originalChangeTheme.call(this, themeId);
            updateTheme(this.currentTheme);
        };
        
        onMounted(() => {
            // 先加载诗词
            loadPoem();
            
            // 然后加载配置
            loadConfig().then(() => {
                // 配置加载完成后，延迟加载 Font Awesome
                setTimeout(() => {
                    loadFontAwesome();
                }, 500);
            });
            
            // 滚动动画逻辑
            const handleScroll = () => {
                const elements = document.querySelectorAll('.scroll-reveal');
                elements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('active');
                    }
                });
            };
            
            // 使用节流函数优化滚动事件
            const throttledHandleScroll = throttle(handleScroll, 100);
            window.addEventListener('scroll', throttledHandleScroll);
            // 初始加载时触发一次
            handleScroll();
            
            // 直接加载字体，确保字体能够及时应用
            loadFont();
        });
        
        return {
            config,
            themeManager,
            ripples,
            coreValueEffects,
            mouseParticles,
            currentTheme
        };
    }
}).mount('#app');
