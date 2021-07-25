import path from 'path'
import {TranslateType} from './temp/test'
import {SourceMapGenerator} from 'source-map'
import {writeFile} from 'fs-extra'

const tempDir = path.resolve(__dirname, 'temp')
it('基本示例', async () => {
  const map = new SourceMapGenerator({
    file: './test.d.ts',
  })
  map.addMapping({
    original: {
      line: 2,
      column: 4,
    },
    generated: {
      line: 2,
      column: 3,
    },
    source: './test.json',
  })
  await writeFile(path.resolve(tempDir, 'test.d.ts.map'), map.toString())

  function f<T extends keyof TranslateType>(
    key: T,
    ...params: TranslateType[T]['params']
  ): TranslateType[T]['value'] {
    return null as any
  }

  f('name')
})
