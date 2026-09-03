/**
 * Generic localStorage persistence for the mock data layer (properties, inquiries,
 * favorites, activities...). Same idea as mockUserStore.ts, but reusable for any
 * array-shaped mock dataset so admin-added properties, new inquiries, etc. survive
 * a page refresh instead of resetting to the seed data every reload.
 *
 * Usage pattern (see mock/properties.ts):
 *   export const mockProperties: Property[] = [ ...seed data... ];
 *   hydrateArray('properties', mockProperties);   // loads any saved state IN PLACE
 *
 * Usage after a mutation (see propertyApi.ts):
 *   mockProperties.push(newProperty);
 *   persistArray('properties', mockProperties);
 */

const PREFIX = 'propsync_mock_';

export function hydrateArray<T>(key: string, seed: T[]): T[] {
  const raw = localStorage.getItem(PREFIX + key);
  if (raw) {
    try {
      const saved = JSON.parse(raw) as T[];
      // Mutate in place so every module that already imported `seed` keeps
      // pointing at the same array reference, now filled with saved data.
      seed.length = 0;
      seed.push(...saved);
      return seed;
    } catch {
      // Corrupt data - fall through and reseed below.
    }
  }
  localStorage.setItem(PREFIX + key, JSON.stringify(seed));
  return seed;
}

export function persistArray<T>(key: string, arr: T[]): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(arr));
}
