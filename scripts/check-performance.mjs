import { readdirSync, readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { resolve, extname } from 'node:path'

const dist = resolve(import.meta.dirname, '../dist')
const limits = {
  '.js': 200 * 1024,
  '.css': 100 * 1024,
  '.html': 50 * 1024,
  '.avif': 500 * 1024,
  '.webp': 250 * 1024,
  '.png': 250 * 1024,
  '.jpg': 250 * 1024,
  '.jpeg': 250 * 1024,
}
const files = []

function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name)
    if (entry.isDirectory()) collect(file)
    else files.push(file)
  }
}

collect(dist)
const failures = []
const report = []

for (const file of files) {
  const extension = extname(file).toLowerCase()
  const limit = limits[extension]
  if (!limit) continue
  const bytes = statSync(file).size
  const compressed = gzipSync(readFileSync(file)).length
  const measured = extension === '.js' || extension === '.css' || extension === '.html' ? compressed : bytes
  report.push(`${file.replace(`${dist}\\`, '')}: ${bytes} bytes raw, ${compressed} bytes gzip`)
  if (measured > limit) failures.push(`${file}: ${measured} exceeds ${limit} byte budget`)
}

if (failures.length) {
  console.error('performance budget failed')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(`performance budget passed: ${report.length} build assets checked`)
  report.forEach((item) => console.log(`- ${item}`))
}
