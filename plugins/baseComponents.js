import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '@/components',
  true,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileNameWithPath) => {
  const pathLength = fileNameWithPath.split('/').length
  const fileName = `./${fileNameWithPath.split('/')[pathLength-1]}`
  const componentConfig = requireComponent(fileNameWithPath)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
