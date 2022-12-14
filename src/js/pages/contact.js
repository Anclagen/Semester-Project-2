export const ContactPageSetup = function () {
  const form = document.querySelector("#contact-form");
  const response = document.querySelector("#contact-form-response");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    response.innerHTML = `<p class="p-3 bg-secondary rounded-2">Your query has been submitted, responses can take upto 3 working days, depending on the nature of the query.</p>`;

    form.reset();
  });
};
