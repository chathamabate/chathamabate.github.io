
import { newCard } from "./cards.js";

async function main() {
    let info_res = await fetch(GITHUB_URL + "/projects/GC/info.json");
    let info = await info_res.json();

    let c = newCard(info);
    document.appendChild(c);
}

main();
