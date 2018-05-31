/* eslint-env jasmine */

const sharedSpec = ({instance, attribute}) => {
  it('can be empty', async () => {
    instance[attribute] = ''
    try {
      await instance.validate()
    } catch (validationError) {
      console.log(validationError.errors)
      fail()
    }
  })
}

module.exports = sharedSpec
