import { SetStorage, GetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.removeItem(key)
    }
  }

  get (key: string): any {
    return JSON.parse(sessionStorage.getItem(key))
  }
}
