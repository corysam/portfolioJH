# Media field sizes

Image requirements are **enforced**, not advisory. They live in each media
field's `pluginOptions.imageValidation` in `schema.json` (so they're versioned
in git) and are applied by
[`@tarkashilpa/strapi-plugin-image-dimension-validation`](https://www.npmjs.com/package/@tarkashilpa/strapi-plugin-image-dimension-validation).

The editor sees `Allowed aspect ratios: …` under the field, and saving an entry
whose image doesn't match fails with a validation error naming the requirement.

## Enforced rules

| Field | Rule | Why |
|---|---|---|
| `project.image` | 4:3 ≥1600px, or 1:1 ≥1200px, or 3:4 ≥1200px | `aspect-[4/3]` + `object-cover`; the alternates exist for illustrations (see below) |
| `about.photo` | 4:5 ≥1000px, or 1:1 ≥1000px | `object-cover` in a half-width, `min-h-[600px]` column |
| `header.logo` | 1:1 ≥256px | rendered `width={48} height={48}` with `object-cover` |
| `site-config.favicon` | 1:1 ≥512px | favicon convention |
| `shared.section.photo` | 4:3 ≥1200px | `aspect-[4/3]` + `object-cover` |
| `shared.partner.logo` | 8:5 ≥640px | `w-32 h-20` (128×80) + `object-cover` |

Ratios are matched with a **±2% tolerance**, so an image needs to be close to
the ratio, not exact. `minWidth` is a floor — larger is fine, Next.js resizes.

## Deliberately not enforced

- **`hero.heroImageDesktop` / `Tablet` / `Mobile`** — these render
  `object-contain`, so they are never cropped and the ratio only affects how
  much empty space surrounds them. Their natural ratios (~1.07:1, ~1.54:1,
  ~1:1.83) come from viewport arithmetic, not a fixed container, and enforcing
  them at ±2% would reject perfectly good artwork. Aim near those ratios; the
  CMS won't stop you.
- **`about.cv`** — a PDF, not an image.

## Where the ratios come from

Read off the actual containers. If you change one of these classes, update the
matching rule in `schema.json`.

- `project.image` — [ProjectCard.tsx:75](../apps/web/src/components/ProjectCard.tsx#L75),
  [projects/\[slug\]/page.tsx:136](../apps/web/src/app/projects/%5Bslug%5D/page.tsx#L136),
  and `object-contain` at `90vw` in
  [IllustrationModal.tsx:86](../apps/web/src/components/IllustrationModal.tsx#L86)
- `about.photo` — [AboutMe.tsx:73](../apps/web/src/components/AboutMe.tsx#L73)
- `hero.heroImage*` — [Hero.tsx:218-255](../apps/web/src/components/Hero.tsx#L218-L255)
- `header.logo` — [Header.tsx:106](../apps/web/src/components/Header.tsx#L106)
- `shared.section.photo` — [projects/\[slug\]/page.tsx:194](../apps/web/src/app/projects/%5Bslug%5D/page.tsx#L194)
- `shared.partner.logo` — [Footer.tsx:70](../apps/web/src/components/Footer.tsx#L70)

## Why `project.image` accepts three ratios

That one image serves two incompatible uses. On the Work card and the project
detail hero it is cropped to 4:3. But **illustrations have no detail page** —
the card opens `IllustrationModal`, which shows the image *whole* at
`object-contain`. Enforcing 4:3 alone would reject every portrait illustration,
so 1:1 and 3:4 are accepted too.

The tradeoff: a portrait illustration still gets cropped on its Work card, even
though the popup shows it correctly. If that becomes a real problem, the fix is
a separate thumbnail field, not a different rule.

## Editing the rules

Either edit `pluginOptions.imageValidation` in the field's `schema.json`, or use
Content-Type Builder → the media field → Advanced Settings → Image Validation.
Constraints the plugin imposes:

- Every rule needs an aspect ratio **and** a `minWidth`; there is no
  "any ratio, minimum width" rule.
- Each aspect ratio may appear only once per field.
- The field **must** have `allowedTypes` containing `"images"`, otherwise
  validation is skipped silently.

## Known gaps

- **A favicon uploaded as `.ico` will fail to save.** The plugin rejects any
  file whose dimensions Strapi couldn't read, with "Unable to determine the
  dimensions of the selected image." Use a 512×512 PNG.
- **Partner logos are cropped**, because [Footer.tsx:70](../apps/web/src/components/Footer.tsx#L70)
  uses `object-cover`. That's why the rule demands 8:5 rather than accepting any
  logo. Switching that to `object-contain` would be the better fix, after which
  the 8:5 rule could be relaxed.
- The plugin is young (v1.0.4) and from a single small vendor. It hooks
  `strapi.documents.use()` on create/update; if it ever misbehaves, removing the
  dependency disables all of the above and the `pluginOptions` keys become inert.
