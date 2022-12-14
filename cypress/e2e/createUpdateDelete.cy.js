describe("Create, Update & Delete Listings", () => {
  beforeEach(() => {
    cy.visit("/").wait(2000);
    cy.get("a[href='./pages/authenticate.html?show=login']").click().wait(2000);
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
      });
    cy.wait(2000);
    cy.url().should("include", "profile.html");
    cy.get("a[href='./create.html']").click().wait(2000);
  });

  it("Can create and delete listing", () => {
    cy.get("#create-form")
      .should("exist")
      .within(() => {
        cy.get("#form-title").type("Half Eaten Cookie");
        cy.get("#form-description").type(
          "Half Eaten Cookie, other half still good"
        );
        cy.get("#form-tags").type("Half Eaten, Cookie, Still good");
        cy.get("#form-media").type(
          "https://images.unsplash.com/photo-1590499561075-eb6a721ab6b2"
        );
        cy.get("#form-ending-at").type("2023-12-12T12:12");
        cy.get("#form-submit").click().wait(2000);
      });
    cy.url().should("include", "specific.html");
    cy.get("#delete-listing-btn").click().wait(2000);
    cy.url().should("include", "profile.html");
  });

  it("Can create and update listing", () => {
    cy.get("#create-form")
      .should("exist")
      .within(() => {
        cy.get("#form-title").type("Half Eaten Cookie");
        cy.get("#form-description").type(
          "Half Eaten Cookie, other half still good"
        );
        cy.get("#form-tags").type("Half Eaten, Cookie, Still good");
        cy.get("#form-media").type(
          "https://images.unsplash.com/photo-1590499561075-eb6a721ab6b2"
        );
        cy.get("#form-ending-at").type("2023-12-12T12:12");
        cy.get("#form-submit").click().wait(2000);
      });
    cy.url().should("include", "specific.html");
    cy.get("#edit-listing-btn").click().wait(2000);
    cy.url().should("include", "create.html");
    cy.get("#create-form")
      .should("exist")
      .within(() => {
        cy.get("#form-title").should("have.value", "Half Eaten Cookie");
        cy.get("#form-description").should(
          "have.value",
          "Half Eaten Cookie, other half still good"
        );
        cy.get("#form-tags").should(
          "have.value",
          "Half Eaten, Cookie, Still good"
        );
        cy.get("#form-media").should(
          "have.value",
          "https://images.unsplash.com/photo-1590499561075-eb6a721ab6b2"
        );
        cy.get("#form-ending-at").should("be.disabled");
        cy.get("#form-title").type("More Than Half Eaten Cookie");
        cy.get("#form-description").type(
          "Half Eaten Cookie, other half still good. Update now more than half eaten."
        );
        cy.get("#form-submit").click().wait(2000);
      });
    cy.url().should("include", "specific.html");
    cy.get("#delete-listing-btn").click().wait(2000);
    cy.url().should("include", "profile.html");
  });

  //login
  it("Validates inputs", () => {
    cy.get("#create-form")
      .should("exist")
      .within(() => {
        //requires title
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-title:invalid").should("exist").should("have.focus");
        cy.get("#form-title").type("Half Eaten Cookie");
        //requires description
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-description:invalid")
          .should("exist")
          .should("have.focus");
        cy.get("#form-description").type(
          "Half Eaten Cookie, other half still good"
        );
        //requires an image
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-media:invalid").should("have.focus");
        // type bad link
        cy.get("#form-media").type("https://images.unsplash.com/photo-159");
        //requires end date
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-ending-at").should("have.focus");
        //requires future date
        cy.get("#form-ending-at").type("2021-12-12T12:12");
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-ending-at").should("have.focus");
        cy.get("#form-ending-at").clear().type("2023-12-12T12:12");
        // refocus image input for bad link
        cy.get("#form-submit").click().wait(2000);
        cy.get("#form-media").should("have.focus");
        cy.get("#form-media")
          .clear()
          .type("https://images.unsplash.com/photo-1590499561075-eb6a721ab6b2");
        //tags validated for array length
        cy.get("#form-tags").type(
          "Half Eaten, Cookie, Still good,Half Eaten, Cookie, Still good,Half Eaten, Cookie, Still good"
        );
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-tags").should("have.focus");
        //tags validated for a tags character length
        cy.get("#form-tags").clear().type("HalfsHalfsHalfsHalfsHalfsHalfs");
        cy.get("#form-submit").click().wait(200);
        cy.get("#form-tags").should("have.focus");
      });
  });
});
