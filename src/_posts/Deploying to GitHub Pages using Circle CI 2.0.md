---
category: Notes

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

## 授权Circle CI访问仓库

当你在点击Setup projects后，CircleCi 将会为你的项目在基于网络的分布式系统上（例如GitHub和Bitbucket）创建部署密钥。部署密钥是仓库专属的密钥。如果你使用GitHub作为你的分布式系统，而且GitHub拥有公钥，CircleCi 将会储存私有秘钥。部署密钥给予CircleCi 访问单个仓库的权限。为了保护CircleCi不能推送内容到你的仓库，部署密钥是只读的。

但是既然要使Circle CI实现自动部署，肯定需要在构建后push内容到项目的仓库。那么就要创建一个有读写权限的密钥，即用户密钥。 [创建用户密钥](<https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-user-key>)

然后将用户密钥的`fingerprints`添加到配置文件 config.yml中

```bash
version: 2
jobs:
  deploy-job:
    steps:
      - add_ssh_keys:
          fingerprints:
            - "SO:ME:FIN:G:ER:PR:IN:T"
```

除此之外，部署脚本还需要了解你的用户密钥关联的用户名和电子邮件。这些信息可以定义在config.yml中，但最好存储在Circle Ci 的项目环境变量中。这样你可以在部署脚本中使用以下内容：

```bash
git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME
```

## 编辑部署脚本

```bash
version: 2
jobs:
  build:
    branches:
      ignore:
        - master
    docker:
      # specify the version you desire here
      - image: circleci/node:latest

    working_directory: ~/repo
    environment:
      - SOURCE_BRANCH: src
      - TARGET_BRANCH: master
    steps:
      - add_ssh_keys:
          fingerprints:
            - "xx:xx:xx:xx:xx"
      - checkout

      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "package.json" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run:
          name: Install dependencies 
          command: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      - deploy:
          name: Deploy
          command: |
            if [ $CIRCLE_BRANCH == $SOURCE_BRANCH ]; then
              git config --global user.email $GH_EMAIL
              git config --global user.name $GH_NAME

              git clone $CIRCLE_REPOSITORY_URL out

              cd out
              git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
              git rm -rf .
              cd ..

              npm run build
              # write my custom domain name into the CNAME file
              echo "sunburst.wang" > dist/CNAME
              cp -a dist/. out/.

              mkdir -p out/.circleci && cp -a .circleci/. out/.circleci/.
              cd out

              git add -A
              git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

              git push origin $TARGET_BRANCH
            fi
```

Happy building! 🍻

BTW，为了方便，这份配置文件有意遗漏了两个可能的附加内容：🤪

1. 将部署脚本放入单独的deploy.sh脚本中
2. 使用Circle CI工作流可以更清晰地在主分支上运行脚本。

## 参考

- <https://blog.frederikring.com/articles/deploying-github-pages-circle-ci/>
- <https://circleci.com/docs/2.0/language-javascript/>
- <https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-user-key>