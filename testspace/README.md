# 个人主页模板

一个美观、响应式的个人主页模板，采用玻璃态设计风格，支持主题切换、鼠标特效和背景蛇动画。

## 功能特性

- 🎨 **玻璃态设计**：使用CSS backdrop-filter实现现代玻璃态效果
- 📱 **响应式布局**：适配各种屏幕尺寸，从手机到桌面
- 🎭 **主题系统**：内置多种淡雅主题，支持实时切换
- ✨ **开屏动画**：平滑的加载过渡效果
- 🖱️ **鼠标特效**：主题响应式的鼠标轨迹和点击效果
- 🐍 **背景蛇动画**：可通过方向键控制的背景装饰
- ⚙️ **配置管理**：通过config.js文件轻松配置所有页面元素
- 🐍 **Python CLI工具**：方便生成和修改配置文件
- 🔧 **模块化结构**：清晰的代码组织，易于扩展

## 技术栈

- HTML5
- CSS3 (玻璃态设计、Flexbox布局)
- JavaScript (原生JS + Vue.js)
- FontAwesome 7.0.1 (图标库)
- Python (配置文件生成工具)

## 快速开始

### 1. 克隆或下载项目

### 2. 配置页面内容

#### 方法一：直接编辑配置文件

打开 `config.js` 文件，根据注释修改相应的配置项：

```javascript
const config = {
    // 基本信息
    basic: {
        title: "个人主页",
        name: "开发者",
        subtitle: "专注于前端开发和用户体验设计",
        footerText: "© 2024 个人主页. 保留所有权利."
    },
    // 英雄区域配置（包含头像设置）
    hero: {
        // 其他配置项...
        avatar: {
            icon: "fas fa-user-circle",  // 当imagePath为空时显示的图标
            imagePath: "",  // 头像图片路径，例如："https://example.com/your-avatar.jpg"
            size: "150px"  // 头像大小
        }
    },
    // 其他配置项...
};
```

#### 方法二：使用Python配置工具

运行配置工具，按照提示进行配置：

```bash
# 生成默认配置文件
python config_tool.py --generate

# 修改现有配置文件
python config_tool.py --modify
```

### 3. 启动本地服务器

使用任何静态文件服务器启动项目，例如：

```bash
# 使用Python内置服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server
```

然后在浏览器中访问 `http://localhost:8000` 查看效果。

## 项目结构

```
├── index.html          # 主页面结构
├── style.css           # 样式文件 (玻璃态设计、响应式布局)
├── config.js           # 配置文件
├── script.js           # 主要脚本 (Vue.js集成、主题切换)
├── mouse-effect.js     # 鼠标特效
├── snake-game.js       # 背景蛇动画
├── config_tool.py      # Python配置工具
└── README.md           # 项目文档
```

## 配置选项详解

### 基本信息 (basic)
- `title`: 页面标题
- `name`: 用户名
- `subtitle`: 副标题/职业描述
- `footerText`: 页脚文本

### 导航栏 (nav)
- `logo`: Logo配置 (图标和标题)
- `links`: 导航链接数组 (文本、图标和链接地址)

### 英雄区域 (hero)
- `title`: 标题文本
- `name`: 用户名
- `subtitle`: 副标题
- `buttons`: 按钮数组 (文本、链接和类型)
- `avatar`: 头像配置
  - `icon`: 头像图标 (当imagePath为空时显示)
  - `imagePath`: 头像图片路径 (优先显示图片)
  - `size`: 头像大小

### 关于部分 (about)
- `content`: 关于文本内容
- `skills`: 技能数组 (名称和图标)

### 项目部分 (projects)
- 项目数组，每个项目包含：
  - `title`: 项目标题
  - `description`: 项目描述
  - `icon`: 项目图标
  - `link`: 项目链接

### 联系部分 (contact)
- `info`: 联系信息数组 (文本和图标)
- `social`: 社交媒体链接数组 (图标和链接地址)

### 友情链接 (friends)
- 友情链接数组，每个链接包含：
  - `name`: 网站名称
  - `url`: 网站URL
  - `icon`: 网站图标

### 开屏动画 (splash)
- `title`: 加载文本
- `icon`: 加载图标
- `duration`: 动画持续时间 (毫秒)

### 样式配置 (style)
- `primaryColor`: 主色调
- `secondaryColor`: 次色调
- `backgroundColor`: 背景色
- `textColor`: 文本色
- `glassOpacity`: 玻璃效果透明度

### 主题配置 (themes)
- 内置多种主题，每个主题包含与样式配置相同的选项
- 支持的主题：default, light, lime, lemon, apple, water, cherry, lavender, graphite

## 主题系统

项目内置了9种淡雅主题：

1. **默认** (default): 现代紫色调
2. **亮白** (light): 简约浅灰色调
3. **青柠** (lime): 清新绿色调
4. **柠黄** (lemon): 温暖黄色调
5. **苹果绿** (apple): 自然绿色调
6. **水蓝** (water): 清爽蓝色调
7. **樱红** (cherry): 柔和粉红色调
8. **薰衣草紫** (lavender): 浪漫紫色调
9. **石墨黑** (graphite): 沉稳深色调

主题选择会保存在本地存储中，刷新页面后保持不变。

## 鼠标特效

- **鼠标轨迹**：跟随鼠标移动的彩色粒子效果
- **点击效果**：鼠标点击时的扩散动画
- **主题响应**：特效颜色会根据当前主题自动调整

## 背景蛇动画

- **方向键控制**：使用方向键控制蛇的移动
- **主题响应**：蛇的颜色会根据当前主题自动调整
- **装饰性**：作为背景元素，不会影响页面内容

## 自定义开发

### 添加新主题

在 `config.js` 文件的 `themes` 对象中添加新主题：

```javascript
themes: {
    // 现有主题...
    yourTheme: {
        primaryColor: "#your-color",
        secondaryColor: "#your-color",
        backgroundColor: "#your-color",
        textColor: "#your-color",
        glassOpacity: 0.2
    }
}
```

### 扩展功能

1. **添加新页面部分**：在 `index.html` 中添加新的部分，并在 `config.js` 中添加相应的配置项
2. **修改鼠标特效**：编辑 `mouse-effect.js` 文件调整特效参数
3. **自定义蛇动画**：编辑 `snake-game.js` 文件调整蛇的行为和外观

## 浏览器兼容性

- 现代浏览器 (Chrome, Firefox, Safari, Edge) 支持所有功能
- 旧版浏览器可能不支持玻璃态效果和某些CSS特性

## 性能优化

- **懒加载**：图片和脚本的延迟加载
- **CSS优化**：使用CSS变量和高效选择器
- **JavaScript优化**：减少DOM操作，使用事件委托
- **动画性能**：使用requestAnimationFrame实现流畅动画

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request，帮助改进这个项目！

---

希望这个个人主页模板能为你提供一个美观、现代的在线展示平台。如有任何问题或建议，请随时联系我。