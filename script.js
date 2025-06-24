import ContactRow from "../modules/ContactRow.js";

const modal = document.getElementById("contact-modal");
const openButton = document.getElementById("open-modal");
const closeButton = document.getElementById("close-modal");
const addContactForm = document.getElementById("add-contact-form");
const addNotesForm = document.getElementById("add-notes-form");
const contactList = document.querySelector(".contact-list");
const notesModal = document.getElementById("notes-modal");
const closeNotesButton = document.getElementById("close-notes-modal");
const contactSortSelect = document.getElementById("contact-sort");
const groupsList = document.getElementById("groups");
const addGroupForm = document.getElementById("make-group-form");

document.querySelectorAll("dialog").forEach((dialog) => dialog.close());

let groupsArray = JSON.parse(localStorage.getItem("groupsArray")) || [];

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

function populateGroup(groups) {
  groupsList.innerHTML = "";

  groups.forEach((group) => {
    const groupItem = document.createElement("li");
    const groupBtn = document.createElement("button");
    groupBtn.textContent = group;

    groupItem.appendChild(groupBtn);
    groupsList.appendChild(groupItem);
  });
}

function addGroup(e) {
  e.preventDefault();
  const newGroup = e.target.makeGroup.value.trim();

  if (!newGroup) return;
  if (groupsArray.includes(newGroup)) return;

  groupsArray.push(newGroup);
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  populateGroup(groupsArray);
  e.target.reset(); // clear input field
}

populateGroup(groupsArray);
populateList(contactArray);
addGroupForm.addEventListener("submit", addGroup);
contactList.addEventListener("click", handleOption);
addContactForm.addEventListener("submit", addContact);
notesModal.addEventListener("submit", addNotes);
closeNotesButton.addEventListener("click", () => notesModal.close());
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
contactSortSelect.addEventListener("change", sortContactArray);
