describe("update avatar, check balance", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(2000);
    cy.get("a[href='./pages/authenticate.html?show=login']").click();
    cy.wait(2000);
    cy.get("#login-form")
      .should("exist")
      .within(() => {
        cy.get("input[type='email']:visible")
          .should("exist")
          .type(Cypress.env("EMAIL"));
        cy.get("input[type='password']:visible")
          .should("exist")
          .type(Cypress.env("PASSWORD"));
        cy.get("button[type='submit']").click();
      })
      .wait(2000);
    cy.url().should("include", "profile.html");
    cy.get(".navbar-brand").click().wait(2000);
    cy.get("#popular-slider").within(() => {
      cy.get("a").first().click().wait(2000);
    });
  });

  it("Can bid and view top bidder", () => {
    cy.get("#bidding-form")
      .should("exist")
      .within(() => {
        cy.get("button[type='submit']").click().wait(2000);
      });

    cy.get("#bidding-form")
      .should("exist")
      .within(() => {
        cy.get("#winning-user")
          .invoke("text")
          .then((text) => {
            cy.wrap(text).should("equal", "Lester");
          });
      });
  });

  it("Logged out user can't bid", () => {
    cy.get("#bidding-form")
      .should("exist")
      .within(() => {
        cy.get("#bid-amount").type("999999999999");
        cy.get("button[type='submit']").click().wait(200);
        cy.get("#bid-amount").should("have.focus");
      });
  });

  it("Errors handled", () => {
    cy.get("#bidding-form")
      .should("exist")
      .within(() => {
        cy.clearLocalStorage();
        cy.get("button[type='submit']").click().wait(200);
      });
    cy.get("#error-reporting-container > p")
      .should("exist")
      .should("have.class", "text-losing");
  });
});
