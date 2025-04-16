export abstract class CacheService {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set<T>(key: string, value: T, ttlInSeconds?: number): Promise<void>;
  abstract delete(key: string): Promise<void>;
}
