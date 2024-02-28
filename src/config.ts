import { must } from './ulis/must';

export const config = {
  wordpress: {
    grapqlBackend: must(process.env.NEXT_PUBLIC_GRAPHQL_BACKEND),
  },
  notion: {
    liveDbId: must(process.env.NOTION_DATABASE_LIVE),
  },
};
