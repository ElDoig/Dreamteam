import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

const vite = resolve('node_modules/vite/bin/vite.js')
const portIndex = process.argv.indexOf('--port')
const port = portIndex >= 0 ? process.argv[portIndex + 1] : (process.env.PORT ?? '5173')
let preview
let shuttingDown = false

const build = spawn(process.execPath, [vite, 'build', '--watch', '--configLoader', 'runner'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'pipe', 'pipe'],
})

function startPreview() {
  if (preview || shuttingDown) return
  preview = spawn(process.execPath, [vite, 'preview', '--configLoader', 'runner', '--host', '0.0.0.0', '--port', port], {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
  preview.on('exit', code => { if (!shuttingDown) process.exit(code ?? 1) })
}

build.stdout.on('data', chunk => {
  const output = chunk.toString()
  process.stdout.write(output)
  if (output.includes('built in')) startPreview()
})
build.stderr.on('data', chunk => process.stderr.write(chunk))
build.on('exit', code => { if (!shuttingDown) process.exit(code ?? 1) })

function shutdown() {
  shuttingDown = true
  preview?.kill()
  build.kill()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
