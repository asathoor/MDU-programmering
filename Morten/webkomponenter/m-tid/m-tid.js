/* European Union Public License version 1.2 */
/* https://joinup.ec.europa.eu/sites/default/files/inline-files/EUPL%20v1_2%20DA.txt */
/* Copyright © 2020 Morten Bonderup */

(function () {
    "use strict";
    const TEMPLATE = document.createElement("template");
    const TEMPLATECONTENT = `
    <style>
        @import url("m-tid.css");
    </style>

    <span id="tidspunkt" class="m-tid"></span>

`;
    TEMPLATE.innerHTML = TEMPLATECONTENT;
    class Tid extends HTMLElement {

        /* Registrerer om m-tids attribut bredde */
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
            const ELEM = this.shadowRoot.getElementById("tidspunkt");
            this.updateTid(ELEM);
            setInterval(function () {this.updateTid(ELEM);}.bind(this), 1000);
            console.log("Tidselement er aktivt.");
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
                SHADOW.querySelector('style').insertAdjacentText('beforeend', ".kort {display: none;}");
            } else {
                SHADOW.querySelector('style').insertAdjacentText('beforeend', ".lang {display: none;}");
            }
        }
        
        updateTid(ELEM) {
            const DATOTID = new Date();
            const UGEDAGE = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
            const MAANEDER = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
            const LANGDATO = UGEDAGE[DATOTID.getDay()] + "&nbsp;" + DATOTID.getDate() + ".&nbsp;" + MAANEDER[DATOTID.getMonth()] + "&nbsp;" + DATOTID.getFullYear() + "&nbsp;";
            const KORTDATO = DATOTID.getDate() + "." + (DATOTID.getMonth() + 1) + "." + DATOTID.getFullYear() + "&nbsp;";
            const KLOKKESLET = (DATOTID.getHours() < 10 ? '0' : '') + DATOTID.getHours() + ":" + (DATOTID.getMinutes() < 10 ? '0' : '') + DATOTID.getMinutes() + ":" + (DATOTID.getSeconds() < 10 ? '0' : '') + DATOTID.getSeconds();
            ELEM.innerHTML = '<span class="kort">' + KORTDATO + '</span>' + '<span class="lang">' + LANGDATO + '</span>' + KLOKKESLET;
        }
        ;
    } /* Slut på klasse */

    window.customElements.define('m-tid', Tid);
})();

