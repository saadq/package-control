/**
 * @flow
 */

import test from "ava";
import PackageControl from ".";

let pc: PackageControl;

test.beforeEach(() => {
  pc = new PackageControl();
});

test("search()", async t => {
  const materialPackages = await pc.search("Materialize");
  t.true(materialPackages.length > 0);
  t.true(materialPackages.every(theme => typeof theme.name === "string"));

  const materialThemes = await pc.search("Material", { labels: "theme" });
  t.true(materialThemes.length > 0);
  t.true(materialThemes.every(theme => theme.labels.includes("theme")));

  const tenDarkThemes = await pc.search("Dark", { labels: "theme", limit: 10 });
  t.true(tenDarkThemes.length <= 10);
  t.true(tenDarkThemes.every(theme => theme.labels.includes("theme")));
});

test("getThemes()", async t => {
  const themes = await pc.getThemes();
  t.true(themes.length > 0);
  t.true(themes.every(theme => theme.labels.includes("theme")));

  const twentyThemes = await pc.getThemes(20);
  t.true(twentyThemes.length <= 20);
  t.true(twentyThemes.every(theme => theme.labels.includes("theme")));
});

test("getColorSchemes", async t => {
  const schemes = await pc.getColorSchemes();
  t.true(schemes.length > 0);
  t.true(schemes.every(scheme => scheme.labels.includes("color scheme")));

  const twentySchemes = await pc.getColorSchemes(20);
  t.true(twentySchemes.length <= 20);
  t.true(twentySchemes.every(scheme => scheme.labels.includes("color scheme")));
});

test("getLanguages", async t => {
  const langs = await pc.getLanguages();
  t.true(langs.length > 0);
  t.true(langs.every(language => language.labels.includes("language syntax")));

  const twentyLangs = await pc.getLanguages(20);
  t.true(twentyLangs.length <= 20);
  t.true(twentyLangs.every(theme => theme.labels.includes("language syntax")));
});
