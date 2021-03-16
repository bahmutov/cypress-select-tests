const falafel = require('falafel')
const debug = require('debug')('cypress-select-tests')

const isTestBlock = name => node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === name
  )
}

const isDescribe = isTestBlock('describe')

const isContext = isTestBlock('context')

const isIt = isTestBlock('it')

const isSpecify = isTestBlock('specify')

const isItOnly = node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object &&
    node.callee.property &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'it' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.property.name === 'only'
  )
}

const isItSkip = node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object &&
    node.callee.property &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'it' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.property.name === 'skip'
  )
}

const getItsName = node => node.arguments[0].value

/**
 * Given an AST test node, walks up its parent chain
 * to find all "describe" or "context" names
 */
const findSuites = (node, names = []) => {
  if (!node) {
    return
  }

  if (isDescribe(node) || isContext(node)) {
    names.push(getItsName(node))
  }

  return findSuites(node.parent, names)
}

const findTests = source => {
  const foundTestNames = []

  const onNode = node => {
    // console.log(node)

    if (isIt(node) || isSpecify(node)) {
      const names = [getItsName(node)]
      findSuites(node, names)

      // we were searching from inside out, thus need to revert the names
      const testName = names.reverse()
      // console.log('found test', testName)
      foundTestNames.push(testName)
    }
    // TODO: handle it.only and it.skip
    // or should it.only disable filtering?

    // else if (isItOnly(node)) {
    //   const testName = [getItsName(node)]
    //   console.log('found it.only', testName)
    //   // nothing to do
    // } else if (isItSkip(node)) {
    //   const testName = [getItsName(node)]
    //   console.log('found it.skip', testName)
    //   node.update('it.only' + node.source().substr(7))
    // }
  }

  // ignore source output for now
  falafel(source, onNode)

  return foundTestNames
}

const equals = x => y => String(x) === String(y)

const skipTests = (source, leaveTests) => {
  const onNode = node => {
    // console.log(node)

    if (isIt(node) || isSpecify(node)) {
      const names = [getItsName(node)]
      findSuites(node, names)
      // we were searching from inside out, thus need to revert the names
      const testName = names.reverse()
      // console.log('found test', testName)
      // foundTestNames.push(testName)
      const shouldLeaveTest = leaveTests.some(equals(testName))
      if (shouldLeaveTest) {
        debug('leaving test', testName)
      } else {
        debug('disabling test', testName)
        if (isSpecify(node)) {
          return node.update('specify.skip' + node.source().substr(7))
        }
        node.update('it.skip' + node.source().substr(2))
      }
    }
    // TODO: handle it.only and it.skip

    // else if (isItOnly(node)) {
    //   const testName = [getItsName(node)]
    //   console.log('found it.only', testName)
    //   // nothing to do
    // } else if (isItSkip(node)) {
    //   const testName = [getItsName(node)]
    //   console.log('found it.skip', testName)
    //   node.update('it.only' + node.source().substr(7))
    // }
  }

  const output = falafel(source, onNode)
  return output.toString()
}

module.exports = {
  findTests,
  skipTests
}
