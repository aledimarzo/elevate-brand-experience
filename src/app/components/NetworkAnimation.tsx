import { useEffect, useRef, useState } from 'react';

export interface NetworkAnimationProps {
  className?: string;
  nodeColor?: string;
  nodeOpacity?: number;
  connectionColor?: string;
  connectionOpacity?: number;
  nodeSize?: number;
  nodeCount?: number;
  connectionDistance?: number;
  animationSpeed?: number;
  mouseAttractionStrength?: number;
  expansionSpeed?: number;
  baseMovementSpeed?: number;
  dampingFactor?: number;
}

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
};

export function NetworkAnimation({
  className = '',
  nodeColor = '#f59e0b',
  nodeOpacity = 0.55,
  connectionColor = '#fb923c',
  connectionOpacity = 0.18,
  nodeSize = 3,
  nodeCount = 42,
  connectionDistance = 150,
  animationSpeed = 0.9,
  mouseAttractionStrength = 0.8,
  expansionSpeed = 0.8,
  baseMovementSpeed = 0.35,
  dampingFactor = 0.996,
}: NetworkAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const frameRef = useRef<number>();
  const lastFrameTimeRef = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const initializeNodes = (width: number, height: number) => {
    if (nodesRef.current.length === nodeCount) return;

    nodesRef.current = Array.from({ length: nodeCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
      };
    });
  };

  const updateNodes = (width: number, height: number, deltaSpeed: number) => {
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const hasMouseInteraction = mouseX > -500 && mouseY > -500;

    nodesRef.current.forEach((node) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = node.x - centerX;
      const dy = node.y - centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

      if (distanceFromCenter > 0) {
        const expansionForce = expansionSpeed * 0.01 * deltaSpeed;
        node.vx += (dx / distanceFromCenter) * expansionForce;
        node.vy += (dy / distanceFromCenter) * expansionForce;
      }

      const baseMovementForce = baseMovementSpeed * 0.01 * deltaSpeed;
      node.vx += node.baseVx * baseMovementForce;
      node.vy += node.baseVy * baseMovementForce;

      if (hasMouseInteraction) {
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDistance > 0) {
          const attractionForce = mouseAttractionStrength * 1e-4 * deltaSpeed;
          node.vx += (mdx / mouseDistance) * attractionForce * mouseDistance;
          node.vy += (mdy / mouseDistance) * attractionForce * mouseDistance;
        }
      }

      node.x += node.vx * deltaSpeed;
      node.y += node.vy * deltaSpeed;

      if (node.x < 0) {
        node.x = 0;
        node.vx = Math.abs(node.vx);
      }
      if (node.x > width) {
        node.x = width;
        node.vx = -Math.abs(node.vx);
      }
      if (node.y < 0) {
        node.y = 0;
        node.vy = Math.abs(node.vy);
      }
      if (node.y > height) {
        node.y = height;
        node.vy = -Math.abs(node.vy);
      }

      node.vx *= dampingFactor;
      node.vy *= dampingFactor;

      const maxSpeed = 2;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }
    });
  };

  const drawNodes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = nodeColor;
    ctx.globalAlpha = nodeOpacity;

    nodesRef.current.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  };

  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const hasMouseInteraction = mouseX > -500 && mouseY > -500;

    ctx.lineWidth = 1;

    if (hasMouseInteraction) {
      nodesRef.current.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * connectionOpacity;
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = connectionColor;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      });
    }

    const drawnConnections = new Set<string>();
    const connectionCounts = new Map<number, Set<number>>();

    const drawConnection = (i: number, j: number, distance: number) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (drawnConnections.has(key)) return;

      const nodeA = nodesRef.current[i];
      const nodeB = nodesRef.current[j];
      const opacity = Math.min(1, 1 - distance / connectionDistance) * connectionOpacity;

      ctx.globalAlpha = opacity;
      ctx.strokeStyle = connectionColor;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();

      drawnConnections.add(key);

      if (!connectionCounts.has(i)) connectionCounts.set(i, new Set());
      if (!connectionCounts.has(j)) connectionCounts.set(j, new Set());
      connectionCounts.get(i)?.add(j);
      connectionCounts.get(j)?.add(i);
    };

    for (let i = 0; i < nodesRef.current.length; i += 1) {
      for (let j = i + 1; j < nodesRef.current.length; j += 1) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          drawConnection(i, j, distance);
        }
      }
    }

    for (let i = 0; i < nodesRef.current.length; i += 1) {
      const currentConnections = connectionCounts.get(i)?.size ?? 0;

      if (currentConnections < 2) {
        const distances: Array<{ index: number; distance: number }> = [];

        for (let j = 0; j < nodesRef.current.length; j += 1) {
          if (i === j) continue;
          if (connectionCounts.get(i)?.has(j)) continue;

          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          distances.push({ index: j, distance });
        }

        distances.sort((a, b) => a.distance - b.distance);

        const needed = 2 - currentConnections;
        for (let k = 0; k < Math.min(needed, distances.length); k += 1) {
          drawConnection(i, distances[k].index, distances[k].distance);
        }
      }
    }

    ctx.globalAlpha = 1;
  };

  const animate = (time = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = dimensionsRef.current.width;
    const height = dimensionsRef.current.height;

    if (time - lastFrameTimeRef.current < 33) {
      frameRef.current = window.requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = time;

    ctx.clearRect(0, 0, width, height);

    const deltaSpeed = animationSpeed;

    updateNodes(width, height, deltaSpeed);
    drawConnections(ctx);
    drawNodes(ctx);

    frameRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (pointer: fine)');
    const update = () => setIsEnabled(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [isEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      dimensionsRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      initializeNodes(rect.width, rect.height);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isEnabled, nodeCount]);

  useEffect(() => {
    if (!isEnabled) return;
    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    nodeColor,
    nodeOpacity,
    connectionColor,
    connectionOpacity,
    nodeSize,
    nodeCount,
    connectionDistance,
    animationSpeed,
    mouseAttractionStrength,
    expansionSpeed,
    baseMovementSpeed,
    dampingFactor,
  ]);

  return <canvas ref={canvasRef} className={`block h-full w-full pointer-events-none select-none ${className}`.trim()} aria-hidden="true" />;
}
