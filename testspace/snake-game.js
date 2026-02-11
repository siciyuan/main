// 背景小蛇效果
class BackgroundSnake {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.snake = [];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.gridSize = 20;
        this.speed = 8;
        this.frameCount = 0;
        this.init();
    }

    init() {
        this.createCanvas();
        this.resetSnake();
        this.bindEvents();
        this.gameLoop();
    }

    createCanvas() {
        // 创建游戏画布
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'background-snake';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    resetSnake() {
        // 初始化蛇的位置
        const centerX = Math.floor(this.gridSize / 2);
        const centerY = Math.floor(this.gridSize / 2);
        
        // 增加蛇的长度
        this.snake = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY },
            { x: centerX - 2, y: centerY },
            { x: centerX - 3, y: centerY },
            { x: centerX - 4, y: centerY },
            { x: centerX - 5, y: centerY },
            { x: centerX - 6, y: centerY },
            { x: centerX - 7, y: centerY }
        ];
        
        this.direction = 'right';
        this.nextDirection = 'right';
    }

    bindEvents() {
        // 方向键控制
        document.addEventListener('keydown', (e) => {
            // 阻止默认行为，确保方向键正常工作
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            
            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') {
                        this.nextDirection = 'up';
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') {
                        this.nextDirection = 'down';
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') {
                        this.nextDirection = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') {
                        this.nextDirection = 'right';
                    }
                    break;
            }
        });
    }

    update() {
        // 控制移动速度
        this.frameCount++;
        if (this.frameCount % this.speed !== 0) return;
        
        // 更新方向
        this.direction = this.nextDirection;
        
        // 计算蛇头新位置
        const head = { ...this.snake[0] };
        switch (this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        // 边界处理 - 穿越边界
        if (head.x < 0) head.x = this.gridSize - 1;
        if (head.x >= this.gridSize) head.x = 0;
        if (head.y < 0) head.y = this.gridSize - 1;
        if (head.y >= this.gridSize) head.y = 0;
        
        // 移动蛇身
        this.snake.unshift(head);
        this.snake.pop();
    }

    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 获取当前主题颜色
        const root = document.documentElement;
        const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color') || '#6366f1';
        
        // 计算正方形大小
        const cellSize = Math.min(this.canvas.width, this.canvas.height) / this.gridSize;
        
        // 计算偏移量，使蛇居中显示
        const offsetX = (this.canvas.width - cellSize * this.gridSize) / 2;
        const offsetY = (this.canvas.height - cellSize * this.gridSize) / 2;
        
        // 绘制蛇身
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // 绘制更大的蛇头
                const headSize = cellSize * 1.2;
                const headOffset = (headSize - cellSize) / 2;
                
                // 蛇头
                this.ctx.fillStyle = primaryColor.replace(')', ', 0.6)').replace('rgb', 'rgba');
                this.ctx.fillRect(
                    offsetX + segment.x * cellSize - headOffset,
                    offsetY + segment.y * cellSize - headOffset,
                    headSize,
                    headSize
                );
                
                // 绘制眼睛
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                const eyeSize = cellSize * 0.2;
                
                // 根据方向调整眼睛位置
                if (this.direction === 'right') {
                    // 向右时的眼睛位置
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.6 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.3 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.6 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.7 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.direction === 'left') {
                    // 向左时的眼睛位置
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.2 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.3 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.2 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.7 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.direction === 'up') {
                    // 向上时的眼睛位置
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.3 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.2 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.7 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.2 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.direction === 'down') {
                    // 向下时的眼睛位置
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.3 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.6 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.7 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.6 - headOffset,
                        eyeSize,
                        eyeSize
                    );
                }
                
                // 绘制舌头
                this.ctx.fillStyle = 'rgba(244, 63, 94, 0.7)';
                const tongueSize = cellSize * 0.3;
                
                // 根据方向调整舌头位置
                if (this.direction === 'right') {
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.4 - headOffset,
                        tongueSize * 1.5,
                        tongueSize
                    );
                } else if (this.direction === 'left') {
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize - tongueSize * 0.5 - headOffset,
                        offsetY + segment.y * cellSize + cellSize * 0.4 - headOffset,
                        tongueSize * 1.5,
                        tongueSize
                    );
                } else if (this.direction === 'up') {
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.4 - headOffset,
                        offsetY + segment.y * cellSize - tongueSize * 0.5 - headOffset,
                        tongueSize,
                        tongueSize * 1.5
                    );
                } else if (this.direction === 'down') {
                    this.ctx.fillRect(
                        offsetX + segment.x * cellSize + cellSize * 0.4 - headOffset,
                        offsetY + segment.y * cellSize + cellSize - headOffset,
                        tongueSize,
                        tongueSize * 1.5
                    );
                }
            } else {
                // 蛇身
                const opacity = 0.1 + (index / this.snake.length) * 0.3;
                this.ctx.fillStyle = primaryColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                this.ctx.fillRect(
                    offsetX + segment.x * cellSize,
                    offsetY + segment.y * cellSize,
                    cellSize,
                    cellSize
                );
            }
        });
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// 初始化背景小蛇
window.addEventListener('DOMContentLoaded', function() {
    new BackgroundSnake();
});