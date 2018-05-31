/* eslint-env jasmine */

const sharedSpec = ({instance, attribute, length}) => {
  it('must have minimum length of ' + length, async () => {
    expect.assertions(1)
    instance[attribute] = new Array(length + 1).join('A')
    try {
      await instance.validate()
    } catch (e) {
      fail()
    }
    instance[attribute] = new Array(length).join('A')
    try {
      await instance.validate()
    } catch (validationError) {
      expect(validationError.errors[attribute]).not.toBeUndefined()
    }
  })
}

module.exports = sharedSpec
