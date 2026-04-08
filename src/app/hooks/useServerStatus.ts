import { useEffect, useState } from 'react';

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  loading: boolean;
  error: boolean;
  serverName?: string;
  projectName?: string;
  projectDescription?: string;
  ownerName?: string;
  ownerId?: string;
  mapName?: string;
  gameType?: string;
  locale?: string;
  tags: string[];
  connectEndpoint?: string;
  joinUrl?: string;
  upvoteCount?: number;
  burstPower?: number;
  rank?: string | number;
  country?: string;
  private?: boolean;
  fallback?: boolean;
  lastSeen?: string;
  raw?: Record<string, any>;
}

function normalizeTags(source: unknown): string[] {
  if (Array.isArray(source)) {
    return source.filter((item): item is string => typeof item === 'string').slice(0, 10);
  }

  if (typeof source === 'string') {
    return source
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);
  }

  return [];
}

function getVar(record: Record<string, any> | undefined, key: string) {
  if (!record) return undefined;
  const value = record[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function useServerStatus(serverCode: string = 'g6md4x') {
  const [status, setStatus] = useState<ServerStatus>({
    online: false,
    players: 0,
    maxPlayers: 0,
    loading: true,
    error: false,
    tags: [],
  });

  useEffect(() => {
    let controller: AbortController | null = null;
    let timeoutId: number | null = null;
    let active = true;

    const checkServerStatus = async () => {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverCode}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`FiveM API error: ${response.status}`);
        }

        const data = await response.json();
        const serverData = data.Data || data;
        const vars = (serverData?.vars && typeof serverData.vars === 'object') ? serverData.vars : undefined;
        const endpoints = Array.isArray(serverData?.connectEndPoints) ? serverData.connectEndPoints : [];

        if (!active) return;

        setStatus({
          online: true,
          players: Number(serverData?.clients || 0),
          maxPlayers: Number(serverData?.sv_maxclients || 128),
          serverName: serverData?.hostname || 'MIRAGE RP',
          projectName: getVar(vars, 'sv_projectName') || serverData?.hostname || 'Mirage RP',
          projectDescription: getVar(vars, 'sv_projectDesc'),
          ownerName: serverData?.ownerName || getVar(vars, 'ownerName'),
          ownerId: serverData?.ownerID || serverData?.ownerId,
          mapName: serverData?.mapname || getVar(vars, 'mapname') || getVar(vars, 'sv_enforceGameBuild'),
          gameType: serverData?.gametype || getVar(vars, 'gametype'),
          locale: serverData?.locale || getVar(vars, 'locale'),
          tags: normalizeTags(serverData?.tags || getVar(vars, 'tags')),
          connectEndpoint: endpoints[0],
          joinUrl: `https://cfx.re/join/${serverCode}`,
          upvoteCount: typeof serverData?.upvotePower === 'number' ? serverData.upvotePower : typeof serverData?.upvotes === 'number' ? serverData.upvotes : undefined,
          burstPower: typeof serverData?.burstPower === 'number' ? serverData.burstPower : undefined,
          rank: serverData?.rank ?? serverData?.fallbackRank,
          country: serverData?.country || getVar(vars, 'country'),
          private: Boolean(serverData?.private),
          fallback: Boolean(serverData?.fallback),
          lastSeen: serverData?.lastSeen,
          loading: false,
          error: false,
          raw: serverData,
        });
      } catch (error) {
        if (controller?.signal.aborted) return;

        if (!active) return;

        setStatus({
          online: false,
          players: 0,
          maxPlayers: 0,
          loading: false,
          error: true,
          tags: [],
        });
      }
    };

    const scheduleNextPoll = () => {
      if (!active || document.visibilityState !== 'visible') return;
      timeoutId = window.setTimeout(() => {
        void checkServerStatus().finally(scheduleNextPoll);
      }, 45000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
        void checkServerStatus().finally(scheduleNextPoll);
      } else if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    void checkServerStatus().finally(scheduleNextPoll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      controller?.abort();
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [serverCode]);

  return status;
}
