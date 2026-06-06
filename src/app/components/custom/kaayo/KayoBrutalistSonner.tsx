import { useEffect } from 'react'
import { Toaster } from 'sonner'

const STYLE_ID = 'kayo-sonner-styles'

export type KayoToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface KayoBrutalistSonnerProps {
  position?: KayoToastPosition
  richColors?: boolean
  closeButton?: boolean
}

export function KayoBrutalistSonner({
  position = 'bottom-right',
  richColors = false,
  closeButton = true,
}: KayoBrutalistSonnerProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      [data-sonner-toaster] [data-sonner-toast] {
        font-family: 'DM Sans', system-ui, sans-serif !important;
        border: 2px solid #3b3d3f !important;
        border-radius: 6px !important;
        box-shadow: 4px 4px 0 #191b1f !important;
        background: #ffffff !important;
        padding: 12px 16px 12px 20px !important;
        position: relative !important;
        overflow: hidden !important;
      }
      [data-sonner-toaster] [data-sonner-toast]::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #3b3d3f;
      }
      [data-sonner-toaster] [data-sonner-toast][data-type="success"]::before { background: #166534; }
      [data-sonner-toaster] [data-sonner-toast][data-type="error"]::before { background: #970103; }
      [data-sonner-toaster] [data-sonner-toast][data-type="warning"]::before { background: #d97706; }
      [data-sonner-toaster] [data-sonner-toast][data-type="info"]::before { background: #1d4ed8; }
      [data-sonner-toaster] [data-sonner-toast][data-type="loading"]::before { background: #3b3d3f; }
      [data-sonner-toaster] [data-sonner-toast] [data-title] {
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #3b3d3f !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-description] {
        font-size: 13px !important;
        color: #6b7280 !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-close-button] {
        border: 2px solid #3b3d3f !important;
        border-radius: 4px !important;
        background: #ffffff !important;
      }
      [data-sonner-toaster] [data-sonner-toast] [data-button] {
        background: #ffffff !important;
        border: 2px solid #3b3d3f !important;
        border-radius: 6px !important;
        box-shadow: 2px 2px 0 #191b1f !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #3b3d3f !important;
        padding: 4px 10px !important;
      }
    `
    document.head.appendChild(s)
  }, [])

  return (
    <Toaster
      position={position}
      richColors={richColors}
      closeButton={closeButton}
    />
  )
}
