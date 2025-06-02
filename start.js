const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Afficher le logo
console.log(`${colors.blue}
██████╗ ██╗    ██╗██████╗ ████████╗
██╔══██╗██║    ██║╚════██╗╚══██╔══╝
██████╔╝██║ █╗ ██║ █████╔╝   ██║   
██╔═══╝ ██║███╗██║██╔═══╝    ██║   
██║     ╚███╔███╔╝███████╗   ██║   
╚═╝      ╚══╝╚══╝ ╚══════╝   ╚═╝   
${colors.reset}`);

console.log(`${colors.green}Paul World Travel - Outil de développement${colors.reset}\n`);

// Fonction pour vérifier si MongoDB est installé
const checkMongoDB = () => {
  try {
    const mongoProcess = spawn('mongod', ['--version']);
    
    return new Promise((resolve) => {
      mongoProcess.on('error', () => {
        console.log(`${colors.yellow}[AVERTISSEMENT] MongoDB ne semble pas être installé ou n'est pas dans le PATH.${colors.reset}`);
        console.log(`${colors.yellow}Le backend pourrait ne pas fonctionner correctement si MongoDB n'est pas en cours d'exécution.${colors.reset}\n`);
        resolve(false);
      });
      
      mongoProcess.stdout.on('data', () => {
        console.log(`${colors.green}[INFO] MongoDB est installé.${colors.reset}\n`);
        resolve(true);
      });
    });
  } catch (error) {
    console.log(`${colors.yellow}[AVERTISSEMENT] Impossible de vérifier MongoDB: ${error.message}${colors.reset}\n`);
    return Promise.resolve(false);
  }
};

// Fonction pour démarrer le backend
const startBackend = () => {
  console.log(`${colors.blue}[BACKEND] Démarrage du serveur backend...${colors.reset}`);
  
  const backendPath = path.join(__dirname, 'backend');
  
  // Vérifier si le dossier node_modules existe, sinon installer les dépendances
  if (!fs.existsSync(path.join(backendPath, 'node_modules'))) {
    console.log(`${colors.yellow}[BACKEND] Installation des dépendances...${colors.reset}`);
    
    const npmInstall = spawn('npm', ['install'], {
      cwd: backendPath,
      shell: true,
      stdio: 'inherit'
    });
    
    npmInstall.on('close', (code) => {
      if (code !== 0) {
        console.log(`${colors.red}[BACKEND] Erreur lors de l'installation des dépendances.${colors.reset}`);
        return;
      }
      
      startBackendServer(backendPath);
    });
  } else {
    startBackendServer(backendPath);
  }
};

// Fonction pour démarrer le serveur backend
const startBackendServer = (backendPath) => {
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: backendPath,
    shell: true,
    env: { ...process.env, FORCE_COLOR: 'true' }
  });
  
  backend.stdout.on('data', (data) => {
    console.log(`${colors.blue}[BACKEND] ${data.toString().trim()}${colors.reset}`);
  });
  
  backend.stderr.on('data', (data) => {
    console.error(`${colors.red}[BACKEND ERROR] ${data.toString().trim()}${colors.reset}`);
  });
  
  backend.on('close', (code) => {
    console.log(`${colors.yellow}[BACKEND] Le serveur s'est arrêté avec le code: ${code}${colors.reset}`);
  });
  
  return backend;
};

// Fonction pour démarrer le frontend
const startFrontend = () => {
  console.log(`${colors.green}[FRONTEND] Démarrage de l'application frontend...${colors.reset}`);
  
  const frontendPath = path.join(__dirname, 'frontend');
  
  // Vérifier si le dossier node_modules existe, sinon installer les dépendances
  if (!fs.existsSync(path.join(frontendPath, 'node_modules'))) {
    console.log(`${colors.yellow}[FRONTEND] Installation des dépendances...${colors.reset}`);
    
    const npmInstall = spawn('npm', ['install'], {
      cwd: frontendPath,
      shell: true,
      stdio: 'inherit'
    });
    
    npmInstall.on('close', (code) => {
      if (code !== 0) {
        console.log(`${colors.red}[FRONTEND] Erreur lors de l'installation des dépendances.${colors.reset}`);
        return;
      }
      
      startFrontendServer(frontendPath);
    });
  } else {
    startFrontendServer(frontendPath);
  }
};

// Fonction pour démarrer le serveur frontend
const startFrontendServer = (frontendPath) => {
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: frontendPath,
    shell: true,
    env: { ...process.env, FORCE_COLOR: 'true' }
  });
  
  frontend.stdout.on('data', (data) => {
    console.log(`${colors.green}[FRONTEND] ${data.toString().trim()}${colors.reset}`);
  });
  
  frontend.stderr.on('data', (data) => {
    console.error(`${colors.red}[FRONTEND ERROR] ${data.toString().trim()}${colors.reset}`);
  });
  
  frontend.on('close', (code) => {
    console.log(`${colors.yellow}[FRONTEND] Le serveur s'est arrêté avec le code: ${code}${colors.reset}`);
  });
  
  return frontend;
};

// Démarrer les deux services
const start = async () => {
  // Vérifier MongoDB
  await checkMongoDB();
  
  // Démarrer le backend
  startBackend();
  
  // Attendre un peu avant de démarrer le frontend
  setTimeout(() => {
    startFrontend();
  }, 2000);
  
  // Gestion de l'arrêt propre
  process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}[INFO] Arrêt des serveurs...${colors.reset}`);
    process.exit();
  });
};

// Lancer l'application
start();
