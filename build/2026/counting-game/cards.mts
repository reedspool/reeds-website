export const numbers = Array(12)
  .fill(null)
  .map((_, i) => i + 1)
  .map(String);
export const communication_methods =
  " Historical events. | Names. | Make the shape of your number with your arms and body. | Famous people. | Laugh. | Temperature. | Use your hands. | Stomp your feet. | Sounds (not words). | Snack foods. | Meals. | Animals. | Outfits or clothes. | Furniture. | Movie titles. | Song lyrics. | Facial expressions. | Units of measurement. | Vehicles. | Walk around to form a line in order. | Say your number all together, on the count of three. | Hum or sing a tone. | Superheroes. | Colors. | Flavors. | Vacations. | Natural phenomena. | Bodily functions. | Relationships. | Quotes or wisdom. | Chores or jobs. "
    .split("|")
    .map((s) => s.trim());
export const all_cards_fronts = communication_methods.concat(numbers);
