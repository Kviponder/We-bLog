const postId = document.querySelector('input[name="post-id"]').value;

const editHandler = async function(event) { 
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;
    await fetch(`/api/post/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    document.location.replace("/dashboard");
}

deleteHandler = async function() {
    await fetch(`/api/post/${postId}`, {
        method: "DELETE"
    });
    document.location.replace("/dashboard");
}

document.querySelector("#edit-post-form").addEventListener("submit", editHandler);
document.querySelector("#edit-post-button").addEventListener("click", editHandler);
document.querySelector("#delete-post-button").addEventListener("click", deleteHandler);