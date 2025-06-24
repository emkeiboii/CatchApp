import { checkSVG } from "../svg/check.js";
import { oLEditSVG } from "../svg/edit.js";
import { oLHeartSVG } from "../svg/fav.js";
import { oLStickyNoteSVG } from "../svg/notes.js";
import { removeSVG } from "../svg/remove.js";

export default function ContactRow({
  id,
  backgroundColor,
  firstName,
  lastName,
  isFavourite,
  birthdate,
  lastContact,
}) {
  const contact = document.createElement("div");
  contact.classList.add("contact");
  contact.id = id;

  const contactInfo = document.createElement("div");
  contactInfo.classList.add("contact-info");

  const contactInfoContainer = document.createElement("div");
  contactInfoContainer.classList.add("contact-info-container");

  const contactBackground = document.createElement("div");
  contactBackground.classList.add("bg-color");
  contactBackground.style.backgroundColor = backgroundColor;

  const firstLetterContact = document.createElement("span");
  firstLetterContact.textContent = firstName.charAt(0);

  const personalInfo = document.createElement("div");
  personalInfo.classList.add("personal-info");

  const span1 = document.createElement("span");
  span1.textContent = `${firstName} ${lastName}`;

  const span2 = document.createElement("span");
  span2.textContent = `Birthdate : ${birthdate}`;

  contact.appendChild(contactInfoContainer);
  contactInfoContainer.appendChild(contactInfo);
  contactInfoContainer.appendChild(personalInfo);

  contactInfo.appendChild(contactBackground);
  contactBackground.appendChild(firstLetterContact);

  personalInfo.appendChild(span1);
  personalInfo.appendChild(span2);

  const contactOptions = document.createElement("div");
  contactOptions.classList.add("contact-options");

  const lastContactRow = document.createElement("div");
  lastContactRow.classList.add("last-contact");

  const lastContactSpan = document.createElement("span");
  lastContactSpan.textContent = `Last Contacted: ${lastContact}`;

  const btnUpdateToday = document.createElement("button");
  btnUpdateToday.classList.add("update-today");
  btnUpdateToday.innerHTML = checkSVG;

  contact.appendChild(contactOptions);
  contactOptions.appendChild(lastContactRow);
  lastContactRow.appendChild(lastContactSpan);
  lastContactRow.appendChild(btnUpdateToday);

  const contactEdit = document.createElement("div");
  contactEdit.classList.add("contact-edit");

  const btnNotes = document.createElement("button");
  btnNotes.classList.add("notes-contact");
  btnNotes.innerHTML = oLStickyNoteSVG;

  const contactOperations = document.createElement("div");
  contactOperations.classList.add("contact-operations");

  const btnFavourite = document.createElement("button");
  btnFavourite.classList.add("favourite");
  if (isFavourite) btnFavourite.classList.add("is-favourite");
  btnFavourite.innerHTML = oLHeartSVG;

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("edit-contact");
  btnEdit.innerHTML = oLEditSVG;

  const btnRemove = document.createElement("button");
  btnRemove.classList.add("delete-contact");
  btnRemove.innerHTML = removeSVG;

  contactOptions.appendChild(contactEdit);
  contactEdit.appendChild(btnNotes);
  contactEdit.appendChild(contactOperations);
  contactOperations.appendChild(btnFavourite);
  contactOperations.appendChild(btnEdit);
  contactOperations.appendChild(btnRemove);

  return contact;
}
