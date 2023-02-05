export class Storage {
  static get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value && JSON.parse(value);
    } catch (_) {
      return null;
    }
  }

  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static pop<T>(key: string): T | null {
    const value = Storage.get<T>(key);
    Storage.remove(key);
    return value;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
