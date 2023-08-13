class AlbumArt extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.getElementById('album-art-template');
    const templateContent = template.content;

    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    const img = this.shadowRoot.querySelector('img');
    const artistName = this.shadowRoot.querySelector('h3');
    const albumName = this.shadowRoot.querySelector('p');

    img.src = this.getAttribute('img-src');
    img.alt = this.getAttribute('alt');
    artistName.textContent = this.getAttribute('artist-name');
    albumName.textContent = this.getAttribute('album-name');
  }
}

customElements.define('album-art', AlbumArt);