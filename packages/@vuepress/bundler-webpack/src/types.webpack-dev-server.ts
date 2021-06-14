import type { FSWatcher } from 'chokidar'
import type { Application } from 'express'
import type { Compiler, WebpackOptionsNormalized } from 'webpack'

export interface WebpackDevServer {
  app: Application
  compiler: Compiler
  // WebpackLogger
  logger: ReturnType<Compiler['getInfrastructureLogger']>
  // DevServer
  options: WebpackOptionsNormalized['devServer']
  sockets: any[]
  staticWatchers: FSWatcher[]
  webSocketProxies: any[]
  webSocketHeartbeatInterval: number

  use: Application['use']
}
