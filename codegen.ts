import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_BACKEND,
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
