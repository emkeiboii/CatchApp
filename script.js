import ContactRow from "../modules/ContactRow.js";
import { removeSVG } from "./svg/remove.js";

// =============================================================================
// DOM ELEMENT REFERENCES
// =============================================================================
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
const pageName = document.getElementById("current-page");
const homeButton = document.getElementById("home");

// =============================================================================
// INITIALIZATION
// =============================================================================
document.querySelectorAll("dialog").forEach((dialog) => dialog.close());

// =============================================================================
// STATE VARIABLES
// =============================================================================
let groupsArray = JSON.parse(localStorage.getItem("groupsArray")) || [];
let contactArray = JSON.parse(localStorage.getItem("contactArray")) || [];
let currPage = 0;

// =============================================================================
// CLASSES
// =============================================================================
class Group {
  constructor({ id, groupName }) {
    this.id = id || Date.now();
    this.groupName = groupName;
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
function getCurrPageContactArray(id) {
  if (currPage === 0) {
    return contactArray;
  } else {
    const currPageContactArray = contactArray.filter(
      (contact) => parseInt(contact.group) === id
    );
    return currPageContactArray;
  }
}

// =============================================================================
// CONTACT MANAGEMENT FUNCTIONS
// =============================================================================
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
      editContact.group = addContactForm.groupSelect.value;
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
      group: addContactForm.groupSelect.value,
      notes: addContactForm.notes.value,
      isFavourite: false,
    };
    contactArray.push(contact);
  }

  localStorage.setItem("contactArray", JSON.stringify(contactArray));
  navigateTo(addContactForm.groupSelect?.value || 0);
  addContactForm.reset();
  modal.close();
}

function populateContactList(contacts) {
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
    addContactForm.groupSelect.value = contact.group;
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

  delete addNotesForm.dataset.editingId;
  localStorage.setItem("contactArray", JSON.stringify(contactArray));
  populateContactList(getCurrPageContactArray(currPage));
  addNotesForm.reset();
  notesModal.close();
}

// =============================================================================
// SORTING FUNCTIONS
// =============================================================================
function sortContactArray(e) {
  let sortOption = e.target.value;
  let sortedArray = getCurrPageContactArray(currPage);

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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
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

    populateContactList(sortedArray);
  }
}

// =============================================================================
// GROUP MANAGEMENT FUNCTIONS
// =============================================================================
function addGroup(e) {
  e.preventDefault();

  const newGroup = new Group({
    id: Date.now(),
    groupName: e.target.makeGroup.value,
  });

  if (!e.target.makeGroup.value.trim()) return;
  if (groupsArray.some((group) => group.groupName === newGroup.groupName))
    return;

  groupsArray.push(newGroup);
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  populateGroupList(groupsArray);

  renderGroupOptions(groupsArray);

  e.target.reset(); // clear input field
}

function populateGroupList(groups) {
  groupsList.innerHTML = "";

  groups.forEach((group) => {
    const groupItem = document.createElement("li");
    const groupBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    groupItem.classList.add("group-item");
    groupBtn.id = group.id;
    groupBtn.textContent = group.groupName;
    removeBtn.classList.add("remove-button");
    removeBtn.innerHTML = removeSVG;

    groupsList.appendChild(groupItem);
    groupItem.appendChild(groupBtn);
    groupItem.appendChild(removeBtn);
  });
}

function deleteGroup(id) {
  const idToDelete = parseInt(id);
  if (
    window.confirm(
      "Are you sure you want to delete this group, and its content?"
    )
  ) {
    groupsArray = groupsArray.filter((group) => group.id !== idToDelete);
    contactArray = contactArray.filter(
      (contact) => parseInt(contact.group) !== idToDelete
    );
    localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
    localStorage.setItem("contactArray", JSON.stringify(contactArray));
    populateContactList(contactArray);
    populateGroupList(groupsArray);

    if (currPage === idToDelete) {
      navigateHome();
    }
  }
}

function renderGroupOptions(array) {
  const groupSelect = document.getElementById("groupSelect");
  groupSelect.innerHTML = "";

  array.forEach((group) => {
    const groupOption = document.createElement("option");
    groupOption.id = group.id;
    groupOption.textContent = group.groupName;
    groupOption.value = group.id;

    groupSelect.append(groupOption);
  });
}

// =============================================================================
// NAVIGATION FUNCTIONS
// =============================================================================
function navigateHome() {
  currPage = 0;
  pageName.textContent = "Home";
  populateContactList(getCurrPageContactArray(currPage));
}

function navigateTo(groupId) {
  currPage = parseInt(groupId);

  const selectedGroup = groupsArray.find((group) => group.id === currPage);

  pageName.textContent = selectedGroup?.groupName || "Home";

  populateContactList(getCurrPageContactArray(currPage));
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================
groupsList.addEventListener(
  "click",
  groupsList.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("remove-button") ||
      e.target.closest(".remove-button")
    ) {
      const groupId = e.target.closest("li").querySelector("button").id;
      deleteGroup(groupId);
      return;
    }

    if (!e.target.id || e.target.id === "groups") return;
    contactSortSelect.value = "default";
    navigateTo(e.target.id);
  })
);

addGroupForm.addEventListener("submit", addGroup);
contactList.addEventListener("click", handleOption);
addContactForm.addEventListener("submit", addContact);
addNotesForm.addEventListener("submit", addNotes);
closeNotesButton.addEventListener("click", () => notesModal.close());
openButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());
contactSortSelect.addEventListener("change", sortContactArray);
homeButton.addEventListener("click", navigateHome);

// =============================================================================
// INITIALIZATION CALLS
// =============================================================================
renderGroupOptions(groupsArray);
navigateHome();
populateGroupList(groupsArray);
populateContactList(contactArray);
