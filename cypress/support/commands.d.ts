declare namespace Cypress {
  interface cy extends Chainable<undefined> {
    prepareDOMAliases: () => Chainable<Element>;
    findIframe: (iframeSelector: string) => Chainable<Element>;
  }
}
