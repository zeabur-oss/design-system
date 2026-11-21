[English](README.md) · [繁體中文](README.zh-TW.md) · **简体中文**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-zh-CN-dark.avif">
  <img alt="Zeabur Design System：做出和 Zeabur 一样的界面，亮色暗色都对。四个 token 的亮色与暗色。" src="docs/images/cover-zh-CN-light.avif">
</picture>

# Zeabur Design System

Zeabur 开源版给 React、[Base UI](https://base-ui.com) 和 [Tailwind CSS v4](https://tailwindcss.com) 用的组件与样式。做出和 Zeabur 开源版一样的界面，亮色暗色都对。Zeabur 开源版、Zeabur Identity 的登录页和 [oss.zeabur.com](https://oss.zeabur.com/zh-CN/) 都用它。

- **Token**：Zeabur 开源版的颜色、文字角色、状态色、阴影和动效，各有亮色和暗色的值，并对应到 [shadcn/ui](https://ui.shadcn.com) 的主题变量。
- **组件**：按钮、字段、菜单、对话框、表格、标签页、导航、图表等，每个组件一个模块，以 Base UI 为底。在 Storybook 浏览。
- **工具类**：Zeabur 开源版的按钮样式、导航行、毛玻璃表面和加载圆点。
- **字体**：Geist 和 Geist Mono，自行托管（SIL Open Font License）。

在 Storybook 预览所有组件（工具栏可切换亮色和暗色）：

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## 在 React 应用中使用

从 npm 安装，并固定版本：

```sh
bun add --exact @zeabur-oss/design-system
```

包直接提供源码（TSX 和 CSS），没有构建步骤，由应用自己编译。应用需要 React 19、Base UI、Tailwind CSS v4、`class-variance-authority` 和 `cn`（都是 peer dependency；只有用到图表时才要 `recharts`，只有用到通知时才要 `sonner`），Vite 配置里还要加：

```ts
plugins: [
  react({
    // The React Compiler skips node_modules unless `sources` names the files.
    compiler: { sources: [resolve(import.meta.dirname, "src") + "/", "/node_modules/@zeabur-oss/design-system/"] },
    exclude: /\/node_modules\/(?!@zeabur-oss\/design-system\/)/,
  }),
  tailwindcss(),
  // `~icons/ph/<name>`: Phosphor icons, as the components import them.
  Icons(icons),
],
// The pre-bundler runs no plugins, so it could not resolve `~icons/…`. What the design system
// imports is not pre-bundled either then, and Base UI reaches CommonJS: list it in `include`.
optimizeDeps: {
  exclude: ["@zeabur-oss/design-system"],
  include: ["@base-ui/react/select", "@base-ui/react/menu", "cn", "class-variance-authority" /* … */],
},
```

`tsconfig` 里要有 `"types": ["unplugin-icons/types/react"]`，开发依赖要有 `unplugin-icons`、`@iconify-json/ph`、`@svgr/core` 和 `@svgr/plugin-jsx`。`icons` 是 [`scripts/icons.ts`](scripts/icons.ts) 里的选项：把这个文件复制到应用里。它自己调用 svgr，因为 unplugin-icons 内置的 `"jsx"` 编译器会从自己的位置按名称加载 `@svgr/core`，而在 Bun 的隔离链接器下，那个位置看不到应用的包。

在应用的样式表里，紧接着 Tailwind 之后导入样式（它们也会告诉 Tailwind 去读组件的类）：

```css
@import "tailwindcss";
@import "@zeabur-oss/design-system";
```

组件则一个一个导入：

```tsx
import { Badge } from "@zeabur-oss/design-system/components/badge"
import { Button } from "@zeabur-oss/design-system/components/button"
```

用 `TooltipProvider`（`components/tooltip`）包住整个应用。主题默认是亮色，`<html>` 加上 `.dark` 类就是暗色（要在第一次绘制之前设好）；把应用的主题传给 `Toaster`（`components/sonner`）。`Toaster` 需要允许内联样式的内容安全策略（Sonner 会加一个 `<style>` 元素）。

## 服务端渲染的页面

不是 React 应用的页面（例如 Zeabur Identity 的登录页，是用 Tailwind CSS v4 CLI 编译的 askama 模板）使用 `tokens.css`：里面有 token、文字角色、工具类和基础样式，没有组件和 `@font-face`，也没有需要解析的 `url()`（标志的蒙版已经内联）。

```css
@import "tailwindcss" source(none);
@source "../templates";
@import "@zeabur-oss/design-system/tokens.css";

/* Follow the operating system: `dark:` by media query, the tokens by color-scheme. */
@custom-variant dark (@media (prefers-color-scheme: dark));
:root {
  color-scheme: light dark;
}

/* Geist, served from the app's own assets (copy vendor/geist/*.woff2 there). */
@font-face {
  font-family: "Geist";
  font-weight: 100 900;
  font-display: swap;
  src: url(/assets/Geist-Variable.woff2) format("woff2");
}
```

要像 React 应用那样用类切换，就删掉导入之后的那两条规则，写上 `@custom-variant dark (&:is(.dark *));`，并在 `<html>` 加 `class="dark"`。

模板使用 `@zeabur-oss/design-system/variants/<name>` 里组件的类。这些模块放的是组件的 `cva` 函数，不导入 React，所以构建脚本可以调用它们，把类写进模板：

```ts
import { buttonVariants } from "@zeabur-oss/design-system/variants/button"

buttonVariants({ variant: "default", size: "lg" })
```

标志写 `brand-logo h-5`，分区标签写 `type-label`。

## 参与开发

Token 家族、lint 规则和动效的规则写在 [docs/tokens-and-rules.md](docs/tokens-and-rules.md)（英文）。另见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 商标

Zeabur 的名称、标志和标记是 Zeabur Inc. 的商标。它们**不**在本仓库其余内容所用的 Apache License 2.0 许可范围内：`vendor/zeabur/` 里的文件、`Logo` 和 `Mark` 组件，以及 `brand-logo` 和 `brand-mark` 工具类放在这里，是为了让 Zeabur 自己的产品可以显示它们。请勿用它们为其他产品或服务命名、塑造品牌或代表它们，也不要用在暗示 Zeabur 为其背书的地方。为其他产品创建的派生仓库（fork）要把它们换掉。

## 许可证与致谢

Apache-2.0（见 [LICENSE](LICENSE)），上述商标除外。本项目按 [Developer Certificate of Origin](DCO) 接受贡献，见 [CONTRIBUTING.md](CONTRIBUTING.md)。

本仓库中的第三方内容：

- [shadcn/ui](https://ui.shadcn.com) 的组件（`src/components`）和基础样式（`vendor/shadcn/shadcn.css`），MIT License。
- Vercel 与 basement.studio 的 Geist 和 Geist Mono（SIL Open Font License 1.1，`vendor/geist/LICENSE.txt`）。
- Phosphor 图标（MIT License），由 unplugin-icons 从 `@iconify-json/ph` 编译进应用。
