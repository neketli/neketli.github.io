<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0
let phase = 0

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
  phase += 0.0015
  ctx.clearRect(0, 0, w, h)

  const spacing = 56
  const cols = Math.floor(w / spacing) + 2
  const rows = Math.floor(h / spacing) + 2

  ctx.strokeStyle = "rgba(59, 130, 246, 0.06)"
  ctx.lineWidth = 1

  const offsets: { x: number; y: number }[] = []
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r <= rows; r++) {
      const ox = Math.sin(phase + c * 0.3 + r * 0.1) * 3
      const oy = Math.cos(phase + r * 0.3 + c * 0.1) * 3
      offsets.push({ x: ox, y: oy })
    }
  }

  for (let c = 0; c <= cols; c++) {
    ctx.beginPath()
    for (let r = 0; r <= rows; r++) {
      const i = r * (cols + 1) + c
      const x = c * spacing + offsets[i].x
      const y = r * spacing + offsets[i].y
      r === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  for (let r = 0; r <= rows; r++) {
    ctx.beginPath()
    for (let c = 0; c <= cols; c++) {
      const i = r * (cols + 1) + c
      const x = c * spacing + offsets[i].x
      const y = r * spacing + offsets[i].y
      c === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const cx = w / 2
  const cy = h / 2
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r <= rows; r++) {
      const i = r * (cols + 1) + c
      const x = c * spacing + offsets[i].x
      const y = r * spacing + offsets[i].y
      const dx = (x - cx) / w
      const dy = (y - cy) / h
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.6) {
        const pulse = Math.sin(phase * 3 + c * 0.8 + r * 0.8) * 0.3 + 0.5
        const alpha = (1 - dist / 0.6) * pulse * 0.4
        if (alpha > 0.05) {
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  resize(canvas)

  function frame() {
    draw(ctx, canvas.width, canvas.height)
    animId = requestAnimationFrame(frame)
  }

  frame()

  const onResize = () => resize(canvas)
  window.addEventListener("resize", onResize)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener("resize", onResize)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-0 opacity-60" />
</template>
