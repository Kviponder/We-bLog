const newPostHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const body = document.querySelector('textarea[name="content"]').value;
  console.log(title, content);
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document.querySelector("#post-form").addEventListener("submit", newPostHandler);
