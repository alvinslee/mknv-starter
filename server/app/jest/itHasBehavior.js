module.exports = (testDescription, options) => {
  switch (testDescription) {
    case 'responds with 200, but unsuccessful':
      require('./shared_examples/routes/unsuccessful200')(options)
      break
    case 'responds with 403 if token authorization fails':
      require('./shared_examples/routes/unauthorized403')(options)
      break
    case 'attribute has default value':
      require('./shared_examples/models/attributeDefaultValue')(options)
      break
    case 'attribute is required':
      require('./shared_examples/models/attributeRequired')(options)
      break
    case 'attribute is optional':
      require('./shared_examples/models/attributeOptional')(options)
      break
    case 'attribute has minimum length':
      require('./shared_examples/models/attributeMinimumLength')(options)
      break
    case 'attribute is of type':
      require('./shared_examples/models/attributeType')(options)
      break
    case 'attribute is unique':
      require('./shared_examples/models/attributeUnique')(options)
      break
    default:
      console.log('shared example description "' + testDescription + '" not found')
      break
  }
}
