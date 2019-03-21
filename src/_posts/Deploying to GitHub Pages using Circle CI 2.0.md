---
category: Translation

tags: 
  - Circle CI

title: '利用Circle CI2.0自动化部署Github Pages'

description: '利用Circle CI2.0把自己的Blog项目自动化部署到Github Pages。'

date: 2019-03-20

vssue: false

vssue-title: '利用Circle CI2.0自动化部署Github Pages'

---

<!-- more -->

[GitHub Pages](https://pages.github.com/)是GitHub提供的可用于托管静态网站（比如博客）或资源的免费服务。它的使用非常简单，但每次你想要更新某些内容时都需要做一些重复的手动工作（除非你使用他们内置的jekyll工具）。举个🌰，我的Blog是基于Vuepress搭建的项目，如果每次写完文章我都需要先手动build一遍，然后再把 dist文件夹push到Github上，这一点都不酷！😎因此我决定使用[Circle CI](https://circleci.com/) 把我的Blog自动部署到GitHubPages。

## 准备工作

### 1. 注册 CircleCI

这一步十分简单，直接进入 [CircleCI](https://link.juejin.im/?target=https%3A%2F%2Fcircleci.com%2F) 官网利用Github账号登录。

### 2. 仓库授权

在项目列表中在要部署的项目上点击Setup projects按钮，然后选择Linux 系统和 2.0版本平台，接下来就是配置`config.yml`文件。

### 3. 创建config.yml

在项目根目录或.circleci目录中为CircleCI创建名为config.yml的配置文件。

## 授予Circle CI访问仓库权限

这当然意味着Circle CI需要能够推送到您的项目仓库。 Circle CI已自动执行此过程，并允许您使用可访问存储库的任何帐户自动创建用户密钥。此密钥保持半秘密 - 只有指纹才会在UI中可见。它可用于您的部署脚本，因此请确保在部署时不运行不受信任或未知的代码。

