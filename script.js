const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const addNotesForm = document.getElementById("add-notes-form");
const contactList = document.querySelector(".contact-list");
const notesModal = document.getElementById("notes-modal");
const closeNotesButton = document.getElementById("close-notes-modal");

const oLStickyNoteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l224 0 0-80c0-17.7 14.3-32 32-32l80 0 0-224c0-8.8-7.2-16-16-16L64 80zM288 480L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 224 0 5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7l-5.5 0z"/></svg>`;
const oLHeartSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;
const oLEditSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>`;
const removeSVG = `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"/></svg>`;
const checkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;

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
                        <div class="personal-info">
                          <span>${contact.firstName} ${contact.lastName}</span>
                          <span>Birthdate: ${contact.birthdate}</span>
                        </div>
                      </div>
                      <div class="contact-options">
                        <div class="last-contact">
                       <span>Last Contacted: ${contact.lastContact}</span>
                        
                          <button class="update-today">${checkSVG}</button>
                        </div>
                           <div class="contact-edit">
                          <button class="notes-contact">${oLStickyNoteSVG}</button>
                          <div class="contact-operations">
                            <button class="favourite ${
                              contact.isFavourite ? "is-favourite" : ""
                            }">${oLHeartSVG}</button>
                            <button class="edit-contact">${oLEditSVG}</button>
                            <button class="delete-contact">${removeSVG}</button>
                          </div>
                        </div>
                      </div>
                    </div>`
    )
    .join("");
}

function handleClick(e) {
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

    if (window.confirm("Are you sure?")) {
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

populateList(contactArray);
contactList.addEventListener("click", handleClick);
addContactForm.addEventListener("submit", addContact);
notesModal.addEventListener("submit", addNotes);
closeNotesButton.addEventListener("click", () => notesModal.close());
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
