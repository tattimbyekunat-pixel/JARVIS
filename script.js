// JARVIS chat prototype. This runs entirely in your browser and uses sample replies.
const chatForm = document.querySelector("#chat-form");
const userInput = document.querySelector("#user-input");
const messages = document.querySelector("#messages");
const clearButton = document.querySelector("#clear-chat");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", `${sender}-message`);

  if (sender === "assistant") {
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "J";
    message.append(avatar);
  }

  const paragraph = document.createElement("p");
  // textContent treats messages as plain text, so user input can't insert HTML.
  paragraph.textContent = text;
  message.append(paragraph);
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function getSampleReply(userMessage) {
  const text = userMessage.toLowerCase();
  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! It’s good to hear from you. What would you like to work on today?";
  }
  if (text.includes("help")) {
    return "I’m in prototype mode right now. Try saying hello, or tell me what you’re building!";
  }
  if (text.includes("name")) {
    return "I’m JARVIS, your personal assistant prototype.";
  }
  return "That’s a great question. I’m still a simple demo, but this chat is ready for you to connect a real AI service later.";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  userInput.focus();

  // A short pause makes the prototype feel more conversational.
  window.setTimeout(() => addMessage(getSampleReply(text), "assistant"), 350);
});

clearButton.addEventListener("click", () => {
  messages.replaceChildren();
  addMessage("Conversation cleared. What would you like to talk about?", "assistant");
  userInput.focus();
});
