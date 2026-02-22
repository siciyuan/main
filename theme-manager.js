
// 主题管理模块
class ThemeManager {
    constructor() {
        this.themes = [];
        this.currentTheme = null;
    }
    
    init(themes, defaultTheme = 'water') {
        this.themes = themes;
        this.changeTheme(defaultTheme);
    }
    
    changeTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return;
        
        this.currentTheme = theme;
        
        // 更新页面样式
        document.body.style.backgroundColor = theme.bg;
        document.body.style.color = theme.text;
        
        // 保存到localStorage
        localStorage.setItem('selectedTheme', themeId);
        
        // 更新粒子颜色
        this.updateParticles(theme.color);
    }
    
    updateParticles(color) {
        if (window.particlesJS && document.getElementById('particles-bg')) {
            // 检测是否为移动设备
            const isMobile = window.innerWidth < 768;
            
            particlesJS("particles-bg", {
                particles: {
                    number: { value: isMobile ? 20 : 40 }, // 移动设备减少粒子数量
                    color: { value: color },
                    shape: { type: "circle" },
                    opacity: { value: 0.4 }, // 降低透明度以提高性能
                    size: { value: isMobile ? 2 : 3 }, // 移动设备减小粒子大小
                    move: { 
                        enable: true,
                        speed: isMobile ? 1 : 1.5, // 移动设备降低动画速度
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out"
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: !isMobile, mode: "repulse" }, // 移动设备禁用悬停效果
                        onclick: { enable: false }
                    }
                }
            });
        }
    }
    
    initParticles() {
        if (window.particlesJS && document.getElementById('particles-bg') && this.currentTheme) {
            this.updateParticles(this.currentTheme.color);
        } else if (window.particlesJS) {
            // 延迟初始化
            setTimeout(() => this.initParticles(), 100);
        }
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}


