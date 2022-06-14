import d from "../assets/js/NTechDOM.js";
import { loading } from "./loading.js";
import { login } from "./login.js";

const signup = d.createElement("div").setAttribute({ class: "container" });

const header = d.createElement("header");
const h1 = d.createElement("h1", "Sign Up to Keep Calculation");
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

const success = d.createElement("div", "", { class: "success" });
const succDiv = d.createElement("div", "", {
  style: "width: 100%; text-align: left;",
});
const closeBtn2 = `
<svg onclick="closeDiv('.success')" aria-hidden="true" style="fill: rgb(34, 207, 92); cursor: pointer" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
    <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
</svg>
`;
success.append(succDiv, closeBtn2);

const form = d.createElement("form", "", {
  class: "signup-form",
  name: "signup-form",
});
const label = d.createElement("label");
label._reuse = true;
const username = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  autofocus: "",
  type: "text",
  spellcheck: "false",
  onchange: "mNiAc(this, '1')",
  placeholder: "enter your username",
});
const email = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "email",
  onchange: "mNiAc(this, '2')",
  placeholder: "enter your email address",
});
const password = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "password",
  onchange: "mNiAc(this, '3')",
  placeholder: "enter your password",
});
const conPassword = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "password",
  onchange: "mNiAc(this, '4')",
  placeholder: "enter your confirm password",
});
const otp = d.createElement("input", "", {
  required: "",
  autocomplete: "off",
  type: "number",
  onchange: "mNiAc(this, '5')",
  placeholder: "enter your otp",
});
const span = d.createElement("span", "Send Again OTP", {
  class: "otp",
  style: "cursor: pointer",
});
const submit = d.createElement("button", "Send OTP", {
  type: "submit",
});

form.append(
  { ...label.setChildren("User Name") },
  username,
  { ...label.setChildren("Email Address") },
  email,
  { ...label.setChildren("Password") },
  password,
  { ...label.setChildren("Confirm Password") },
  conPassword,
  submit
);

main.append(
  error,
  success,
  form,
  d.createElement("div", "", { class: "footer" }).setChildren(
    d.createElement("div", [
      "Already have an acount? ",
      d.createElement("span", "Login", {
        class: "login",
        style: "cursor: pointer;",
      }),
    ])
  )
);

signup.onload = () => {
  document.querySelector(".container").style.minHeight = window.innerHeight;
  form.reset();
  document.forms["signup-form"].onsubmit = (e) => {
    e.preventDefault();
    signupRequest();
  };
  document.querySelector(".login").onclick = () => {
    window.location = "#/login";
  };

  // input change
  const inputList = {
    1: username,
    2: email,
    3: password,
    4: conPassword,
    5: otp,
  };
  const changeInput = (v, input) => {
    inputList[input].changeAttributeN("value", v.value);
  };

  window.mNiAc = changeInput;
};

signup.append(header, main);

const signupRequest = () => {
  submit
    .setChildren("Processing...")
    .changeAttribute("disabled", "")
    .changeAttribute("style", "background: #94d3a2; color: #eee;");
  error.changeAttribute("style", "display: none;");
  success.changeAttribute("style", "display: none;");
  if (
    password.getAttribute("value")[0] !== conPassword.getAttribute("value")[0]
  ) {
    setTimeout(function () {
      errDiv.setChildren("Confirm Password doesn't match!");
      error.changeAttribute("style", "display: flex");
      submit.setChildren("Send OTP").removeAttribute("disabled", "style");
    }, 500);
  } else {
    if (otp._rendered) {
      d.post(
        "https://script.google.com/macros/s/AKfycbxnRgvjrXu66918Av6W--LeRzmg0cizoJadRuSFcQ/exec",
        {
          type: "2",
          data: JSON.stringify({
            username: username.getAttribute("value")[0],
            email: email.getAttribute("value")[0],
            password: password.getAttribute("value")[0],
            otp: otp.getAttribute("value")[0],
          }),
        }
      ).then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        if (res.result) {
          if (res.messege === "success") {
            succDiv.setChildren("Congratulation! You are successed.");
            success.changeAttribute("style", "display: flex");
            form.removeElement(submit).removeElement(span);
          } else if (res.messege === "email") {
            errDiv.setChildren("User Email already exist!");
            error.changeAttribute("style", "display: flex");
            submit.setChildren("Sign Up").removeAttribute("disabled", "style");
          } else if (res.messege === "otp") {
            errDiv.setChildren("OTP isn't correct!");
            error.changeAttribute("style", "display: flex");
            submit.setChildren("Sign Up").removeAttribute("disabled", "style");
          }
        }
      });
    } else {
      sendOpt();
    }
  }
};

const sendOpt = () => {
  if (otp._rendered) {
    submit
      .setChildren("Processing...")
      .changeAttribute("disabled", "")
      .changeAttribute("style", "background: #94d3a2; color: #eee;");
    error.changeAttribute("style", "display: none;");
    success.changeAttribute("style", "display: none;");
    form.removeElement(span);
  }
  d.post(
    "https://script.google.com/macros/s/AKfycbxnRgvjrXu66918Av6W--LeRzmg0cizoJadRuSFcQ/exec",
    {
      type: "3",
      data: JSON.stringify({
        email: email.getAttribute("value")[0],
      }),
    }
  ).then((res) => {
    //console.log(res);
    res = JSON.parse(JSON.parse(res).messege);
    if (res.result) {
      if (res.messege === "success") {
        if (!otp._rendered) {
          form.insert(9, { ...label.setChildren("OTP") }, otp, span);
          document.querySelector(".otp").onclick = (e) => {
            sendOpt();
          };
        }
        succDiv.setChildren("An OTP has been sent to your email.");
        success.changeAttribute("style", "display: flex");
        submit.setChildren("Sign Up").removeAttribute("disabled", "style");
      }
    }
  });
};

export { signup };
