import view from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet,Find a nice recipe and book mark it';
  _message = '';

  constructor() {
    super();
    this._addHandlerClick();
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _addHandlerClick() {
    this._parentElement.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    event.preventDefault();
    const link = event.target.closest('.preview__link');
    if (!link) return;
    const id = link.getAttribute('href');
    window.location.hash = id; // Update the hash in the URL
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return ` 
  <li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ' '
    } " href=${result.id}>
        <figure class="preview__fig">
              <img src="${result.image}" alt="Test" />
        </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ${
                  result.key ? '' : 'hidden'
                }">
                <svg>
              <use href="${icons}#icon-user"></use>
                </svg>
             </div>
           </div>
         </a>
 </li>`;
  }
}

export default new BookmarksView();
