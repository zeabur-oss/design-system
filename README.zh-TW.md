[English](README.md) · **繁體中文** · [简体中文](README.zh-CN.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/cover-zh-TW-dark.avif">
  <img alt="Zeabur Design System：做出和 Zeabur 一樣的畫面，亮色暗色都對。四個 token 的亮色與暗色。" src="docs/images/cover-zh-TW-light.avif">
</picture>

# Zeabur design system

Zeabur 為 React、[Base UI](https://base-ui.com) 和 [Tailwind CSS v4](https://tailwindcss.com) 做的元件與樣式。

- **Token**：Zeabur 的色盤（`zGray`、`zViolet`、`zOrangered`，有 RGB 三元組和 Tailwind 顏色兩種寫法）、語意 token（`text-main`、`text-secondary`、`text-tertiary`、`border-main`、`bg-surface-page`、`bg-surface-frame`、`*-v2-border`、`*-v2-separator`、`*-v2-surface-hover`、`*-v2-surface-active`、`success`、`error` 等）、狀態色（`ok`、`progress`、`warn`、`fail`、`idle`，各有 `-soft` 和 `-strong`）、用量與圖表顏色，以及對應到這些 token 的 [shadcn/ui](https://ui.shadcn.com) 主題變數（`bg-background`、`text-muted-foreground`、`bg-primary` 等），都有亮色和暗色。
- **文字角色**：`type-title`（24px，600）、`type-name`（20px，500）、`type-heading`（16px，600）、`type-body`（13px）、`type-meta`（12px）、`type-label`（11px 大寫的區段標籤）、`type-micro`、`type-nano`、`type-kbd`、`type-figure`、`type-mono`，建立在 `--text-<role>` 級距上。
- **元件**：每個元件一個模組，以 Base UI 為底，用 `cva` 和 `cn` 設定樣式：ActionTile、Alert、Avatar、Badge、Banner、Brand（`Logo`、`Mark`）、Button、Card（附 `CardRow`、`SectionLabel`）、Chart、Checkbox、Collapsible、Combobox、Container、CopyInput、Dialog（`position="top"` 讓指令面板在清單變動時保持不動）、Drawer、Empty（`inline` 尺寸用在區段裡只佔一行的位置）、Field、Frame（`AppFrame`、`FrameSidebar`、`FramePanel`、`PanelHeader`）、IconBox、Illustration、Input、Kbd（`Kbd`、`KbdGroup`、`shortcutKeys`）、Label、Menu、Meter、PageColumn（頁面所有區塊都放在這一欄，邊緣才會對齊；`width` 可選 content、wide 或 full，`gap` 從 sm 12 到 xl 40 是區塊間距；欄外的垂直空間用 margin）、PageHeader（窄螢幕上，它的操作按鈕會在欄內換行）、PageTransition（`usePageTransition`、`pageViewTransition`）、Popover、Presence（`usePresence`，為不是 Base UI 管理的元素加上離場轉場）、Radio、SectionHeader（區段的標題、數量、一行說明和操作）、SegmentedBar、Select、Separator、Sidebar（附抽屜的 `SidebarMenu` 樹狀選單、`SidebarSearch`、`SidebarPicker` 觸發鈕和 `SidebarCopyPill`）、Skeleton、Sonner（`Toaster`）、Spinner（`LoadingDots`）、Stat、SummaryCard（一個狀態、相關資訊和操作）、SwapText（值改變時淡入）、Switch、Table、Tabs、Term（白話名稱，附上它代表的技術名稱，`TermDetail`）、Textarea、Toggle、ToggleGroup、Tooltip。選單、彈出視窗、提示和對話框的 Base UI 程式碼，會在第一個頁面載入之後才載入（`src/components/popup.tsx`）。
- **工具類別**：Zeabur 的按鈕樣式（`button-primary`、`button-secondary`、最後確認用的 `button-destructive`、清單每一列上的破壞性操作用的 `button-secondary-destructive`）、浮起的導覽列（`nav-active`、`nav-accent-bar`）、毛玻璃表面（`surface-glass`）、載入圓點（`dot-wave`）、動態效果（`popup-motion`、`dialog-motion`、`collapse-motion`、`swap-in`，以及[動態效果](#動態效果)一節列的其他類別）、`bg-dots`、`bg-hatch`、`hairline-ring`、`scrollbar-none`、`brand-logo` 和 `brand-mark`。
- **字型**：Geist 和 Geist Mono，自行託管（SIL Open Font License）。

在 Storybook 預覽所有元件（工具列可切換亮色和暗色）：

```sh
nix develop          # bun and Node.js, from flake.nix
bun ci
bun run storybook    # http://localhost:6006
```

## Token 與規則

元件裡所有的尺寸、顏色、陰影、動態效果和層級，都是 `src/tokens.css` 裡的 token（有亮色和暗色），`bun run lint` 會檢查這件事。設計需要新東西時，先加 token（或變體）。

### Token 家族

| 家族       | Token 與類別                                                                                                                                                                                                                                                                                                                                                       | 用在                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 文字級距   | `--text-<role>` 搭配 `--text-<role>--line-height`（以及 `--font-weight`、`--letter-spacing`），角色有 `title` 24/32 600、`name` 20/28 500、`heading` 16/24 600、`body` 13/20、`meta` 12/16、`label` 11/16 500 大寫、`micro` 11/16、`nano` 10/14、`kbd` 10/15 500、`figure` 20/28 500、`mono` 12；寫成 `type-<role>`                                                | 所有不是 Tailwind `text-xs`／`text-sm`／`text-base` 的文字大小（控制項和表格文字用這三個）。`body` 是 13px 內文和導覽列；`nano` 用在徽章或數字；`kbd` 用在按鍵帽。請寫 `type-*`，不要寫 `text-<role>`：`cn` 會把不認得的 `text-<role>` 當成顏色，和 `text-main` 並用時把它丟掉。`cn` 也不會合併 `type-*` 和 `text-xs`，所以元件在各尺寸的變體裡各自設定文字。舊的 `--type-<role>` 變數保留為別名 |
| 文字顏色   | `text-main`、`text-secondary`、`text-tertiary`、`text-inverse`、`text-on-primary`、`text-nav-current`、`text-info-strong`、`text-brand`                                                                                                                                                                                                                            | 最先被讀到的文字；說明和未選取的導覽；提示、預留文字、區段標籤；反色表面上的文字；紫色上的文字；目前導覽列的標籤；紫色提示框裡的字；紫色的標記和連結                                                                                                                                                                                                                                             |
| 表面       | `bg-surface-page`、`bg-card`／`bg-surface`、`bg-surface-frame`、`bg-chrome`、`bg-surface-raised`、`bg-segmented-track`、`bg-v2-surface-hover`、`bg-v2-surface-active`、`bg-muted`、`bg-sidebar-search`、`bg-table-head`、`bg-table-row-hover`、`bg-glass-hover`、`bg-glass-selected`、`bg-toast-action`、`bg-overlay`、`surface-glass`                             | 頁面；放在頁面上的東西；Container 的外框；側邊欄；浮在軌道上的白色藥丸；軌道；暫留和選取的列；低調的底色（藥丸形的複製按鈕）；抽屜的搜尋列；表格的標題列和暫留列；毛玻璃清單的列；通知上的按鈕；對話框後面讓頁面變暗的遮罩；提示和下拉選單                                                                                                                                                       |
| 邊框       | `border-v2-border`、`border-main`、`border-input`、`border-segmented-border`、`border-border-strong`、`border-border-popover`、`border-rule`                                                                                                                                                                                                                       | 卡片、選單、分隔線；較明顯的邊緣（側邊欄、容器、表格）；控制項的邊緣（欄位、核取方塊、選項按鈕，和頁面的對比至少 3:1）；分段軌道的邊緣；暫留時的邊緣；浮起的東西；列與列之間的線                                                                                                                                                                                                                 |
| 品牌與操作 | `primary`、`primary-hover`、`on-primary`、`--primary-from`／`--primary-to`（以及 `-hover-`）、`--secondary-*`、`--destructive-*`、`--button-edge`、`--button-outline`；`button-primary`、`button-secondary`、`button-destructive`、`button-secondary-destructive`                                                                                                  | 紫色用在操作、已勾選的控制項、焦點和目前所在位置；按鈕樣式（沒有 React 的頁面直接寫這些工具類別）                                                                                                                                                                                                                                                                                                |
| 危險與狀態 | `destructive`、`danger`、`danger-hover`、`error`、`success`；`ok`、`progress`、`warn`、`fail`、`idle`，各有 `-soft` 和 `-strong`；`usage-normal`、`usage-warning`、`usage-severe`、`usage-reserved`；`chart-1` … `chart-5`                                                                                                                                         | 橘紅色表示錯誤（`danger` 在兩種主題下強度相同，`destructive` 在暗色下會調亮）；狀態的圓點、藥丸填色和文字；用量條；圖表數列                                                                                                                                                                                                                                                                      |
| 導覽       | `rail`、`nav-current`、`--nav-pill-*`、`nav-active`、`nav-active-sub`、`nav-accent-bar`                                                                                                                                                                                                                                                                            | 可摺疊選單的樹狀導軌；目前列的藥丸（最上層有側邊陰影，在父層底下沒有）和目前子項的 3px 紫色長條                                                                                                                                                                                                                                                                                                  |
| 軌道與圖像 | `track`、`hatch-line`、`avatar`、`--tile-<tone>-from`／`-to`、`logo-violet`、`logo-orangered`、`mark-orangered`                                                                                                                                                                                                                                                    | 進度條沒填的部分、骨架、沒亮的圓點；沒有上限的軌道的斜線；沒有圖片的頭像；IconBox 和 Empty 的圖示底板；標誌自己的顏色                                                                                                                                                                                                                                                                            |
| 開關       | `switch-track`、`switch-track-border`、`switch-on-from`／`-to`／`-border`、`switch-thumb-from`／`-to`／`-border`、`shadow-switch-track`、`shadow-switch-thumb`                                                                                                                                                                                                     | 只用在有手感的開關                                                                                                                                                                                                                                                                                                                                                                               |
| 圓角       | `rounded-xs` 2px、`rounded`／`rounded-sm` 4px、`rounded-md` 6px、`rounded-lg` 8px、`rounded-xl` 12px                                                                                                                                                                                                                                                               | 圖表色塊；核取方塊、標籤、按鍵帽；按鈕、欄位、選單；導覽列、橫幅、容器；卡片                                                                                                                                                                                                                                                                                                                     |
| 陰影       | `shadow-xs`／`sm`（浮起）、`shadow-md`／`lg`（懸浮）、`shadow-xl`／`2xl`（對話框）、`shadow-segmented`、`shadow-tile`、`shadow-icon-box`、`drop-shadow-tile-icon`、`--shadow-glass`                                                                                                                                                                                | 放在頁面上、懸浮或強制回應的東西；選取的分段藥丸；圖示底板的光暈；圖示的朦朧效果；毛玻璃表面                                                                                                                                                                                                                                                                                                     |
| 動態效果   | `ease-emphasized`（cubic-bezier(0.22, 1, 0.36, 1)，也叫 `ease-popup`）；`duration-micro` 80、`-quick` 150、`-fast` 250、`-medium` 350；`blur-swap`；`transition-field`、`-input`、`-visibility`；動態工具類別，以及 `animate-skeleton`、`animate-skeleton-now`、`animate-dot-wave`                                                                                 | 所有會動的東西，時間從四種時長裡選。哪種模式用哪個，見[動態效果](#動態效果)一節                                                                                                                                                                                                                                                                                                                  |
| 層級       | `z-raised` 10、`z-popup` 50、`z-tooltip` 60                                                                                                                                                                                                                                                                                                                        | 控制項內部的浮起（分頁標籤、樹狀導軌的長條）；選單、彈出視窗、下拉選單、對話框；蓋在它們上面的提示                                                                                                                                                                                                                                                                                               |
| 尺寸       | `h-control-xs` 28、`-sm` 32、`-md` 36、`-lg` 40（`size-`、`min-w-` 也有）；`w-sidebar` 224；`max-w-page-content` 64rem 和 `max-w-page-wide` 76rem（`PageColumn`，含它的內距）；`w-sheet`；`w-dialog`；`max-h-dialog`；`max-h-listbox`；`pl-tree-indent`；`p-illustration-inset`；`aspect-logo`；`grid-cols-icon`、`-action`、`-stats`、`-tree`、`grid-rows-header` | 控制項高度；抽屜；手機的導覽面板；置中的對話框；Combobox 清單；樹狀的子項；間距級距表達不出來的版面。`cn` 不認得這些名稱，所以每個尺寸類別都只能在一個變體裡設定，不能放在會被變體或 className 改掉的基底裡                                                                                                                                                                                      |
| 工具類別   | `card-padding`、`toggle-gap`、`segmented-cells`、`mask-fade-down`、`scroll-fade-x`、`indicator-dashed`、`hairline-ring`、`bg-dots`、`bg-hatch`、`scrollbar-none`、`brand-logo`、`brand-mark`、`sidebar-icon-bar`、`dot-wave`；`tabs-vertical:` 變體                                                                                                                | 不只一條宣告的處理，或元件自己算出來的值（`--cell`、`--gap`）                                                                                                                                                                                                                                                                                                                                    |

色盤（`zGray-*`、`zViolet-*`、`zOrangered-*`，有 RGB 三元組和 Tailwind 顏色）和 Tailwind 的 `white`、`black` 是 token 的原料。應用程式仍然可以用它們，但只有 `src/tokens.css` 會直接寫它們的名稱。

### Lint 禁止什麼

`bun run lint`（Oxlint，`.oxlintrc.json`）遇到下列任何一項都會失敗：

- **`shadcn/no-restyle`**（[@shadcn/lint](https://github.com/shadcn-ui/lint)）：元件上的 className 只能改版面（margin、定位、flex 和 grid 的擺放）；顏色、間距、形狀和文字都由元件的變體和尺寸決定。規則允許 `RadioGroup` 設間距，`TableCell` 設顏色和 `type-mono`。頁面需要的處理方式，就在這裡新增變體。
- **`shadcn/no-raw-colors`**：不能用 Tailwind 色盤的顏色（`bg-red-500`），也不能用主題沒宣告的顏色。
- **`zeabur/no-palette-classes`**（`lint/zeabur.js`）：Zeabur 自己的色盤顏色也不行（`bg-zGray-800`、`text-zViolet-700`、`text-white`），要用語意 token 說出它的用途。
- **`zeabur/no-unguarded-motion`**：`transition-transform`、`transition-all`、`animate-spin` 和其他會移動或改變大小的類別，都要加 `motion-safe:`（或 `motion-reduce:`）；動態工具類別本身已經有減少動態的寫法。
- **`shadcn/no-arbitrary-values`**：不能寫 `text-[0.8125rem]`、`z-[60]`、`ease-[…]`、`w-[min(…)]`。用現有的 token，或新增一個。
- **`shadcn/no-inline-styles`**：`style` 只能放自訂屬性，內容是類別會讀取的計算值（`--value`、`--cell`、`--dot-delay`）；不能用 `<style>` 元素（嚴格的內容安全政策會擋掉）。
- **`shadcn/no-unknown-classes`**：不能用 Tailwind 產生不出來的類別（它透過 `.storybook/preview.css` 讀取主題，在 `components.json` 裡設為 `tailwind.css`）。
- **`shadcn/require-static-classes`**：元件的 className 要看得懂：字串常值、條件，以及用它們組成的 `cn()`，或是直接傳下去的 `className` prop。
- **`no-restricted-imports`**：要寫 `@base-ui/react/<part>`，不能從套件根入口 `@base-ui/react` 匯入（應用程式會打包全部的零件）；不能用 Radix、Headless UI 或 Motion（元件以 Base UI 為底，動態效果用 CSS）；不能用 `@/` 匯入（應用程式用自己的別名編譯這些原始程式碼）。
- **Oxlint 的 correctness 規則**，加上 React 和 jsx-a11y 外掛，一律視為錯誤（除了 `jsx-a11y/prefer-tag-over-role`，它會要求在畫行內 SVG 的 span 上改用 `<img>`，以及 `Label` 上的 `label-has-associated-control`，因為 `Label` 的控制項由呼叫端提供）；沒有停用任何規則的停用註解也會失敗。

應用程式可以用同樣的規則檢查自己的程式碼（Zeabur 應用程式的 `.oxlintrc.json` 就用這套設定，並設定 `componentImports: ["^@zeabur-oss/design-system/components/"]`）。套件以 `@zeabur-oss/design-system/lint` 匯出 `zeabur/*` 規則，讓應用程式放進 `jsPlugins`。

### 動態效果

動態效果說明東西從哪裡來、往哪裡去。只用一條曲線 `ease-emphasized` 和四種時長：

| 模式                                    | 類別                                                                                                                                               | 開啟、關閉（ms） |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 選單、彈出視窗、下拉選單、Combobox      | `popup-motion`（淡入，以錨點為中心從 0.97 倍放大到原尺寸）                                                                                         | 250、150         |
| 提示，延遲 300ms 才出現；下一個立刻出現 | `tooltip-motion`                                                                                                                                   | 150、80          |
| 對話框                                  | `dialog-motion` 和背景遮罩的 `overlay-motion`                                                                                                      | 250、150         |
| 面板、抽屜、Dock                        | `sheet-motion-start`、`sheet-motion-end`、`sheet-motion-bottom`                                                                                    | 350、250         |
| 通知                                    | Sonner，在 `Toaster` 裡重新設定時間                                                                                                                | 350、150         |
| Collapsible、分頁指示條、側邊欄         | `collapse-motion`、`slide`                                                                                                                         | 開關都是 250     |
| 會改變的狀態或標籤                      | `SwapText`（`swap-in`：向上移動 4px，同時從 2px 模糊變清晰）                                                                                       | 150，只在改變時  |
| 會改變的數字                            | `SwapText variant="number"`（`reveal-in`，淡入）                                                                                                   | 150，只在改變時  |
| 開關的滑桿、箭頭                        | `motion-safe:transition-transform duration-quick` 或 `duration-fast`                                                                               | 150、250         |
| 載入中                                  | `Skeleton`：300ms 後才出現，快速載入就不會閃一下；已經等過一段時間的用 `delay="none"`                                                              |                  |
| 換頁（服務、專案）                      | 主面板上的 `page-transition`，路由器的 `pageViewTransition`（瀏覽器不支援 view transition 的類型時用 `usePageTransition`）：舊頁淡出，新頁上升 4px | 150、250         |
| 分頁的內容面板                          | `TabsContent`（`reveal-in`，淡入）                                                                                                                 | 150，只在改變時  |

換頁時只有主面板會動：側邊欄、標題列、網址裡的分頁或篩選改變，以及第一次載入的頁面都保持不動。日誌、終端機、編輯器、輪詢更新的資料或圖表，有人正在輸入時會變的東西，以及焦點，都不要加動畫。只有 `collapse-motion`、`slide` 和側邊欄可以讓版面（高度、寬度）產生動畫。關閉前不延遲，也不要過衝。

在 `prefers-reduced-motion: reduce` 下，轉場只保留透明度和顏色（最長 150ms），去掉位移、縮放、旋轉、模糊和大小變化；`src/base.css` 會讓每個動畫在一個影格後結束。每個動態工具類別都有減少動態的寫法；其他會動的東西要寫成 `motion-safe:`（lint 會檢查）。不是 Base UI 掛載的元素要用 `usePresence`，它會設定同樣的 `data-starting-style` 和 `data-ending-style`，並在離場轉場結束前讓元素保持掛載。

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

### 從 engawa 的 design system 轉過來

`@engawahq/design-system` 的元件、props 和變體、token 和工具類別，這裡都有，名稱相同，所以應用程式只要改匯入的套件名稱（`@engawahq/design-system` → `@zeabur-oss/design-system`）和依賴就能轉過來。外觀會變成 Zeabur 的樣子。沒有搬過來的有：`Mosaic` 和 `Tile`（`Illustration` 保留各個狀態，會忽略 `seed`），以及 Tabs 的 `line` 變體和 `TabsMore`。

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

buttonVariants({ variant: "primary", size: "lg" })
```

標誌寫 `brand-logo h-5`，區段標籤寫 `type-label`。

## 套件內容

| 路徑                       | 內容                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `index.css`                | React 應用程式要用的整份樣式表：shadcn/ui 的基礎樣式、字型，然後是 `tokens.css`；`dark:` 由 `.dark` 切換 |
| `tokens.css`               | `src/tokens.css`、`src/utilities.css` 和 `src/base.css`，給任何 Tailwind CSS v4 建置使用                 |
| `fonts.css`                | Geist 和 Geist Mono 的 `@font-face`（`vendor/geist`）                                                    |
| `src/tokens.css`           | 色盤、語意與元件 token、狀態、shadcn/ui 的對應、文字級距、動態效果、陰影、層級、命名尺寸和 Tailwind 主題 |
| `src/utilities.css`        | 文字角色、按鈕樣式、導覽列、動態效果、圖樣、品牌遮罩                                                     |
| `src/base.css`             | 頁面的底色和文字、焦點環、選取、捲軸、減少動態                                                           |
| `src/components/`          | 元件（`@zeabur-oss/design-system/components/<name>`）                                                    |
| `src/variants/`            | 元件的類別，寫成不含 React 的 `cva` 函式（`@zeabur-oss/design-system/variants/<name>`）                  |
| `vendor/shadcn/shadcn.css` | shadcn/ui 的基礎樣式（keyframes、`data-*` 變體）                                                         |
| `vendor/geist/`            | Geist 和 Geist Mono，以及它們的授權                                                                      |
| `vendor/zeabur/`           | Zeabur 的標誌和標記（見「商標」）                                                                        |
| `stories/`                 | Storybook stories：每個元件，以及 token（Foundations）                                                   |

## 內嵌的檔案

`vendor/` 裡的檔案是原樣複製的，只能整份更換：

- `vendor/geist`：來自 `geist` npm 套件，版本記在 `vendor/geist/VENDORED`。
- `vendor/shadcn`：shadcn/ui 的 `shadcn/tailwind.css`，版本記在 `vendor/shadcn/VENDORED`。
- `vendor/zeabur`：來自 Zeabur 儀表板和 zeabur.com 的標誌與標記；`src/brand.test.ts` 會檢查元件和遮罩畫出來的圖和原檔一致。

## 商標

Zeabur 的名稱、標誌和標記是 Zeabur Inc. 的商標。它們**不**在本儲存庫其餘內容所用的 Apache License 2.0 授權範圍內：`vendor/zeabur/` 裡的檔案、`Logo` 和 `Mark` 元件，以及 `brand-logo` 和 `brand-mark` 工具類別放在這裡，是為了讓 Zeabur 自己的產品可以顯示它們。請勿用它們為其他產品或服務命名、塑造品牌或代表它們，也不要用在暗示 Zeabur 為其背書的地方。為其他產品建立的衍生儲存庫（fork）要把它們換掉。

## 授權與致謝

Apache-2.0（見 [LICENSE](LICENSE)），上述商標除外。本專案依 [Developer Certificate of Origin](DCO) 接受貢獻，見 [CONTRIBUTING.md](CONTRIBUTING.md)。

本儲存庫中的第三方內容：

- [shadcn/ui](https://ui.shadcn.com) 的元件（`src/components`）和基礎樣式（`vendor/shadcn/shadcn.css`），MIT License。
- 套件的結構、彈出視窗載入器（`src/components/popup.tsx`）和部分元件的結構，來自 [engawa 的 design system](https://github.com/engawahq/design-system)（Apache-2.0）。
- Vercel 與 basement.studio 的 Geist 和 Geist Mono（SIL Open Font License 1.1，`vendor/geist/LICENSE.txt`）。
- Phosphor 圖示（MIT License），由 unplugin-icons 從 `@iconify-json/ph` 編譯進應用程式。
