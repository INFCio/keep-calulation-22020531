import d from "../assets/js/NTechDOM.js";
import { loading } from "./loading.js";
import { signup } from "./signup.js";
import { forget } from "./forget.js";
import { pages } from "./pages.js";
import { home } from "./home.js";
import { encode } from "./keep-calculation.js";
const login = d.createElement("div").setAttribute({ class: "container" });
let initPages = { ...pages };
// header
const header = d.createElement("header");
const h1 = d.createElement("h1", "Login to Keep Calculation");
header.append(h1);

const main = d.createElement("main");

const error = d.createElement("div", "", { class: "error" });
const errDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn = `
<svg onclick="closeDiv('.error')" aria-hidden="true" style="fill: rgb(207, 34, 46); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
error.append(errDiv, closeBtn);

const form = d.createElement("form", "", {
  class: "login-form",
  name: "login-form",
});
const label = d.createElement("label");
label._reuse = true;

const email = d.createElement("input", "", {
  required: "",
  autofocus: "",
  autocomplete: "off",
  type: "email",
  spellcheck: "false",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter your email address",
});
const password = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "password",
  onchange: "mNiAc(this, '2')",
  placeholder: "enter your password",
});

const span = d.createElement("span", "Forget Password?", {
  class: "forget",
  style: "cursor: pointer",
});
const submit = d.createElement("button", "Login", {
  type: "submit",
});

form.append(
  { ...label.setChildren("User Email") },
  email,
  { ...label.setChildren("Password") },
  password,
  span,
  submit
);

main.append(
  error,
  form,
  d.createElement("div", "", { class: "footer" }).setChildren(
    d.createElement("div", [
      "Don't have an account? ",
      d.createElement("span", "Sign Up", {
        style: "cursor: pointer",
        class: "signup",
      }),
    ])
  )
);

let root = "login";

login.onload = () => {
  root = "login";
  for (let x in initPages) delete initPages[x];
  initPages.login = "login";
  initPages.signup = "signup";
  initPages.forget = "forget";
  document.querySelector(".container").style.minHeight = window.innerHeight;
  form.reset();
  document.forms["login-form"].onsubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };
  document.querySelector(".signup").onclick = () => {
    error.changeAttribute("style", "display: none;");
    window.location = "#/signup";
  };
  document.querySelector(".forget").onclick = () => {
    error.changeAttribute("style", "display: none;");
    window.location = "#/forget";
  };
  // input change fuctions
  const inputList = {
    1: email,
    2: password,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  if (window.hashchange)
    window.removeEventListener("hashchange", hashchange, false);

  window.hashchange = () => {
    d.render("root", loading);
    if (initPages[window.location.hash.toString().replace("#/", "")]) {
      eval(initPages[window.location.hash.toString().replace("#/", "")]).init();
      setTimeout(() => {
        d.render(
          "root",
          eval(initPages[window.location.hash.toString().replace("#/", "")])
        );
      }, 500);
    } else {
      eval(initPages[root]).init();
      setTimeout(() => {
        d.render("root", eval(initPages[root]));
      }, 500);
    }
  };
  window.addEventListener("hashchange", hashchange, false);
  window.mNiAc = changeInput;
  const decode = (code) => {
    let en = [];
    for (let i = 0; i < code.length; i += 3) {
      let x = 18 * code[i] + Number(code.substr(i + 1, 2));
      en.push(x);
    }
    en = String.fromCharCode(...en);
    return JSON.parse(en.replace(/'/g, '"'));
  };
  if (window.localStorage["com.infc.keep-calculation"]) {
    home._loginData = decode(window.localStorage["com.infc.keep-calculation"]);
    d.render("root", home);
  }
};

login.append(header, main);

const loginRequest = () => {
  const start = new Date();
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  d.post(
    "https://script.google.com/macros/s/AKfycbxnRgvjrXu66918Av6W--LeRzmg0cizoJadRuSFcQ/exec",
    {
      type: "1",
      data: JSON.stringify({
        email: email.getAttribute("value")[0],
        password: password.getAttribute("value")[0],
      }),
    }
  ).then((res) => {
    //console.log(res);
    res = JSON.parse(JSON.parse(res).messege);
    const { result, messege } = res;
    if (result) {
      if (messege === "email") {
        errDiv.setChildren("Email doesn't found!");
        error.changeAttribute("style", "display: flex");
        submit.setChildren("Login").removeAttribute("disabled", "style");
      } else if (messege === "password") {
        errDiv.setChildren("Password isn't correct!");
        error.changeAttribute("style", "display: flex");
        submit.setChildren("Login").removeAttribute("disabled", "style");
      } else if (messege === "success") {
        initPages = { ...pages };
        console.log(res.data);
        home._loginData = res.data[0];
        window.localStorage["com.infc.keep-calculation"] = encode(
          JSON.stringify(res.data[0])
        );
        window.location = "#/home";
      }
    }
  });
};

export { login };
