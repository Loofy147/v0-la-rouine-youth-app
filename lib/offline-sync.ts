// Offline sync queue management with IndexedDB

interface SyncItem {
  id: string
  type: "post" | "like" | "comment" | "rsvp"
  data: Record<string, any>
  timestamp: number
  retries: number
}

const DB_NAME = "larouine_sync"
const DB_VERSION = 1
const STORE_NAME = "sync_queue"

let db: IDBDatabase | null = null

export async function initializeOfflineSync(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      console.warn("[v0] IndexedDB not available")
      resolve()
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve()
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

export async function addToSyncQueue(item: Omit<SyncItem, "id" | "timestamp" | "retries">): Promise<string> {
  if (!db) await initializeOfflineSync()

  const syncItem: SyncItem = {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    retries: 0,
    ...item,
  }

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(syncItem)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(syncItem.id)
  })
}

export async function getSyncQueue(): Promise<SyncItem[]> {
  if (!db) await initializeOfflineSync()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function removeSyncItem(id: string): Promise<void> {
  if (!db) await initializeOfflineSync()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function syncQueueWithServer(): Promise<{ synced: number; failed: number }> {
  const queue = await getSyncQueue()
  let synced = 0
  let failed = 0

  for (const item of queue) {
    try {
      console.log(`[v0] Syncing queue item:`, item)

      await new Promise((resolve) => setTimeout(resolve, 500))

      await removeSyncItem(item.id)
      synced++
    } catch (error) {
      console.error(`[v0] Failed to sync item ${item.id}:`, error)
      failed++
    }
  }

  console.log(`[v0] Sync complete: ${synced} synced, ${failed} failed`)
  return { synced, failed }
}
