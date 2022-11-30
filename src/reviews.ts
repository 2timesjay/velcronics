export function setupReviews(element: HTMLElement) {
  element.addEventListener('click', () => console.log("You clicked on a review."))
}
  
setupReviews(document.querySelector<HTMLElement>('#reviews')!)
