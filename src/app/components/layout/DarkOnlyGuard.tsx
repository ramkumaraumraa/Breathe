import { useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { productMeta, useProductTheme } from '../../context/ProductThemeContext'

/**
 * Pins the docs site to dark while a dark-only product is active.
 *
 * Technocracy is a permanent-dark admin surface — its `:root` tokens are the
 * dark ones, so rendering it inside a light page shows a combination that
 * cannot ship. Rather than let the reader build that view, the theme is pinned
 * and the toggle goes inert until they move to another product.
 *
 * Lives inside ThemeProvider but below ProductThemeProvider, so it can read
 * both without either context importing the other.
 */
export function DarkOnlyGuard() {
  const { activeProduct } = useProductTheme()
  const { setForcedTheme } = useTheme()

  useEffect(() => {
    setForcedTheme(productMeta[activeProduct]?.darkOnly ? 'dark' : null)
  }, [activeProduct, setForcedTheme])

  // Release the pin if this subtree ever unmounts.
  useEffect(() => () => setForcedTheme(null), [setForcedTheme])

  return null
}
