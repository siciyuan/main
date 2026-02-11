#!/usr/bin/env python3
"""
配置文件生成和修改工具
用于生成或修改config.json文件，方便用户通过命令行界面配置个人主页
"""

import json
import os
import argparse
import sys

# 默认配置模板
DEFAULT_CONFIG = {
    "basic": {
        "title": "个人主页",
        "name": "开发者",
        "subtitle": "专注于前端开发和用户体验设计",
        "footerText": "© 2024 个人主页. 保留所有权利."
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
            "imagePath": "",
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
}

def generate_config(output_file="config.json"):
    """
    生成默认配置文件
    """
    print("正在生成配置文件...")
    
    # 写入JSON文件
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(DEFAULT_CONFIG, f, indent=4, ensure_ascii=False)
    
    print(f"配置文件已生成: {output_file}")
    print("您可以使用 --modify 选项修改此配置文件")


def validate_config(config):
    """
    验证配置文件的正确性
    """
    print("正在验证配置文件...")
    
    # 检查必填字段
    required_fields = [
        "basic", "nav", "hero", "about", "projects", 
        "contact", "splash", "style", "themes"
    ]
    
    for field in required_fields:
        if field not in config:
            print(f"错误: 缺少必填字段 '{field}'")
            return False
    
    # 检查基本信息必填字段
    basic_required = ["title", "name", "subtitle", "footerText"]
    for field in basic_required:
        if field not in config["basic"]:
            print(f"错误: 基本信息中缺少必填字段 '{field}'")
            return False
    
    print("配置文件验证通过！")
    return True

def modify_config(input_file="config.json", output_file=None):
    """
    修改现有配置文件
    """
    # 检查文件是否存在
    if not os.path.exists(input_file):
        print(f"错误: 文件 {input_file} 不存在")
        print("请先使用 --generate 选项生成配置文件")
        return
    
    # 读取现有配置
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            config = json.load(f)
        print("配置文件加载成功！")
        
        # 验证配置文件
        if not validate_config(config):
            print("警告: 配置文件存在问题，将使用默认值修复")
            # 合并默认配置和现有配置
            for key, value in DEFAULT_CONFIG.items():
                if key not in config:
                    config[key] = value
    except Exception as e:
        print(f"错误: 解析配置文件失败: {e}")
        print("尝试使用默认配置...")
        config = DEFAULT_CONFIG.copy()
    
    # 交互式修改配置
    print("\n开始修改配置文件...")
    print("按Enter键保留默认值，输入新值进行修改")
    print("=" * 60)
    
    # 修改基本信息
    print("\n1. 基本信息")
    config["basic"]["title"] = input(f"页面标题 [{config['basic']['title']}]: ") or config["basic"]["title"]
    config["basic"]["name"] = input(f"姓名 [{config['basic']['name']}]: ") or config["basic"]["name"]
    config["basic"]["subtitle"] = input(f"副标题 [{config['basic']['subtitle']}]: ") or config["basic"]["subtitle"]
    config["basic"]["footerText"] = input(f"页脚文本 [{config['basic']['footerText']}]: ") or config["basic"]["footerText"]
    
    # 修改导航栏
    print("\n2. 导航栏")
    config["nav"]["logo"]["title"] = input(f"Logo标题 [{config['nav']['logo']['title']}]: ") or config["nav"]["logo"]["title"]
    config["nav"]["logo"]["icon"] = input(f"Logo图标 [{config['nav']['logo']['icon']}]: ") or config["nav"]["logo"]["icon"]
    
    # 修改英雄区域
    print("\n3. 英雄区域")
    config["hero"]["name"] = input(f"姓名 [{config['hero']['name']}]: ") or config["hero"]["name"]
    config["hero"]["subtitle"] = input(f"副标题 [{config['hero']['subtitle']}]: ") or config["hero"]["subtitle"]
    config["hero"]["avatar"]["icon"] = input(f"头像图标 [{config['hero']['avatar']['icon']}]: ") or config["hero"]["avatar"]["icon"]
    config["hero"]["avatar"]["imagePath"] = input(f"头像图片路径 [{config['hero']['avatar']['imagePath']}]: ") or config["hero"]["avatar"]["imagePath"]
    config["hero"]["avatar"]["size"] = input(f"头像大小 [{config['hero']['avatar']['size']}]: ") or config["hero"]["avatar"]["size"]
    
    # 修改关于部分
    print("\n4. 关于部分")
    config["about"]["content"] = input(f"关于内容 [{config['about']['content'][:50]}...]: ") or config["about"]["content"]
    
    # 修改联系部分
    print("\n5. 联系部分")
    if config.get("contact", {}).get("info"):
        for i, info in enumerate(config["contact"]["info"]):
            config["contact"]["info"][i]["text"] = input(f"联系信息 {i+1} [{info['text']}]: ") or info["text"]
    
    # 修改友情链接
    print("\n6. 友情链接")
    if config.get("friends"):
        for i, friend in enumerate(config["friends"]):
            config["friends"][i]["name"] = input(f"友情链接 {i+1} 名称 [{friend['name']}]: ") or friend["name"]
            config["friends"][i]["url"] = input(f"友情链接 {i+1} URL [{friend['url']}]: ") or friend["url"]
    
    # 修改样式配置
    print("\n7. 样式配置")
    config["style"]["primaryColor"] = input(f"主色调 [{config['style']['primaryColor']}]: ") or config["style"]["primaryColor"]
    config["style"]["secondaryColor"] = input(f"次色调 [{config['style']['secondaryColor']}]: ") or config["style"]["secondaryColor"]
    
    # 修改主题配置
    print("\n8. 主题管理")
    theme_action = input("是否管理主题？(y/n) [n]: ")
    if theme_action.lower() == "y":
        print("主题列表:")
        for theme_name in config["themes"]:
            print(f"  - {theme_name}")
        
        new_theme = input("输入新主题名称 (留空跳过): ")
        if new_theme:
            config["themes"][new_theme] = {
                "primaryColor": input("主色调 [#6366f1]: ") or "#6366f1",
                "secondaryColor": input("次色调 [#10b981]: ") or "#10b981",
                "backgroundColor": input("背景色 [#f3f4f6]: ") or "#f3f4f6",
                "textColor": input("文本色 [#1f2937]: ") or "#1f2937",
                "glassOpacity": float(input("玻璃透明度 [0.2]: ") or "0.2")
            }
            print(f"新主题 '{new_theme}' 已添加")
    
    # 确定输出文件
    if output_file is None:
        output_file = input_file
    
    # 写入文件
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=4, ensure_ascii=False)
    
    print(f"\n配置文件已修改: {output_file}")
    
    # 生成前端配置文件
    generate_frontend_config(config)

def generate_frontend_config(config):
    """
    生成前端使用的config.js文件
    """
    frontend_config = f"const config = {json.dumps(config, indent=4, ensure_ascii=False)};"
    
    with open("config.js", "w", encoding="utf-8") as f:
        f.write(frontend_config)
    
    print("前端配置文件已更新: config.js")

def preview_config(input_file="config.json"):
    """
    预览配置文件内容
    """
    if not os.path.exists(input_file):
        print(f"错误: 文件 {input_file} 不存在")
        return
    
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            config = json.load(f)
        
        print("配置文件预览:")
        print("=" * 60)
        print(f"页面标题: {config['basic']['title']}")
        print(f"姓名: {config['basic']['name']}")
        print(f"副标题: {config['basic']['subtitle']}")
        print(f"主题数量: {len(config['themes'])}")
        print(f"项目数量: {len(config['projects'])}")
        print("=" * 60)
        
    except Exception as e:
        print(f"错误: 预览配置文件失败: {e}")

def main():
    """
    主函数，处理命令行参数
    """
    parser = argparse.ArgumentParser(description="配置文件生成和修改工具")
    parser.add_argument("--generate", action="store_true", help="生成默认配置文件")
    parser.add_argument("--modify", action="store_true", help="修改现有配置文件")
    parser.add_argument("--validate", action="store_true", help="验证配置文件")
    parser.add_argument("--preview", action="store_true", help="预览配置文件")
    parser.add_argument("--input", default="config.json", help="输入配置文件路径")
    parser.add_argument("--output", help="输出配置文件路径")
    
    args = parser.parse_args()
    
    if args.generate:
        output_file = args.output or "config.json"
        generate_config(output_file)
    elif args.validate:
        try:
            with open(args.input, "r", encoding="utf-8") as f:
                config = json.load(f)
            validate_config(config)
        except Exception as e:
            print(f"错误: 验证配置文件失败: {e}")
    elif args.preview:
        preview_config(args.input)
    else:
        # 默认进入修改模式
        modify_config(args.input, args.output)

if __name__ == "__main__":
    main()