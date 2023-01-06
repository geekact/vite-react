import { extname } from 'path';
import { OutputOptions } from 'rollup';
import { Config } from '../vite';

const assetPatterns = <const>[
  ['media', /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf)(\?.*)?$/i],
  ['image', /\.(png|jpe?g|gif|ico|svg|webp)(\?.*)?$/i],
  ['font', /\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
  ['css', /\.(s?css|less|styl)(\?.*)?$/i],
];

export const handleBuild = (config: Config) => {
  config.build ||= {};
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
        let prefix = 'misc';

        for (const [name, pattern] of assetPatterns) {
          if (pattern.test(ext)) {
            prefix = name;
            break;
          }
        }

        return `${prefix}/[name].[hash][extname]`;
      },
      chunkFileNames: 'js/[name].[hash].js',
      entryFileNames: 'js/entry-[name].[hash].js',
    };
  }
};
