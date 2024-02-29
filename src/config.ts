import { must } from './ulis/must';

// All non NEXT_PUBLIC should be listed in next.config
export const config = {
  wordpress: {
    grapqlBackend: must(process.env.NEXT_PUBLIC_GRAPHQL_BACKEND),
  },
  notion: {
    token: must(process.env.NOTION_TOKEN),
    liveDbId: must(process.env.NOTION_DATABASE_LIVE),
    onlineDbId: must(process.env.NOTION_DATABASE_ONLINE),
  },
  brevo: {
    token: must(process.env.SENDINBLUE_SECRET),
  },
};
