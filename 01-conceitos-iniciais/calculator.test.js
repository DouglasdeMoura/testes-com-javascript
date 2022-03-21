import { test, expect } from 'vitest'

const assert = require('assert')
const calculator = require('./calculator.js')


test('soma dois números', () => {
  expect(calculator.sum(1, 1)).toEqual(2)
})

test('deve subtrair dois números', () => {
  expect(calculator.sub(2, 1)).toEqual(1)
})

