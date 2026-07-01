// Core Module
// const path = require('path');
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "..");

// module.exports = path.dirname(require.main.filename);
export default rootDir;