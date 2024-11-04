<template>
  <svg id="polygon-image" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Polygon Image</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        <!-- Hexagon outline -->
        <polygon id="Shape" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"></polygon>

        <!-- Image to replace the letter "G" -->
        <clipPath id="hexClip">
          <polygon points="39 0 0 22 0 67 39 90 78 68 78 23"></polygon>
        </clipPath>

        <image href="public/static/me.jpg" x="10" y="10" width="64" height="76" clip-path="url(#hexClip)" preserveAspectRatio="xMidYMid slice" />
      </g>
    </g>
  </svg>
</template>

<script>

</script>

<style scoped>
</style>