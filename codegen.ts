import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as nextConfig } from './src/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: nextConfig.wordpress.grapqlBackend,
  documents: './src/api/schemas/*.graphql',
  generates: {
    './src/api/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          DateTime: 'string',
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
