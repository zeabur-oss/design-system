/** Capture group `at` of a match; a group that did not take part is a bug in the test's pattern. */
export function group(match: RegExpExecArray | RegExpMatchArray, at = 1): string {
  const text = match[at]
  if (text === undefined) throw new Error(`no group ${at} in ${match[0]}`)
  return text
}
