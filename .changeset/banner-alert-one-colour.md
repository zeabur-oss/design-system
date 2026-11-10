---
default: minor
---

# `Banner` and `Alert` use one amber for `warn`, and `Alert` has no default role

`Banner` `warn` is now amber, the same as `Alert` `warn`. Red stays for failure. The `notice`
variant is removed from `Banner` and `Alert`; use `warn`.

`Alert` no longer sets `role="alert"`. Pass `role="status"` or `role="alert"` when the content
appears after the page loaded and must be announced.
