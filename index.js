const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("click", (e) => {
  e.preventDefault();
  alert("The search bar is for demonstration only!");
});

const feedbackName = document.querySelector("#comment-name");
const feedbackText = document.querySelector("#comment-text");
const sendFeedbackBtn = document.querySelector("#send-feedback");

const comments = localStorage.getItem("comments")
  ? JSON.parse(localStorage.getItem("comments"))
  : [];

sendFeedbackBtn?.addEventListener("click", (e) => {
  const name = feedbackName.value;
  const comment = feedbackText.value;
  if (!name || !comment) return alert("Invalid input!");
  comments.push({
    name,
    comment,
    date: new Date(),
  });
  localStorage.setItem("comments", JSON.stringify(comments));
  window.location.href = "/comments.html";
});

if (window.location.pathname === "/comments.html") {
  const commentsDiv = document.querySelector(".comments");

  const html = comments.reduce((acc, commentData) => {
    return (
      acc +
      `<div class="comment">
              <h3 class="comment-author">
                <span class="author-name">${
                  commentData.name
                }</span> says on ${new Date(
        commentData.date
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}:
              </h3>
              <p class="comment-text">${commentData.comment}</p>
            </div>`
    );
  }, "");
  commentsDiv.innerHTML = html;
}
