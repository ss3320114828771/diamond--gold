// scripts/backup.ts
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Configuration
const CONFIG = {
  backupDir: path.join(process.cwd(), 'backups'),
  database: {
    type: 'postgresql' as const,
    url: process.env.DATABASE_URL || '',
  },
  directories: [
    'public/images',
    'src/app',
    'src/components',
    'src/lib',
    'src/hooks',
    'src/types',
    'src/utils',
    'prisma',
  ],
  files: [
    '.env',
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json',
    'middleware.ts',
  ],
  maxBackups: 10,
}

// Ensure backup directory exists
async function ensureBackupDir(): Promise<void> {
  try {
    await fs.mkdir(CONFIG.backupDir, { recursive: true })
  } catch (error) {
    console.error('Failed to create backup directory:', error)
    throw error
  }
}

// Generate backup filename with timestamp
function getBackupFilename(): string {
  const date = new Date()
  const timestamp = date.toISOString().replace(/[:.]/g, '-').slice(0, 19)
  return `backup-${timestamp}`
}

// Create directory backup
async function backupDirectories(backupPath: string): Promise<void> {
  console.log('📁 Backing up directories...')
  
  for (const dir of CONFIG.directories) {
    const sourcePath = path.join(process.cwd(), dir)
    const destPath = path.join(backupPath, dir)
    
    try {
      await fs.access(sourcePath)
      await fs.mkdir(destPath, { recursive: true })
      await execAsync(`cp -r "${sourcePath}/"* "${destPath}/" 2>/dev/null || true`)
      console.log(`  ✅ ${dir}`)
    } catch {
      console.log(`  ⚠️  ${dir} not found`)
    }
  }
}

// Create files backup
async function backupFiles(backupPath: string): Promise<void> {
  console.log('📄 Backing up files...')
  
  for (const file of CONFIG.files) {
    const sourcePath = path.join(process.cwd(), file)
    const destPath = path.join(backupPath, file)
    
    try {
      await fs.access(sourcePath)
      await fs.copyFile(sourcePath, destPath)
      console.log(`  ✅ ${file}`)
    } catch {
      console.log(`  ⚠️  ${file} not found`)
    }
  }
}

// Backup database
async function backupDatabase(backupPath: string): Promise<void> {
  if (!CONFIG.database.url) {
    console.log('  ⚠️  No database URL configured, skipping database backup')
    return
  }

  console.log('💾 Backing up database...')
  
  const dbFile = path.join(backupPath, 'database.sql')
  
  try {
    const url = new URL(CONFIG.database.url)
    const database = url.pathname.slice(1)
    const username = url.username
    const password = url.password
    const host = url.hostname
    
    if (CONFIG.database.type === 'postgresql') {
      const port = url.port || '5432'
      process.env.PGPASSWORD = password
      await execAsync(
        `pg_dump -h ${host} -p ${port} -U ${username} -d ${database} > "${dbFile}"`
      )
      console.log('  ✅ Database backed up successfully')
    } else if (CONFIG.database.type === 'mysql') {
      const port = url.port || '3306'
      await execAsync(
        `mysqldump -h ${host} -P ${port} -u ${username} -p${password} ${database} > "${dbFile}"`
      )
      console.log('  ✅ Database backed up successfully')
    }
  } catch (error) {
    console.log('  ⚠️  Database backup failed (optional)')
  }
}

// Get backup size
async function getBackupSize(backupPath: string): Promise<string> {
  try {
    const { stdout } = await execAsync(`du -sh "${backupPath}" | cut -f1`)
    return stdout.trim()
  } catch {
    return 'unknown'
  }
}

// Create manifest file
async function createManifest(backupPath: string, size: string): Promise<void> {
  const manifest = {
    timestamp: new Date().toISOString(),
    directories: CONFIG.directories.filter(d => {
      try {
        fsSync.accessSync(path.join(process.cwd(), d))
        return true
      } catch {
        return false
      }
    }),
    files: CONFIG.files.filter(f => {
      try {
        fsSync.accessSync(path.join(process.cwd(), f))
        return true
      } catch {
        return false
      }
    }),
    database: !!CONFIG.database.url,
    totalSize: size,
  }

  await fs.writeFile(
    path.join(backupPath, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
}

// Clean old backups
async function cleanOldBackups(): Promise<void> {
  try {
    const files = await fs.readdir(CONFIG.backupDir)
    const backups = files
      .filter(f => f.startsWith('backup-'))
      .map(f => ({
        name: f,
        path: path.join(CONFIG.backupDir, f),
        time: fsSync.statSync(path.join(CONFIG.backupDir, f)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)

    if (backups.length > CONFIG.maxBackups) {
      const toDelete = backups.slice(CONFIG.maxBackups)
      console.log(`🧹 Cleaning old backups (keeping last ${CONFIG.maxBackups})...`)
      
      for (const backup of toDelete) {
        await fs.rm(backup.path, { recursive: true, force: true })
        console.log(`  🗑️  Deleted: ${backup.name}`)
      }
    }
  } catch (error) {
    console.log('  ⚠️  No old backups to clean')
  }
}

// Create archive
async function createArchive(backupPath: string): Promise<string> {
  console.log('📦 Creating archive...')
  
  const archivePath = `${backupPath}.tar.gz`
  
  try {
    await execAsync(`tar -czf "${archivePath}" -C "${CONFIG.backupDir}" "${path.basename(backupPath)}"`)
    await fs.rm(backupPath, { recursive: true, force: true })
    console.log(`  ✅ Archive created: ${path.basename(archivePath)}`)
    return archivePath
  } catch (error) {
    console.log('  ⚠️  Failed to create archive, keeping folder')
    return backupPath
  }
}

// Main backup function
export async function runBackup(createArchiveFlag: boolean = false): Promise<void> {
  console.log('🚀 Starting backup...\n')
  
  await ensureBackupDir()
  
  const backupName = getBackupFilename()
  const backupPath = path.join(CONFIG.backupDir, backupName)
  
  try {
    await fs.mkdir(backupPath, { recursive: true })
    await backupDirectories(backupPath)
    await backupFiles(backupPath)
    await backupDatabase(backupPath)
    
    const size = await getBackupSize(backupPath)
    await createManifest(backupPath, size)
    
    console.log('\n✅ Backup completed successfully!')
    console.log(`📊 Backup size: ${size}`)
    
    let finalPath = backupPath
    if (createArchiveFlag) {
      finalPath = await createArchive(backupPath)
    }
    
    console.log(`📍 Location: ${finalPath}`)
    await cleanOldBackups()
    
  } catch (error) {
    console.error('\n❌ Backup failed:', error)
    throw error
  }
}

// Run backup if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)
  const shouldCreateArchive = args.includes('--archive') || args.includes('-a')
  
  runBackup(shouldCreateArchive).catch(() => process.exit(1))
}

export default runBackup