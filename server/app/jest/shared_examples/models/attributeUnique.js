/* eslint-env jasmine */

module.exports = ({Model, instance, attribute}) => {
  it('must be unique', async () => {
    expect.assertions(1)
    const instanceData = instance.toObject()
    delete instanceData._id
    const existingInstance = new Model(instanceData)
    try {
      await existingInstance.save()
    } catch (e) {
      console.log('Could not save first instance')
      fail()
    }

    try {
      await instance.validate()
    } catch (validationError) {
      expect(validationError.errors[attribute]).not.toBeUndefined()
    }
  })
}
