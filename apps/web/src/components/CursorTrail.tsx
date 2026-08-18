"use client";

import { useEffect, useRef } from "react";
import { LEAF_SHAPES, type LeafShape } from "./leaf-shapes";

/** Palette « forêt » : chaque feuille pioche là-dedans au hasard. */
const FOREST_GREENS = [
//   "#1b4332",
//   "#245c42",
//   "#2d6a4f",
//   "#37785a",
//   "#40916c",
//   "#3a5a40",
//   "#588157",
//   "#52796f",
"#65896A",
"#94B298",
"#CAE1CD",
"#F5FFF6",
"#E1E6A9",
];

type CursorTrailProps = {
  /**
   * Silhouettes tirées au sort à chaque naissance. Garder une référence stable
   * (constante de module) : un tableau créé à la volée relance l'animation.
   */
  shapes?: LeafShape[];
  /** Palette des feuilles — même contrainte de stabilité que `shapes`. */
  colors?: string[];
  /** Plafond de feuilles simultanées. Le pool est alloué une fois. */
  maxParticles?: number;
  /** Feuilles émises par pixel parcouru par le curseur. */
  density?: number;
  /** Durée de vie d'une feuille, en millisecondes. */
  lifetime?: number;
  /** Demi-taille initiale de la feuille, en pixels CSS. */
  size?: number;
  /** Rayon de dispersion autour du curseur, en pixels CSS. */
  spread?: number;
  /** Fusion additive : les feuilles qui se superposent brillent davantage. */
  additive?: boolean;
  zIndex?: number;
};

/** Une silhouette prête à peindre : tracés compilés une fois pour toutes. */
type CompiledShape = {
  box: number;
  paths: Path2D[];
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  /** Orientation initiale, tirée au hasard : casse l'effet « sticker ». */
  angle: number;
  /** Rotation lente pendant la chute, en radians/ms. */
  spin: number;
  shape: CompiledShape;
  color: string;
  alive: boolean;
};

export default function CursorTrail({
  shapes = LEAF_SHAPES,
  colors = FOREST_GREENS,
  maxParticles = 240,
  density = 0.35,
  lifetime = 650,
  size = 9,
  spread = 26,
  additive = false,
  zIndex = 9999,
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // On ne dessine rien pour les curseurs grossiers (tactile) ni si
    // l'utilisateur a demandé moins d'animations.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    // Path2D n'existe que côté navigateur : on compile ici, une seule fois,
    // puis chaque frame se contente d'un ctx.fill(path).
    const compiled: CompiledShape[] = (shapes.length ? shapes : LEAF_SHAPES).map(
      (s) => ({ box: s.box, paths: s.paths.map((d) => new Path2D(d)) })
    );
    const palette = colors.length ? colors : FOREST_GREENS;

    // Pool pré-alloué : aucune allocation pendant la boucle, donc pas de GC.
    const pool: Particle[] = Array.from({ length: maxParticles }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      age: 0,
      life: lifetime,
      size,
      angle: 0,
      spin: 0,
      shape: compiled[0],
      color: palette[0],
      alive: false,
    }));
    let cursorIndex = 0;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let prevX = 0;
    let prevY = 0;
    let hasPrev = false;
    let leftover = 0; // reste de distance non consommé entre deux frames
    let rafId = 0;
    let lastTime = 0;

    const spawn = (x: number, y: number) => {
      const p = pool[cursorIndex];
      cursorIndex = (cursorIndex + 1) % pool.length;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.04;
      // La feuille ne naît pas pile sous le pointeur : on la décale dans une
      // couronne autour de lui (racine carrée = répartition régulière sur le
      // disque, le plancher à 0.3 évite l'amas au centre).
      const offsetAngle = Math.random() * Math.PI * 2;
      const offsetRadius = spread * (0.3 + 0.7 * Math.sqrt(Math.random()));
      p.x = x + Math.cos(offsetAngle) * offsetRadius;
      p.y = y + Math.sin(offsetAngle) * offsetRadius;
      p.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.30; // léger flottement horizontal
      p.vy = Math.sin(angle) * speed + 0.008; // la feuille retombe doucement
      p.age = 0;
      p.life = lifetime * (0.6 + Math.random() * 2);
      p.size = size * (0.6 + Math.random() * 0.6);
      p.angle = Math.random() * Math.PI * 2;
      p.spin = (Math.random() - 0.5) * 0.0015; // vrille lente, dans les deux sens
      p.shape = compiled[(Math.random() * compiled.length) | 0];
      p.color = palette[(Math.random() * palette.length) | 0];
      p.alive = true;
    };

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!hasPrev) {
        prevX = x;
        prevY = y;
        hasPrev = true;
      }

      // On interpole le long du segment parcouru : sans ça, un mouvement
      // rapide laisse des trous entre deux événements pointermove.
      const dx = x - prevX;
      const dy = y - prevY;
      const dist = Math.hypot(dx, dy);
      const budget = dist * density + leftover;
      const count = Math.floor(budget);
      leftover = budget - count;

      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 1 : i / (count - 1);
        spawn(prevX + dx * t, prevY + dy * t);
      }

      prevX = x;
      prevY = y;
      start();
    };

    // Le tracé est exprimé dans le viewBox d'origine : on le ramène à l'échelle
    // voulue et on recentre pour que la rotation tourne autour de son milieu.
    const drawLeaf = (p: Particle, scale: number) => {
      const { box, paths } = p.shape;
      const k = (p.size * 2 * scale) / box;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(k, k);
      ctx.translate(-box / 2, -box / 2);
      ctx.fillStyle = p.color;
      for (const path of paths) ctx.fill(path);
      ctx.restore();
    };

    const frame = (time: number) => {
      const dt = Math.min(time - lastTime, 48); // clamp après un onglet inactif
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = additive ? "lighter" : "source-over";

      let aliveCount = 0;
      for (const p of pool) {
        if (!p.alive) continue;
        p.age += dt;
        if (p.age >= p.life) {
          p.alive = false;
          continue;
        }
        aliveCount++;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + 0.00004 * dt; // frottement + un soupçon de gravité
        p.angle += p.spin * dt;

        const remaining = 1 - p.age / p.life;
        ctx.globalAlpha = remaining * remaining;
        drawLeaf(p, remaining);
      }
      ctx.globalAlpha = 1;

      // Plus rien à animer : on rend la main jusqu'au prochain mouvement.
      if (aliveCount === 0) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafId) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shapes, colors, maxParticles, density, lifetime, size, spread, additive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
}
