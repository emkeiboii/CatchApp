import { checkSVG } from "./svg/check.js";
import { oLStickyNoteSVG } from "./svg/notes.js";
import { oLHeartSVG } from "./svg/fav.js";
import { oLEditSVG } from "./svg/edit.js";
import { removeSVG } from "./svg/remove.js";
import ContactRow from "./components/ContactRow.js";

const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const addNotesForm = document.getElementById("add-notes-form");
const contactList = document.querySelector(".contact-list");
const notesModal = document.getElementById("notes-modal");
const closeNotesButton = document.getElementById("close-notes-modal");
const contactSortSelect = document.getElementById("contact-sort");

// function getAllContacts() {
//   return document.querySelectorAll(".contact");
// }

// const currentContacts = getAllContacts();

let contactArray = JSON.parse(localStorage.getItem("contactArray")) || [];

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
      editContact.birthdate = addContactForm.birthdate.value;
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
      birthdate: addContactForm.birthdate.value,
      lastContact: addContactForm.lastContact.value,
      notes: addContactForm.notes.value,
      isFavourite: false,
    };
    contactArray.push(contact);
  }

  localStorage.setItem("contactArray", JSON.stringify(contactArray));
  populateList(contactArray);
  addContactForm.reset();
  modal.close();
}

// function populateList(contacts) {
//   contactList.innerHTML = contacts
//     .map(
//       (contact) => `<div class="contact" id="${contact.id}">
//                       <div class="contact-info">
//                         <div class="bg-color" style="background-color: ${
//                           contact.backgroundColor
//                         }">
//                           <span>${contact.firstName.charAt(0)}</span>
//                         </div>
//                         <div class="personal-info">
//                           <span>${contact.firstName} ${contact.lastName}</span>
//                           <span>Birthdate: ${contact.birthdate}</span>
//                         </div>
//                       </div>
//                       <div class="contact-options">
//                         <div class="last-contact">
//                        <span>Last Contacted: ${contact.lastContact}</span>

//                           <button class="update-today" title="Catch up today">${checkSVG}</button>
//                         </div>
//                            <div class="contact-edit">
//                           <button class="notes-contact">${oLStickyNoteSVG}</button>
//                           <div class="contact-operations">
//                             <button class="favourite ${
//                               contact.isFavourite ? "is-favourite" : ""
//                             }">${oLHeartSVG}</button>
//                             <button class="edit-contact">${oLEditSVG}</button>
//                             <button class="delete-contact">${removeSVG}</button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>`
//     )
//     .join("");
// }

function populateList(contacts) {
  contactList.innerHTML = "";
  contacts.map((contact) => contactList.appendChild(ContactRow(contact)));
}

function handleOption(e) {
  const contactElement = e.target.closest(".contact");

  if (!contactElement) return;

  const contactId = parseInt(contactElement.id, 10);
  const contact = contactArray.find((contact) => contact.id === contactId);
  const favouriteBtn = e.target.closest(".favourite");
  const editBtn = e.target.closest(".edit-contact");
  const deleteBtn = e.target.closest(".delete-contact");
  const updateTodayBtn = e.target.closest(".update-today");
  const notesBtn = e.target.closest(".notes-contact");

  if (favouriteBtn) {
    contact.isFavourite = !contact.isFavourite;
    if (contact.isFavourite) {
      favouriteBtn.classList.add("is-favourite");
    } else {
      favouriteBtn.classList.remove("is-favourite");
    }

    localStorage.setItem("contactArray", JSON.stringify(contactArray));
  } else if (editBtn) {
    modal.showModal();

    addContactForm.backgroundColor.value = contact.backgroundColor;
    addContactForm.firstName.value = contact.firstName;
    addContactForm.lastName.value = contact.lastName;
    addContactForm.birthdate.value = contact.birthdate;
    addContactForm.lastContact.value = contact.lastContact;
    addContactForm.notes.value = contact.notes;

    addContactForm.dataset.editingId = contact.id;
    localStorage.setItem("contactArray", JSON.stringify(contactArray));
  } else if (deleteBtn) {
    if (window.confirm("Do you really want to delete this contact?")) {
      contactArray = contactArray.filter((contact) => contact.id !== contactId);
      contactElement.remove();
    } else return;
    localStorage.setItem("contactArray", JSON.stringify(contactArray));
  } else if (updateTodayBtn) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    if (window.confirm("Contacted today?")) {
      const dateSpan = contactElement.querySelector(".last-contact span");
      contact.lastContact = formattedDate;
      if (dateSpan) {
        dateSpan.textContent = `Last Contacted: ${formattedDate}`;
      }
      localStorage.setItem("contactArray", JSON.stringify(contactArray));
    }
  } else if (notesBtn) {
    notesModal.showModal();

    addNotesForm.notesX.value = contact.notes;
    addNotesForm.dataset.editingId = contact.id;
    localStorage.setItem("contactArray", JSON.stringify(contactArray));
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
  localStorage.setItem("contactArray", JSON.stringify(contactArray));
  populateList(contactArray);
  addNotesForm.reset();
  notesModal.close();
}

function sortContactArray(e) {
  let sortOption = e.target.value;
  let sortedArray = contactArray;

  if (sortOption === "favourite") {
    sortedArray.sort((a, b) => {
      if (a.isFavourite && !b.isFavourite) {
        return -1;
      } else if (!a.isFavourite && b.isFavourite) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "name-asc") {
    sortedArray.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      } else if (a.firstName > b.firstName) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "name-desc") {
    sortedArray.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return -1;
      } else if (a.firstName < b.firstName) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "lastContact-asc") {
    sortedArray.sort((a, b) => {
      if (a.lastContact > b.lastContact) {
        return -1;
      } else if (a.lastContact < b.lastContact) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "lastContact-desc") {
    sortedArray.sort((a, b) => {
      if (a.lastContact < b.lastContact) {
        return -1;
      } else if (a.lastContact > b.lastContact) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "birthdate-asc") {
    sortedArray.sort((a, b) => {
      if (a.birthdate < b.birthdate) {
        return -1;
      } else if (a.birthdate > b.birthdate) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else if (sortOption === "birthdate-desc") {
    sortedArray.sort((a, b) => {
      if (a.birthdate > b.birthdate) {
        return -1;
      } else if (a.birthdate < b.birthdate) {
        return 1;
      } else {
        return 0;
      }
    });

    populateList(sortedArray);
  } else contactArray = sortedArray;
}

populateList(contactArray);
contactList.addEventListener("click", handleOption);
addContactForm.addEventListener("submit", addContact);
notesModal.addEventListener("submit", addNotes);
closeNotesButton.addEventListener("click", () => notesModal.close());
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
contactSortSelect.addEventListener("change", sortContactArray);
