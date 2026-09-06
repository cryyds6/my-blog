---
title: Pages CMS 部署教程：为 Astro 博客装上 Git 原生 CMS
published: 2026-09-06
updated: 2026-09-06
draft: false
description: 详解为 Astro 博客配置 Pages CMS 的完整流程，包含托管版部署、配置文件解读与自托管方案，实现 Git 原生内容管理体验。
category: 部署教程
pinned: false
comment: true
---
**Pages CMS 部署教程：为 Astro 博客装上 Git 原生 CMS**

作为一个 Astro 博客的作者，你可能早已习惯了用 Markdown 写文章、用 Git 做版本控制的美妙体验。但每当想写点东西时，总得打开代码编辑器，在 Frontmatter 和正文之间来回切换，多少有点不够「丝滑」。

有没有一种方法，既能保留 Git 的所有优势（版本控制、分支管理），又能拥有像 Notion 或 WordPress 那样友好的编辑界面？

Pages CMS 就是答案。它不是一个存储你内容的第三方数据库，而是一个直接运行在你 GitHub 仓库之上的「可视化编辑器」。你提交的每一处修改，都会直接变成一次 Git 提交。对于 Astro 这种基于文件路由和 Content Collection 的框架来说，简直是天作之合。

本文将从零开始，带你为 Astro 项目配置并部署 Pages CMS。

---

## 为什么选择 Pages CMS？

在开始动手之前，先来聊聊它为什么值得一试。

- **真正的 Git 原生**：Pages CMS 本身不存数据，它只是 GitHub 的一个优雅客户端。你的所有文章、图片、配置都安全地躺在你的仓库里，随时可以 `git log` 查看历史，甚至可以 `git revert` 回滚误操作。
- **为 SSG 而生**：它完美匹配 Astro、Next.js、Hugo 等静态站点生成器的工作流。你不需要为了适配 CMS 去修改路由或数据获取逻辑，只需告诉它你的 Markdown 文件放在哪。
- **开发体验友好**：它的配置基于一个 `.pages.yml` 文件，完全声明式。你可以精确控制编辑器的表单字段，甚至定义字段的验证规则，让非技术背景的写作者也能轻松上手，而不必担心格式错误。

## 快速开始：托管版（推荐）

对于绝大多数个人博客作者，最快的方式是使用 Pages CMS 官方提供的托管服务。

1. 打开 **[app.pagescms.org]([https://app.pagescms.org)]([https://app.pagescms.org](https://app.pagescms.org))**。)**[。](https://app.pagescms.org)**。)
2. 点击 **Sign in with GitHub**，使用你的 GitHub 账号登录。
3. 授权 Pages CMS 应用。你可以选择让它访问**所有仓库**，或**仅选中的特定仓库**（为了安全，通常推荐后者）。
4. 登录后，你会看到你有权限的仓库列表。点击你想管理的博客仓库。
5. 如果仓库根目录还没有 `.pages.yml` 配置文件，Pages CMS 会贴心地提示你创建一个。
6. **最关键的一步**：将我文末附上的配置文件内容，粘贴到新建的 `.pages.yml` 中。这份配置是为 Firefly 博客主题深度定制的，涵盖了文章、关于页、友链以及各种站点配置。
7. 保存文件并提交到仓库主分支。
8. 刷新 Pages CMS 页面，你就会在左侧导航栏看到「📝 博客文章」、「⚙️ 站点设置」等分组了。现在，点击「博客文章」，试试新建一篇吧！

## 附录：Firefly 博客完整配置

将以下内容保存为项目根目录的 `.pages.yml` 即可。这份配置完整映射了 Firefly 主题的所有可编辑内容，你可以直接使用，也可以根据自己的需求调整字段。

```yaml

# PagesCMS 配置 - Firefly 博客

# 基于 PagesCMS v2.x 官方 schema 编写

# 文档: [https://pagescms.org/docs/configuration/](https://pagescms.org/docs/configuration/)

media:

  # 文章配图 - 上传到文章目录的 images 子文件夹

  - name: post-images

    label: 文章配图

    input: src/content/posts/images

    output: /images

    categories: [image]

  # public 静态资源 - 封面图、音乐封面等

  - name: assets

    label: 站点资源

    input: public/assets

    output: /assets

    categories: [image]

  # 头图 / 壁纸

  - name: banner

    label: 站点头图

    input: public/assets/images

    output: /assets/images

    categories: [image]

content:

  # ============================================================

  # 📝 内容页面

  # ============================================================

  - name: content-pages

    label: 📝 内容页面

    type: group

    items:

      # 博客文章 (collection)

      - name: posts

        label: 📝 博客文章

        type: collection

        path: src/content/posts

        format: yaml-frontmatter

        filename:

          template: "{primary}.md"

          field: create

        exclude: ["**/images/**", "**/*.avif", "**/*.webp", "**/*.png", "**/*.jpg"]

        view:

          primary: title

          fields: [title, published, tags, category, draft, pinned]

          sort: ["published desc", "title asc"]

          search: [title, description, tags, category]

          default:

            sort: published

            order: desc

        fields:

          - name: title

            label: 标题

            type: string

            required: true

            description: 文章标题

          - name: published

            label: 发布时间

            type: date

            required: true

            options:

              time: false

              format: yyyy-MM-dd

          - name: updated

            label: 更新时间

            type: date

            options:

              time: false

              format: yyyy-MM-dd

          - name: draft

            label: 草稿

            type: boolean

            default: false

          - name: description

            label: 文章摘要

            type: text

            description: 简短描述，留空则自动截取正文

          - name: image

            label: 封面图（上传）

            type: image

            description: 文章封面图片路径

            

          - name: image

            label: 封面图（网络）

            type: string

            description: 文章封面图片路径

          - name: tags

            label: 标签

            type: select

            options:

              multiple: true

              creatable: true

          - name: category

            label: 分类

            type: string

            description: 文章分类（如"资源推荐"、"部署教程"、"生活日常"、"感悟杂记"）

          - name: lang

            label: 语言

            type: select

            options:

              values:

                - { label: 中文, value: "" }

                - { label: English, value: en }

                - { label: 日本語, value: ja }

                - { label: 繁體中文, value: zh_TW }

                - { label: Русский, value: ru }

          - name: pinned

            label: 置顶

            type: boolean

            default: false

          - name: author

            label: 作者

            type: string

            description: 覆盖默认作者名（通常留空）

          - name: sourceLink

            label: 原文链接

            type: string

            description: 转载/翻译文章的原始出处

          - name: licenseName

            label: 许可协议名称

            type: string

            description: 如 CC BY-NC-SA 4.0

          - name: licenseUrl

            label: 许可协议链接

            type: string

          - name: comment

            label: 启用评论

            type: boolean

            default: true

          - name: password

            label: 文章密码

            type: string

            description: 设置后需要密码才能查看（留空为公开）

          - name: passwordHint

            label: 密码提示

            type: string

            description: 提示访问者密码是什么

          - name: body

            label: 正文

            type: rich-text

            required: true

      # 关于页面

      - name: about

        label: 📄 关于页面

        type: file

        path: src/content/spec/[about.md](http://about.md)

        format: yaml-frontmatter

        fields:

          - name: title

            label: 页面标题

            type: string

            default: "关于我"

          - name: body

            label: 正文

            type: rich-text

            

      # 友情链接

      - name: friends

        label: 🔗 友情链接

        type: file

        path: src/content/spec/friends.mdx

        format: yaml-frontmatter

        fields:

          - name: title

            label: 页面标题

            type: string

            default: 友情链接

          - name: description

            label: 页面描述

            type: string

          - name: body

            label: 正文

            type: code

            options:

              format: mdx

            description: MDX 格式（包含 JSX 组件），使用代码模式编辑

      # 留言板

      - name: guestbook

        label: 📬 留言板

        type: file

        path: src/content/spec/[guestbook.md](http://guestbook.md)

        format: yaml-frontmatter

        fields:

          - name: title

            label: 页面标题

            type: string

            default: 留言板

          - name: body

            label: 正文

            type: rich-text

  # ============================================================

  # ⚙️ 站点设置

  # ============================================================

  - name: site-settings

    label: ⚙️ 站点设置

    type: group

    description: 核心站点配置，包括标题、域名、SEO、个人信息等

    items:

      - name: site-config

        label: 🌐 站点主配置

        type: file

        path: src/config/siteConfig.ts

        format: code

        description: 站点标题、URL、主题色、分页、Bangumi 等核心设置

      - name: profile-config

        label: 👤 个人信息

        type: file

        path: src/config/homeConfig.ts

        format: code

        description: 头像、昵称、签名、社交链接等个人资料配置

      - name: announcement-config

        label: 📢 公告栏

        type: file

        path: src/config/announcementConfig.ts

        format: code

        description: 博客顶部公告栏的标题、内容和链接配置

      - name: license-config

        label: 📜 许可协议

        type: file

        path: src/config/licenseConfig.ts

        format: code

        description: 文章底部版权声明（如 CC BY-NC-SA 4.0）

  # ============================================================

  # 🎨 布局与外观

  # ============================================================

  - name: layout-appearance

    label: 🎨 布局与外观

    type: group

    description: 导航栏、侧边栏、壁纸、字体等视觉相关配置

    items:

      - name: nav-bar-config

        label: 🧭 导航栏

        type: file

        path: src/config/navBarConfig.ts

        format: code

        description: 导航栏菜单项、链接预设和搜索配置

      - name: sidebar-config

        label: 📐 侧边栏布局

        type: file

        path: src/config/sidebarConfig.ts

        format: code

        description: 侧边栏位置、组件（个人资料、公告、音乐、分类、标签等）的显示和排序

      - name: footer-config

        label: 📏 页脚设置

        type: file

        path: src/config/footerConfig.ts

        format: code

        description: 页脚开关控制

      - name: font-config

        label: 🔤 字体设置

        type: file

        path: src/config/fontConfig.ts

        format: code

        description: 全局字体、横幅字体、Google Fonts、子集化等配置

      - name: cover-image-config

        label: 🖼️ 文章封面图

        type: file

        path: src/config/coverImageConfig.ts

        format: code

        description: 文章详情页封面图显示和随机图 API 配置

      - name: expressive-code-config

        label: 💻 代码块样式

        type: file

        path: src/config/expressiveCodeConfig.ts

        format: code

        description: 代码高亮主题、折叠插件、语言徽章等代码块配置

  # ============================================================

  # 🔧 功能配置

  # ============================================================

  - name: feature-settings

    label: 🔧 功能配置

    type: group

    description: 评论、统计、音乐、打赏、友链、特效等功能模块配置

    items:

      - name: comment-config

        label: 💬 评论系统

        type: file

        path: src/config/commentConfig.ts

        format: code

        description: Twikoo / Waline / Giscus / Artalk / Disqus 评论系统配置

      - name: calendar-config

        label: 📅 日历页面

        type: file

        path: src/config/calendarConfig.ts

        format: code

        description: 日历页标题、节日 API（[timor.tech](http://timor.tech)）、内置节日（含农历）、生日与日程安排配置

      - name: music-config

        label: 🎵 音乐播放器

        type: file

        path: src/config/musicConfig.ts

        format: code

        description: 音乐播放模式（Meting API / 本地音乐）、播放列表、歌词设置

      - name: sponsor-config

        label: 💰 打赏页面

        type: file

        path: src/config/sponsorConfig.ts

        format: code

        description: 打赏用途、支付方式（支付宝/微信/Ko-fi/爱发电）、赞助者列表

      - name: friends-data

        label: 🔗 友链数据

        type: file

        path: src/config/friendsConfig.ts

        format: code

        description: 友链列表（站点名、头像、描述、链接、标签、权重）

      - name: gallery-config

        label: 🖼️ 相册配置

        type: file

        path: src/config/galleryConfig.ts

        format: code

        description: 相册列表（ID、名称、描述、地点、日期、标签、密码）和布局设置

      - name: pio-config

        label: 🎭 看板娘

        type: file

        path: src/config/pioConfig.ts

        format: code

        description: Spine / Live2D 看板娘模型、位置、交互、气泡提示配置

      - name: plantuml-config

        label: 📐 PlantUML 图表

        type: file

        path: src/config/plantumlConfig.ts

        format: code

        description: PlantUML 服务器地址和明暗主题配置

      - name: collectionsapi-config

        label: 📐 推荐导航栏

        type: file

        path: src/config/collectionsApiConfig.ts

        format: code

        description: 推荐导航栏目修改

settings:

  content:

    merge: false

```

