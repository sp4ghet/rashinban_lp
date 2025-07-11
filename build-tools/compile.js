const fs = require('fs');
const path = require('path');
const less = require('less');

// Configuration
const config = {
    srcDir: 'src',
    distDir: 'dist',
    lessFile: 'src/styles/main.less',
    cssOutput: 'dist/css/main.css'
};

// Ensure directories exist
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
}

// Copy file
function copyFile(src, dest) {
    const destDir = path.dirname(dest);
    ensureDirectoryExists(destDir);
    
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} → ${dest}`);
}

// Compile LESS to CSS
async function compileLess() {
    try {
        console.log('Compiling LESS...');
        
        const lessContent = fs.readFileSync(config.lessFile, 'utf8');
        
        const result = await less.render(lessContent, {
            filename: config.lessFile,
            compress: true, // Minify the output
            sourceMap: {
                outputSourceFiles: true
            }
        });
        
        // Ensure CSS directory exists
        ensureDirectoryExists(path.dirname(config.cssOutput));
        
        // Write CSS file
        fs.writeFileSync(config.cssOutput, result.css);
        console.log(`LESS compiled: ${config.lessFile} → ${config.cssOutput}`);
        
        // Write source map if available
        if (result.map) {
            fs.writeFileSync(config.cssOutput + '.map', result.map);
            console.log(`Source map created: ${config.cssOutput}.map`);
        }
        
    } catch (error) {
        console.error('LESS compilation failed:', error.message);
        if (error.line) {
            console.error(`Line ${error.line}, Column ${error.column}: ${error.extract ? error.extract.join('\n') : ''}`);
        }
        process.exit(1);
    }
}

// Copy HTML files
function copyHtml() {
    console.log('Copying HTML files...');
    
    const htmlFiles = fs.readdirSync(config.srcDir)
        .filter(file => file.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const src = path.join(config.srcDir, file);
        const dest = path.join(config.distDir, file);
        copyFile(src, dest);
    });
}

// Copy JavaScript files
function copyJs() {
    console.log('Copying JavaScript files...');
    
    const jsDir = path.join(config.srcDir, 'scripts');
    const destJsDir = path.join(config.distDir, 'js');
    
    if (fs.existsSync(jsDir)) {
        const jsFiles = fs.readdirSync(jsDir)
            .filter(file => file.endsWith('.js'));
        
        jsFiles.forEach(file => {
            const src = path.join(jsDir, file);
            const dest = path.join(destJsDir, file);
            copyFile(src, dest);
        });
    }
}

// Copy assets
function copyAssets() {
    console.log('Copying assets...');
    
    const assetsDir = path.join(config.srcDir, 'assets');
    const destAssetsDir = path.join(config.distDir, 'assets');
    
    if (fs.existsSync(assetsDir)) {
        // Recursively copy assets directory
        function copyRecursive(src, dest) {
            ensureDirectoryExists(dest);
            
            const items = fs.readdirSync(src);
            
            items.forEach(item => {
                const srcPath = path.join(src, item);
                const destPath = path.join(dest, item);
                
                if (fs.statSync(srcPath).isDirectory()) {
                    copyRecursive(srcPath, destPath);
                } else {
                    copyFile(srcPath, destPath);
                }
            });
        }
        
        copyRecursive(assetsDir, destAssetsDir);
    } else {
        console.log('No assets directory found, skipping...');
    }
}

// Clean dist directory
function cleanDist() {
    console.log('Cleaning dist directory...');
    
    if (fs.existsSync(config.distDir)) {
        fs.rmSync(config.distDir, { recursive: true, force: true });
        console.log('Dist directory cleaned');
    }
    
    ensureDirectoryExists(config.distDir);
}

// Main build function
async function build() {
    console.log('🚀 Starting build process...\n');
    
    try {
        // Clean and prepare
        cleanDist();
        
        // Compile LESS
        await compileLess();
        
        // Copy files
        copyHtml();
        copyJs();
        copyAssets();
        
        console.log('\n✅ Build completed successfully!');
        console.log(`📁 Output directory: ${config.distDir}`);
        console.log('🌐 Run "npm run serve" to start the development server');
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if this script is executed directly
if (require.main === module) {
    build();
}

module.exports = { build, config };
