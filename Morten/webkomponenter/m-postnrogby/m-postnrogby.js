/* European Union Public License version 1.2 */
/* https://joinup.ec.europa.eu/sites/default/files/inline-files/EUPL%20v1_2%20DA.txt */
/* Copyright © 2020 Morten Bonderup */

(function () {
    "use strict";
    const TEMPLATE = document.createElement("template");
    const TEMPLATECONTENT = `
    <style>
        @import url("m-postnrogby.css");
    </style>

    <label for="postnr">Postnr.:&nbsp;</label><input type="text" id="postnr" required> 

`;
    TEMPLATE.innerHTML = TEMPLATECONTENT;


    class Postnrogby extends HTMLElement {

        /* Registrerer om wrapper attribut bredde */
        /* ændrer sig. */
        static get observedAttributes() {
            return ["format"];
        }

        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            });
            this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
            const ELEM = this.shadowRoot.getElementById("postnr");
            // console.log(ELEM.parentElement);
            console.log(document.getElementsByTagName("m-postnrogby")[0].parentElement);
            // console.log(ELEM.parentNode.id);
        }

        connectedCallback() {
            this.updateStyle();
            console.log("Tidselement er stylet.");
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log("Tidselement attribut " + name + " ændret fra " + oldValue + " til " + newValue + ".");
        }

        set format(value) {
            this.setAttribute("format", value);
        }

        get format() {
            if (this.hasAttribute("format")) {
                const ATTRIBUTLISTE = ["kort", "lang"];
                const ATTRIBUTVAERDI = this.getAttribute("format").toLowerCase();
                if (ATTRIBUTLISTE.includes(ATTRIBUTVAERDI)) {
                    return this.getAttribute("format").toLowerCase();
                }
            }

            /* default */
            console.log("Tidselement attribut sat til default.");
            this.format = "kort";
            return "kort";
        }

        updateStyle() {
            const SHADOW = this.shadowRoot;
            if (this.format === "lang") {           
                SHADOW.querySelector('style').insertAdjacentText('beforeend',".kort {display: none;}");               
            } else {
                SHADOW.querySelector('style').insertAdjacentText('beforeend',".lang {display: none;}");       
            }
        }
        ;
    } /* Slut på klasse */

    window.customElements.define('m-postnrogby', Postnrogby);
})();

