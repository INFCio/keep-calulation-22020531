import d from "../assets/js/NTechDOM.js";

const loading = d.createElement("div").setAttribute({class: "spinner"});
const div = d.createElement("div")
div._reuse = true;
for(let i = 1; i <= 5; i++){
  loading.append({...div.setAttribute({class: `rect${i}`})});
}

export {loading};