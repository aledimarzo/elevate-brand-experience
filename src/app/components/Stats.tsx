'use client';

import { motion } from 'motion/react';
import { Users, MessageSquare, Clock, Car, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useServerStatus } from '../hooks/useServerStatus';
import { useDiscordMembers } from '../hooks/useDiscordMembers';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  color: string;
  isOffline?: boolean;
  isRestart?: boolean;
  backgroundImage: string;
}

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentCountRef = useRef(0);

  useEffect(() => {
    currentCountRef.current = count;
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startValue = currentCountRef.current;

    if (startValue === value) {
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const nextValue = Math.round(startValue + (value - startValue) * progress);

      setCount(nextValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function Stats() {
  const serverStatus = useServerStatus('g6md4x');
  const discordMembers = useDiscordMembers();

  const stats: Stat[] = useMemo(() => [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'GIOCATORI ONLINE',
      value: serverStatus.loading ? '...' : serverStatus.online ? serverStatus.players.toString() : '0',
      suffix: serverStatus.online ? `/${serverStatus.maxPlayers}` : '',
      color: serverStatus.online ? 'from-green-500 to-green-600' : 'from-gray-500 to-gray-600',
      isOffline: !serverStatus.online && !serverStatus.loading,
      backgroundImage: 'https://images.unsplash.com/photo-1758410473619-c204b1bcf13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'MEMBRI DISCORD',
      value: discordMembers.loading ? '...' : discordMembers.memberCount.toString(),
      suffix: '+',
      color: 'from-blue-500 to-blue-600',
      backgroundImage: 'https://images.unsplash.com/photo-1683029096295-7680306aa37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <Car className="w-6 h-6" />,
      label: 'AUTO BIT DISPONIBILI',
      value: '50',
      suffix: '+',
      color: 'from-orange-500 to-orange-600',
      backgroundImage: 'https://images.unsplash.com/photo-1765643025153-0e31ea8035c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      label: 'RIAVVIO SERVER',
      value: '4:00 - 19:00',
      suffix: '',
      color: 'from-emerald-500 to-emerald-600',
      isRestart: true,
      backgroundImage: 'https://images.unsplash.com/photo-1711721399281-02806b65d91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
  ], [serverStatus, discordMembers]);

  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div 
                className="relative h-full bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-6 backdrop-blur-sm overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  scale: 1.03,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 17 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <ImageWithFallback
                    src={stat.backgroundImage}
                    alt={stat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90 pointer-events-none" />
                
                {/* Static Glow Effect - Only visible on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${stat.color} opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-500 pointer-events-none`} />

                {/* Border Glow - Only on hover */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                  style={{
                    borderColor: stat.color.includes('gray') ? '#6b7280' : 
                      stat.color.includes('green') ? '#10b981' :
                      stat.color.includes('blue') ? '#3b82f6' : 
                      stat.color.includes('orange') ? '#f97316' : 
                      '#10b981',
                  }}
                />

                {/* Icon */}
                <div className={"inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br "+stat.color+" mb-4 relative z-10"}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>

                {/* Label */}
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 relative z-10">
                  {stat.label}
                </p>

                {/* Value */}
                <div className="flex items-baseline gap-1 relative z-10 flex-wrap">
                  {stat.isOffline ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-black text-gray-500">{stat.value}</span>
                      <div className="flex items-center gap-1 ml-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-red-400">Offline</span>
                      </div>
                    </>
                  ) : stat.isRestart ? (
                    <span className="text-base sm:text-lg font-bold text-white">
                      {stat.value}
                    </span>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        {stat.value === '...' ? stat.value : <AnimatedNumber value={parseInt(stat.value)} />}
                      </span>
                      <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                        {stat.suffix}
                      </span>
                    </>
                  )}
                </div>

                {/* Restart Info */}
                {stat.isRestart && (
                  <p className="text-xs text-emerald-400 mt-3 relative z-10">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Orari programmati
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
