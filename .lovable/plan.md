# Adaptive atlas and five-page mobile audit

## Goal
Keep the atlas expressive on capable devices while automatically reducing costly animation and compositing on constrained devices, then resolve the actionable Lighthouse mobile findings across the homepage, Atlas, Practices, Systems, and Knowledge pages.

## Implementation

1. **Add a shared rendering-capability hook**
   - Detect reduced-motion preference, coarse/mobile input, logical CPU count, and reported device memory when available.
   - Return stable `reduced`, `balanced`, or `full` rendering modes without changing the server-rendered first frame.
   - Record this rendering policy in `AGENTS.md`.

2. **Adapt the Civic Atlas by capability**
   - Full mode keeps all node pulses, path drawing, labels, artwork blending, and transitions.
   - Balanced mode limits animated nodes and labels, shortens path work, and removes expensive background compositing.
   - Reduced mode renders static paths and nodes, shows only essential labels, removes grain/parallax/blending, and retains every tap and keyboard interaction.
   - Add Enter/Space keyboard activation to interactive SVG nodes.

3. **Reduce shared visual cost on constrained devices**
   - Let artwork layers opt out of parallax, blend modes, filters, and permanent `will-change` based on the shared capability mode.
   - Disable smooth scrolling for constrained devices.
   - Reduce or remove the procedural grain effect in balanced/reduced modes.

4. **Fix Lighthouse accessibility and tap targets**
   - Increase muted text contrast where Lighthouse identified failures on Home and Practices.
   - Correct the Knowledge page definition-list structure.
   - Raise Atlas layer and system-index controls to reliable 44px targets with sufficient spacing.
   - Preserve visible focus and non-hover access across all interactive controls.

5. **Address page-level performance and SEO findings**
   - Replace oversized background source usage with appropriately compressed responsive assets where practical, prioritizing Home and Practices.
   - Ensure important first-view imagery is discoverable without delaying page rendering.
   - Add valid absolute canonical URLs to all five routes.
   - Treat development-only unminified JavaScript findings as non-production noise, while addressing real unused work exposed by the audit.

## Verification
- Run mobile Lighthouse against all five pages after implementation and compare performance, accessibility, best-practices, and SEO scores.
- Test keyboard activation and 44px targets on the Atlas.
- Check 390px, tablet, and desktop layouts for overflow and visual regressions.
- Confirm the latest preview build completes without errors.
