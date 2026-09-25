import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const artifactRoot = resolve(import.meta.dirname, "..");
const attachedAssetsRoot = resolve(artifactRoot, "..", "..", "attached_assets");
const [
  projectsSource,
  projectDetailSource,
  timelineGallerySource,
  ambientMusicSource,
  seo,
  sitemap,
  appSource,
] = await Promise.all([
  readFile(resolve(artifactRoot, "src/pages/projects.tsx"), "utf8"),
  readFile(resolve(artifactRoot, "src/pages/project-detail.tsx"), "utf8"),
  readFile(resolve(artifactRoot, "src/components/projects/project-timeline-gallery.tsx"), "utf8"),
  readFile(resolve(artifactRoot, "src/components/projects/project-ambient-music.tsx"), "utf8"),
  readFile(resolve(artifactRoot, "src/config/seo-routes.json"), "utf8").then(JSON.parse),
  readFile(resolve(artifactRoot, "public/sitemap.xml"), "utf8"),
  readFile(resolve(artifactRoot, "src/App.tsx"), "utf8"),
]);

function caseStudySource(slug) {
  const start = projectsSource.indexOf(`slug: "${slug}"`);
  assert.notEqual(start, -1, `case study "${slug}" must be registered`);
  const nextStudy = projectsSource.indexOf('slug: "', start + 1);
  return projectsSource.slice(start, nextStudy === -1 ? projectsSource.length : nextStudy);
}

function importPath(importName) {
  const match = projectsSource.match(
    new RegExp(`import ${importName} from '@assets/([^']+)'`),
  );
  assert.ok(match, `${importName} must be imported from the approved media directory`);
  return resolve(attachedAssetsRoot, match[1]);
}

test("Mandarin project separates active construction media from five design renderings", async () => {
  const mandarin = caseStudySource("mandarin-pool-outdoor-living");

  assert.match(mandarin, /status: "in-progress"/);
  assert.match(mandarin, /statusLabel: "Construction in progress"/);
  assert.match(mandarin, /heroFit: "contain"/);
  assert.match(mandarin, /renderings: \[/);
  assert.match(mandarin, /construction: \[/);
  assert.match(mandarin, /video: \{/);
  assert.match(mandarin, /desktopSrc: mandarinConstructionVideo/);
  assert.match(mandarin, /mobileSrc: mandarinConstructionVideoMobile/);
  assert.match(mandarin, /poster: mandarinConstructionVideoPoster/);
  assert.doesNotMatch(mandarin, /\bbefore:/);
  assert.equal((mandarin.match(/label: "Design rendering ·/g) ?? []).length, 5);
  assert.equal((mandarin.match(/label: "Construction progress ·/g) ?? []).length, 3);

  const mediaImports = [
    "mandarinConstruction01",
    "mandarinConstruction01Mobile",
    "mandarinConstruction02",
    "mandarinConstruction02Mobile",
    "mandarinConstruction03",
    "mandarinConstruction03Mobile",
    "mandarinRendering01",
    "mandarinRendering01Mobile",
    "mandarinRendering02",
    "mandarinRendering02Mobile",
    "mandarinRendering03",
    "mandarinRendering03Mobile",
    "mandarinRendering04",
    "mandarinRendering04Mobile",
    "mandarinRendering05",
    "mandarinRendering05Mobile",
    "mandarinConstructionVideo",
    "mandarinConstructionVideoMobile",
    "mandarinConstructionVideoPoster",
  ];
  await Promise.all(mediaImports.map((name) => access(importPath(name))));
});

test("Orlando project keeps its construction image separate from completed photography", async () => {
  const orlando = caseStudySource("orlando-geometric-pool");

  assert.match(orlando, /status: "completed"/);
  assert.match(orlando, /location: "Orlando, FL"/);
  assert.match(orlando, /heroFit: "contain"/);
  assert.match(orlando, /construction: \[/);
  assert.match(orlando, /completedDay: \{/);
  assert.match(orlando, /completedGallery: \[/);
  assert.doesNotMatch(orlando, /\bbefore:/);
  assert.doesNotMatch(orlando, /render:/);

  await Promise.all([
    "orlandoConstructionShell",
    "orlandoConstructionShellMobile",
    "orlandoCompletedPool01",
    "orlandoCompletedPool01Mobile",
    "orlandoCompletedPool02",
    "orlandoCompletedPool02Mobile",
  ].map((name) => access(importPath(name))));
});

test("Hood & Shad Mandarin project presents an ordered gallery and final walkthrough", async () => {
  const mandarin = caseStudySource("mandarin-pool-turf-retaining-walls");

  assert.match(mandarin, /status: "completed"/);
  assert.match(mandarin, /location: "Hood & Shad area · Mandarin, Jacksonville, FL 32257"/);
  assert.match(mandarin, /timeline: "Approximately 8 months"/);
  assert.match(mandarin, /Two retaining walls/);
  assert.match(mandarin, /Synthetic turf/);
  assert.match(mandarin, /timeline: \[/);
  assert.match(mandarin, /Design direction · illustrative/);
  assert.match(mandarin, /desktopSrc: mandarinTurfFinalVideo/);
  assert.match(mandarin, /mobileSrc: mandarinTurfFinalVideoMobile/);
  assert.match(mandarin, /label: "Completed project · final walkthrough"/);
  assert.equal((mandarin.match(/photoTimelineItem\(/g) ?? []).length, 11);
  assert.equal((mandarin.match(/videoTimelineItem\(/g) ?? []).length, 4);

  const finalWalkthroughIndex = mandarin.indexOf(
    'videoTimelineItem("Completed project · final walkthrough"',
  );
  assert.ok(finalWalkthroughIndex > mandarin.indexOf("timeline: ["));
  assert.doesNotMatch(
    mandarin.slice(finalWalkthroughIndex + "videoTimelineItem(".length),
    /(?:photo|video)TimelineItem\(/,
  );

  const mediaImports = [
    "mandarinTurfHero",
    "mandarinTurfHeroMobile",
    "mandarinTurfBackyard",
    "mandarinTurfBackyardMobile",
    "mandarinTurfCoveredRendering",
    "mandarinTurfCoveredRenderingMobile",
    "mandarinTurfDesign01",
    "mandarinTurfDesign01Mobile",
    "mandarinTurfDesign02",
    "mandarinTurfDesign02Mobile",
    "mandarinTurfProgressNov24A",
    "mandarinTurfProgressNov24AMobile",
    "mandarinTurfProgressNov24B",
    "mandarinTurfProgressNov24BMobile",
    "mandarinTurfProgressNov26",
    "mandarinTurfProgressNov26Mobile",
    "mandarinTurfProgressDec10A",
    "mandarinTurfProgressDec10AMobile",
    "mandarinTurfProgressDec10B",
    "mandarinTurfProgressDec10BMobile",
    "mandarinTurfProgressDec10C",
    "mandarinTurfProgressDec10CMobile",
    "mandarinTurfProgressDec10D",
    "mandarinTurfProgressDec10DMobile",
    "mandarinTurfPoster",
    "mandarinTurfSiteOverview",
    "mandarinTurfSiteOverviewMobile",
    "mandarinTurfProgressDec10Video",
    "mandarinTurfProgressDec10VideoMobile",
    "mandarinTurfProgressFeb01Video",
    "mandarinTurfProgressFeb01VideoMobile",
    "mandarinTurfFinalVideo",
    "mandarinTurfFinalVideoMobile",
  ];
  await Promise.all(mediaImports.map((name) => access(importPath(name))));

  assert.match(projectsSource, /PROJECT_DISPLAY_ORDER = \[\s*"mandarin-pool-turf-retaining-walls",\s*"orlando-geometric-pool",\s*"mandarin-pool-outdoor-living",\s*"ponte-vedra-modern",\s*"jacksonville-waterfront",\s*"nocatee-resort",\s*"atlantic-beach-minimalist"/);
  assert.ok(projectsSource.indexOf("Ongoing Construction") < projectsSource.indexOf("{orderedCaseStudies.map"));
  assert.match(projectDetailSource, /<ProjectTimelineGallery items=\{project\.media\.timeline\} \/>/);
  assert.match(timelineGallerySource, /aria-label="Previous photo"/);
  assert.match(timelineGallerySource, /aria-label="Next photo"/);
  assert.match(timelineGallerySource, /loading="lazy"/);
  assert.match(timelineGallerySource, /preload="none"/);
  assert.match(ambientMusicSource, /onClick=\{isPlaying \? stopMusic : startMusic\}/);
  assert.doesNotMatch(ambientMusicSource, /\bautoplay\b/i);
});

test("both portfolio pages have route metadata and sitemap entries", () => {
  const routes = [
    {
      slug: "mandarin-pool-outdoor-living",
      url: "https://coveandstonepools.com/projects/mandarin-pool-outdoor-living/",
      title: "Mandarin Pool & Outdoor Living",
    },
    {
      slug: "orlando-geometric-pool",
      url: "https://coveandstonepools.com/projects/orlando-geometric-pool/",
      title: "Orlando Geometric Pool",
    },
    {
      slug: "mandarin-pool-turf-retaining-walls",
      url: "https://coveandstonepools.com/projects/mandarin-pool-turf-retaining-walls/",
      title: "Mandarin Pool & Turf Retreat",
    },
  ];

  for (const route of routes) {
    assert.ok(seo.pages[`/projects/${route.slug}`]?.title);
    assert.ok(seo.pages[`/projects/${route.slug}`]?.description);
    assert.equal(seo.projectNames[route.slug], route.title);
    assert.match(sitemap, new RegExp(`<loc>${route.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`));
  }

  assert.match(appSource, /<Route path="\/projects\/:slug\/" component=\{ProjectDetail\} \/>/);
});

test("project details do not turn construction progress into an implied before-and-after", () => {
  assert.match(projectDetailSource, /Current construction media and design renderings are shown separately/);
  assert.match(projectDetailSource, /Completed project photography · no before-and-after comparison/);
  assert.match(projectDetailSource, /heroMedia\.heroFit === "contain"/);
  assert.match(projectDetailSource, /preload="none"/);
  assert.match(projectDetailSource, /<source src=\{videoSource\} type="video\/mp4" \/>/);
  assert.match(projectDetailSource, /window\.matchMedia\('\(max-width: 767px\)'\)/);
});