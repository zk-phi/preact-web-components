export const instantiateStyleSheet = (...styles: string[]) => {
  if (typeof window === "undefined") {
    return null;
  }
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styles.join(""));
  return sheet;
}
