# Engineering standards: the design system's part

Apply `zeabur-oss-standards`' STANDARDS.md first. The design system adds these items to its
sections.

## 1. Comments, doc comments and commit messages

Condition first: "If the dialog is closed, return focus to the trigger." `WARNING:` here covers
data loss and a security boundary.

```ts
// Before: we're stopping propagation here because otherwise the menu closes when clicking inside
// After:  Stop the event here. Without this, a click inside the popup closes the menu.
```

```text
Before: tweaked button colors
After:  fix(button): make the destructive buttons meet 4.5:1

        The text on the destructive surface was below the WCAG AA contrast of 4.5:1.
```

## 2. Tests

Keep a browser test only for what a function test cannot see: rendering, focus, keyboard use.
Published names and props are in `src/compat.test.ts`; leave those tests alone.

```ts
// Before: one test per input
it("rejects empty", …); it("rejects spaces", …);
// After
it.each(["", " "])("rejects %j", (name) => expect(validName(name)).toBe(false));
```

## 3. Design

Leave alone also: React context providers, compound components; the names and props in
`src/compat.test.ts` (removing one is a deprecation, not a cleanup).

## 4. Scale

**Components**

- A component that renders a collection works with a page or a virtualized window of rows. It
  does not need every row in the DOM.
- A component does not fetch or start a polling timer itself; the app owns data and its refresh.

Leave alone: short fixed lists (a menu, a set of tabs); components far below any measured budget.
