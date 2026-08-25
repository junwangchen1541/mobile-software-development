# 实验 2：名片小程序

这是一个使用原生微信小程序制作的个人名片页面，主题是“把好奇心，做成小作品”。页面包含 16:9 头图、个人简介、学习方向、统计信息和分享操作。

## 页面功能

- 展示个人名片头图、姓名、身份和学校信息。
- 点击“展开介绍”查看完整个人简介。
- 切换三个学习方向，查看对应说明。
- 收藏名片，状态通过本地存储保留。
- 复制一段不含隐私的公开简介。
- 使用微信原生分享能力转发名片。

## 导入运行

在微信开发者工具中直接导入本目录 `实验2/`，选择测试号或 `touristappid` 后点击“编译”。本实验不依赖云开发服务。

## 文件结构

```text
实验2/
├── assets/card-header.svg
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

`assets/card-header.svg` 是 16:9 的项目头图素材，后续可以替换为 AI 生成的 PNG，只需同步修改 `index.wxml` 中的 `image` 路径。
