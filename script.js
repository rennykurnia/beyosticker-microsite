const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuToggle.addEventListener('click', () => {
 const open = menuToggle.getAttribute('aria-expanded') === 'true';
 menuToggle.setAttribute('aria-expanded', String(!open));
 menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
 mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
 mobileNav.hidden = true;
 menuToggle.setAttribute('aria-expanded', 'false');
 menuToggle.setAttribute('aria-label', 'Open navigation');
}));
const photos = [...document.querySelectorAll('.photo-button img')];
const dialog = document.querySelector('#gallery-dialog');
let activePhoto = 0;
function showPhoto(index) {
 activePhoto = (index + photos.length) % photos.length;
 const photo = photos[activePhoto];
 document.querySelector('#gallery-image').src = photo.src;
 document.querySelector('#gallery-image').alt = photo.alt;
 document.querySelector('#gallery-title').textContent = `${photo.closest('.photo-button').dataset.category} · Photo ${(activePhoto % 2) + 1}`;
 document.querySelector('#gallery-count').textContent = `${activePhoto + 1} / ${photos.length}`;
}
document.querySelectorAll('.photo-button').forEach(button => button.addEventListener('click', () => {
 showPhoto(photos.indexOf(button.querySelector('img')));
 dialog.showModal();
}));
document.querySelector('#close-gallery').addEventListener('click', () => dialog.close());
document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(activePhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(activePhoto + 1));
dialog.addEventListener('click', event => {if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('keydown', event => {if (event.key === 'ArrowLeft') {event.preventDefault();showPhoto(activePhoto - 1);} if (event.key === 'ArrowRight') {event.preventDefault();showPhoto(activePhoto + 1);}});

// Keep each category's chosen pack and WhatsApp message in sync.
document.querySelectorAll('.catalog-card[data-category]').forEach(card => {
 const update = () => {
  const option = card.querySelector('input:checked');
  const category = card.dataset.category;
  card.querySelector('.selected-price').innerHTML = `<strong>$${option.dataset.price}</strong> USD <span>${option.value} · ${option.dataset.count} stickers · ${option.dataset.designs} different designs</span>`;
  const message = `Hi, I’m interested in the ${category} design in the ${option.value} pack with ${option.dataset.count} custom name stickers. Could you please share the ordering details?`;
  card.querySelector('.product-order').href = 'https://wa.me/6289655406702?text=' + encodeURIComponent(message);
 };
 card.querySelectorAll('input[type="radio"]').forEach(option => option.addEventListener('change', update));
 update();
});
