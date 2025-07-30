const fs = require('fs')
const path = require('path')

console.log('🧹 Clearing cache and temporary files...')

// Clear Next.js cache
const nextCacheDir = path.join(process.cwd(), '.next')
if (fs.existsSync(nextCacheDir)) {
  fs.rmSync(nextCacheDir, { recursive: true, force: true })
  console.log('✅ Cleared .next cache')
}

// Clear node_modules cache (optional)
const nodeModulesDir = path.join(process.cwd(), 'node_modules')
if (fs.existsSync(nodeModulesDir)) {
  console.log('📦 node_modules found - consider running "npm install" if issues persist')
}

// Clear any temporary files
const tempDirs = ['tmp', 'temp', '.cache']
tempDirs.forEach(dir => {
  const tempDir = path.join(process.cwd(), dir)
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
    console.log(`✅ Cleared ${dir} directory`)
  }
})

console.log('🎉 Cache clearing complete!')
console.log('💡 Next steps:')
console.log('   1. Run "npm install" to ensure dependencies are up to date')
console.log('   2. Run "npm run dev" to start the development server')
console.log('   3. Clear your browser cache and reload the page') 