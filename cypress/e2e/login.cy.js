/* eslint-disable no-undef */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe("login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });
  it("should display login page correctly", () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });
  it("should display alert when email is empty", () => {
    // Assert that the GlobalAlert component is not initially visible
    cy.get(".MuiAlert-root").should("not.exist");
    // click login button without filling form
    cy.get('button[type="submit"]').click();
    // Assert that the GlobalAlert component is now visible
    cy.get(".MuiAlert-root").should("exist");

    // Assert the content of the alert, for example:
    cy.contains('"email" is not allowed to be empty').should("exist");
  });
  it("should display alert when password is empty", () => {
    // Assert that the GlobalAlert component is not initially visible
    cy.get(".MuiAlert-root").should("not.exist");
    // type email
    cy.get('input[name="email"]').type("coba@test.com");
    // click login button without filling form
    cy.get('button[type="submit"]').click();
    // Assert that the GlobalAlert component is now visible
    cy.get(".MuiAlert-root").should("exist");

    // Assert the content of the alert, for example:
    cy.contains('"password" is not allowed to be empty').should("exist");
  });
  it("should display alert when password or email is wrong", () => {
    // Assert that the GlobalAlert component is not initially visible
    cy.get(".MuiAlert-root").should("not.exist");
    // type email & password
    cy.get('input[name="email"]').type("coba@test.com");
    cy.get('input[name="password"]').type("123");
    // click login button without filling form
    cy.get('button[type="submit"]').click();
    // Assert that the GlobalAlert component is now visible
    cy.get(".MuiAlert-root").should("exist");

    // Assert the content of the alert, for example:
    cy.contains("email or password is wrong").should("exist");
  });
  it("should display homepage when password or email is correct", () => {
    // Assert that the GlobalAlert component is not initially visible
    cy.get(".MuiAlert-root").should("not.exist");
    // type email & password
    cy.get('input[name="email"]').type("coba@test.com");
    cy.get('input[name="password"]').type("123123");
    // click login button without filling form
    cy.get('button[type="submit"]').click();

    // Assert that the homepage is displayed
    cy.url().should("include", "/"); // Adjust this to match your homepage URL

    // You can also assert elements that are specific to the homepage, e.g., by checking for a unique element on the homepage
    // For example, if there's a welcome message, you can check for it
    cy.get("button")
      .contains(/^Logout$/)
      .should("exist");
  });
});
