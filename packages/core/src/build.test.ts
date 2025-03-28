import { build } from './build'
import type { KubbConfig } from './types'
import { createPlugin } from './plugin'

import type { File } from './managers/fileManager/types'

describe('build', () => {
  const pluginMocks = {
    buildStart: vi.fn(),
    buildEnd: vi.fn(),
    resolvePath: vi.fn(),
    transform: vi.fn(),
    validate: vi.fn(),
    writeFile: vi.fn(),
    load: vi.fn(),
  } as const

  const file: File = {
    path: 'hello/world.json',
    fileName: `world.json`,
    source: "export const hello = 'world';",
  }
  const plugin = createPlugin(() => {
    return {
      name: 'plugin',
      async buildStart(...params) {
        pluginMocks.buildStart(...params)

        await this.addFile(file)
      },
      buildEnd(...params) {
        pluginMocks.buildEnd(...params)
      },
      load(...params) {
        pluginMocks.load(...params)

        return 'id'
      },
      validate(...params) {
        pluginMocks.validate(...params)

        return true
      },
      transform(...params) {
        pluginMocks.transform(...params)

        return `${params[0]} plugin`
      },
      async writeFile(...params) {
        pluginMocks.writeFile(...params)
      },
    }
  })

  const config = {
    root: '.',
    input: {
      path: 'https://petstore3.swagger.io/api/v3/openapi.json',
    },
    output: {
      path: './src/gen',
      clean: true,
    },
    plugins: [plugin({})],
  } satisfies KubbConfig

  afterEach(() => {
    Object.keys(pluginMocks).forEach((key) => {
      const mock = pluginMocks[key as keyof typeof pluginMocks]

      mock.mockClear()
    })
  })

  test('if build can run and return created files and the pluginManager', async () => {
    const { files, pluginManager } = await build({
      config,
    })

    expect(files).toBeDefined()
    expect(pluginManager).toBeDefined()
    expect(files.length).toBe(1)
  })

  test('if build with one plugin is running the different hooks in the correct order', async () => {
    const { files } = await build({
      config,
    })

    expect(files).toMatchObject([
      {
        ...file,
      },
    ])

    expect(pluginMocks.validate).toHaveBeenCalledTimes(1)
    expect(pluginMocks.buildStart).toHaveBeenCalledTimes(1)

    expect(pluginMocks.load).toHaveBeenCalledTimes(1)
    // expect(pluginMocks.load).toHaveBeenCalledWith('hello/world.json')
    expect(pluginMocks.load.mock.lastCall).toEqual(['hello/world.json'])

    // expect(pluginMocks.transform).toHaveBeenCalledWith('id', 'hello/world.json')
    expect(pluginMocks.transform.mock.lastCall).toEqual(['id', 'hello/world.json'])

    expect(pluginMocks.writeFile).toHaveBeenCalledTimes(1)
    // expect(pluginMocks.writeFile).toHaveBeenCalledWith('id plugin', 'hello/world.json')
    expect(pluginMocks.writeFile.mock.lastCall).toEqual(['id plugin', 'hello/world.json'])

    expect(pluginMocks.buildEnd).toHaveBeenCalledTimes(1)
  })
})
