// 改进的鼠标特效
class MouseEffect {
    constructor() {
        this.cursor = null;
        this.followers = [];
        this.trail = [];
        this.isClicking = false;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        // 移动端不启用鼠标特效
        if (this.isMobile) return;
        
        this.createCursor();
        this.createFollowers();
        this.bindEvents();
        this.animate();
    }

    createCursor() {
        // 创建主光标
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease, background 0.3s ease;
            backdrop-filter: blur(4px);
        `;
        // 初始颜色
        this.updateCursorColor();
        document.body.appendChild(this.cursor);
    }

    createFollowers() {
        // 创建跟随者
        for (let i = 0; i < 3; i++) {
            const follower = document.createElement('div');
            follower.className = 'cursor-follower';
            follower.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: transform 0.${2 + i}s ease, background 0.3s ease;
                backdrop-filter: blur(2px);
            `;
            // 初始颜色和大小
            const primaryColor = this.getPrimaryColor();
            follower.style.width = `${10 + i * 5}px`;
            follower.style.height = `${10 + i * 5}px`;
            follower.style.background = primaryColor.replace(')', `, ${0.4 - i * 0.1})`).replace('rgb', 'rgba');
            
            document.body.appendChild(follower);
            this.followers.push(follower);
        }
    }

    bindEvents() {
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            this.updatePosition(e.clientX, e.clientY);
            this.createTrail(e.clientX, e.clientY);
        });

        // 鼠标离开事件
        document.addEventListener('mouseleave', () => {
            this.hideCursor();
        });

        // 鼠标进入事件
        document.addEventListener('mouseenter', (e) => {
            this.showCursor();
            this.updatePosition(e.clientX, e.clientY);
        });

        // 鼠标按下事件
        document.addEventListener('mousedown', (e) => {
            this.isClicking = true;
            this.createClickEffect(e.clientX, e.clientY);
            this.cursor.style.transform = 'scale(0.8)';
        });

        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            this.isClicking = false;
            this.cursor.style.transform = 'scale(1)';
        });

        // 为链接和按钮添加交互效果
        const interactiveElements = document.querySelectorAll('a, button, .btn, select');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });

        // 监听主题变化
        const themeDropdown = document.getElementById('theme-dropdown');
        if (themeDropdown) {
            themeDropdown.addEventListener('change', () => {
                this.updateCursorColor();
                this.updateFollowersColor();
            });
        }
    }

    getPrimaryColor() {
        // 获取当前主题的主色调
        const root = document.documentElement;
        return getComputedStyle(root).getPropertyValue('--primary-color') || '#6366f1';
    }

    updateCursorColor() {
        // 更新光标颜色
        if (!this.cursor) return;
        const primaryColor = this.getPrimaryColor();
        this.cursor.style.background = primaryColor.replace(')', ', 0.8)').replace('rgb', 'rgba');
    }

    updateFollowersColor() {
        // 更新跟随者颜色
        const primaryColor = this.getPrimaryColor();
        this.followers.forEach((follower, index) => {
            follower.style.background = primaryColor.replace(')', `, ${0.4 - index * 0.1})`).replace('rgb', 'rgba');
        });
    }

    updatePosition(x, y) {
        // 更新主光标位置
        if (this.cursor) {
            this.cursor.style.transform = `translate(${x - 10}px, ${y - 10}px) ${this.isClicking ? 'scale(0.8)' : 'scale(1)'}`;
        }

        // 更新跟随者位置
        this.followers.forEach((follower, index) => {
            setTimeout(() => {
                follower.style.transform = `translate(${x - (5 + index * 2.5)}px, ${y - (5 + index * 2.5)}px)`;
            }, index * 80);
        });
    }

    createTrail(x, y) {
        // 创建鼠标轨迹
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const primaryColor = this.getPrimaryColor();
        trail.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: trail 1s ease-out forwards;
        `;
        trail.style.background = primaryColor.replace(')', ', 0.6)').replace('rgb', 'rgba');
        
        // 添加轨迹动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes trail {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(trail);
        
        // 存储轨迹元素以便后续清理
        this.trail.push(trail);
        
        // 1秒后移除轨迹元素
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
            this.trail = this.trail.filter(t => t !== trail);
        }, 1000);
    }

    createClickEffect(x, y) {
        // 创建点击特效
        const clickEffect = document.createElement('div');
        clickEffect.className = 'cursor-click';
        const primaryColor = this.getPrimaryColor();
        clickEffect.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9996;
            transform: translate(-50%, -50%) scale(0);
            animation: clickEffect 0.6s ease-out forwards;
        `;
        clickEffect.style.background = primaryColor.replace(')', ', 0.6)').replace('rgb', 'rgba');
        
        // 添加点击动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes clickEffect {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.5);
                    opacity: 0.6;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(clickEffect);
        
        // 0.6秒后移除点击特效
        setTimeout(() => {
            if (clickEffect.parentNode) {
                clickEffect.parentNode.removeChild(clickEffect);
            }
        }, 600);
    }

    hideCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '0';
        }
        this.followers.forEach(follower => {
            follower.style.opacity = '0';
        });
    }

    showCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = '1';
        }
        this.followers.forEach(follower => {
            follower.style.opacity = '1';
        });
    }

    animate() {
        // 动画循环
        requestAnimationFrame(() => this.animate());
        
        // 定期更新颜色，确保与主题同步
        if (Math.random() > 0.99) {
            this.updateCursorColor();
            this.updateFollowersColor();
        }
    }
}

// 初始化鼠标效果
window.addEventListener('DOMContentLoaded', function() {
    new MouseEffect();
});