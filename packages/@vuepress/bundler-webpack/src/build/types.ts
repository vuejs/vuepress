/**
 * Client file meta
 */
export interface FileMeta {
  /**
   * file name
   */
  file: string

  /**
   * file extension
   */
  extension: string

  /**
   * file type
   */
  type: FileMetaType
}

/**
 * Client file meta type, mainly used for <preload as="type">
 */
export type FileMetaType = 'script' | 'style' | 'image' | 'font' | ''

/**
 * A "module request" to "client files meta" key-value map
 */
export type ModuleFilesMetaMap = Record<string, FileMeta[]>
