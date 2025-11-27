// BlurHash implementation for image placeholders
// Lightweight alternative to serving multiple image sizes

export function generateBlurHash(color = "#FF6B35"): string {
  // Simplified blurhash for demo (in production, use blurhash-js library)
  return `L${Math.random().toString(36).substr(2, 3)},${color.replace("#", "")}`
}

export function blurHashToCSS(hash: string): string {
  // Convert blurhash to CSS gradient placeholder
  const colors = ["#FFB3A0", "#FF8555", "#FF6B35", "#E85A2D"]
  return `linear-gradient(135deg, ${colors.join(", ")})`
}

export function shouldUseBlurHash(): boolean {
  // Use blur placeholders on slow networks or mobile
  if (typeof navigator === "undefined") return false

  const connection = (navigator as any).connection || (navigator as any).mozConnection

  if (!navigator.onLine) return true
  if (connection?.effectiveType === "slow-2g") return true
  if (connection?.effectiveType === "2g") return true

  return false
}
