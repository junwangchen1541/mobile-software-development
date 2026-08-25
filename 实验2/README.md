# 实验 2：名片小程序

这是一个使用原生微信小程序制作的个人名片页面，主题是“让模型看见更大的世界”。内容基于 GitHub 公开个人资料，介绍软件工程本科生、AI 与遥感视觉学习者的身份，以及算法竞赛和 ACM 社团经历。

## 页面功能

- 展示个人名片头图、姓名、身份和学校信息。
- 展示个人介绍图片和 GitHub 主页链接。
- 展示深度学习、遥感视觉和算法竞赛三个关注方向。
- 展示公开项目数量、入学年份和 ACM 社团经历等公开信息。
- 点击“展开介绍”查看完整个人简介。
- 切换三个学习方向，查看对应说明。
- 复制一段不含隐私的公开简介。
- 点击 GitHub 地址复制个人主页链接。
- 使用微信原生分享能力转发名片。

## 导入运行

在微信开发者工具中直接导入本目录 `实验2/`，选择测试号或 `touristappid` 后点击“编译”。本实验不依赖云开发服务。

## 文件结构

```text
实验2/
├── assets/card-header.svg
├── assets/personal-intro.jpg
├── app.js
├── app.json
├── app.wxss
├── project.config.json
├── sitemap.json
└── pages/index/
    ├── index.js
    ├── index.json
    ├── index.wxml
    └── index.wxss
```

`assets/card-header.svg` 是 16:9 的项目头图素材，`assets/personal-intro.jpg` 是个人介绍图片。两者都可以在 `index.wxml` 中替换为自己的视觉素材。
