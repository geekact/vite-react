import { extname } from 'path';
import { ConfigEnv } from 'vite';
import { Config } from '../vite';

const assetPatterns = <const>[
  ['media', /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i],
  ['image', /\.(png|jpe?g|gif|svg)(\?.*)?$/i],
  ['font', /\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
  ['style', /\.css(\?.*)?$/i],
];

export const handleBuild = (config: Config, _env: ConfigEnv) => {
  config.build ||= {};
  // Unnecessary to show this and improve build speed.
  config.build.reportCompressedSize ??= false;
  config.build.rollupOptions = {
    output: {
      assetFileNames(assetInfo) {
        const ext = extname(assetInfo.name || '');
        let folder = 'misc';

        for (let [name, pattern] of assetPatterns) {
          if (pattern.test(ext)) {
            folder = name;
            break;
          }
        }

        return `bundle/${folder}/[name]-[hash][extname]`;
      },
      chunkFileNames: 'bundle/js/[name]-[hash].js',
      entryFileNames: 'bundle/js/[name]-[hash].js',
    },
  };
};
