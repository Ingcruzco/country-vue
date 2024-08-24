<template>
  <div class="background-animation">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      let particlesArray

      class Particle {
        constructor(x, y, directionX, directionY, size, color) {
          this.x = x
          this.y = y
          this.directionX = directionX
          this.directionY = directionY
          this.size = size
          this.color = color
        }

        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
          ctx.fillStyle = this.color
          ctx.fill()
        }

        update() {
          if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX
          }
          if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY
          }

          this.x += this.directionX
          this.y += this.directionY

          this.draw()
        }
      }

      function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            let distance =
              (particlesArray[a].x - particlesArray[b].x) *
                (particlesArray[a].x - particlesArray[b].x) +
              (particlesArray[a].y - particlesArray[b].y) *
                (particlesArray[a].y - particlesArray[b].y)
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
              ctx.strokeStyle = `rgba(100, 100, 100, ${1 - distance / 20000})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
              ctx.stroke()
            }
          }
        }
      }

      function init() {
        particlesArray = []
        let numberOfParticles = (canvas.height * canvas.width) / 9000
        for (let i = 0; i < numberOfParticles; i++) {
          let size = Math.random() * 5 + 1
          let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2
          let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2
          let directionX = Math.random() * 2 - 1
          let directionY = Math.random() * 2 - 1
          let color = '#000'

          particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
        }
      }

      function animate() {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update()
        }
        connect()
      }

      init()
      animate()

      window.addEventListener('resize', function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        init()
      })
    }
  }
}
</script>

<style scoped>
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

canvas {
  display: block;
}
</style>
