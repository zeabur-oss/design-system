[English](README.md) · **繁體中文** · [简体中文](README.zh-CN.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-zh-TW-dark.avif">
  <img alt="Zeabur Design System：做出和 Zeabur 一樣的畫面，亮色暗色都對。四個 token 的亮色與暗色。" src="docs/images/cover-zh-TW-light.avif">
</picture>

# Zeabur Design System

Zeabur 為 React、[Base UI](https://base-ui.com) 和 [Tailwind CSS v4](https://tailwindcss.com) 做的元件與樣式。做出和 Zeabur 一樣的畫面，亮色暗色都對。Zeabur 開源版、Zeabur Identity 的登入頁和 [oss.zeabur.com](https://oss.zeabur.com/zh-TW/) 都用它。

- **Token**：Zeabur 的顏色、文字角色、狀態色、陰影和動態效果，各有亮色和暗色的值，並對應到 [shadcn/ui](https://ui.shadcn.com) 的主題變數。
- **元件**：按鈕、欄位、選單、對話框、表格、分頁、導覽、圖表等，每個元件一個模組，以 Base UI 為底。在 Storybook 瀏覽。
- **工具類別**：Zeabur 的按鈕樣式、導覽列、毛玻璃表面和載入圓點。
- **字型**：Geist 和 Geist Mono，自行託管（SIL Open Font License）。

在 Storybook 預覽所有元件（工具列可切換亮色和暗色）：

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## 在 React 應用程式中使用

從 npm 安裝，並固定版本：

```sh
bun add --exact @zeabur-oss/design-system
```

套件直接提供原始程式碼（TSX 和 CSS），沒有建置步驟，由應用程式自己編譯。應用程式需要 React 19、Base UI、Tailwind CSS v4、`class-variance-authority` 和 `cn`（都是 peer dependency；只有用到圖表時才要 `recharts`，只有用到通知時才要 `sonner`），Vite 設定裡還要加：

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

`tsconfig` 裡要有 `"types": ["unplugin-icons/types/react"]`，開發依賴要有 `unplugin-icons`、`@iconify-json/ph`、`@svgr/core` 和 `@svgr/plugin-jsx`。`icons` 是 [`scripts/icons.ts`](scripts/icons.ts) 裡的選項：把這個檔案複製到應用程式裡。它自己呼叫 svgr，因為 unplugin-icons 內建的 `"jsx"` 編譯器會從自己的位置用名稱載入 `@svgr/core`，而在 Bun 的隔離連結器下，那個位置看不到應用程式的套件。

在應用程式樣式表裡，緊接著 Tailwind 之後匯入樣式（它們也會告訴 Tailwind 去讀元件的類別）：

```css
@import "tailwindcss";
@import "@zeabur-oss/design-system";
```

元件則一個一個匯入：

```tsx
import { Badge } from "@zeabur-oss/design-system/components/badge"
import { Button } from "@zeabur-oss/design-system/components/button"
```

用 `TooltipProvider`（`components/tooltip`）包住整個應用程式。主題預設是亮色，`<html>` 加上 `.dark` 類別就是暗色（要在第一次繪製之前設好）；把應用程式的主題傳給 `Toaster`（`components/sonner`）。`Toaster` 需要允許行內樣式的內容安全政策（Sonner 會加一個 `<style>` 元素）。

## 伺服器端渲染的頁面

頁面不是 React 應用程式時（例如 Zeabur Identity 的登入頁，用 Tailwind CSS v4 CLI 編譯 askama 範本），改用 `tokens.css`：裡面有 token、文字角色、工具類別和基礎樣式，沒有元件和 `@font-face`，也沒有需要解析的 `url()`（標誌的遮罩已經內嵌）。

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

要像 React 應用程式那樣用類別切換，就刪掉匯入之後的那兩條規則，寫上 `@custom-variant dark (&:is(.dark *));`，並在 `<html>` 加 `class="dark"`。

範本使用 `@zeabur-oss/design-system/variants/<name>` 裡元件的類別。這些模組放的是元件的 `cva` 函式，不匯入 React，所以建置腳本可以呼叫它們，把類別寫進範本：

```ts
import { buttonVariants } from "@zeabur-oss/design-system/variants/button"

buttonVariants({ variant: "default", size: "lg" })
```

標誌寫 `brand-logo h-5`，區段標籤寫 `type-label`。

## 參與開發

Token 家族、lint 規則和動態效果的規則寫在 [docs/tokens-and-rules.md](docs/tokens-and-rules.md)（英文）。另見 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 商標

Zeabur 的名稱、標誌和標記是 Zeabur Inc. 的商標。它們**不**在本儲存庫其餘內容所用的 Apache License 2.0 授權範圍內：`vendor/zeabur/` 裡的檔案、`Logo` 和 `Mark` 元件，以及 `brand-logo` 和 `brand-mark` 工具類別放在這裡，是為了讓 Zeabur 自己的產品可以顯示它們。請勿用它們為其他產品或服務命名、塑造品牌或代表它們，也不要用在暗示 Zeabur 為其背書的地方。為其他產品建立的衍生儲存庫（fork）要把它們換掉。

## 授權與致謝

Apache-2.0（見 [LICENSE](LICENSE)），上述商標除外。本專案依 [Developer Certificate of Origin](DCO) 接受貢獻，見 [CONTRIBUTING.md](CONTRIBUTING.md)。

本儲存庫中的第三方內容：

- [shadcn/ui](https://ui.shadcn.com) 的元件（`src/components`）和基礎樣式（`vendor/shadcn/shadcn.css`），MIT License。
- Vercel 與 basement.studio 的 Geist 和 Geist Mono（SIL Open Font License 1.1，`vendor/geist/LICENSE.txt`）。
- Phosphor 圖示（MIT License），由 unplugin-icons 從 `@iconify-json/ph` 編譯進應用程式。
