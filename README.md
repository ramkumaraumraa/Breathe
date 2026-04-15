
# Breathe - Aumraa Design System

Single source of truth for all Aumraa Technologies products.

## Products

| Product | Prefix | Platforms |
| --- | --- | --- |
| Lemniscate | `lmns` | Web |
| Technocracy | `tech` | Web |
| Aumraa | `amra` | Web |
| Yakaizen | `ykai` | Web, RN, iOS, Android, watchOS-ready |

## Token Pipeline

Tokens are defined in `tokens/src/*.json` and built by Style Dictionary.

```bash
pnpm tokens
pnpm tokens:watch
pnpm dev
```

## Structure

- `tokens/src/` - JSON token source of truth
- `tokens/dist/` - generated outputs per platform, committed for downstream apps
- `src/styles/` - documentation site styles and theme bridge
- `src/app/` - Breathe documentation site components and pages
  
