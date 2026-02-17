class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    console.log("Constructor");
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    console.log(`Attribute ${name} has changed: ${String(oldValue)} -> ${String(newValue)}.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
