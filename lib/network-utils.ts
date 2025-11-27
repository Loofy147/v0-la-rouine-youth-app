// Network optimization utilities for poor connectivity

export interface NetworkStatus {
  isOnline: boolean
  effectiveType: "4g" | "3g" | "2g" | "slow-2g"
  downlink?: number
  rtt?: number
}

export function getNetworkStatus(): NetworkStatus {
  if (typeof navigator === "undefined") {
    return { isOnline: true, effectiveType: "4g" }
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection
  const isOnline = navigator.onLine

  return {
    isOnline,
    effectiveType: connection?.effectiveType || "4g",
    downlink: connection?.downlink,
    rtt: connection?.rtt,
  }
}

export function isSlowNetwork(): boolean {
  const status = getNetworkStatus()
  return !status.isOnline || ["2g", "slow-2g", "3g"].includes(status.effectiveType)
}

export function getImageQuality(): "low" | "medium" | "high" {
  const status = getNetworkStatus()

  if (!status.isOnline || status.effectiveType === "slow-2g") return "low"
  if (status.effectiveType === "2g" || status.effectiveType === "3g") return "medium"
  return "high"
}

export function getOptimalImageSize(quality: "low" | "medium" | "high"): {
  width: number
  height: number
} {
  switch (quality) {
    case "low":
      return { width: 200, height: 200 }
    case "medium":
      return { width: 400, height: 400 }
    case "high":
      return { width: 800, height: 800 }
  }
}
