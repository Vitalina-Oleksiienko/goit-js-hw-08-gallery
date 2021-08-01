import {galleryItems} from './app.js';

// Создание и рендер разметки по массиву данных galleryItems

const galleryConteiner = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
galleryConteiner.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardsMarkup (galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
        .join('');
}

// Открытие модального окна по клику на элементе галереи. Закрытие модального окна
// Подмена значения атрибута src, Очистка значения атрибута src

galleryConteiner.addEventListener('click', onGalleryImageClick);
const lightboxContainer = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');

function onGalleryImageClick (e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return
  };

  lightboxContainer.classList.add('is-open');
  lightboxImg.setAttribute("src", e.target.dataset.source);
  lightboxImg.setAttribute("alt", e.target.getAttribute("alt"));
  lightboxContainer.addEventListener('click', onCloseBtnClick);
  window.addEventListener("keydown", onKeyPress);
}

function onCloseBtnClick(e) {
  if (e.target !== lightboxImg) {
    lightboxContainer.classList.remove('is-open');
    lightboxImg.src = "";
    lightboxImg.alt = "";
    closeBtn.removeEventListener('click', onCloseBtnClick);
    window.removeEventListener("keydown", onKeyPress);
  }
};

// Дополнительно Закрытие модального окна по нажатию клавиши ESC

function onKeyPress(e) {
  if (e.code === "Escape") {
    onCloseBtnClick(e)
  }
}