// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Example tests', () => {
  it('works', () => {})

  context('nested', () => {
    // should we pick tests based on grep or some kind of tags?

    // @tagA
    it('does A', () => {})

    // @tagB
    it('does B', () => {})

    // @tags foo,bar
    it('does C', () => {})
  })
})
