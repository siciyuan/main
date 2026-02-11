const config = {
    "basic": {
        "title": "个人主页",
        "name": "开发者",
        "subtitle": "专注于前端开发和用户体验设计",
        "footerText": "© 2026 个人主页. 保留所有权利."
    },
    "nav": {
        "logo": {
            "icon": "fas fa-user-circle",
            "title": "个人主页"
        },
        "links": [
            {
                "text": "关于",
                "icon": "fas fa-user",
                "href": "#about"
            },
            {
                "text": "项目",
                "icon": "fas fa-code",
                "href": "#projects"
            },
            {
                "text": "联系",
                "icon": "fas fa-envelope",
                "href": "#contact"
            }
        ]
    },
    "hero": {
        "title": "你好，我是",
        "name": "开发者",
        "subtitle": "专注于前端开发和用户体验设计",
        "buttons": [
            {
                "text": "查看项目",
                "href": "#projects",
                "type": "primary"
            },
            {
                "text": "联系我",
                "href": "#contact",
                "type": "secondary"
            }
        ],
        "avatar": {
            "icon": "fas fa-user-circle",
            "imagePath": "https://api.kuleu.com/api/qqimg?qq=1493216423",
            "size": "150px"
        }
    },
    "about": {
        "content": "我是一名前端开发者，热爱创造美观且功能强大的网页应用。我擅长使用现代前端技术栈，包括HTML5、CSS3、JavaScript、Vue.js等。我注重用户体验，致力于构建响应式、高性能的网站。",
        "skills": [
            {
                "name": "HTML5",
                "icon": "fab fa-html5"
            },
            {
                "name": "CSS3",
                "icon": "fab fa-css3-alt"
            },
            {
                "name": "JavaScript",
                "icon": "fab fa-js"
            },
            {
                "name": "Vue.js",
                "icon": "fab fa-vuejs"
            }
        ]
    },
    "projects": [
        {
            "title": "项目1",
            "description": "这是一个前端项目，使用Vue.js和Tailwind CSS构建",
            "icon": "fas fa-code",
            "link": "#"
        },
        {
            "title": "项目2",
            "description": "这是一个React项目，专注于用户界面设计",
            "icon": "fab fa-react",
            "link": "#"
        },
        {
            "title": "项目3",
            "description": "这是一个全栈项目，使用Node.js和MongoDB",
            "icon": "fas fa-server",
            "link": "#"
        },
        {
            "title": "项目4",
            "description": "这是一个移动应用项目，使用Flutter开发",
            "icon": "fab fa-android",
            "link": "#"
        }
    ],
    "contact": {
        "info": [
            {
                "text": "email@example.com",
                "icon": "fas fa-envelope"
            },
            {
                "text": "+86 123 4567 8910",
                "icon": "fas fa-phone"
            },
            {
                "text": "北京市朝阳区",
                "icon": "fas fa-map-marker-alt"
            }
        ],
        "social": [
            {
                "icon": "fab fa-github",
                "href": "#"
            },
            {
                "icon": "fab fa-twitter",
                "href": "#"
            },
            {
                "icon": "fab fa-linkedin",
                "href": "#"
            },
            {
                "icon": "fab fa-instagram",
                "href": "#"
            }
        ]
    },
    "friends": [
        {
            "name": "百度",
            "url": "https://www.baidu.com",
            "icon": "fab fa-baidu"
        },
        {
            "name": "谷歌",
            "url": "https://www.google.com",
            "icon": "fab fa-google"
        },
        {
            "name": "GitHub",
            "url": "https://github.com",
            "icon": "fab fa-github"
        },
        {
            "name": "知乎",
            "url": "https://www.zhihu.com",
            "icon": "fab fa-zhihu"
        },
        {
            "name": "B站",
            "url": "https://www.bilibili.com",
            "icon": "fab fa-bilibili"
        }
    ],
    "splash": {
        "title": "加载中...",
        "icon": "fas fa-user-circle",
        "duration": 2000
    },
    "style": {
        "primaryColor": "#6366f1",
        "secondaryColor": "#10b981",
        "backgroundColor": "#f3f4f6",
        "textColor": "#1f2937",
        "glassOpacity": 0.2
    },
    "themes": {
        "default": {
            "primaryColor": "#6366f1",
            "secondaryColor": "#10b981",
            "backgroundColor": "#f3f4f6",
            "textColor": "#1f2937",
            "glassOpacity": 0.2
        },
        "light": {
            "primaryColor": "#94a3b8",
            "secondaryColor": "#64748b",
            "backgroundColor": "#f8fafc",
            "textColor": "#334155",
            "glassOpacity": 0.15
        },
        "lime": {
            "primaryColor": "#84cc16",
            "secondaryColor": "#65a30d",
            "backgroundColor": "#fefce8",
            "textColor": "#4d7c0f",
            "glassOpacity": 0.15
        },
        "lemon": {
            "primaryColor": "#f59e0b",
            "secondaryColor": "#d97706",
            "backgroundColor": "#fffbeb",
            "textColor": "#78350f",
            "glassOpacity": 0.15
        },
        "apple": {
            "primaryColor": "#10b981",
            "secondaryColor": "#059669",
            "backgroundColor": "#ecfdf5",
            "textColor": "#065f46",
            "glassOpacity": 0.15
        },
        "water": {
            "primaryColor": "#3b82f6",
            "secondaryColor": "#2563eb",
            "backgroundColor": "#eff6ff",
            "textColor": "#1e40af",
            "glassOpacity": 0.15
        },
        "cherry": {
            "primaryColor": "#f43f5e",
            "secondaryColor": "#e11d48",
            "backgroundColor": "#fef2f2",
            "textColor": "#991b1b",
            "glassOpacity": 0.15
        },
        "lavender": {
            "primaryColor": "#8b5cf6",
            "secondaryColor": "#7c3aed",
            "backgroundColor": "#f5f3ff",
            "textColor": "#5b21b6",
            "glassOpacity": 0.15
        },
        "graphite": {
            "primaryColor": "#6b7280",
            "secondaryColor": "#4b5563",
            "backgroundColor": "#1f2937",
            "textColor": "#f3f4f6",
            "glassOpacity": 0.1
        }
    }
};