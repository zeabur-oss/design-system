[English](README.md) · [繁體中文](README.zh-TW.md) · **简体中文**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-zh-CN-dark.avif">
  <img alt="Zeabur Design System：做出和 Zeabur 一样的界面，亮色暗色都对。四个 token 的亮色与暗色。" src="docs/images/cover-zh-CN-light.avif">
</picture>

# Zeabur design system

Zeabur 为 React、[Base UI](https://base-ui.com) 和 [Tailwind CSS v4](https://tailwindcss.com) 做的组件与样式。

- **Token**：Zeabur 的色板（`zGray`、`zViolet`、`zOrangered`，有 RGB 三元组和 Tailwind 颜色两种写法）、语义 token（`text-main`、`text-secondary`、`text-tertiary`、`border-main`、`bg-surface-page`、`bg-surface-frame`、`*-v2-border`、`*-v2-separator`、`*-v2-surface-hover`、`*-v2-surface-active`、`success`、`error` 等）、状态色（`ok`、`progress`、`warn`、`fail`、`idle`，各有 `-soft` 和 `-strong`）、用量与图表颜色，以及对应到这些 token 的 [shadcn/ui](https://ui.shadcn.com) 主题变量（`bg-background`、`text-muted-foreground`、`bg-primary` 等），都有亮色和暗色。
- **文字角色**：`type-title`（24px，600）、`type-name`（20px，500）、`type-heading`（16px，600）、`type-body`（13px）、`type-meta`（12px）、`type-label`（11px 大写的分区标签）、`type-micro`、`type-nano`、`type-kbd`、`type-figure`、`type-mono`，建立在 `--text-<role>` 级别上。
- **组件**：每个组件一个模块，以 Base UI 为底，用 `cva` 和 `cn` 设置样式：ActionTile、Alert、Avatar、Badge、Banner、Brand（`Logo`、`Mark`）、Button、Card（附 `CardRow`、`SectionLabel`）、Chart、Checkbox、Collapsible、Combobox、Container、CopyInput、Dialog（`position="top"` 让命令面板在列表变动时保持不动）、Drawer、Empty（`inline` 尺寸用在分区里只占一行的位置）、Field、Frame（`AppFrame`、`FrameSidebar`、`FramePanel`、`PanelHeader`）、IconBox、Illustration、Input、Kbd（`Kbd`、`KbdGroup`、`shortcutKeys`）、Label、Menu、Meter、PageColumn（页面所有区块都放在这一栏，边缘才会对齐；`width` 可选 content、wide 或 full，`gap` 从 sm 12 到 xl 40 是区块间距；栏外的垂直空间用 margin）、PageHeader（窄屏幕上，它的操作按钮会在栏内换行）、PageTransition（`usePageTransition`、`pageViewTransition`）、Popover、Presence（`usePresence`，为不是 Base UI 管理的元素加上退场过渡）、Radio、SectionHeader（分区的标题、数量、一行说明和操作）、SegmentedBar、Select、Separator、Sidebar（附抽屉的 `SidebarMenu` 树形菜单、`SidebarSearch`、`SidebarPicker` 触发按钮和 `SidebarCopyPill`）、Skeleton、Sonner（`Toaster`）、Spinner（`LoadingDots`）、Stat、SummaryCard（一个状态、相关事实和操作）、SwapText（值改变时淡入）、Switch、Table、Tabs、Term（通俗名称，附上它代表的技术名称，`TermDetail`）、Textarea、Toggle、ToggleGroup、Tooltip。菜单、弹出层、提示和对话框的 Base UI 代码，会在首页加载之后才加载（`src/components/popup.tsx`）。
- **工具类**：Zeabur 的按钮样式（`button-primary`、`button-secondary`、最终确认用的 `button-destructive`、列表每一行上的破坏性操作用的 `button-secondary-destructive`）、浮起的导航行（`nav-active`、`nav-accent-bar`）、毛玻璃表面（`surface-glass`）、加载圆点（`dot-wave`）、动效（`popup-motion`、`dialog-motion`、`collapse-motion`、`swap-in`，以及[动效](#动效)一节列的其他类）、`bg-dots`、`bg-hatch`、`hairline-ring`、`scrollbar-none`、`brand-logo` 和 `brand-mark`。
- **字体**：Geist 和 Geist Mono，自行托管（SIL Open Font License）。

在 Storybook 预览所有组件（工具栏可切换亮色和暗色）：

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## Token 与规则

组件里所有的尺寸、颜色、阴影、动效和层级，都是 `src/tokens.css` 里的 token（有亮色和暗色），`bun run lint` 会检查这件事。设计需要新东西时，先加 token（或变体）。

### Token 家族

| 家族       | Token 与类                                                                                                                                                                                                                                                                                                                                                           | 用在                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 文字级别   | `--text-<role>` 搭配 `--text-<role>--line-height`（以及 `--font-weight`、`--letter-spacing`），角色有 `title` 24/32 600、`name` 20/28 500、`heading` 16/24 600、`body` 13/20、`meta` 12/16、`label` 11/16 500 大写、`micro` 11/16、`nano` 10/14、`kbd` 10/15 500、`figure` 20/28 500、`mono` 12；写成 `type-<role>`                                                  | 所有不是 Tailwind `text-xs`／`text-sm`／`text-base` 的文字大小（控件和表格文字用这三个）。`body` 是 13px 正文和导航行；`nano` 用在徽章或数字；`kbd` 用在键帽。请写 `type-*`，不要写 `text-<role>`：`cn` 会把不认识的 `text-<role>` 当成颜色，和 `text-main` 并用时把它丢掉。`cn` 也不会合并 `type-*` 和 `text-xs`，所以组件在各尺寸的变体里各自设置文字。旧的 `--type-<role>` 变量保留为别名 |
| 文字颜色   | `text-main`、`text-secondary`、`text-tertiary`、`text-inverse`、`text-on-primary`、`text-nav-current`、`text-info-strong`、`text-brand`                                                                                                                                                                                                                              | 最先被读到的文字；说明和未选中的导航；提示、占位文字、分区标签；反色表面上的文字；紫色上的文字；当前导航行的标签；紫色提示框里的字；紫色的标记和链接                                                                                                                                                                                                                                         |
| 表面       | `bg-surface-page`、`bg-card`／`bg-surface`、`bg-surface-frame`、`bg-chrome`、`bg-surface-raised`、`bg-segmented-track`、`bg-v2-surface-hover`、`bg-v2-surface-active`、`bg-muted`、`bg-sidebar-search`、`bg-table-head`、`bg-table-row-hover`、`bg-glass-hover`、`bg-glass-selected`、`bg-toast-action`、`bg-overlay`、`surface-glass`                               | 页面；放在页面上的东西；Container 的外框；侧边栏；浮在轨道上的白色胶囊；轨道；悬停和选中的行；安静的填色（复制胶囊）；抽屉的搜索行；表格的表头和悬停行；毛玻璃列表的行；通知上的按钮；对话框后面让页面变暗的遮罩；提示和下拉菜单                                                                                                                                                             |
| 边框       | `border-v2-border`、`border-main`、`border-input`、`border-segmented-border`、`border-border-strong`、`border-border-popover`、`border-rule`                                                                                                                                                                                                                         | 卡片、菜单、分隔线；较明显的边缘（侧边栏、容器、表格）；控件的边缘（字段、复选框、单选按钮，和页面的对比至少 3:1）；分段轨道的边缘；悬停时的边缘；浮起的东西；行与行之间的线                                                                                                                                                                                                                 |
| 品牌与操作 | `primary`、`primary-hover`、`on-primary`、`--primary-from`／`--primary-to`（以及 `-hover-`）、`--secondary-*`、`--destructive-*`、`--button-edge`、`--button-outline`；`button-primary`、`button-secondary`、`button-destructive`、`button-secondary-destructive`                                                                                                    | 紫色用在操作、已勾选的控件、焦点和当前所在位置；按钮样式（没有 React 的页面直接写这些工具类）                                                                                                                                                                                                                                                                                                |
| 危险与状态 | `destructive`、`danger`、`danger-hover`、`error`、`success`；`ok`、`progress`、`warn`、`fail`、`idle`，各有 `-soft` 和 `-strong`；`usage-normal`、`usage-warning`、`usage-severe`、`usage-reserved`；`chart-1` … `chart-5`                                                                                                                                           | 橘红色表示错误（`danger` 在两种主题下强度相同，`destructive` 在暗色下会调亮）；状态的圆点、胶囊填色和文字；用量条；图表数据系列                                                                                                                                                                                                                                                              |
| 导航       | `rail`、`nav-current`、`--nav-pill-*`、`nav-active`、`nav-active-sub`、`nav-accent-bar`                                                                                                                                                                                                                                                                              | 可折叠菜单的树形导轨；当前行的胶囊（最上层有侧边阴影，在父级下面没有）和当前子项的 3px 紫色长条                                                                                                                                                                                                                                                                                              |
| 轨道与图像 | `track`、`hatch-line`、`avatar`、`--tile-<tone>-from`／`-to`、`logo-violet`、`logo-orangered`、`mark-orangered`                                                                                                                                                                                                                                                      | 进度条没填的部分、骨架屏、没亮的圆点；没有上限的轨道的斜线；没有图片的头像；IconBox 和 Empty 的图标底板；标志自己的颜色                                                                                                                                                                                                                                                                      |
| 开关       | `switch-track`、`switch-track-border`、`switch-on-from`／`-to`／`-border`、`switch-thumb-from`／`-to`／`-border`、`shadow-switch-track`、`shadow-switch-thumb`                                                                                                                                                                                                       | 只用在有手感的开关                                                                                                                                                                                                                                                                                                                                                                           |
| 圆角       | `rounded-xs` 2px、`rounded`／`rounded-sm` 4px、`rounded-md` 6px、`rounded-lg` 8px、`rounded-xl` 12px                                                                                                                                                                                                                                                                 | 图表色块；复选框、标签、键帽；按钮、字段、菜单；导航行、横幅、容器；卡片                                                                                                                                                                                                                                                                                                                     |
| 阴影       | `shadow-xs`／`sm`（浮起）、`shadow-md`／`lg`（悬浮）、`shadow-xl`／`2xl`（对话框）、`shadow-segmented`、`shadow-tile`、`shadow-icon-box`、`drop-shadow-tile-icon`、`--shadow-glass`                                                                                                                                                                                  | 放在页面上、悬浮或模态的东西；选中的分段胶囊；图标底板的光晕；图标的雾面；毛玻璃表面                                                                                                                                                                                                                                                                                                         |
| 动效       | `ease-emphasized`（cubic-bezier(0.22, 1, 0.36, 1)，也叫 `ease-popup`）；`duration-micro` 80、`-quick` 150、`-fast` 250、`-medium` 350；`blur-swap`；`transition-field`、`-input`、`-visibility`；动效工具类，以及 `animate-skeleton`、`animate-skeleton-now`、`animate-dot-wave`                                                                                     | 所有会动的东西，时长从四种里选。哪种模式用哪个，见[动效](#动效)一节                                                                                                                                                                                                                                                                                                                          |
| 层级       | `z-raised` 10、`z-popup` 50、`z-tooltip` 60                                                                                                                                                                                                                                                                                                                          | 控件内部的浮起（标签页的标签、树形导轨的长条）；菜单、弹出层、下拉菜单、对话框；盖在它们上面的提示                                                                                                                                                                                                                                                                                           |
| 尺寸       | `h-control-xs` 28、`-sm` 32、`-md` 36、`-lg` 40（`size-`、`min-w-` 也有）；`w-sidebar` 224；`max-w-page-content` 64rem 和 `max-w-page-wide` 76rem（`PageColumn`，含它的内边距）；`w-sheet`；`w-dialog`；`max-h-dialog`；`max-h-listbox`；`pl-tree-indent`；`p-illustration-inset`；`aspect-logo`；`grid-cols-icon`、`-action`、`-stats`、`-tree`、`grid-rows-header` | 控件高度；抽屉；手机的导航面板；居中的对话框；Combobox 列表；树形的子项；间距级别表达不出来的布局。`cn` 不认识这些名称，所以组件只能在一个变体里设置，不能放在会被变体或 className 改掉的基底里                                                                                                                                                                                              |
| 工具类     | `card-padding`、`toggle-gap`、`segmented-cells`、`mask-fade-down`、`scroll-fade-x`、`indicator-dashed`、`hairline-ring`、`bg-dots`、`bg-hatch`、`scrollbar-none`、`brand-logo`、`brand-mark`、`sidebar-icon-bar`、`dot-wave`；`tabs-vertical:` 变体                                                                                                                  | 不止一条声明的处理，或组件自己算出来的值（`--cell`、`--gap`）                                                                                                                                                                                                                                                                                                                                |

色板（`zGray-*`、`zViolet-*`、`zOrangered-*`，有 RGB 三元组和 Tailwind 颜色）和 Tailwind 的 `white`、`black` 是 token 的原料。应用仍然可以用它们，但只有 `src/tokens.css` 会直接写它们的名称。

### Lint 禁止什么

`bun run lint`（Oxlint，`.oxlintrc.json`）遇到下列任何一项都会失败：

- **`shadcn/no-restyle`**（[@shadcn/lint](https://github.com/shadcn-ui/lint)）：组件上的 className 只能改布局（margin、定位、flex 和 grid 的摆放）；颜色、间距、形状和文字都由组件的变体和尺寸决定。规则允许 `RadioGroup` 设间距，`TableCell` 设颜色和 `type-mono`。页面需要的处理方式，就在这里新增变体。
- **`shadcn/no-raw-colors`**：不能用 Tailwind 色板的颜色（`bg-red-500`），也不能用主题没声明的颜色。
- **`zeabur/no-palette-classes`**（`lint/zeabur.js`）：Zeabur 自己的色板颜色也不行（`bg-zGray-800`、`text-zViolet-700`、`text-white`），要用语义 token 说出它的用途。
- **`zeabur/no-unguarded-motion`**：`transition-transform`、`transition-all`、`animate-spin` 和其他会移动或改变大小的类，都要加 `motion-safe:`（或 `motion-reduce:`）；动效工具类本身已经有减少动效的写法。
- **`shadcn/no-arbitrary-values`**：不能写 `text-[0.8125rem]`、`z-[60]`、`ease-[…]`、`w-[min(…)]`。用现有的 token，或新增一个。
- **`shadcn/no-inline-styles`**：`style` 只能放自定义属性，内容是类会读取的计算值（`--value`、`--cell`、`--dot-delay`）；不能用 `<style>` 元素（严格的内容安全策略会拦掉）。
- **`shadcn/no-unknown-classes`**：不能用 Tailwind 生成不出来的类（它通过 `.storybook/preview.css` 读取主题，在 `components.json` 里设为 `tailwind.css`）。
- **`shadcn/require-static-classes`**：组件的 className 要看得懂：字符串常量、条件，以及用它们组成的 `cn()`，或是直接传下去的 `className` prop。
- **`no-restricted-imports`**：要写 `@base-ui/react/<part>`，不能从根目录导入（应用会打包全部的部件）；不能用 Radix、Headless UI 或 Motion（组件以 Base UI 为底，动效用 CSS）；不能用 `@/` 导入（应用用自己的别名编译这些源码）。
- **Oxlint 的 correctness 规则**，加上 React 和 jsx-a11y 插件，一律视为错误（除了 `jsx-a11y/prefer-tag-over-role`，它会要求在画内联 SVG 的 span 上改用 `<img>`，以及 `Label` 上的 `label-has-associated-control`，因为 `Label` 的控件由调用方提供）；没有禁用任何规则的禁用注释也会失败。

应用可以用同样的规则检查自己的代码（Zeabur 应用的 `.oxlintrc.json` 就用这套配置，并设置 `componentImports: ["^@zeabur-oss/design-system/components/"]`）。包以 `@zeabur-oss/design-system/lint` 导出 `zeabur/*` 规则，供应用放进 `jsPlugins`。

### 动效

动效说明东西从哪里来、往哪里去。只用一条曲线 `ease-emphasized` 和四种时长：

| 模式                                    | 类                                                                                                                                               | 打开、关闭（ms） |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| 菜单、弹出层、下拉菜单、Combobox        | `popup-motion`（淡入，从锚点以 0.97 放大）                                                                                                       | 250、150         |
| 提示，延迟 300ms 才出现；下一个立刻出现 | `tooltip-motion`                                                                                                                                 | 150、80          |
| 对话框                                  | `dialog-motion` 和背景遮罩的 `overlay-motion`                                                                                                    | 250、150         |
| 面板、抽屉、Dock                        | `sheet-motion-start`、`sheet-motion-end`、`sheet-motion-bottom`                                                                                  | 350、250         |
| 通知                                    | Sonner，在 `Toaster` 里重新设置时间                                                                                                              | 350、150         |
| Collapsible、标签页指示条、侧边栏       | `collapse-motion`、`slide`                                                                                                                       | 开关都是 250     |
| 会变化的状态或标签                      | `SwapText`（`swap-in`：从 2px 模糊中上升 4px）                                                                                                   | 150，只在变化时  |
| 会变化的数字                            | `SwapText variant="number"`（`reveal-in`，淡入）                                                                                                 | 150，只在变化时  |
| 开关的滑块、箭头                        | `motion-safe:transition-transform duration-quick` 或 `duration-fast`                                                                             | 150、250         |
| 加载中                                  | `Skeleton`：300ms 后才出现，快速加载就不会闪一下；已经等过一段时间的用 `delay="none"`                                                            |                  |
| 换页（服务、项目）                      | 主面板上的 `page-transition`，路由的 `pageViewTransition`（浏览器没有带类型的 view transition 时用 `usePageTransition`）：旧页淡出，新页上升 4px | 150、250         |
| 标签页的内容面板                        | `TabsContent`（`reveal-in`，淡入）                                                                                                               | 150，只在变化时  |

换页时只有主面板会动：侧边栏、标题栏、地址里的标签页或筛选变化，以及第一次加载的页面都保持不动。日志、终端、编辑器、轮询更新的数据或图表，有人正在输入时会变的东西，以及焦点，都不要加动画。只有 `collapse-motion`、`slide` 和侧边栏可以让布局（高度、宽度）产生动画。关闭前不延迟，也不要过冲。

在 `prefers-reduced-motion: reduce` 下，过渡只保留透明度和颜色（最长 150ms），去掉位移、缩放、旋转、模糊和大小变化；`src/base.css` 会让每个动画在一帧后结束。每个动效工具类都有减少动效的写法；其他会动的东西要写成 `motion-safe:`（lint 会检查）。不是 Base UI 挂载的元素要用 `usePresence`，它会设置同样的 `data-starting-style` 和 `data-ending-style`，并让元素保持挂载到退场结束。

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

### 从 engawa 的 design system 迁过来

`@engawahq/design-system` 的组件、props 和变体、token 和工具类，这里都有，名称相同，所以应用只要改导入前缀（`@engawahq/design-system` → `@zeabur-oss/design-system`）和依赖就能迁过来。外观会变成 Zeabur 的样子。没有搬过来的有：`Mosaic` 和 `Tile`（`Illustration` 保留各个状态，会忽略 `seed`），以及 Tabs 的 `line` 变体和 `TabsMore`。

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

buttonVariants({ variant: "primary", size: "lg" })
```

标志写 `brand-logo h-5`，分区标签写 `type-label`。

## 包内容

| 路径                       | 内容                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `index.css`                | React 应用要用的整份样式表：shadcn/ui 的基础样式、字体，然后是 `tokens.css`；`dark:` 由 `.dark` 切换 |
| `tokens.css`               | `src/tokens.css`、`src/utilities.css` 和 `src/base.css`，给任何 Tailwind CSS v4 构建使用             |
| `fonts.css`                | Geist 和 Geist Mono 的 `@font-face`（`vendor/geist`）                                                |
| `src/tokens.css`           | 色板、语义与组件 token、状态、shadcn/ui 的映射、文字级别、动效、阴影、层级、命名尺寸和 Tailwind 主题 |
| `src/utilities.css`        | 文字角色、按钮样式、导航行、动效、图案、品牌蒙版                                                     |
| `src/base.css`             | 页面的底色和文字、焦点环、选中、滚动条、减少动效                                                     |
| `src/components/`          | 组件（`@zeabur-oss/design-system/components/<name>`）                                                |
| `src/variants/`            | 组件的类，写成不含 React 的 `cva` 函数（`@zeabur-oss/design-system/variants/<name>`）                |
| `vendor/shadcn/shadcn.css` | shadcn/ui 的基础样式（keyframes、`data-*` 变体）                                                     |
| `vendor/geist/`            | Geist 和 Geist Mono，以及它们的许可证                                                                |
| `vendor/zeabur/`           | Zeabur 的标志和标记（见“商标”）                                                                      |
| `stories/`                 | Storybook stories：每个组件，以及 token（Foundations）                                               |

## 内置的文件

`vendor/` 里的文件是原样复制的，只能整份更换：

- `vendor/geist`：来自 `geist` npm 包，版本记在 `vendor/geist/VENDORED`。
- `vendor/shadcn`：shadcn/ui 的 `shadcn/tailwind.css`，版本记在 `vendor/shadcn/VENDORED`。
- `vendor/zeabur`：来自 Zeabur 控制台和 zeabur.com 的标志与标记；`src/brand.test.ts` 会检查组件和蒙版画出来的图和原文件一致。

## 商标

Zeabur 的名称、标志和标记是 Zeabur Inc. 的商标。它们**不**在本仓库其余内容所用的 Apache License 2.0 许可范围内：`vendor/zeabur/` 里的文件、`Logo` 和 `Mark` 组件，以及 `brand-logo` 和 `brand-mark` 工具类放在这里，是为了让 Zeabur 自己的产品可以显示它们。请勿用它们为其他产品或服务命名、塑造品牌或代表它们，也不要用在暗示 Zeabur 为其背书的地方。为其他产品建立的分支要把它们换掉。

## 许可证与致谢

Apache-2.0（见 [LICENSE](LICENSE)），上述商标除外。贡献依 [Developer Certificate of Origin](DCO) 接受，见 [CONTRIBUTING.md](CONTRIBUTING.md)。

本仓库中的第三方内容：

- [shadcn/ui](https://ui.shadcn.com) 的组件（`src/components`）和基础样式（`vendor/shadcn/shadcn.css`），MIT License。
- 包的结构、弹出层加载器（`src/components/popup.tsx`）和部分组件的结构，来自 [engawa 的 design system](https://github.com/engawahq/design-system)（Apache-2.0）。
- Vercel 与 basement.studio 的 Geist 和 Geist Mono（SIL Open Font License 1.1，`vendor/geist/LICENSE.txt`）。
- Phosphor 图标（MIT License），由 unplugin-icons 从 `@iconify-json/ph` 编译进应用。
