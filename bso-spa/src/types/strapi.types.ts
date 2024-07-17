export interface StrapiEntityDefaultAttributes {
  id: number;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface StrapiPaginationMeta {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

interface StrapiResponseMeta {
  pagination?: StrapiPaginationMeta;
}

export interface StrapiResponse<Data extends object | object[]> {
  data: Data;
  meta: StrapiResponseMeta;
}

export interface StrapiResponseError {
  details: {};
  message: string;
  name: string;
  status: number;
}

export interface StrapiImage {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: ImageFormatsMap;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export type StrapiImageSize = "small" | "medium" | "thumbnail";

export type ImageFormatsMap = Record<StrapiImageSize, StrapiImageFormat>;

export interface StrapiImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}
