/* eslint-env jasmine */

const sharedSpec = ({Model, attribute, value}) => {
  it('defaults to \'' + value + '\'', () => {
    expect((new Model())[attribute]).toEqual(value)
  })
}

module.exports = sharedSpec
