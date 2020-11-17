import type { ClientAppSetup } from '../clientAppSetup'

declare module '@internal/clientAppSetups' {
  export const clientAppSetups: ClientAppSetup[]
}
