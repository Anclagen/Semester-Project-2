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
  });

  it("Can view balance", () => {
    cy.get("#balance > p")
      .should("exist")
      .invoke("text")
      .then((text) => {
        const splitText = text.slice(1);
        const number = Number(splitText);
        cy.wrap(number).should("be.gte", 0);
      });
  });

  it("Can update avatar", () => {
    cy.get("[data-bs-target='#updateAvatarModal']").click().wait(500);
    cy.get("#updateAvatarModal").within(() => {
      cy.get("#avatar:visible").type(
        "https://static1.personality-database.com/profile_images/e20f7d474f334a5d9d36741ee65ba19e.png"
      );
      cy.get("button[type='submit']").click().wait(2000);
    });
    cy.get("#userAvatarImage")
      .should("have.attr", "src")
      .should(
        "include",
        "https://static1.personality-database.com/profile_images/e20f7d474f334a5d9d36741ee65ba19e.png"
      );
  });

  it("Can returns error on bad image links", () => {
    cy.get("[data-bs-target='#updateAvatarModal']").click().wait(500);
    cy.get("#updateAvatarModal").within(() => {
      cy.get("#avatar:visible").type(
        "https://static.simpsonswiki.com/images/8/87/Lesr.png"
      );
      cy.get("button[type='submit']").click().wait(2000);
      cy.get("#avatar:visible").should("have.focus");
      cy.get("#avatar:visible")
        .clear()
        .type("https://static.simpsonswiki.com/images/8/87/Lester.png");
      cy.get("button[type='submit']").click().wait(2000);
    });
    cy.get("#userAvatarImage")
      .should("have.attr", "src")
      .should(
        "include",
        "https://static.simpsonswiki.com/images/8/87/Lester.png"
      );
  });
});
