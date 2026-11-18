import type { Cover, Lang } from "../render.ts"
import { column, control, quote } from "../template/slab.ts"

// crates/zeabur-identity-ui/src/i18n.rs: login_passkey, continue_with, login_password.
const ui: Record<Lang, [string, string, string]> = {
  en: ["Sign in with a passkey", "Continue with %provider%", "Password"],
  "zh-TW": ["使用通行密鑰登入", "使用 %provider% 繼續", "密碼"],
  "zh-CN": ["使用通行密钥登录", "使用 %provider% 继续", "密码"],
}

export default {
  product: "Identity",
  headline: {
    en: "Everyone signs in with their own account. No shared admin file.",
    "zh-TW": "每個人用自己的帳號|登入叢集，|不必共用管理員檔案。",
    "zh-CN": "每个人用自己的账号|登录集群，|不必共用管理员文件。",
  },
  alt: {
    en: "Zeabur Identity: everyone signs in with their own account. No shared admin file. Sign in with a passkey, GitHub, Google or a password.",
    "zh-TW":
      "Zeabur Identity：每個人用自己的帳號登入叢集，不必共用管理員檔案。可以用通行密鑰、GitHub、Google 或密碼登入。",
    "zh-CN":
      "Zeabur Identity：每个人用自己的账号登录集群，不必共用管理员文件。可以用通行密钥、GitHub、Google 或密码登录。",
  },
  slab: (lang) => {
    const [passkey, provider, password] = ui[lang]
    const via = (name: string) => quote(provider.replace("%provider%", name), provider)
    return column(
      control("primary", quote(passkey), "fingerprint"),
      control("outline", via("GitHub"), "github-logo"),
      control("outline", via("Google"), "google-logo"),
      control("field", quote(password), "password"),
    )
  },
  sources: ["identity/crates/zeabur-identity-ui/src/i18n.rs"],
} satisfies Cover
