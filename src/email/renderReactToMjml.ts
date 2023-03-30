import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml';
import mjml2html from 'mjml';
// import mjml2html from "mjml-browser";
import { MJMLParseResults } from 'mjml-core';
import React from 'react';

export const renderReactToMjml = (email: React.ReactElement): MJMLParseResults => {
  return mjml2html(renderToMjml(email));
};
