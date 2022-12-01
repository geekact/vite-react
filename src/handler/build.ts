import { extname } from 'path';
import { ConfigEnv } from 'vite';
import { OutputOptions } from 'rollup';
import { Config } from '../vite';

const assetPatterns = <const>[
  ['media', /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf)(\?.*)?$/i],
  ['image', /\.(png|jpe?g|gif|ico|svg|webp)(\?.*)?$/i],
  ['font', /\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
  ['style', /\.(s?css|less|styl)(\?.*)?$/i],
];

export const handleBuild = (config: Config, _env: ConfigEnv) => {
  config.build ||= {};
  // Unnecessary to show this and improve build speed.
  config.build.reportCompressedSize ??= false;

  config.build.rollupOptions ||= {};
  config.build.rollupOptions.output ||= {};

  const keys = Object.keys(config.build.rollupOptions.output) as (keyof OutputOptions)[];
  const overrideKeys: (keyof OutputOptions)[] = [
    'assetFileNames',
    'chunkFileNames',
    'entryFileNames',
  ];
  const userDefined = keys.some((key) => overrideKeys.includes(key));

  if (!userDefined) {
    config.build.rollupOptions.output = {
      ...config.build.rollupOptions.output,
      assetFileNames(assetInfo) {
        const ext = extname(assetInfo.name || '');
        let folder = 'misc';

        for (const [name, pattern] of assetPatterns) {
          if (pattern.test(ext)) {
            folder = name;
            break;
          }
        }

        return `${folder}/[name]-[hash][extname]`;
      },
      chunkFileNames: 'js/chunk-[name]-[hash].js',
      entryFileNames: 'js/entry-[name]-[hash].js',
    };
  }
};
