import { createVuepressApp } from './app'

const main = async (): Promise<void> => {
  process.env.NODE_ENV = 'production'

  const app = createVuepressApp()

  await app.build()
}

main()
