const appShell = document.querySelector(".app-shell");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const messages = document.querySelector("#messages");
const searchInput = document.querySelector("#search-input");
const searchField = document.querySelector("#search-field");
const conversation = document.querySelector(".conversation");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function addMessage(text) {
  const row = document.createElement("article");
  row.className = "message-row outgoing";

  const content = document.createElement("div");
  content.className = "message-content";

  const meta = document.createElement("div");
  meta.className = "message-meta";
  const name = document.createElement("strong");
  name.textContent = "Alan joseph";
  const time = document.createElement("time");
  time.textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
  meta.append(name, time);

  const bubble = document.createElement("p");
  bubble.textContent = text;
  content.append(meta, bubble);

  const avatar = document.createElement("img");
  avatar.className = "message-avatar";
  avatar.src = "Assets/avatar1.jpeg";
  avatar.alt = "Alan";

  row.append(content, avatar);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) {
    messageInput.focus();
    return;
  }
  addMessage(text);
  messageInput.value = "";
  messageInput.focus();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    document.querySelector(".tab[aria-selected='true']")?.setAttribute("aria-selected", "false");
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const filter = tab.dataset.filter;
    conversation.hidden = filter !== "chat";
    emptyState.hidden = filter === "chat";
    emptyState.textContent = filter === "call" ? "No recent calls." : "No contacts to show.";
  });
});

document.querySelector("#search-toggle").addEventListener("click", () => {
  searchField.classList.toggle("visible");
  if (searchField.classList.contains("visible")) searchInput.focus();
});

searchInput.addEventListener("input", () => {
  const matches = conversation.dataset.name.includes(searchInput.value.trim().toLowerCase());
  conversation.hidden = !matches;
  emptyState.hidden = matches || document.querySelector(".tab.active").dataset.filter !== "chat";
  if (!matches) emptyState.textContent = "No conversations found.";
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.querySelector("#sound-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const muted = button.getAttribute("aria-label") === "Unmute conversation";
  button.setAttribute("aria-label", muted ? "Mute conversation" : "Unmute conversation");
  showToast(muted ? "Conversation notifications enabled" : "Conversation notifications muted");
});

document.querySelector("#emoji-button").addEventListener("click", () => {
  messageInput.value += "😊";
  messageInput.focus();
});

document.querySelector("#add-options").addEventListener("click", () => {
  document.querySelector("#file-input").click();
});
document.querySelector("#upload-button").addEventListener("click", () => {
  document.querySelector("#file-input").click();
});
document.querySelector("#attach-button").addEventListener("click", () => {
  document.querySelector("#file-input").click();
});
document.querySelector("#file-input").addEventListener("change", (event) => {
  const file = event.currentTarget.files?.[0];
  if (file) showToast(`${file.name} is ready to share`);
});

document.querySelector("#record-button").addEventListener("click", () => {
  showToast("Voice recording is not available in this demo");
});
document.querySelector("#logout-button").addEventListener("click", () => {
  showToast("You are already signed in");
});
document.querySelectorAll("[data-notice]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.notice));
});
document.querySelector("#message-search").addEventListener("click", () => {
  showToast("Message search is ready");
});
document.querySelector("#more-button").addEventListener("click", () => {
  showToast("More conversation options");
});

conversation.addEventListener("click", () => {
  appShell.classList.add("show-conversation");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) appShell.classList.remove("show-conversation");
});
