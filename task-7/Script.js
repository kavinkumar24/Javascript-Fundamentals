const chatBox = document.getElementById("chat-box");
const inputField = document.getElementById("message-input");
const greeting_message = document.getElementsByClassName("greeting")[0];
var loadingDots = document.getElementById("loading-dots");

const technologyResponses = {
  GitHub:
    "GitHub is a platform for version control and collaboration, allowing multiple people to work on projects at once. It uses Git, a distributed version control system, to track changes in code and enable collaboration. GitHub is widely used for hosting and sharing code repositories.",
  HTML: "HTML (Hypertext Markup Language) is the standard language used to create and design web pages. It provides the structure and content of a web page, using a variety of tags such as <div>, <header>, <footer>, and <p> to define elements like text, images, and links.",
  CSS: "CSS (Cascading Style Sheets) is used for styling HTML documents. It allows you to control the layout, colors, fonts, and overall appearance of web pages. By separating content (HTML) from design (CSS), developers can create responsive, visually appealing websites.",
  JavaScript:
    "JavaScript is a programming language that enables dynamic behavior on web pages. It is used to interact with HTML and CSS, handle events, manipulate DOM elements, and fetch data asynchronously. JavaScript is essential for creating interactive web applications.",
  "React JS":
    "React is a JavaScript library for building user interfaces, especially for single-page applications. Developed by Facebook, it allows developers to create reusable UI components and manage state efficiently, making it easier to build fast and dynamic web applications.",
  "Angular JS":
    "Angular is a TypeScript-based framework for building dynamic web applications. Developed by Google, it provides a robust structure for building scalable, modular applications. Angular uses two-way data binding and dependency injection to make it easier to develop complex web apps.",
  Django:
    "Django is a high-level Python web framework that allows developers to build secure, scalable, and maintainable web applications quickly. It follows the 'batteries-included' philosophy and includes many built-in features like an admin panel, authentication, and database handling.",
  Flask:
    "Flask is a lightweight web framework for Python. Unlike Django, Flask is more minimalistic and allows developers to choose their components as needed. It's ideal for small to medium-sized projects and gives developers full control over their app’s structure.",
  Laravel:
    "Laravel is a PHP web framework designed for building modern web applications. It provides elegant syntax, built-in features like authentication, routing, and ORM (Eloquent), and is known for its developer-friendly tools and comprehensive documentation.",
  Streamlit:
    "Streamlit is an open-source Python library for building interactive data apps. It's especially popular in data science and machine learning communities due to its ease of use, allowing developers to create visually rich applications with minimal code.",
  CodeIgniter:
    "CodeIgniter is a lightweight PHP framework for building dynamic websites and web applications. It’s designed for developers who need a simple and elegant toolkit to create full-featured web apps without the complexity of larger frameworks.",
  Figma:
    "Figma is a web-based UI/UX design tool used for designing and prototyping user interfaces. It supports real-time collaboration, allowing multiple team members to work on a design simultaneously, making it a popular choice among designers and developers.",
  AWS: "AWS (Amazon Web Services) is a comprehensive cloud computing platform offered by Amazon, providing on-demand computing resources, storage, databases, machine learning, and more. It helps businesses scale their infrastructure and services globally without managing physical servers.",
  SQL: "SQL (Structured Query Language) is a standardized programming language used to manage and query relational databases. It allows you to perform tasks like inserting, updating, deleting, and retrieving data from databases, as well as creating tables and managing relationships.",
};

const botGreeting = [
  "Hello! How can I assist you today?",
  "Hi there! What would you like to know?",
  "Greetings! How can I help you?",
  "Hey! What question do you have for me?",
  "Hello! I'm here to help. What do you need?",
  "Hi! How can I assist you today?",
  "Hey whats up! How can I help you?",
];

function createTimestamp() {
  const timestamps = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeElement = document.createElement("span");
  timeElement.classList.add("timestamp");
  timeElement.textContent = timestamps;
  return timeElement;
}

function sendDelayedResponse(responseMessage) {
  loadingDots.style.display = "block";

  setTimeout(() => {
    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("message", "received");
    botMessageElement.textContent = responseMessage;
    const timeElement = createTimestamp();
    botMessageElement.appendChild(timeElement);

    chatBox.appendChild(botMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    loadingDots.style.display = "none";
  }, 1500);
}

function sendMessage() {
  greeting_message.style.display = "none";
  let message = inputField.value.trim();
  if (message === "") return;
  message = message.toLowerCase();
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey") ||
    message.includes("greetings")
  ) {
    loadingDots.style.display = "block";
    const botGreetingIndex = Math.floor(Math.random() * botGreeting.length);
    const botGreetingMessage = botGreeting[botGreetingIndex];
    sendDelayedResponse(botGreetingMessage);
  } else {
    let foundMatch = false;
    for (let tech in technologyResponses) {
      if (message.toLowerCase().includes(tech.toLowerCase())) {
        sendDelayedResponse(technologyResponses[tech]);
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      sendDelayedResponse("Sorry, please ask a relevant question.");
    }
  }

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "sent");
  messageElement.textContent = message;
  const timeElement = createTimestamp();
  messageElement.appendChild(timeElement);
  chatBox.appendChild(messageElement);

  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
