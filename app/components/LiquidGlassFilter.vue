<script setup lang="ts">
/**
 * Shared SVG filter for the `.glass-liquid` surfaces.
 *
 * feTurbulence builds a noise field, feDisplacementMap then pushes the
 * backdrop pixels around according to that field. Animating the noise makes
 * the displacement travel, so whatever sits behind the pane drifts the way it
 * would through moving water.
 *
 * Mounted once in the layout - every liquid surface references the same id.
 */
</script>

<template>
  <svg
    class="liquid-defs"
    aria-hidden="true"
    focusable="false"
  >
    <filter
      id="liquid-glass"
      x="-25%"
      y="-25%"
      width="150%"
      height="150%"
      color-interpolation-filters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        base-frequency="0.008 0.013"
        num-octaves="2"
        seed="7"
        result="noise"
      >
        <!-- Two axes drift out of phase, so the field never repeats visibly. -->
        <animate
          attributeName="baseFrequency"
          dur="28s"
          values="0.008 0.013; 0.014 0.007; 0.006 0.015; 0.008 0.013"
          calcMode="spline"
          key-splines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="28"
        x-channel-selector="R"
        y-channel-selector="G"
      />
    </filter>
  </svg>
</template>

<style scoped>
/* Never paints; it only carries the filter definition. */
.liquid-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
