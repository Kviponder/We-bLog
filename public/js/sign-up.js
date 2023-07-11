const SUformHandler = async function (event) {
  event.preventDefault();

  const userEl = document.querySelector("#username");
  const passwordEl = document.querySelector("#password");
  console.log(userEl.value, passwordEl.value);
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: userEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to create an account.");
  }
};

const signUpForm = document.querySelector("#sign-up-form");
signUpForm.addEventListener("submit", SUformHandler);
