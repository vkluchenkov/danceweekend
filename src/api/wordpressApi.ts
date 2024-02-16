import request, { RequestDocument, Variables } from 'graphql-request';

import { config } from '../config';
import {
  GetGalleryBySlugDocument,
  GetGalleryBySlugQuery,
  GetGalleryBySlugQueryVariables,
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
}

export const WordpressApi = new wordpressApi();
