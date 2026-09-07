# 实验5：鸿蒙开发入门及计算器开发

本项目使用 ArkTS 和 ArkUI 实现一个面向 Phone 设备的简易计算器，项目名称为“夏日计算器”。在课程示例的四则运算基础上，增加了小数输入、百分比、退格、清空和最近计算历史等功能。

## 功能

- 加、减、乘、除四则运算。
- 小数点输入和连续运算。
- 百分比转换、退格删除和全部清空。
- 显示当前表达式、计算结果和最近 5 条计算历史。
- 除数为零时显示错误提示，不使应用崩溃。
- 使用深海蓝、青绿色和珊瑚色构成移动端计算器界面。

## 导入运行

1. 使用 DevEco Studio 打开本目录。
2. 等待项目同步和依赖下载完成。
3. 在 Device Manager 中创建并启动 Phone 模拟器。
4. 点击 Run 运行 `entry` 模块。

项目源码不能替代 DevEco Studio 和 HarmonyOS SDK。若首次运行，需根据实验文档安装对应版本的 DevEco Studio、SDK 和模拟器镜像。

## 目录结构

```text
实验5/
├── AppScope/
│   ├── app.json5
│   └── resources/base/element/string.json
├── entry/
│   ├── build-profile.json5
│   ├── oh-package.json5
│   ├── hvigorfile.ts
│   ├── src/main/ets/entryability/EntryAbility.ets
│   ├── src/main/ets/pages/Index.ets
│   ├── src/main/resources/base/element/string.json
│   ├── src/main/resources/base/element/color.json
│   ├── src/main/resources/base/media/icon.png
│   ├── src/main/resources/base/profile/main_pages.json
│   └── src/main/module.json5
├── build-profile.json5
├── hvigor/hvigor-config.json5
├── hvigorfile.ts
├── oh-package.json5
└── entry/hvigorfile.ts
```

## 说明

计算逻辑集中在 `entry/src/main/ets/pages/Index.ets` 中，页面状态使用 `@State` 管理。计算器采用“当前显示值 + 暂存值 + 待处理运算符”的状态模型，按钮事件只负责更新状态，界面由 ArkUI 根据状态重新渲染。
