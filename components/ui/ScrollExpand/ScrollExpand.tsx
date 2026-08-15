import React, { useCallback, useEffect, useRef } from 'react';
import './ScrollExpand.css';

function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}

interface ScrollExpandProps extends React.HTMLAttributes<HTMLDivElement> {
  bgContent?: React.ReactNode; // 🚨 NAYA: Custom background (FadingVideo) ke liye
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  endWidth?: number;           // 🚨 NAYA: Shrink limit control karne ke liye
  startHeight?: number;
  endHeight?: number;          // 🚨 NAYA: Shrink limit control karne ke liye
  startRadius?: number;
  endRadius?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollExpand = ({
  bgContent,
  title = '',
  scrollHint = '',
  startWidth = 100,  // 🚨 Default 100 (Full screen) se shuru hoga
  endWidth = 85,     // 🚨 Default 85 par shrink hoga
  startHeight = 100, 
  endHeight = 85,
  startRadius = 0,   // 🚨 Start me sharp corners
  endRadius = 32,    // 🚨 End me rounded corners
  scrollDistance = 1.2,
  holdDistance = 0.2,
  smoothing = 0.1,
  useWindowScroll = true, // Hero section ke liye true hona chahiye
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef({
    startWidth,
    endWidth,
    startHeight,
    endHeight,
    startRadius,
    endRadius,
    scrollDistance,
    holdDistance,
    smoothing,
    useWindowScroll,
    enabled,
  });

  // Props update hone par ref ko sync karna
  useEffect(() => {
    propsRef.current = {
      startWidth, endWidth, startHeight, endHeight,
      startRadius, endRadius, scrollDistance, holdDistance,
      smoothing, useWindowScroll, enabled,
    };
  }, [startWidth, endWidth, startHeight, endHeight, startRadius, endRadius, scrollDistance, holdDistance, smoothing, useWindowScroll, enabled]);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    // 🚨 1. Dabba Shrink/Expand karne ka logic
    const w = c.startWidth + (c.endWidth - c.startWidth) * e;
    const h = c.startHeight + (c.endHeight - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    // 🚨 2. Content & Background Scale karne ka logic
    const scaleFactor = w / c.startWidth;

    if (bgWrapperRef.current) {
      bgWrapperRef.current.style.transform = `scale(${scaleFactor})`;
    }

    if (overlayRef.current) {
      overlayRef.current.style.transform = `scale(${scaleFactor})`;
      overlayRef.current.style.opacity = '1'; // Hero content hamesha visible rahega
    }

    // Title aur Hint animations (agar use kar rahe ho toh)
    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    let reduceMotion = false;
    try {
      reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (span === 0) return 0;
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller: EventTarget = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(onResize);
      ro.observe(root);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll as EventListener);
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`scroll-expand${useWindowScroll ? '' : ' scroll-expand--scroller'}${className ? ' ' + className : ''}`}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            
            {/* 🚨 NAYA: Background wrapper jisme custom video (FadingVideo) aayegi */}
            <div 
                ref={bgWrapperRef} 
                className="absolute inset-0 w-full h-full origin-center will-change-transform"
            >
                {bgContent}
            </div>

            {/* 🚨 Foreground Overlay Content */}
            {children ? (
              <div 
                ref={overlayRef} 
                className="scroll-expand__overlay origin-center will-change-transform"
                style={{ opacity: 1 }} // Force visible since it's hero content
              >
                {children}
              </div>
            ) : null}
            
          </div>
          {!!title && (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          )}
          {!!scrollHint && (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;