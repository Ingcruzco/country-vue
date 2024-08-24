import { describe, it, expect } from 'vitest'
import GENERICS from '@/constants/generics'
import SERVICE from '@/constants/service'
import TABLE from '@/constants/table'

describe('CanvasAnimation.vue', () => {
  it("Should load generic's constants", () => {
    expect(GENERICS.errors.notStates).toBe('No states/provinces found for the country you selected')
  })

  it("Should load generic's services", () => {
    expect(SERVICE.URL_BASE).toBe('https://countries.trevorblades.com/')
  })

  it("Should load generic's table", () => {
    expect(typeof TABLE.tableColumns).toBe('object')
  })
})
