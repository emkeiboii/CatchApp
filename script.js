const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const contactList = document.querySelector(".contact-list");

let contactArray = [
  {
    id: Date.now() + 1,
    backgroundColor: "#FF6B6B",
    firstName: "Alice",
    lastName: "Johnson",
    birthday: "1995-06-12",
    lastContact: "2024-12-01",
    isFavourite: false,
  },
  {
    id: Date.now() + 2,
    backgroundColor: "#6BCB77",
    firstName: "Ben",
    lastName: "Nguyen",
    birthday: "1990-03-28",
    lastContact: "2025-02-20",
    isFavourite: false,
  },
  {
    id: Date.now() + 3,
    backgroundColor: "#4D96FF",
    firstName: "Carla",
    lastName: "Smith",
    birthday: "1987-11-05",
    lastContact: "2025-04-10",
    isFavourite: false,
  },
  {
    id: Date.now() + 4,
    backgroundColor: "#FFD93D",
    firstName: "David",
    lastName: "Lee",
    birthday: "2001-08-22",
    lastContact: "2025-01-15",
    isFavourite: false,
  },
  {
    id: Date.now() + 5,
    backgroundColor: "#9D4EDD",
    firstName: "Ella",
    lastName: "Martinez",
    birthday: "1998-02-17",
    lastContact: "2025-03-01",
    isFavourite: false,
  },
];

function addContact(e) {
  e.preventDefault();

  const contact = {
    id: Date.now(),
    backgroundColor: addContactForm.backgroundColor.value || "#ffffff",
    firstName: addContactForm.firstName.value,
    lastName: addContactForm.lastName.value,
    birthday: addContactForm.birthday.value,
    lastContact: addContactForm.lastContact.value,
    isFavourite: false,
  };

  contactArray.push(contact);
  populateList(contactArray);
  addContactForm.reset();
  modal.close();
}

function populateList(contacts) {
  contactList.innerHTML = contacts
    .map(
      (contact) => `<div class="contact" id="${contact.id}">
                      <div class="contact-info">
                        <div class="bg-color" style="background-color: ${
                          contact.backgroundColor
                        }">
                          <span>${contact.firstName.charAt(0)}</span>
                        </div>
                        <div>
                          <span>${contact.firstName} ${contact.lastName}</span>
                          <span>Birthday: ${contact.birthday}</span>
                        </div>
                      </div>
                      <div class="contact-options">
                        <div class="last-contact">
                          <label>Last Contacted: <input type="date" name="lastContact" value="${
                            contact.lastContact
                          }" /></label>
                        
                          <button class="update-today">✅</button>
                        </div>
                        <div class="contact-edit">
                          <button type="button" class="favourite">fav</button> 
                          <button type="button" class="edit-contat">edit</button>
                          <button type="button" class="delete-contact">remove</button>
                        </div>
                      </div>
                    </div>`
    )
    .join("");
}

populateList(contactArray);
let contacts = document.querySelectorAll(".contact");

function handleClick(e) {
  const contactElement = e.target.closest(".contact");
  const contactId = parseInt(contactElement.id, 10);
  const contact = contactArray.find((contact) => contact.id === contactId);

  console.log({ contactElement, contactId, contact });

  if (e.target.classList.contains("favourite")) {
    contact.isFavourite = !contact.isFavourite;
    e.target.textContent = contact.isFavourite ? "❤️" : "fav";
    console.log(contactId);
  } else if (e.target.classList.contains("edit-contat")) {
    console.log("edit-contat");
  } else if (e.target.classList.contains("delete-contact")) {
    if (window.confirm("Do you really want to delete this contact?")) {
      contactArray = contactArray.filter((contact) => contact.id !== contactId);
      contactElement.remove();
    } else return;
  } else if (e.target.classList.contains("update-today")) {
    console.log("update-today");
  }
}

contacts.forEach((contact) => contact.addEventListener("click", handleClick));

addContactForm.addEventListener("submit", addContact);
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
