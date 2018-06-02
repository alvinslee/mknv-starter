/* eslint-env jasmine */

module.exports = ({instance, attribute}) => {
  it('must not be empty', async () => {
    expect.assertions(1)
    instance[attribute] = ''
    try {
      await instance.validate()
    } catch (validationError) {
      expect(validationError.errors[attribute]).not.toBeUndefined()
    }
  })
}
