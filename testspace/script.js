// 默认配置，当加载失败时使用
const defaultConfig = {
    basic: {
        title: "个人主页",
        name: "开发者",
        subtitle: "专注于前端开发和用户体验设计",
        footerText: "© 2024 个人主页. 保留所有权利."
    },
    nav: {
        logo: {
            icon: "fas fa-user-circle",
            title: "个人主页"
        },
        links: [
            {
                text: "关于",
                icon: "fas fa-user",
                href: "#about"
            },
            {
                text: "项目",
                icon: "fas fa-code",
                href: "#projects"
            },
            {
                text: "联系",
                icon: "fas fa-envelope",
                href: "#contact"
            }
        ]
    },
    hero: {
        title: "你好，我是",
        name: "开发者",
        subtitle: "专注于前端开发和用户体验设计",
        buttons: [
            {
                text: "查看项目",
                href: "#projects",
                type: "primary"
            },
            {
                text: "联系我",
                href: "#contact",
                type: "secondary"
            }
        ],
        avatar: {
            icon: "fas fa-user-circle",
            imagePath: "",
            size: "150px"
        }
    },
    about: {
        content: "我是一名前端开发者，热爱创造美观且功能强大的网页应用。我擅长使用现代前端技术栈，包括HTML5、CSS3、JavaScript、Vue.js等。我注重用户体验，致力于构建响应式、高性能的网站。",
        skills: [
            {
                name: "HTML5",
                icon: "fab fa-html5"
            },
            {
                name: "CSS3",
                icon: "fab fa-css3-alt"
            },
            {
                name: "JavaScript",
                icon: "fab fa-js"
            },
            {
                name: "Vue.js",
                icon: "fab fa-vuejs"
            }
        ]
    },
    projects: [
        {
            title: "项目1",
            description: "这是一个前端项目，使用Vue.js和Tailwind CSS构建",
            icon: "fas fa-code",
            link: "#"
        },
        {
            title: "项目2",
            description: "这是一个React项目，专注于用户界面设计",
            icon: "fab fa-react",
            link: "#"
        },
        {
            title: "项目3",
            description: "这是一个全栈项目，使用Node.js和MongoDB",
            icon: "fas fa-server",
            link: "#"
        },
        {
            title: "项目4",
            description: "这是一个移动应用项目，使用Flutter开发",
            icon: "fab fa-android",
            link: "#"
        }
    ],
    contact: {
        info: [
            {
                text: "email@example.com",
                icon: "fas fa-envelope"
            },
            {
                text: "+86 123 4567 8910",
                icon: "fas fa-phone"
            },
            {
                text: "北京市朝阳区",
                icon: "fas fa-map-marker-alt"
            }
        ],
        social: [
            {
                icon: "fab fa-github",
                href: "#"
            },
            {
                icon: "fab fa-twitter",
                href: "#"
            },
            {
                icon: "fab fa-linkedin",
                href: "#"
            },
            {
                icon: "fab fa-instagram",
                href: "#"
            }
        ]
    },
    friends: [
        {
            name: "百度",
            url: "https://www.baidu.com",
            icon: "fab fa-baidu"
        },
        {
            name: "谷歌",
            url: "https://www.google.com",
            icon: "fab fa-google"
        },
        {
            name: "GitHub",
            url: "https://github.com",
            icon: "fab fa-github"
        },
        {
            name: "知乎",
            url: "https://www.zhihu.com",
            icon: "fab fa-zhihu"
        },
        {
            name: "B站",
            url: "https://www.bilibili.com",
            icon: "fab fa-bilibili"
        }
    ],
    splash: {
        title: "加载中...",
        icon: "fas fa-user-circle",
        duration: 2000
    },
    style: {
        primaryColor: "#6366f1",
        secondaryColor: "#10b981",
        backgroundColor: "#f3f4f6",
        textColor: "#1f2937",
        glassOpacity: 0.2
    },
    themes: {
        default: {
            primaryColor: "#6366f1",
            secondaryColor: "#10b981",
            backgroundColor: "#f3f4f6",
            textColor: "#1f2937",
            glassOpacity: 0.2
        },
        light: {
            primaryColor: "#94a3b8",
            secondaryColor: "#64748b",
            backgroundColor: "#f8fafc",
            textColor: "#334155",
            glassOpacity: 0.15
        },
        lime: {
            primaryColor: "#84cc16",
            secondaryColor: "#65a30d",
            backgroundColor: "#fefce8",
            textColor: "#4d7c0f",
            glassOpacity: 0.15
        },
        lemon: {
            primaryColor: "#f59e0b",
            secondaryColor: "#d97706",
            backgroundColor: "#fffbeb",
            textColor: "#78350f",
            glassOpacity: 0.15
        },
        apple: {
            primaryColor: "#10b981",
            secondaryColor: "#059669",
            backgroundColor: "#ecfdf5",
            textColor: "#065f46",
            glassOpacity: 0.15
        },
        water: {
            primaryColor: "#3b82f6",
            secondaryColor: "#2563eb",
            backgroundColor: "#eff6ff",
            textColor: "#1e40af",
            glassOpacity: 0.15
        },
        cherry: {
            primaryColor: "#f43f5e",
            secondaryColor: "#e11d48",
            backgroundColor: "#fef2f2",
            textColor: "#991b1b",
            glassOpacity: 0.15
        },
        lavender: {
            primaryColor: "#8b5cf6",
            secondaryColor: "#7c3aed",
            backgroundColor: "#f5f3ff",
            textColor: "#5b21b6",
            glassOpacity: 0.15
        },
        graphite: {
            primaryColor: "#6b7280",
            secondaryColor: "#4b5563",
            backgroundColor: "#1f2937",
            textColor: "#f3f4f6",
            glassOpacity: 0.1
        }
    }
};

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 尝试加载配置文件
    try {
        // 首先检查config变量是否存在（来自config.js）
        if (typeof config !== 'undefined') {
            console.log('使用config.js中的配置...');
            // 初始化开屏动画
            initSplashScreen(config);
            
            // 初始化Vue应用
            initVueApp(config);
        } else {
            // 如果config变量不存在，尝试从config.json加载
            console.log('config变量未定义，尝试从config.json加载...');
            
            // 检查是否在本地文件系统中运行
            if (window.location.protocol === 'file:') {
                console.log('在本地文件系统中运行，无法使用fetch加载config.json，使用默认配置...');
                // 在本地文件系统中，直接使用默认配置
                initSplashScreen(defaultConfig);
                initVueApp(defaultConfig);
            } else {
                // 在服务器中运行，尝试fetch加载配置
                fetch('config.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(configData => {
                        console.log('从config.json加载配置成功！');
                        // 初始化开屏动画
                        initSplashScreen(configData);
                        
                        // 初始化Vue应用
                        initVueApp(configData);
                    })
                    .catch(error => {
                        console.error('加载config.json失败:', error);
                        console.log('使用默认配置...');
                        // 使用默认配置
                        initSplashScreen(defaultConfig);
                        initVueApp(defaultConfig);
                    });
            }
        }
    } catch (error) {
        console.error('初始化应用失败:', error);
        // 使用默认配置作为最后的回退
        initSplashScreen(defaultConfig);
        initVueApp(defaultConfig);
    }
});

// 初始化开屏动画
function initSplashScreen(config) {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.getElementById('splash-title');
    const splashLogo = splashScreen.querySelector('.logo i');
    
    // 从配置中获取开屏动画设置
    if (config && config.splash) {
        if (config.splash.title) {
            splashTitle.textContent = config.splash.title;
        }
        if (config.splash.icon) {
            splashLogo.className = config.splash.icon;
        }
    }
    
    // 显示开屏动画，然后隐藏
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        // 动画结束后移除开屏元素
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, config && config.splash && config.splash.duration ? config.splash.duration : 2000);
}

// 初始化Vue应用
function initVueApp(config) {
    new Vue({
        el: '#app',
        data: {
            config: config
        },
        mounted() {
            // 应用配置到页面
            this.applyConfig();
            
            // 平滑滚动
            this.initSmoothScroll();
            
            // 初始化主题选择器
            this.initThemeSelector();
            
            // 加载保存的主题
            this.loadSavedTheme();
        },
        methods: {
            // 应用配置到页面
            applyConfig() {
                // 设置页面标题
                if (this.config.basic && this.config.basic.title) {
                    document.title = this.config.basic.title;
                }
                
                // 更新导航栏
                this.updateNav();
                
                // 更新英雄区域
                this.updateHero();
                
                // 更新关于部分
                this.updateAbout();
                
                // 更新项目部分
                this.updateProjects();
                
                // 更新联系部分
                this.updateContact();
                
                // 更新友情链接
                this.updateFriends();
                
                // 更新页脚
                this.updateFooter();
                
                // 应用样式配置
                this.applyStyleConfig();
            },
            
            // 更新导航栏
            updateNav() {
                if (!this.config.nav) return;
                
                // 更新Logo
                const navLogo = document.getElementById('nav-logo');
                const navTitle = document.getElementById('nav-title');
                const navLogoIcon = navLogo.querySelector('i');
                
                if (this.config.nav.logo) {
                    if (this.config.nav.logo.title) {
                        navTitle.textContent = this.config.nav.logo.title;
                    }
                    if (this.config.nav.logo.icon) {
                        navLogoIcon.className = this.config.nav.logo.icon;
                    }
                }
                
                // 更新导航链接
                const navLinks = document.getElementById('nav-links');
                if (this.config.nav.links && Array.isArray(this.config.nav.links)) {
                    navLinks.innerHTML = '';
                    this.config.nav.links.forEach(link => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <a href="${link.href}">
                                <i class="${link.icon}"></i> ${link.text}
                            </a>
                        `;
                        navLinks.appendChild(li);
                    });
                }
            },
            
            // 更新英雄区域
            updateHero() {
                if (!this.config.hero) return;
                
                const heroTitle = document.getElementById('hero-title');
                const heroName = document.getElementById('hero-name');
                const heroSubtitle = document.getElementById('hero-subtitle');
                const heroAvatar = document.getElementById('hero-avatar');
                const heroAvatarIcon = heroAvatar.querySelector('i');
                
                if (this.config.hero.name) {
                    heroName.textContent = this.config.hero.name;
                }
                if (this.config.hero.subtitle) {
                    heroSubtitle.textContent = this.config.hero.subtitle;
                }
                
                // 更新按钮
                if (this.config.hero.buttons && Array.isArray(this.config.hero.buttons)) {
                    const heroButtons = document.querySelector('.hero-buttons');
                    heroButtons.innerHTML = '';
                    this.config.hero.buttons.forEach(btn => {
                        const a = document.createElement('a');
                        a.href = btn.href;
                        a.className = `btn ${btn.type}`;
                        a.textContent = btn.text;
                        heroButtons.appendChild(a);
                    });
                }
                
                // 更新头像
                if (this.config.hero.avatar) {
                    if (this.config.hero.avatar.imagePath) {
                        // 使用图片头像
                        heroAvatar.innerHTML = `<img src="${this.config.hero.avatar.imagePath}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                    } else if (this.config.hero.avatar.icon) {
                        // 使用图标头像
                        heroAvatar.innerHTML = `<i class="${this.config.hero.avatar.icon}"></i>`;
                    }
                    if (this.config.hero.avatar.size) {
                        heroAvatar.style.width = this.config.hero.avatar.size;
                        heroAvatar.style.height = this.config.hero.avatar.size;
                    }
                }
            },
            
            // 更新关于部分
            updateAbout() {
                if (!this.config.about) return;
                
                const aboutContent = document.getElementById('about-content');
                const skillsList = document.getElementById('skills-list');
                
                if (this.config.about.content) {
                    aboutContent.textContent = this.config.about.content;
                }
                
                // 更新技能列表
                if (this.config.about.skills && Array.isArray(this.config.about.skills)) {
                    skillsList.innerHTML = '';
                    this.config.about.skills.forEach(skill => {
                        const skillItem = document.createElement('div');
                        skillItem.className = 'skill-item glass-card';
                        skillItem.innerHTML = `
                            <i class="${skill.icon}"></i>
                            <span>${skill.name}</span>
                        `;
                        skillsList.appendChild(skillItem);
                    });
                }
            },
            
            // 更新项目部分
            updateProjects() {
                if (!this.config.projects || !Array.isArray(this.config.projects)) return;
                
                const projectsGrid = document.getElementById('projects-grid');
                projectsGrid.innerHTML = '';
                
                this.config.projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card glass-card';
                    projectCard.innerHTML = `
                        <div class="project-icon">
                            <i class="${project.icon}"></i>
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btn primary">查看详情</a>
                    `;
                    projectsGrid.appendChild(projectCard);
                });
            },
            
            // 更新联系部分
            updateContact() {
                if (!this.config.contact) return;
                
                const contactInfo = document.getElementById('contact-info');
                const socialLinks = document.getElementById('social-links');
                
                // 更新联系信息
                if (this.config.contact.info && Array.isArray(this.config.contact.info)) {
                    contactInfo.innerHTML = '';
                    this.config.contact.info.forEach(info => {
                        const contactItem = document.createElement('div');
                        contactItem.className = 'contact-item';
                        contactItem.innerHTML = `
                            <i class="${info.icon}"></i>
                            <span>${info.text}</span>
                        `;
                        contactInfo.appendChild(contactItem);
                    });
                }
                
                // 更新社交链接
                if (this.config.contact.social && Array.isArray(this.config.contact.social)) {
                    socialLinks.innerHTML = '';
                    this.config.contact.social.forEach(social => {
                        const socialLink = document.createElement('a');
                        socialLink.className = 'social-link glass-card';
                        socialLink.href = social.href;
                        socialLink.innerHTML = `<i class="${social.icon}"></i>`;
                        socialLinks.appendChild(socialLink);
                    });
                }
            },
            
            // 更新页脚
            updateFooter() {
                if (!this.config.basic || !this.config.basic.footerText) return;
                
                const footerText = document.getElementById('footer-text');
                footerText.textContent = this.config.basic.footerText;
            },
            
            // 更新友情链接
            updateFriends() {
                if (!this.config.friends || !Array.isArray(this.config.friends)) return;
                
                const friendsList = document.getElementById('friends-list');
                friendsList.innerHTML = '';
                
                this.config.friends.forEach(friend => {
                    const friendItem = document.createElement('div');
                    friendItem.className = 'friend-item glass-card';
                    friendItem.innerHTML = `
                        <i class="${friend.icon}"></i>
                        <a href="${friend.url}" target="_blank">${friend.name}</a>
                    `;
                    friendsList.appendChild(friendItem);
                });
            },
            
            // 应用样式配置
            applyStyleConfig() {
                if (!this.config.style) return;
                
                const root = document.documentElement;
                
                if (this.config.style.primaryColor) {
                    root.style.setProperty('--primary-color', this.config.style.primaryColor);
                }
                if (this.config.style.secondaryColor) {
                    root.style.setProperty('--secondary-color', this.config.style.secondaryColor);
                }
                if (this.config.style.backgroundColor) {
                    root.style.setProperty('--background-color', this.config.style.backgroundColor);
                }
                if (this.config.style.textColor) {
                    root.style.setProperty('--text-color', this.config.style.textColor);
                }
                if (this.config.style.glassOpacity) {
                    root.style.setProperty('--glass-opacity', this.config.style.glassOpacity);
                }
            },
            
            // 初始化平滑滚动
            initSmoothScroll() {
                const links = document.querySelectorAll('a[href^="#"]');
                links.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            },
            
            // 初始化主题选择器
            initThemeSelector() {
                const themeDropdown = document.getElementById('theme-dropdown');
                if (themeDropdown) {
                    themeDropdown.addEventListener('change', (e) => {
                        const selectedTheme = e.target.value;
                        this.applyTheme(selectedTheme);
                    });
                }
            },
            
            // 应用主题
            applyTheme(themeName) {
                if (!this.config.themes || !this.config.themes[themeName]) return;
                
                const theme = this.config.themes[themeName];
                const root = document.documentElement;
                
                // 应用主题样式
                if (theme.primaryColor) {
                    root.style.setProperty('--primary-color', theme.primaryColor);
                }
                if (theme.secondaryColor) {
                    root.style.setProperty('--secondary-color', theme.secondaryColor);
                }
                if (theme.backgroundColor) {
                    root.style.setProperty('--background-color', theme.backgroundColor);
                    document.body.style.backgroundColor = theme.backgroundColor;
                }
                if (theme.textColor) {
                    root.style.setProperty('--text-color', theme.textColor);
                    document.body.style.color = theme.textColor;
                }
                if (theme.glassOpacity) {
                    root.style.setProperty('--glass-opacity', theme.glassOpacity);
                }
                
                // 保存主题到本地存储
                localStorage.setItem('selectedTheme', themeName);
            },
            
            // 加载保存的主题
            loadSavedTheme() {
                const savedTheme = localStorage.getItem('selectedTheme') || 'default';
                const themeDropdown = document.getElementById('theme-dropdown');
                if (themeDropdown) {
                    themeDropdown.value = savedTheme;
                }
                this.applyTheme(savedTheme);
            }
        }
    });
}