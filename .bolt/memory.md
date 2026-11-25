# Project memory

## Product intent & audience

- Interactive 3D rotatable UI prototype for the Retrofit Edge Computing Pod (RECP 2.0)
- Displays: RECP pod, traffic signal segment, and controller cabinet
- Focus on visual proportions and wireframe accuracy; on-model dimension labels removed
- Audience: technical/engineering users evaluating mechanical fit
- Standalone HTML download removed from project; Bolt can only export full project as zip

## Brand personality & voice

- Technical, precise, engineering-oriented
- Title is simply "RECP 2.0" (previous "final boss" title removed)
- Production-quality UI — polished, not generic

## Visual design & UX direction

- 3D viewer is central; pod significantly enlarged (~50% larger vs pole)
- Radome reshaped to a hemisphere dome on the bottom of the front face
- Wireframe mode draws edges from actual geometry with finer detail/threshold so curves show more outline
- Cable connects pod to controller cabinet (amber in solid mode, wireframe lines in wireframe mode)
- No on-model dimension lines, labels, or Dimensions toggle (spec sheet retains overall size as data)
- View buttons and toggles use Lucide icons
- Selected-part card with name, details, and close button
- React + Tailwind; JSX components in `src/components/`
- `@/` path alias for imports (maps to `src/`)
- Icons from `lucide-react` only

## Decisions, constraints & rationale

- Pod scaled ~50% larger; clamp rings and pole position recalculated to keep clamp on pole
- Radome geometry rebuilt as hemisphere per user drawing
- Dimension-label module and standalone HTML file removed from project
- Title simplified to "RECP 2.0" (no subtitle/bracketed text)
- Cable added: amber material in solid mode, converts to wireframe lines in wireframe mode
- Wireframe edge threshold tightened for finer detail on curved surfaces
- Camera views rescaled to match larger pod
- Download HTML not included in project — Bolt chat cannot attach files; zip export is the only route
- Build, typecheck, and lint all pass; visual results unverified (no browser preview)

## Open questions & assumptions

- Visual accuracy of 3D scene (proportions, radome hemisphere shape, wireframe detail) unverified — user asked to check on screen
- Mechanical spec accuracy assumed correct from existing source data
- Bolt file-attachment limitation means user must use zip export instead of standalone HTML