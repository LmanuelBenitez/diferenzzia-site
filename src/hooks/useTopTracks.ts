import { useQuery } from '@tanstack/react-query'
import { fetchTopTracks } from '@/services/api'
import type { Track } from '@/types'

/**
 * Loads the band's top tracks. Retries a couple of times and caches for
 * 10 minutes (matching the function's cache header).
 */
export function useTopTracks(limit = 10) {
  return useQuery<Track[], Error>({
    queryKey: ['top-tracks', limit],
    queryFn: () => fetchTopTracks(limit),
    staleTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
