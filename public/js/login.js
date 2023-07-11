const loginHandler = async function (event) {
  event.preventDefault();

  const userEl = document.querySelector("#username");
  const passwordEl = document.querySelector("#password");
  console.log(userEl.value, passwordEl.value);

  const response = await fetch("api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: userEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/new");
  } else {
    alert("Failed to log in.");
  }
};
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginHandler);
