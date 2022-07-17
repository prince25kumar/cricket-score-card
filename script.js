const apiKey = "7a9cbae6-90ff-4fcb-ad95-4b1b37d8f0eb";
const apiURL = " https://api.cricapi.com/v1/cricScore?apikey=" + apiKey;

const defaultLogo =
  "https://cdorg.b-cdn.net/wp-content/uploads/2022/02/icon.png";

const main = () => {
  const main = document.querySelector("main");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiURL, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let { data: matches } = JSON.parse(xhr.responseText);

      const result = matches.filter((match) => match.ms === "result");
      const live = matches.filter((match) => match.ms === "live");
      const fixture = matches.filter((match) => match.ms === "fixture");

      const compare = (a, b) => a.dateTimeGMT - b.dateTimeGMT;

      result.sort(compare);
      live.sort(compare);
      fixture.sort(compare);

      matches = result.concat(live, fixture);

      matches.forEach((match) => {
        const status =
          match.ms === "result"
            ? match.status
            : match.ms === "fixture"
            ? "Upcoming"
            : "Live";

        const div = document.createElement("div");
        div.setAttribute("id", match.id);
        div.setAttribute("class", "match");

        div.innerHTML = `
          <h3>${status}</h3>
          <img src="${match.t1img || defaultLogo}" alt="team 1 logo">
          <img src="${match.t2img || defaultLogo}" alt="team 2 logo">
          <h4>${match.t1}</h4>
          <h4>${match.t2}</h4>
          <span>${match.t1s}</span>
          <span>${match.t2s}</span>
        `;

        main.appendChild(div);
      });
    }
  };
  xhr.send();
};

document.addEventListener("DOMContentLoaded", main);
