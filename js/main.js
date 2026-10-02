const goal = 100000;
const pledges = {
  bamboo: { minimum: 25, remaining: 101 },
  black: { minimum: 75, remaining: 64 },
  mahogany: { minimum: 200, remaining: 0 },
  none: { minimum: 1 }
};

let totalRaised = 89914;
let totalBackers = 5007;
let lastFocusedElement;

const pledgeModal = document.querySelector("#pledge-modal");
const thankYouModal = document.querySelector("#thank-you");
const pledgeForm = document.querySelector("#pledge-form");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function setModal(modal, isOpen) {
  modal.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
}

function selectReward(reward) {
  const option = reward ? document.querySelector(`[data-option="${reward}"]`) : null;
  if (reward && (!option || option.classList.contains("is-unavailable"))) return;

  document.querySelectorAll(".pledge-option").forEach((item) => {
    const isSelected = item === option;
    item.classList.toggle("is-selected", isSelected);

    const radio = item.querySelector('input[type="radio"]');
    if (radio) radio.checked = isSelected;

    const amount = item.querySelector('input[type="number"]');
    if (amount) amount.disabled = !isSelected;
  });
}

function openPledgeModal(reward) {
  lastFocusedElement = document.activeElement;
  setModal(pledgeModal, true);
  selectReward(reward);
  const selectedInput = document.querySelector(".pledge-option.is-selected input[type='number']");
  if (selectedInput) selectedInput.focus();
  else pledgeModal.querySelector(".modal-close").focus();
}

function closePledgeModal() {
  setModal(pledgeModal, false);
  if (lastFocusedElement) lastFocusedElement.focus();
}

function updateTotals(amount, reward) {
  totalRaised += amount;
  totalBackers += 1;

  document.querySelector("#total-raised").textContent = `$${totalRaised.toLocaleString("en-US")}`;
  document.querySelector("#total-backers").textContent = totalBackers.toLocaleString("en-US");

  const progress = document.querySelector(".progress");
  progress.setAttribute("aria-valuenow", String(Math.min(totalRaised, goal)));
  progress.querySelector(".progress-fill").style.width = `${Math.min((totalRaised / goal) * 100, 100)}%`;

  if (reward !== "none") {
    pledges[reward].remaining -= 1;
    document.querySelectorAll(`[data-reward="${reward}"] .pledge-nos, [data-option="${reward}"] .option-stock strong`)
      .forEach((count) => {
        count.textContent = pledges[reward].remaining;
      });

    if (pledges[reward].remaining === 0) {
      document.querySelector(`[data-reward="${reward}"]`).classList.add("is-unavailable");
      const rewardButton = document.querySelector(`[data-select-reward="${reward}"]`);
      rewardButton.disabled = true;
      rewardButton.textContent = "Out of stock";
      document.querySelector(`[data-option="${reward}"]`).classList.add("is-unavailable");
      document.querySelector(`[data-option="${reward}"] input[type="radio"]`).disabled = true;
    }
  }
}

document.querySelector(".btn-back").addEventListener("click", () => openPledgeModal());

document.querySelector(".btn-bookmark").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const isBookmarked = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(isBookmarked));
  button.querySelector(".bookmark-label").textContent = isBookmarked ? "Bookmarked" : "Bookmark";
});

document.querySelectorAll("[data-select-reward]").forEach((button) => {
  button.addEventListener("click", () => openPledgeModal(button.dataset.selectReward));
});

document.querySelectorAll(".option-choice input").forEach((radio) => {
  radio.addEventListener("change", () => selectReward(radio.value));
});

pledgeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedOption = document.querySelector(".pledge-option.is-selected");
  if (!selectedOption) return;

  const reward = selectedOption.dataset.option;
  const amountInput = selectedOption.querySelector('input[type="number"]');
  const amount = Number(amountInput.value);
  const minimum = pledges[reward].minimum;

  amountInput.setCustomValidity(amount < minimum ? `Enter at least $${minimum}.` : "");
  if (!pledgeForm.reportValidity()) return;

  updateTotals(amount, reward);
  setModal(pledgeModal, false);
  setModal(thankYouModal, true);
  thankYouModal.querySelector(".btn-thank-you").focus();
});

document.querySelector(".modal-close").addEventListener("click", closePledgeModal);
document.querySelector(".btn-thank-you").addEventListener("click", () => {
  setModal(thankYouModal, false);
  if (lastFocusedElement) lastFocusedElement.focus();
});

pledgeModal.addEventListener("click", (event) => {
  if (event.target === pledgeModal) closePledgeModal();
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.querySelector("img").src = isOpen ? "images/icon-close-menu.svg" : "images/icon-hamburger.svg";
});

nav.querySelectorAll(".nav-btn").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.querySelector("img").src = "images/icon-hamburger.svg";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!pledgeModal.hidden) closePledgeModal();
    else if (!thankYouModal.hidden) {
      setModal(thankYouModal, false);
      if (lastFocusedElement) lastFocusedElement.focus();
    }
    nav.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.querySelector("img").src = "images/icon-hamburger.svg";
  }
});

document.querySelector(".progress-fill").style.width = `${Math.min((totalRaised / goal) * 100, 100)}%`;
