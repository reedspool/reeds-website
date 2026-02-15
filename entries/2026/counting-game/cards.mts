// Some terminology
// Card side: one of the two sides of a card, either back or front
const NUM_OF_NUM_CARDS = 12;
const NUM_ROWS_PER_PAGE = 3;
const NUM_COLS_PER_PAGE = 3;
const NUM_CARD_SIDES_PER_PAGE = NUM_ROWS_PER_PAGE * NUM_COLS_PER_PAGE;

type CardSide =
  | { type: "number"; back: false; value: number }
  | { type: "topic"; back: false; value: string }
  | { type: "number"; back: true }
  | { type: "topic"; back: true };

const numbers = Array(NUM_OF_NUM_CARDS)
  .fill(null)
  .map((_, i) => i + 1);

const numberCardFronts: Array<CardSide & { type: "number"; back: false }> =
  numbers.map((i) => ({ type: "number", back: false, value: i }));

const topics =
  " Historical events. | Names. | Make the shape of your number with your arms and body. | Famous people. | Laugh. | Temperature. | Use your hands. | Stomp your feet. | Sounds (not words). | Snack foods. | Meals. | Animals. | Outfits or clothes. | Furniture. | Movie titles. | Song lyrics. | Facial expressions. | Units of measurement. | Vehicles. | Walk around to form a line in order. | Say your number all together, on the count of three. | Hum or sing a tone. | Superheroes. | Colors. | Flavors. | Vacations. | Natural phenomena. | Bodily functions. | Relationships. | Quotes or wisdom. | Chores or jobs. "
    .split("|")
    .map((s) => s.trim());

const topicCardFronts: Array<CardSide & { type: "topic"; back: false }> =
  topics.map((topic) => ({ type: "topic", back: false, value: topic }));

const allCardFronts: Array<CardSide> = [
  ...numberCardFronts,
  ...topicCardFronts,
];

debugger;

// // Add a full blank page of blank topic cards
// for (let i = 0; i < NUM_CARD_SIDES_PER_PAGE; i++) {
//   allCardFronts.push({ type: "topic", back: false, value: "" });
// }

// Add more blank topic cards to fill out a page
while (allCardFronts.length % NUM_CARD_SIDES_PER_PAGE > 0) {
  allCardFronts.push({ type: "topic", back: false, value: "" });
}

if (allCardFronts.length % NUM_CARD_SIDES_PER_PAGE !== 0)
  throw new Error(
    `Had ${allCardFronts.length} card fronts which did not divide evenly into ${NUM_CARD_SIDES_PER_PAGE}`,
  );

const allCardSides: Array<CardSide> = [];

// Fill out a whole page of fronts, then a whole page of backs.
// Repeat until there are no more fronts left

for (
  let beginningOfPageCardIndex = 0;
  beginningOfPageCardIndex < allCardFronts.length;
  beginningOfPageCardIndex += NUM_CARD_SIDES_PER_PAGE
) {
  // Fill out a page of fronts
  for (
    let frontIndex = beginningOfPageCardIndex;
    frontIndex < beginningOfPageCardIndex + NUM_CARD_SIDES_PER_PAGE;
    frontIndex++
  ) {
    allCardSides.push(allCardFronts[frontIndex]);
  }

  // Fill out a page of backs
  for (
    let backIndex = beginningOfPageCardIndex;
    backIndex < beginningOfPageCardIndex + NUM_CARD_SIDES_PER_PAGE;
    backIndex++
  ) {
    allCardSides.push({ type: allCardFronts[backIndex].type, back: true });
  }
}

if (allCardSides.length % NUM_CARD_SIDES_PER_PAGE !== 0)
  throw new Error(
    `Had ${allCardSides.length} card sides which did not divide evenly into ${NUM_CARD_SIDES_PER_PAGE}`,
  );
if (allCardSides.length !== allCardFronts.length * 2)
  throw new Error(
    `Had ${allCardSides.length} card sides which was not exactly twice ${allCardFronts.length}`,
  );

export { allCardSides };
