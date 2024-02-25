import request, { RequestDocument, Variables } from 'graphql-request';

import { config } from '../config';
import {
  GetCtaDocument,
  GetCtaQuery,
  GetCtaQueryVariables,
  GetGalleryBySlugDocument,
  GetGalleryBySlugQuery,
  GetGalleryBySlugQueryVariables,
  GetPageByUriDocument,
  GetPageByUriQuery,
  GetPageByUriQueryVariables,
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
  GetSettingsDocument,
  GetSettingsQuery,
  GetSettingsQueryVariables,
} from './gql/graphql';

const API_URL = config.wordpress.grapqlBackend;

class wordpressApi {
  constructor() {
    this.getPosts = this.getPosts.bind(this);
    this.getSettings = this.getSettings.bind(this);
  }

  private async request<T, V extends Variables>(
    document: RequestDocument,
    variables: V | undefined = undefined
  ): Promise<T> {
    return request<T>({
      url: API_URL,
      document,
      variables,
    });
  }

  public async getPosts() {
    const { posts } = await this.request<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument);
    return posts;
  }

  public async getSettings() {
    const { page } = await this.request<GetSettingsQuery, GetSettingsQueryVariables>(
      GetSettingsDocument
    );
    return page?.settingsDww;
  }

  public async getCta() {
    const { page } = await this.request<GetCtaQuery, GetCtaQueryVariables>(GetCtaDocument);
    return page?.cta;
  }

  public async getPostBySlug(slug: string) {
    const { post } = await this.request<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
      GetPostBySlugDocument,
      { id: slug }
    );
    return post;
  }

  public async getGalleryBySlug(slug: string) {
    const { gallery } = await this.request<GetGalleryBySlugQuery, GetGalleryBySlugQueryVariables>(
      GetGalleryBySlugDocument,
      { slug }
    );
    return gallery;
  }

  public async getPageByUri(uri: string) {
    const { page } = await this.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
      GetPageByUriDocument,
      { uri }
    );
    return page;
  }
}

export const WordpressApi = new wordpressApi();
