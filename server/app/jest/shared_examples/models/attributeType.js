/* eslint-env jasmine */

module.exports = ({instance, attribute, type, allowNull}) => {
  it('must be ' + type.name + ' type', async () => {
    expect.assertions(1)
    let validValue
    switch (type) {
      case Date:
        validValue = new Date()
        break
    }

    instance[attribute] = validValue
    try {
      await instance.validate()
    } catch (validationError) {
      console.log(validationError.errors)
      fail()
    }

    let invalidValue
    switch (type) {
      case Date:
        invalidValue = 'abc'
        break
    }
    instance[attribute] = invalidValue
    try {
      await instance.validate()
    } catch (validationError) {
      expect(validationError.errors[attribute]).not.toBeUndefined()
    }
  })

  if (allowNull === true) {
    it('can be null', async () => {
      instance[attribute] = null
      try {
        await instance.validate()
      } catch (validationError) {
        console.log(validationError.errors)
        fail()
      }
    })
  }
}
