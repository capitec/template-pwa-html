import style from '../../common/ViewBase.js';

import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/color-field/index.js';
import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/icon/index.js';
import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/select/index.js';

const iconSizes = ['default', 'extra-small', 'small', 'medium', 'large'];

const template = document.createElement('template');
template.innerHTML = `
<style>
  ${style}

  .preview {
      min-height: 190px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
  }

  .preview > omni-icon {
      padding: 5px;
      max-width: 58px;
      flex-wrap: wrap;
  }

  .controls {
      display: flex;
      flex-direction: row;
  }

  .controls > * {
      padding: 10px;
      max-width: 170px;
  }
</style>
<div class="info">
    <div class="item">
        <omni-icon size="large">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
            </svg>
        </omni-icon>
        <div>
            <omni-label label="Info" type="title"></omni-label>
            <span>
                This example illustrates the use of various input components, including iconography leveraging the <omni-hyperlink href="https://fonts.google.com/icons?icon.set=Material+Icons&query=material+icon" target="_blank">Google Material Icon</omni-hyperlink> library.
            </span>
        </div>
    </div>
</div>
<div class="preview" style="color: #209dee">

    <!-- Omni Icon with slotted SVG content -->
    <omni-icon class="demo-icon" size="large">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459.419 459.419" style="width: 100%; height: 100%;" xml:space="preserve" width="100%" height="100%"><path style="" d="M83.115 172.911h293.189v286.508h82.473V106.956L223.178 0 .642 106.956v352.463h82.473z"/><path style="" d="M171.155 403.543h52.023v44.878h-52.023zm63.85 0h52.023v44.878h-52.023zm-127.692 0h52.023v44.878h-52.023zm63.842-61.558h52.023v44.878h-52.023zm-63.842 0h52.023v44.878h-52.023zm127.692 0h52.023v44.878h-52.023zm-63.85-61.549h52.023v44.878h-52.023zm-63.842 0h52.023v44.878h-52.023zm191.534 123.107h52.023v44.878h-52.023z"/></svg>
    </omni-icon>

    <!-- Omni Icon with Google Material Icon -->
    <omni-icon class="demo-icon" size="large" icon="@material/dataset"></omni-icon>
</div>
<div class="controls">
    <omni-color-field 
        label="Colour" 
        value="#209dee">
    </omni-color-field>
    <omni-select 
        label="Size" 
        value="large">
    </omni-select>
</div>     `;

export class ViewComponents extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const colorField = this.shadowRoot.querySelector('omni-color-field');
        colorField.addEventListener('input', (e) => this._colourChange(e));
        const select = this.shadowRoot.querySelector('omni-select');
        select.items = iconSizes;
        select.addEventListener('change', (e) => this._sizeChange(e));
        this.render();
    }

    connectedCallback() {
        // Adding Google Material Icons to document.
        this._materialLink = document.createElement('link');
        this._materialLink.rel = 'stylesheet preload';
        this._materialLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        this._materialLink.as = 'style';
        document.head.appendChild(this._materialLink);
    }

    disconnectedCallback() {
        // Removing Google Material Icons from document.
        if (this._materialLink) {
            this._materialLink.remove();
        }
    }

    _colourChange(e) {
        this.setAttribute('color', e.target?.value?.toString() ?? '#209dee');
        this.render();
    }

    _sizeChange(e) {
        this.setAttribute('size', e.target?.value?.toString() ?? 'large');
        this.render();
    }

    render() {
        const size = this.getAttribute('size') ?? 'large';
        const color = this.getAttribute('color') ?? '#209dee';
        this.shadowRoot.querySelectorAll('.demo-icon').forEach((i) => (i.size = size));
        this.shadowRoot.querySelector('.preview').style.color = color;
    }
}
window.customElements.define('view-components', ViewComponents);
