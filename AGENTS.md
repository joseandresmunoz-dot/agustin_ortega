# AGENTS.md

## Project
Static landing page for a personal trainer. No build, no package manager, no tests. Preview by opening `index.html` in a browser. CDN deps: Font Awesome 6.4.0, Google Fonts (Poppins). No EmailJS (contact form was removed; `script.js` has no form code).

## Gotchas (read before touching JS/HTML)
- SEO URLs are placeholders: `og:url`, `twitter:url`, JSON-LD `url` use `https://agustinortega.com/` — replace with the real domain on deploy. No `canonical` link, no `sitemap.xml`.
- `styles.css` still contains orphaned rules for removed markup: `.services` (section wrapper), `.contact*`, `.form-*`, `.newsletter-form` — harmless but don't treat them as live. (`.service-card` and siblings ARE live: reused by `#objetivos` and `#metodo`.)
- Testimonial cards carry `<!-- TODO -->` lorem placeholders (objetivo + texto) for Carolina, Jose Luis and Rosa — replace with real texts when provided.

## Conventions
- WhatsApp `5492966413003` is the conversion goal: 10 `wa.me` links, most with prefilled `?text=` (generic, per-plan `3/4/5 veces por semana`, and online-specific). Update texts consistently if the number or messaging changes.
- Section ids `inicio, sobre-mi, objetivos, presencial, online, proceso, resultados, metodo, faq, contacto` must stay in sync with nav/footer hrefs. Navbar shows `inicio, presencial, online, resultados, faq` + CTA button; `sobre-mi, objetivos, metodo, proceso, contacto` are reachable by scroll/footer only. Smooth scroll subtracts 80px for the fixed navbar (`script.js`).
- Scroll-reveal observer targets `.about, .goals, .pricing, .online, .steps, .results, .method, .faq, .final-cta, .instagram-section` (`script.js`) — add any new section class to that selector or it gets no fade-in.
- Stat counters support `data-prefix` / `data-suffix` (e.g. `+7`, `250+`, `150+`, `15`).
- FAQ is a JS accordion (`.faq-item` / `.faq-question` / `.faq-answer`, one open at a time); answer height is set via `scrollHeight` in JS.
- New style blocks go at the end of `styles.css`, reusing CSS variables and card/grid patterns (`.service-card`, `.pricing-card`).
- Desktop hero uses `min-height: 100vh` + top padding (not fixed `100vh`) so content never slides under the fixed navbar; nav tightens below 1100px (`gap`, smaller `.btn-nav`/logo/hero type) since 5 links + CTA overflow narrower desktop widths. Mobile menu breakpoint stays at 968px.
- Testimonial avatars are local `.jpeg`: `images/carolina.jpeg`, `images/joseluis.jpeg`, `images/rosa.jpeg`.
- Prices are hardcoded ARS in `index.html` (presencial $190.000/$220.000/$240.000, online $80.000) and mirrored in the JSON-LD `priceRange`.
