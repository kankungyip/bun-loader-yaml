import { parse } from 'yaml';

export default function YamlLoader() {
  return {
    name: 'bun-loader-yaml',
    setup({ onLoad }) {
      onLoad({ filter: /\.(yaml|yml)$/ }, async (args) => {
        const text = await Bun.file(args.path).text();
        const exports = parse(text);
        return {
          contents: `export default ${JSON.stringify(exports)}`,
          loader: 'js',
        };
      });
    },
  };
}
