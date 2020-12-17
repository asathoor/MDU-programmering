/* European Union Public License version 1.2 */
/* https://joinup.ec.europa.eu/sites/default/files/inline-files/EUPL%20v1_2%20DA.txt */
/* Copyright © 2020 Morten Bonderup */

(function () {
    "use strict";
    const TEMPLATE = document.createElement("template");
    const TEMPLATECONTENT = `
    <style>
        @import url("m-dialog.css");
           
       .lukket {
            display: none;
        }

        .top {
            left: 0;
            top: 0;
        }
    
        .bund {
            left: 0;
            bottom: 0;
        }
    
        .midte {
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            boxShadow: 5px 5px 5px black;
        } 
    
        .modal_dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
            
        }
    
        .modal_indhold {
            position:absolute;
            padding: 10px;    
            box-sizing: border-box;
        }
    
        .knappanel {
            position: absolute;
            bottom: 15px;
            left: 0;
            width: 100%;
            text-align: center;
            cursor: pointer;
        }
    
        .lukknap {
            color: #000000;
            font-size: 1em;
        }
    
        .lukkryds {
            position: absolute;
            right: 10px;
            top: 5px;
            cursor: pointer;
            color: #000000;
            font-size: 1em;
        }
    
        .lukkryds:hover {
            opacity: 0.7;
        }
    
    </style>
    <div id="modaldialog" class="modal_dialog lukket">

        <div id="modalindhold" class="modal_indhold m-dialog modal_hoejde modal_bredde">
            <span class="lukkryds knap">X</span>
            <h1 class="m-dialog-overskrift"><slot name="m-dialog-overskrift"></slot></h1>
            <div class="knappanel"><button class="lukknap knap" type="button">Luk</button></div>
            <div class="m-dialog-indhold"><slot name="m-dialog-indhold"><slot></div>
        </div>
        
    </div>

`;
    TEMPLATE.innerHTML = TEMPLATECONTENT;
    class Dialog extends HTMLElement {

        static get observedAttributes() {
            return ["status","placering","bredde","hoejde"];
        }

        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            });
            this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
            console.log("constructor: Dialog er oprettet.");
        }

        connectedCallback() {
            const ELEMS = this.shadowRoot.querySelectorAll(".knap");
            
            Array.from(ELEMS).forEach(function(ELEM) {
                ELEM.addEventListener("click", function () {
                    this.status = "lukket";
                }.bind(this));
            }.bind(this))
            
            console.log("connectedCallback: Dialog er aktiv.");
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name==="status") this.dialogVisning();
            if (name==="placering") this.dialogPlacering();
            if (name==="hoejde") this.dialogHoejde();
            if (name==="bredde") this.dialogBredde();
            console.log("attributeChangedCallback: Attribut " + name + " ændret fra " + oldValue + " til " + newValue + ".");
        }


        /* ------------------------- STATUS -------------------------- */

        set status(value) {
            this.setAttribute("status", value);
            console.log("set: Status attribut sat til "+value);
        }

        get status() {
            if (this.hasAttribute("status")) {
                const ATTRIBUTLISTE = ["aabnet", "lukket"];
                const ATTRIBUTVAERDI = this.getAttribute("status").toLowerCase();
                if (ATTRIBUTLISTE.includes(ATTRIBUTVAERDI)) {
                    return this.getAttribute("status").toLowerCase();
                }
            }

            /* default */
            console.log(" get: Status attribut sat til default.");
            this.status = "lukket";
            return "lukket";
        }

        dialogVisning() {
            const ELEM = this.shadowRoot.getElementById("modaldialog");
            if (this.status === "aabnet") {
                ELEM.classList.remove("lukket");
            } else {
                ELEM.classList.add("lukket");
            }
        }

        /* ----------------- -----SLUT STATUS ---------------------- */
        
        /* ----------------------- PLACERING ------------------------ */
        set placering(value) {
            this.setAttribute("placering", value);
            console.log("set: Placering attribut sat til "+value);
        }
        
        get placering() {
            if (this.hasAttribute("placering")) {
                const ATTRIBUTLISTE = ["top", "bund", "midte"];
                const ATTRIBUTVAERDI = this.getAttribute("placering").toLowerCase();
                if (ATTRIBUTLISTE.includes(ATTRIBUTVAERDI)) {
                    return this.getAttribute("placering").toLowerCase();
                }
            } 

            /* default */
            console.log(" get: Placering attribut sat til default.");
            this.placering = "midte";
            return "midte";
        } 
        
        
        dialogPlacering() {
            const ELEM = this.shadowRoot.getElementById("modalindhold");
            ELEM.classList.remove("midte");
            ELEM.classList.remove("top");
            ELEM.classList.remove("bund");
            
            if (this.placering === "top") {
                ELEM.classList.add("top");
            } else if (this.placering === "bund") {
                ELEM.classList.add("bund");
            } else {
                ELEM.classList.add("midte");
            }
                
        }        
        /* ----------------- SLUT PLACERING ---------------------- */
        
        /* ----------------------- HOEJDE ------------------------ */
        
        set hoejde(value) {
            this.setAttribute("hoejde", value);
            console.log("set: Hoejde attribut sat til "+value);
        }
        
        get hoejde() {
            if (this.hasAttribute("hoejde")) {
                const ATTRIBUTLISTE = ["px", "%", "vw", "vh", "em", "rem"];
                const ATTRIBUTVAERDI = this.getAttribute("hoejde").toLowerCase();
                const ENHED = ATTRIBUTVAERDI.split(parseInt(ATTRIBUTVAERDI)).toString().replace(/,/g,"");                             
                const VAERDI = ATTRIBUTVAERDI.split(ENHED).toString().replace(/,/g,"");   
                if (ATTRIBUTLISTE.includes(ENHED) && VAERDI)  {
                    return this.getAttribute("hoejde").toLowerCase();
                }  
            } 

            /* default */
            console.log(" get: Hoejde attribut sat til default.");
            this.hoejde = "300px";
            return "300px"; 
        }
        
        dialogHoejde() {
            const SHADOW = this.shadowRoot;
            SHADOW.querySelector('style').insertAdjacentText('beforeend', `.modal_hoejde {height: ${this.hoejde};}`);
        }
        
        /* -------------------- SLUT HOEJDE ---------------------- */
        
        
        /* ----------------------- BREDDE ------------------------ */
        
        set bredde(value) {
            return this.getAttribute("bredde").toLowerCase();
            console.log("set: Bredde attribut sat til "+value);
        }
        
        get bredde() {
            if (this.hasAttribute("bredde")) {
                const ATTRIBUTLISTE = ["px", "%", "vw", "vh", "em", "rem"];
                const ATTRIBUTVAERDI = this.getAttribute("bredde").toLowerCase();
                const ENHED = ATTRIBUTVAERDI.split(parseInt(ATTRIBUTVAERDI)).toString().replace(/,/g,"");                             
                const VAERDI = ATTRIBUTVAERDI.split(ENHED).toString().replace(/,/g,"");   
                if (ATTRIBUTLISTE.includes(ENHED) && VAERDI) {
                    return this.getAttribute("bredde").toLowerCase();
                }  
            } 

            /* default */
            console.log(" get: Bredde attribut sat til default.");
            this.bredde = "300px";
            return "300px"; 
        }
        
        
        dialogBredde() {
            const SHADOW = this.shadowRoot;
            SHADOW.querySelector('style').insertAdjacentText('beforeend', `.modal_bredde {width: ${this.bredde};}`);
        }
        
        /* -------------------- SLUT BREDDE ---------------------- */
        
        

    } /* Slut på klasse */

    window.customElements.define('m-dialog', Dialog);
}
)();