const commentHandler = async function (event) {
  event.preventDefault();

  const post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  const body = document.querySelector('textarea[name="comment-body"]').value;
  console.log(body);
  if (body) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        postId: post_id,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.location.reload();
  }
};
document
  .querySelector("#comment-form")
  .addEventListener("submit", commentHandler);
