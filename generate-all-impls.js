const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src/generated/api');
const outputDir = path.join(__dirname, 'src/implementations');
const indexFile = path.join(outputDir, 'index.ts');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
let indexContent = '';

files.forEach(file => {
  const content = fs.readFileSync(path.join(apiDir, file), 'utf-8');
  const classNameMatch = content.match(/export abstract class (\w+)/);

  if (classNameMatch) {
    const className = classNameMatch[1];
    const implClassName = `${className}Impl`;
    const methodMatches = [...content.matchAll(/\s+abstract\s+(\w+)\(/g)];

    // Skip if already exists (like ProjectsApiImpl)
    const implFilePath = path.join(outputDir, `${className.toLowerCase().replace('api', '-api')}.impl.ts`);
    if (fs.existsSync(implFilePath) && className !== 'ProjectsApi') {
      console.log(`Skipping ${className} - implementation already exists`);
      indexContent += `export * from './${className.toLowerCase().replace('api', '-api')}.impl';\n`;
      return;
    }

    let fileContent = `import { Injectable } from '@nestjs/common';\n`;
    fileContent += `import { Observable } from 'rxjs';\n`;
    fileContent += `import { ${className} } from '../generated/api';\n`;
    fileContent += `import * as Models from '../generated/models';\n\n`;

    fileContent += `@Injectable()\n`;
    fileContent += `export class ${implClassName} extends ${className} {\n`;

    methodMatches.forEach(match => {
      const methodName = match[1];
      fileContent += `  ${methodName}(...args: any[]): any {\n`;
      fileContent += `    throw new Error('Method not implemented.');\n`;
      fileContent += `  }\n\n`;
    });

    fileContent += `}\n`;

    const fileName = `${className.toLowerCase().replace('api', '-api')}.impl.ts`;
    fs.writeFileSync(path.join(outputDir, fileName), fileContent);

    indexContent += `export * from './${fileName.replace('.ts', '')}';\n`;
    console.log(`Generated ${implClassName}`);
  }
});

fs.writeFileSync(indexFile, indexContent);
console.log(`\nGenerated all implementations in ${outputDir}`);
console.log(`Total files: ${files.length}`);

