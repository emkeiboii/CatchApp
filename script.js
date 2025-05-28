const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const contactList = document.querySelector(".contact-list");

let contactArray = [];
let contact = {};

function addContact(e) {
  e.preventDefault();

  const contact = {
    id: Date.now(),
    backgroundColor: addContactForm.backgroundColor.value || "#ffffff",
    firstName: addContactForm.firstName.value,
    lastName: addContactForm.lastName.value,
    birthday: addContactForm.birthday.value,
    lastContact: addContactForm.lastContact.value,
  };

  contactArray.push(contact);
  populateList(contactArray);
  addContactForm.reset();
  modal.close();
}

function populateList(contacts) {
  contactList.innerHTML = contacts
    .map(
      (contact) => `
<div class="contact" id="${contact.id}">
  <div class="contact-info">
    <div class="bg-color" style="background-color: ${contact.backgroundColor}">
      <span>${contact.firstName.charAt(0)}</span>
    </div>
    <div>
      <span>${contact.firstName} ${contact.lastName}</span>
      <span>Birthday: ${contact.birthday}</span>
    </div>
  </div>
  <div class="contact-options">
    <div class="last-contact">
      <label>Last Contacted:</label>
      <input type="date" value="${contact.lastContact}" />
      <button>✅</button>
    </div>
    <div class="contact-edit">
      <button>note</button>
      <div>
        <button class="favourite">fav</button>
        <button class="edit-profile">edit</button>
        <button class="delete-profile">remove</button>
      </div>
    </div>
  </div>
</div>`
    )
    .join("");
}

addContactForm.addEventListener("submit", addContact);
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
