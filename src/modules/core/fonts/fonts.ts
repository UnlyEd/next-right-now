/**
 * List of allowed "Variable Fonts" that can be used in the project.
 *
 * By default, NRN comes with "Manrope" and "Inter" custom fonts built-in.
 * Both are open-source.
 *
 * The "active font" can be defined by each customer independently, as long as they are configured as "allowed fonts" below.
 *
 * @see https://fonts.google.com/specimen/Manrope
 * @see https://fonts.google.com/specimen/Inter
 */
export type AllowedVariableFont = 'Manrope' | 'Inter';

export type VariableFontConfig = {
  fontName?: AllowedVariableFont;
  format?: 'woff' | 'woff2'; // Defaults to woff2
  fontFile?: string; // Defaults to "${fontName}-variable-latin.${format}"
};

export const variableFontsConfig: VariableFontConfig[] = [
  { fontName: 'Manrope' },
  { fontName: 'Inter' },
];

export const fontsBasePath = '/static/fonts';

/**
 * Injects the font-faces of a font family (a family can have multiple font-faces).
 *
 * Meant to be used from MultiversalGlobalStyles, to inject fonts in the global CSS, so they can be used anywhere in the app.
 * The fonts are self-hosted in "/public/static/fonts" folder.
 *
 * Alternatively to self-hosted fonts, you can also use Google Fonts directly, which are simpler to use since Next.js v10.2.
 * See https://nextjs.org/blog/next-10-2#automatic-webfont-optimization.
 *
 * Key concepts:
 * - Only use WOFF/WOFF2 format, never use TTF or OTF (they're not meant for the web!)
 * - Only use "font-display: optional" (using "block" (or none) will FOIT, using "swap" will FOUT/FOFT)
 *
 * NRN fonts use recommended best-practices from Lee Robinson (Vercel):
 * - Self hosted (on Vercel).
 *   It's better to self-host than use Google Fonts, even though Next.js has advanced optimisations for Google Fonts,
 *   because self-hosted fonts are more reliable and don't require a round-trip to another server.
 *   Also, Google Fonts is blocked in some countries, like China. Self-hosting is the only alternative in such case.
 * - Use "Variable Font".
 *   Only one file for all font-faces. (instead of one for light, bold, medium, extraBold, etc.)
 *      Reduces the amount of kB the browser needs to fetch, and reduces the network overhead.
 * - Use Variable Font "subset".
 *    Only fetch part of the font, not all the glyphs.
 *    We only need "latin" subset. This is configured by "unicode-range".
 *    If you want to fetch the whole thing, simply adapt or remove "unicode-range".
 * - Use "Preloading".
 *    Use "rel=preload" in the `<link />` element, to start preloading the font file at the very beginning.
 * - Use "font-display: optional" to avoid FOUT/FOIT effects.
 *    - The font won't be used if it takes too much time to fetch. Basically, it won't be used the first time a user will load the site.
 *    - This is a caveat, and if you don't like it you can use "font-display: swap" instead, but then your users will suffer from FOUT effect the first time they load the site.
 *    - Also, FOUT might (very likely) negatively affect Google Cumulative Layout Shift (CLS) performance score, see https://web.dev/cls/
 *    - Alternatively, you can use "font-display: swap" AND select a fallback font that looks very similar to your font using https://meowni.ca/font-style-matcher/
 * - Browser caching.
 *    - All fonts are automatically cached by the browser for 1 year. See next.config.js:headers.
 *
 * Considerations for the future:
 * - Check out "Font Metrics Override" (experimental) https://leerob.io/blog/fonts#future
 *    Video: https://www.youtube.com/watch?v=Z6wjUOSh9Tk&t=176s
 *    Basically, something that's only possible with Chrome (as of May 2021) but should become usable in more browsers in the future.
 *    This will make it much easier to use a custom font with "font-display: swap" and configure the fallback font to display exactly the same (same height, width, etc.)
 *    So that when the "swap" happens, it doesn't affect the CLS score.
 *
 * Workflow to configure a new font (we're using Google Fonts even when self-hosting because it eases the process a lot):
 * 1) Find your font on Google Font (or have it ready).
 *    E.g: https://fonts.google.com/specimen/Manrope
 * 2) Select the font and copy its "<link>" url.
 *    E.g: https://fonts.googleapis.com/css2?family=Manrope&display=swap
 * 3) Look for the min/max weight of your font at the specification page.
 *    E.g: https://fonts.google.com/variablefonts?vfquery=manrope indicates min/max weight to be 200-800
 * 4) Change the url parameters manually, use "optional" and use a variable font with "weight" as a range.
 *    E.g: https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=optional
 * 5) Go to the url (https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=optional in our case)
 * 6) Copy the font-faces you need and add them below, as a new allow font.
 *    E.g: We only need "latin"
 * 7) Download the font-faces.
 *    E.g: https://fonts.gstatic.com/s/manrope/v4/xn7gYHE41ni1AdIRggexSvfedN4.woff2
 * 8) Copy the downloaded font-faces files (.woff2) to their folder in "/public/static/fonts" and replace the font-faces "src" by their new path.
 *    E.g: src: url(${basePath}/Manrope/Manrope-variable-latin.woff2) format('woff2');
 * 9) (Optional) Update NRN_DEFAULT_FONT constant to use your new font by default, if you wish to.
 *
 * @param fontName
 *
 * @see https://css-tricks.com/fout-foit-foft/ Acronyms explanations
 * @see https://developers.google.com/fonts/docs/css2#axis_ranges Learn how to configure Google Fonts axis ranges
 * @see https://leerob.io/blog/fonts Inspiration from Vercel
 * @see https://www.youtube.com/watch?v=G0cOQ79WKZE Comprehensive video about how to properly configure Fonts in 2021
 * @see https://csswizardry.com/2020/05/the-fastest-google-fonts/ In-depth understanding of the different configurations and how they affect perfs
 * @see https://stackoverflow.com/questions/11002820/why-should-we-include-ttf-eot-woff-svg-in-a-font-face
 * @see https://stackoverflow.com/questions/36105194/are-eot-ttf-and-svg-still-necessary-in-the-font-face-declaration/36110385#36110385
 */
export const injectFontFamily = (fontName: AllowedVariableFont): string => {

  switch (fontName) {
    // From https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=optional
    case 'Manrope':
      return `
        @font-face {
          font-family: 'Manrope';
          font-style: normal;
          font-weight: 200 800;
          font-display: optional;
          src: url(${fontsBasePath}/Manrope/Manrope-variable-latin.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `;

    // From https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=optional
    case 'Inter':
      return `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: optional;
          src: url(${fontsBasePath}/Inter/Inter-variable-latin.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `;
  }
};
