import 'odyssey-test-utils/test-case-wrapper.js';
import 'odyssey-test-utils/test-case.js';
import { getAncestors } from 'odyssey-test-utils/test-utils';


function isOutsideParentOverflow(targetElement, parentElement) {
  const styles = getComputedStyle(parentElement);

  if (styles.overflowX !== 'hidden') return false

  const targetRect = targetElement.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  return targetRect.left >= parentRect.right
}

const isElementOutsideOverflow = (element) => {
  const ancestors = getAncestors(element);

  const elBoundingRect = element.getBoundingClientRect();

  return ancestors.some((ancestor) => {
    if (ancestor.nodeName === '#document') return false;

    return isOutsideParentOverflow(element, ancestor)
  })
}

const test1El = document.getElementById('test-1');
test1El.test(() => {
  const hasCustomElementBeenRegistered = Boolean(customElements.get('image-carousel'));

  if (!hasCustomElementBeenRegistered) return false;

  const carouselEl = document.querySelector('image-carousel');

  if (!Boolean(carouselEl)) return false;

  return Boolean(carouselEl.shadowRoot)
})

const test2El = document.getElementById('test-2');
test2El.test(() => {
  const carouselEl = document.querySelector('image-carousel');
  const positionEl = carouselEl.shadowRoot.querySelector('.position')
  const positionValue = positionEl.textContent.trim()

  if (positionValue !== '0') return false

  const firstChild = carouselEl.children[0];

  const firstChildIsOutsideOverflow = isElementOutsideOverflow(firstChild);

  if (firstChildIsOutsideOverflow) return false;

  const secondChild = carouselEl.children[1];
  const secondChildIsOutsideOverflow = isElementOutsideOverflow(secondChild);

  return secondChildIsOutsideOverflow;
})

const getNextCarouselItemPosition = (position, totalItems) => {
  if (position < totalItems - 1) return position + 1;

  return 0;
}

const test3El = document.getElementById('test-3');
test3El.test(() => {
  const hasCustomElementBeenRegistered = Boolean(customElements.get('image-carousel'));

  if (!hasCustomElementBeenRegistered) return false;

  const carouselEl = document.querySelector('image-carousel');

  if (!carouselEl) return false;

  const positionEl = carouselEl.shadowRoot.querySelector('.position')
  const positionValue = Number(positionEl.textContent.trim())

  const nextPos = getNextCarouselItemPosition(positionValue, carouselEl.children.length);

  const buttonEl = carouselEl.shadowRoot.querySelector('button')
  buttonEl.click()

  const nextChild = carouselEl.children[nextPos];
  const isOutsideOverflow = isElementOutsideOverflow(nextChild);

  return !isOutsideOverflow;
})
