/* eslint-env jasmine */

const { itHasBehavior } = require('../../jest/itHasBehavior')

const User = require('./model')
const factory = require('./test_support')
const sinon = require('sinon')
const momentTimezone = require('moment-timezone')

describe('Users (Model)', () => {
  describe('#email', () => {
    itHasBehavior('attributeRequired', { instance: factory.valid(), attribute: 'email' })
    itHasBehavior('attributeUnique', { Model: User, instance: factory.valid(), attribute: 'email' })
    describe('when saving', () => {
      it('is downcased and then saved', async () => {
        expect.assertions(2)
        const email = 'MiXeDCaSe@examPLE.coM'
        const user = factory.mock()
        user.email = email
        try {
          const savedUser = await user.save()
          expect(savedUser).toBeTruthy()
          expect(savedUser.email).toEqual(email.toLowerCase())
        } catch (e) {
          console.log(e)
        }
      })
    })
  })
  describe('#password', () => {
    itHasBehavior('attributeRequired', { instance: factory.valid(), attribute: 'password' })
    itHasBehavior('attributeMinimumLength', { instance: factory.valid(), attribute: 'password', length: 8 })
    it('is encrypted upon save', async () => {
      expect.assertions(2)
      const user = factory.mock()
      const originalPassword = user.password
      try {
        const savedUser = await user.save()
        expect(savedUser.password).not.toEqual(originalPassword)
        expect(savedUser.password.length).toBeGreaterThan(30)
      } catch (e) {
        console.log(e)
      }
    })
  })
  describe('.validPassword()', () => {
    it('returns true when hashed given password matches stored password', async () => {
      expect.assertions(2)
      const user = factory.mock()
      const originalPassword = user.password
      const savedUser = await user.save()
      expect(savedUser.password).not.toEqual(originalPassword)
      try {
        expect(await savedUser.validPassword(originalPassword)).toBe(true)
      } catch (e) {
        console.log(e)
      }
    })
    it('returns false when hashed given password does not match stored password', async () => {
      expect.assertions(2)
      const user = factory.mock()
      const originalPassword = user.password
      const savedUser = await user.save()
      expect(savedUser.password).not.toEqual(originalPassword)
      try {
        expect(await savedUser.validPassword(originalPassword + 'x')).toBe(false)
      } catch (e) {
        console.log(e)
      }
    })
  })
})
