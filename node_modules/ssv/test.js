!function(api) {
  function expect(actual, correct) {
    if (actual !== correct) throw new Error(actual + ' should be ' + correct)
  }

  expect(api.parse('').length, 0)
  expect(api.parse(' ').length, 0)
  expect(api.parse('yes').join('-'), 'yes')
  expect(api.parse('yes no').join('-'), 'yes-no')
  expect(api.parse(' yes no ').join('-'), 'yes-no')
  console.log('#parse tests passed')

  expect(api.compact(''), '')
  expect(api.compact('    '), '')
  expect(api.compact('  yes  no  maybe  '), 'yes no maybe')
  expect(api.compact('\n yes \r no \t maybe \n\r\t'), 'yes no maybe')
  console.log('#compact tests passed')

  expect(api.has('', ''), false)
  expect(api.has('', ' '), false)
  expect(api.has(' ', ' '), false)
  expect(api.has('yes no', ''), false)
  expect(api.has('yes no', ' '), false)
  expect(api.has('yes no', 'no'), true)
  expect(api.has('yes no', 'yes'), true)
  expect(api.has('yes no', 'maybe'), false)
  expect(api.has('  yes   no  ', 'yes'), true)
  console.log('#has tests passed')

  expect(api.push('', ''), '')
  expect(api.push('', 'yes'), 'yes')
  expect(api.push('yes no', 'maybe'), 'yes no maybe')
  expect(api.push('yes no', 'yes'), 'yes no yes')
  expect(api.push('  yes  no  ', 'maybe'), 'yes no maybe')
  expect(api.push('  yes  no  ', 'yes'), 'yes no yes')
  console.log('#push tests passed')

  expect(api.add('yes no', 'yes'), 'yes no')
  expect(api.add('yes no', 'maybe'), 'yes no maybe')
  expect(api.add('  yes   no  ', 'yes'), 'yes no')
  expect(api.add('  yes  no  ', 'maybe'), 'yes no maybe')
  console.log('#add tests passed')

  expect(api.remove('', 'yes'), '')
  expect(api.remove('yes no maybe', 'maybe'), 'yes no')
  expect(api.remove('yes no maybe', 'yes'), 'no maybe')
  expect(api.remove('yes no maybe', 'no'), 'yes maybe')
  expect(api.remove('yes no maybe no', 'no'), 'yes maybe')
  expect(api.remove('yes no no maybe', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  maybe  ', 'maybe'), 'yes no')
  expect(api.remove('  yes  no  maybe  ', 'yes'), 'no maybe')
  expect(api.remove('  yes  no  maybe  ', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  maybe no', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  no maybe', 'no'), 'yes maybe')
  console.log('#remove tests passed')

  console.log('All tests passed =)')
}(require('./'));
