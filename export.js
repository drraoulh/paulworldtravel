const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building the project...');
try {
  // Construire le projet
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Copying files to out directory...');
  
  // Créer le dossier out s'il n'existe pas
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Copier les fichiers statiques
  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  // Copier le contenu du dossier .next/static
  const staticDir = path.join(process.cwd(), '.next', 'static');
  const outStaticDir = path.join(outDir, '_next', 'static');
  if (fs.existsSync(staticDir)) {
    copyRecursiveSync(staticDir, outStaticDir);
  }
  
  // Copier les autres fichiers nécessaires
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    copyRecursiveSync(publicDir, outDir);
  }
  
  console.log('Export completed successfully!');
  console.log(`Your static files are in: ${outDir}`);
  
} catch (error) {
  console.error('Export failed:', error);
  process.exit(1);
}
