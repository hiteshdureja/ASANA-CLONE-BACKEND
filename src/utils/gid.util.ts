/**
 * Generate a GID (Globally Unique Identifier) in Asana format
 * Format: prefix_timestamp_random
 */
export function generateGid(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}${random}`;
}

/**
 * Parse GID to extract prefix
 */
export function parseGid(gid: string): { prefix: string; id: string } | null {
  const match = gid.match(/^([^_]+)_(.+)$/);
  if (!match) return null;
  return { prefix: match[1], id: match[2] };
}

/**
 * Validate GID format
 */
export function isValidGid(gid: string): boolean {
  return /^[^_]+_[^_]+$/.test(gid);
}

