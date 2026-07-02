// Core Module
// const path = require('path');
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // getting file path...........................

const __dirname = path.dirname(__filename); // getting directory path of selected file.....................

const rootDir = path.join(__dirname, '../') // Root path of selected Directory...............................

// module.exports = path.dirname(require.main.filename);
export default rootDir;