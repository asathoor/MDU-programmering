"use strict"; // to enable strict mode and modern JavaScript functionality

class VCard extends HTMLElement {
  constructor() {
    super();

    this.heading = "";
    this.initials = "";
    this.position = "";
    this.image = "";
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  
    this.heading = this.getAttribute("heading");
    this.initials = this.getAttribute("initials");
    this.position = this.getAttribute("position");
    this.image = this.getAttribute("image");

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        img{ 
          width: 100%;
        }
        article{
          padding: 1em;
        }
        h2{
          font-weight: 200;
          letter-spacing: 1.5px;
        }
      </style>

      <article>
        <img src="${this.image}">
        <h2>${this.heading}</h2>
        <p>${this.position}</p>
        <p><a href="mailto:${this.getMail()}">${this.getMail()}</a></p>
      </article>
      `;
  }

  getMail() {
    return `${this.initials}@eaaa.dk`;
  }
}

customElements.define("v-card", VCard);