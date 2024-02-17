/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetGalleryBySlug($slug: ID!) {\n  gallery(id: $slug, idType: SLUG) {\n    galleryImagesGroup {\n      images(first: 1000) {\n        nodes {\n          caption(format: RENDERED)\n          altText\n          large: sourceUrl\n          small: sourceUrl(size: THUMBNAIL)\n          title\n        }\n      }\n    }\n  }\n}": types.GetGalleryBySlugDocument,
    "query GetPageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    title\n    featuredImage {\n      node {\n        sourceUrl\n      }\n    }\n    content(format: RENDERED)\n  }\n}": types.GetPageByUriDocument,
    "query getPostBySlug($id: ID!) {\n  post(id: $id, idType: SLUG) {\n    content(format: RENDERED)\n    title\n  }\n}": types.GetPostBySlugDocument,
    "query getPosts {\n  posts {\n    nodes {\n      id\n      title\n      content(format: RENDERED)\n      slug\n    }\n  }\n}": types.GetPostsDocument,
    "query getSettings {\n  page(id: \"settings\", idType: URI) {\n    title\n    settingsDww {\n      price {\n        promoPeriod {\n          isLivePromo\n          isOnlinePromo\n          price {\n            live\n            online\n          }\n        }\n        periods {\n          pricePeriod1 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod2 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod3 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetSettingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetGalleryBySlug($slug: ID!) {\n  gallery(id: $slug, idType: SLUG) {\n    galleryImagesGroup {\n      images(first: 1000) {\n        nodes {\n          caption(format: RENDERED)\n          altText\n          large: sourceUrl\n          small: sourceUrl(size: THUMBNAIL)\n          title\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetGalleryBySlug($slug: ID!) {\n  gallery(id: $slug, idType: SLUG) {\n    galleryImagesGroup {\n      images(first: 1000) {\n        nodes {\n          caption(format: RENDERED)\n          altText\n          large: sourceUrl\n          small: sourceUrl(size: THUMBNAIL)\n          title\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    title\n    featuredImage {\n      node {\n        sourceUrl\n      }\n    }\n    content(format: RENDERED)\n  }\n}"): (typeof documents)["query GetPageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    title\n    featuredImage {\n      node {\n        sourceUrl\n      }\n    }\n    content(format: RENDERED)\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getPostBySlug($id: ID!) {\n  post(id: $id, idType: SLUG) {\n    content(format: RENDERED)\n    title\n  }\n}"): (typeof documents)["query getPostBySlug($id: ID!) {\n  post(id: $id, idType: SLUG) {\n    content(format: RENDERED)\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getPosts {\n  posts {\n    nodes {\n      id\n      title\n      content(format: RENDERED)\n      slug\n    }\n  }\n}"): (typeof documents)["query getPosts {\n  posts {\n    nodes {\n      id\n      title\n      content(format: RENDERED)\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getSettings {\n  page(id: \"settings\", idType: URI) {\n    title\n    settingsDww {\n      price {\n        promoPeriod {\n          isLivePromo\n          isOnlinePromo\n          price {\n            live\n            online\n          }\n        }\n        periods {\n          pricePeriod1 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod2 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod3 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getSettings {\n  page(id: \"settings\", idType: URI) {\n    title\n    settingsDww {\n      price {\n        promoPeriod {\n          isLivePromo\n          isOnlinePromo\n          price {\n            live\n            online\n          }\n        }\n        periods {\n          pricePeriod1 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod2 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n          pricePeriod3 {\n            start\n            end\n            price {\n              live\n              online\n            }\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;