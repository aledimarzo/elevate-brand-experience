import { useEffect, useState } from 'react';

interface DiscordData {
  memberCount: number;
  onlineCount: number;
  loading: boolean;
  error: boolean;
}

export function useDiscordMembers(inviteCode: string = 'EjYhPcG7Va') {
  const [data, setData] = useState<DiscordData>({
    memberCount: 0,
    onlineCount: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let controller: AbortController | null = null;
    let timeoutId: number | null = null;
    let active = true;

    const fetchDiscordData = async () => {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Discord API error: ${response.status}`);
        }

        const discordData = await response.json();
        if (!active) return;
        setData({
          memberCount: discordData.approximate_member_count || 0,
          onlineCount: discordData.approximate_presence_count || 0,
          loading: false,
          error: false,
        });
      } catch (error) {
        if (controller?.signal.aborted || !active) return;
        setData({
          memberCount: 0,
          onlineCount: 0,
          loading: false,
          error: true,
        });
      }
    };

    const scheduleNextPoll = () => {
      if (!active || document.visibilityState !== 'visible') return;
      timeoutId = window.setTimeout(() => {
        void fetchDiscordData().finally(scheduleNextPoll);
      }, 90000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
        void fetchDiscordData().finally(scheduleNextPoll);
      } else if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    void fetchDiscordData().finally(scheduleNextPoll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      controller?.abort();
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [inviteCode]);

  return data;
}
