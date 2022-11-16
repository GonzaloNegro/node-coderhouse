const productForm = document.getElementById("productForm");
const inputName = document.getElementById("title");
const inputValue = document.getElementById("value");
const inputThumbnail = document.getElementById("thumbnail");
const tbodyProducts = document.getElementById("tableContent");

const chatForm = document.getElementById("chatForm");
const inputEmail = document.getElementById("email");
const messaggesDiv = document.getElementById("chat");
const inputMessage = document.getElementById("message");

const socket = io();

window.addEventListener("load", function (e) {
  socket.emit("newConnection");
});

socket.on("welcome", (data) => {
  alert(data);
});

//Add new prodcut
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newProduct = {
    title: inputName.value,
    value: inputValue.value,
    thumbnail: inputThumbnail.value,
  };

  //Emit product to the server
  socket.emit("addProduct", newProduct);

  inputName.value = "";
  inputValue.value = "";
  inputThumbnail.value = "";
});

socket.on("lastProduct", (lastProduct) => {
  AddNewProduct(lastProduct);
});

function AddNewProduct(lastProduct) {
  const trProduct = document.createElement("tr");
  const tdTitle = document.createElement("td");
  const tdValue = document.createElement("td");
  const tdThumbnail = document.createElement("td");
  const productImg = document.createElement("img");

  trProduct.appendChild(tdTitle);
  trProduct.appendChild(tdValue);
  trProduct.appendChild(tdThumbnail);
  tdThumbnail.appendChild(productImg);

  tdTitle.innerText = lastProduct.title;
  tdValue.innerText = lastProduct.value;

  productImg.setAttribute("src", lastProduct.thumbnail);
  productImg.setAttribute("alt", "Imágen");
  productImg.classList.add("imagenAdaptada");

  tbodyProducts.appendChild(trProduct);
}

//Send Message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let message = {
    email: inputEmail.value,
    message: inputMessage.value,
  };

  //Emit message to the server
  socket.emit("sendMesssage", message);

  inputEmail.value = "";
  inputMessage.value = "";
});

socket.on("lastMessage", (lastMessage) => {
  AddNewMessage(lastMessage);
});

function AddNewMessage(lastMessage) {
  const pEmail = document.createElement("p");
  const pTime = document.createElement("p");
  const pMessage = document.createElement("p");
  const finalMessage = document.createElement("p");

  pEmail.classList.add("emailAzulNegrita");
  pTime.classList.add("horaRojo");
  pMessage.classList.add("mensajeVerdeCursiva");

  pEmail.innerText = lastMessage.email;
  pTime.innerText = `[${lastMessage.time}]:`;
  pMessage.innerText = `${lastMessage.message}`;

  finalMessage.appendChild(pEmail);
  finalMessage.appendChild(pTime);
  finalMessage.appendChild(pMessage);

  finalMessage.classList.add("mensajeFinal");

  messaggesDiv.appendChild(finalMessage);
}