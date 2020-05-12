import * as portfinder from 'portfinder'

export const resolvePort = async (port: number): Promise<number> => {
  return portfinder.getPortPromise({ port })
}
