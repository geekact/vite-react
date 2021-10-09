import path from 'path';
import fs from 'fs';

const packageFile: {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
} = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export const hasInstallPackage = (name: string): boolean => {
  return !!packageFile.dependencies?.[name] || !!packageFile.devDependencies?.[name];
};
