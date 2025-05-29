const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const addNotesForm = document.getElementById("add-notes-form");
const contactList = document.querySelector(".contact-list");
const notesModal = document.getElementById("notes-modal");
const closeNotesButton = document.getElementById("close-notes-modal");
function getAllContacts() {
  return document.querySelectorAll(".contact");
}

const currentContacts = getAllContacts();

let contactArray = [
  {
    id: Date.now() + 1,
    backgroundColor: "#FF6B6B",
    firstName: "Alice",
    lastName: "Johnson",
    birthday: "1995-06-12",
    lastContact: "2024-12-01",
    notes: "OSKABOLD ",
    isFavourite: false,
  },
  {
    id: Date.now() + 2,
    backgroundColor: "#6BCB77",
    firstName: "Ben",
    lastName: "Nguyen",
    birthday: "1990-03-28",
    lastContact: "2025-02-20",
    notes: "",
    isFavourite: false,
  },
  {
    id: Date.now() + 3,
    backgroundColor: "#4D96FF",
    firstName: "Carla",
    lastName: "Smith",
    birthday: "1987-11-05",
    lastContact: "2025-04-10",
    notes: "",
    isFavourite: false,
  },
  {
    id: Date.now() + 4,
    backgroundColor: "#FFD93D",
    firstName: "David",
    lastName: "Lee",
    birthday: "2001-08-22",
    lastContact: "2025-01-15",
    notes: "",
    isFavourite: false,
  },
  {
    id: Date.now() + 5,
    backgroundColor: "#9D4EDD",
    firstName: "Ella",
    lastName: "Martinez",
    birthday: "1998-02-17",
    lastContact: "2025-03-01",
    notes: "",
    isFavourite: false,
  },
];

function addContact(e) {
  e.preventDefault();

  const editingId = addContactForm.dataset.editingId;

  if (editingId) {
    const editContact = contactArray.find(
      (contact) => contact.id === parseInt(editingId)
    );
    if (editContact) {
      editContact.backgroundColor =
        addContactForm.backgroundColor.value || "#ffffff";
      editContact.firstName = addContactForm.firstName.value;
      editContact.lastName = addContactForm.lastName.value;
      editContact.birthday = addContactForm.birthday.value;
      editContact.lastContact = addContactForm.lastContact.value;
      editContact.notes = addContactForm.notes.value;
    }

    delete addContactForm.dataset.editingId;
  } else {
    const contact = {
      id: Date.now(),
      backgroundColor: addContactForm.backgroundColor.value || "#ffffff",
      firstName: addContactForm.firstName.value,
      lastName: addContactForm.lastName.value,
      birthday: addContactForm.birthday.value,
      lastContact: addContactForm.lastContact.value,
      notes: addContactForm.notes.value,
      isFavourite: false,
    };
    contactArray.push(contact);
  }

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
                       <span>Last Contacted: ${contact.lastContact}</span>
                        
                          <button class="update-today">✅</button>
                        </div>
                           <div class="contact-edit">
                          <button class="notes-contact">note</button>
                          <div>
                            <button class="favourite">fav</button>
                            <button class="edit-contact">edit</button>
                            <button class="delete-contact">remove</button>
                          </div>
                        </div>
                      </div>
                    </div>`
    )
    .join("");
}

function handleClick(e) {
  const contactElement = e.target.closest(".contact");
  const contactId = parseInt(contactElement.id, 10);
  const contact = contactArray.find((contact) => contact.id === contactId);

  if (e.target.classList.contains("favourite")) {
    contact.isFavourite = !contact.isFavourite;
    e.target.textContent = contact.isFavourite ? "❤️" : "fav";
  } else if (e.target.classList.contains("edit-contact")) {
    modal.showModal();

    addContactForm.backgroundColor.value = contact.backgroundColor;
    addContactForm.firstName.value = contact.firstName;
    addContactForm.lastName.value = contact.lastName;
    addContactForm.birthday.value = contact.birthday;
    addContactForm.lastContact.value = contact.lastContact;
    addContactForm.notes.value = contact.notes;

    addContactForm.dataset.editingId = contact.id;
  } else if (e.target.classList.contains("delete-contact")) {
    if (window.confirm("Do you really want to delete this contact?")) {
      contactArray = contactArray.filter((contact) => contact.id !== contactId);
      contactElement.remove();
    } else return;
  } else if (e.target.classList.contains("update-today")) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    if (window.confirm("Are you sure?")) {
      const dateSpan = contactElement.querySelector(".last-contact span");
      contact.lastContact = formattedDate;
      if (dateSpan) {
        dateSpan.textContent = `Last Contacted: ${formattedDate}`;
      }
    }
  } else if (e.target.classList.contains("notes-contact")) {
    notesModal.showModal();

    addNotesForm.notesX.value = contact.notes;
    addNotesForm.dataset.editingId = contact.id;
  }
}

function addNotes(e) {
  e.preventDefault();
  const editingId = addNotesForm.dataset.editingId;
  const editContact = contactArray.find(
    (contact) => contact.id === parseInt(editingId)
  );
  if (editContact) {
    editContact.notes = addNotesForm.notesX.value;
  }

  delete addContactForm.dataset.editingId;
  populateList(contactArray);
  addNotesForm.reset();
  notesModal.close();
}

populateList(contactArray);
contactList.addEventListener("click", handleClick);
addContactForm.addEventListener("submit", addContact);
notesModal.addEventListener("submit", addNotes);
closeNotesButton.addEventListener("click", () => notesModal.close());
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
