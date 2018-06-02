/* eslint-env jasmine */

module.exports = ({Model, attribute, value}) => {
  it('defaults to \'' + value + '\'', () => {
    expect((new Model())[attribute]).toEqual(value)
  })
}
