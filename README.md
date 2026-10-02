# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). The page presents the Mastercraft Bamboo Monitor Riser campaign and lets visitors make a pledge, track campaign progress, and bookmark the project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users can:

- View a responsive layout on desktop and mobile.
- See hover and focus states on interactive elements.
- Choose a reward or pledge without a reward.
- Confirm a pledge and see the total raised, backer count, and progress bar update.
- Bookmark and unbookmark the project.
- Open, select an option in, and close the pledge dialog; view a confirmation after pledging.

### Screenshot

Laptop and Tablet View Modes
![](./images/largescreens.jpg)

Mobile View of the Crowdfunding
![](./images/mobile.jpg)

### Links

- Challenge: [Frontend Mentor - Crowdfunding product page](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR)
- Live site: [crowdfunding frontend mentor challenge live deploy](https://crowdfundingleskim.netlify.app/)

## My process

### Built with

- Semantic HTML5
- CSS custom properties, Flexbox, and Grid
- Responsive, mobile-first styling
- Vanilla JavaScript
- Accessible native form controls and dialog semantics

### What I learned

The main gotcha was keeping every pledge outcome in sync. A confirmed pledge changes more than the displayed total: it also increments the backer count, recalculates the progress bar, and consumes inventory only when a limited reward is selected. I keep campaign state in JavaScript and update all affected parts of the page together.

The progress display also needs to handle totals beyond the goal. The raised amount remains accurate, while the visual progress and accessible progress value stop at 100%:

```js
progress.setAttribute("aria-valuenow", String(Math.min(totalRaised, goal)));
progress.querySelector(".progress-fill").style.width =
  `${Math.min((totalRaised / goal) * 100, 100)}%`;
```

Each reward has a minimum pledge amount, and sold-out rewards cannot be selected. The pledge form validates the chosen amount before changing campaign state.

### Continued development

- Persist bookmark and pledge data between page reloads.
- Connect pledge confirmation to a backend rather than keeping campaign state in the browser.
- Add automated interaction and accessibility tests.

### Useful resources

- [Frontend Mentor challenge page](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR) - Design brief and supplied assets.
- [MDN: `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - Reference for accessible modal behavior and semantics.
- [MDN: Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) - Reference for validating pledge amounts with native form controls.

## Acknowledgments

Thanks to Frontend Mentor for the challenge brief and design assets.
