const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src/generated/api');
const outputDir = path.join(__dirname, 'src/api-implementations');
const indexFile = path.join(outputDir, 'index.ts');

const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let indexContent = '';

files.forEach(file => {
    const content = fs.readFileSync(path.join(apiDir, file), 'utf-8');
    const classNameMatch = content.match(/export abstract class (\w+)/);
    
    if (classNameMatch) {
        const className = classNameMatch[1];
        const implClassName = `${className}Impl`;
        const methodMatches = [...content.matchAll(/\s+abstract\s+(\w+)\(/g)];
        
        let fileContent = `import { Injectable } from '@nestjs/common';\n`;
        fileContent += `import { ${className} } from '../generated/api';\n`;
        // Import models just in case, though we are using 'any' or casting for now to be safe
        fileContent += `import * as Models from '../generated/models';\n\n`;
        
        fileContent += `@Injectable()\n`;
        fileContent += `export class ${implClassName} extends ${className} {\n`;
        
        methodMatches.forEach(match => {
            const methodName = match[1];
             // Using simple throw for now to satisfy compliation, user can override later
            fileContent += `  ${methodName}(...args: any[]): any { throw new Error('Method not implemented.'); }\n`;
        });
        
        fileContent += `}\n`;
        
        fs.writeFileSync(path.join(outputDir, `${implClassName}.ts`), fileContent);
        
        indexContent += `export * from './${implClassName}';\n`;
    }
});

fs.writeFileSync(indexFile, indexContent);
console.log(`Generated implementations in ${outputDir}`);
