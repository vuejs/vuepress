export interface Pagination {
  postsFilter?: typeof Array.prototype.filter
  postsSorter?: typeof Array.prototype.sort
  perPagePosts?: number
  layout?: string
}

export interface DirectoryClassification {
  id: string;
  dirname: string;
  path: string;
  layout?: string;
  itemLayout?: string;
  itemPermalink?: string;
  pagination?: Pagination;
}

export interface FrontmatterClassification {
  id: string;
  keys: string[];
  path: string;
  layout?: string;
  frontmatter?: Record<string, any>;
  itemlayout?: string;
  pagination?: Pagination;
}
