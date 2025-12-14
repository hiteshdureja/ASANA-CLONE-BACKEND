import { NextPage } from '../generated/models';
import { Request } from 'express';

/**
 * Generate next_page object for pagination responses
 */
export function generateNextPage(
  request: Request,
  currentOffset: number,
  currentLimit: number,
  total: number,
  hasMore: boolean,
): NextPage | null {
  if (!hasMore || currentOffset + currentLimit >= total) {
    return null;
  }

  const nextOffset = currentOffset + currentLimit;
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  
  // Update offset in query params
  url.searchParams.set('offset', String(nextOffset));
  const path = url.pathname + url.search;
  const uri = url.toString();

  return {
    offset: String(nextOffset),
    path,
    uri,
  };
}

