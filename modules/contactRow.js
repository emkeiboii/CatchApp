import { checkSVG } from "../svg/check.js";
import { oLEditSVG } from "../svg/edit.js";
import { oLHeartSVG } from "../svg/fav.js";
import { oLStickyNoteSVG } from "../svg/notes.js";
import { removeSVG } from "../svg/remove.js";
import calculateBirthday from "../utility/calculateBirthday.js";
import calculateTimePassed from "../utility/calculateTimePassed.js";

export default function ContactRow({
  id,
  backgroundColor,
  firstName,
  lastName,
  isFavourite,
  birthdate,
  lastContact,
}) {
  const birthdayCD = calculateBirthday(birthdate);
  const contactedCD = calculateTimePassed(lastContact);

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

  // const span2 = document.createElement("span");
  // span2.textContent = `Birthdate : ${birthdate ? birthdate : "Missing"}`;

  contact.appendChild(contactInfoContainer);
  contactInfoContainer.appendChild(contactInfo);
  contactInfoContainer.appendChild(personalInfo);

  contactInfo.appendChild(contactBackground);
  contactBackground.appendChild(firstLetterContact);

  personalInfo.appendChild(span1);
  // personalInfo.appendChild(span2);
  if (birthdate) {
    const span3 = document.createElement("span");
    span3.textContent = birthdayCD.isBirthdayToday
      ? "Wish them happy birthday!"
      : birthdayCD.months === 0
      ? `${birthdayCD.days} days until ${firstName}'s birthday!`
      : `${birthdayCD.months} months until ${firstName}'s birthday!`;
    if (birthdayCD.months > 1) {
      span3.classList.add("far");
    } else if (birthdayCD.months <= 0 && birthdayCD.days <= 7) {
      span3.classList.add("close");
    } else {
      span3.classList.add("medium");
    }
    personalInfo.appendChild(span3);
  }

  // const contactOptions = document.createElement("div");
  // contactOptions.classList.add("contact-options");

  const lastContactRow = document.createElement("div");
  lastContactRow.classList.add("last-contact");

  const lastContactSpan = document.createElement("span");
  lastContactSpan.textContent = `${lastContact}`;

  const btnUpdateToday = document.createElement("button");
  btnUpdateToday.classList.add("update-today");
  btnUpdateToday.innerHTML = checkSVG;

  if (contactedCD.months === 0 && contactedCD.days <= 7) {
    btnUpdateToday.classList.add("close");
  } else if (contactedCD.months <= 0 && contactedCD.days >= 7) {
    btnUpdateToday.classList.add("warning");
  } else if (contactedCD.months >= 1) {
    btnUpdateToday.classList.add("danger");
  }

  console.log(
    `its been ${contactedCD.years} years, ${contactedCD.months} months and ${contactedCD.days} days since the last time`
  );
  contact.appendChild(lastContactRow);
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

  contact.appendChild(contactEdit);
  contactEdit.appendChild(btnNotes);
  contactEdit.appendChild(contactOperations);
  contactOperations.appendChild(btnFavourite);
  contactOperations.appendChild(btnEdit);
  contactOperations.appendChild(btnRemove);

  return contact;
}
