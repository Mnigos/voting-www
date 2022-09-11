import 'vitest'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
  namespace Vi {
    // after chancing interface to type error apears again.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion<T = uknown> extends TestingLibraryMatchers<T, void> {}
  }

  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface ImportMetaEnv {
    VITE_CONTRACT_ADDRESS: string
    VITE_API_KEY: string
  }
}
