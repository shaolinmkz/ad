//-------------------------------------
const sound = new Audio();

const effects = {
  selectSound:
    "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-35448/zapsplat_multimedia_button_press_plastic_click_001_36868.mp3?_=1",
  dropSound:
    "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-35448/zapsplat_multimedia_button_press_plastic_click_002_36869.mp3?_=2"
};

const artists = [
  {
    id: 1,
    name: "Davido",
    rank: 1
  },
  {
    id: 2,
    name: "Wizkid",
    rank: 5
  },
  {
    id: 3,
    name: "Dbanj",
    rank: 4
  },
  {
    id: 4,
    name: "Phyno",
    rank: 3
  },
  {
    id: 5,
    name: "Olamide",
    rank: 2
  },
  {
    id: 6,
    name: "Tekno",
    rank: 6
  }
];

const rankRange = [
  artists[0].rank,
  artists[1].rank,
  artists[2].rank,
  artists[3].rank,
  artists[4].rank,
  artists[5].rank
];

let artistSlots;
let artistMoved;
let artistReplaced;

const generateArtist = () => {
  let data = "";
  artists.forEach(artist => {
    data += `
            <div  class="artist-slot">
              <div class="rank-wrapper" id=${artist.id}>
                <div class="name-box big">${artist.name}</div>
                <div ${artist.name +
                  "-" +
                  artist.rank} class="name-box small" draggable="true" id=${
      artist.rank
    }>${artist.rank}</div>
              </div>
          </div>
  `;
  });
  document.querySelector("#root").innerHTML = data;
  artistSlots = document.querySelectorAll(".name-box.small");
};

generateArtist();

const getArtistsProperty = prop => {
  return artists.map(m => m[prop]);
};

hideBtn = (attr, shouldHide = true) => {
  if (shouldHide) {
    document.querySelector(attr).style.display = "none";
  } else {
    document.querySelector(attr).style.display = "inline-block";
  }
};

const reorderRanks = (rank1, rank2, id1, id2) => {
  if (rank1 && rank2 && id1 && id2) {
    rank1 = Number(rank1);
    rank2 = Number(rank2);

    const idOne = getArtistsProperty("id").indexOf(Number(id1));
    const idTwo = getArtistsProperty("id").indexOf(Number(id2));

    artists[idOne].rank = rank2;
    artists[idTwo].rank = rank1;

    generateArtist();
    activateEvent();
  }
};

const artistDragEnter = e => {
  e.target.classList.add("hovered");
  artistReplaced = e.target.parentNode;
};
const artistDragStart = ({ target }) => {
  target.className += " hold";
  artistMoved = target;
};
const artistDragEnd = e => {
  e.target.classList.remove("hold");
  reorderRanks(
    artistMoved.id,
    artistReplaced.children[1].id,
    artistMoved.parentNode.id,
    artistReplaced.id
  );
  sound.src = effects.dropSound;
  sound.play();
};

const artistDragLeave = e => {
  e.target.classList.remove("hold");
  e.target.classList.remove("hovered");
};

const artistPick = () => {
  sound.src = effects.selectSound;
  sound.play();
};

const artistDrop = () => {
  sound.src = effects.dropSound;
  sound.play();
};

const activateEvent = () => {
  for (let artistSlot of artistSlots) {
    artistSlot.addEventListener("dragenter", artistDragEnter);
    artistSlot.addEventListener("dragleave", artistDragLeave);
    artistSlot.addEventListener("dragstart", artistDragStart);
    artistSlot.addEventListener("dragend", artistDragEnd);
    artistSlot.addEventListener("drop", artistDrop);
    artistSlot.addEventListener("mousedown", artistPick);
  }
};

const showMediaShare = () => {
  hideBtn("#share");
  hideBtn(".social-media-container", false);
};

const share = (media, url = "") => {
  if (media === "facebook") {
    alert(media, url);
  } else if (media === "twitter") {
    alert(media, url);
  } else if (media === "whatsapp") {
    alert(media, url);
  }
};

const drawBarChart = () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: getArtistsProperty("name"),
      datasets: [
        {
          label: "Hennessey Artistry Ranks",
          backgroundColor: [
            "#dcb444",
            "#93af3a",
            "#da8b55",
            "#3e8a8b",
            "#b34e4a",
            "#7f5084"
          ],
          data: getArtistsProperty("rank").map(rank => {
            switch (rank) {
              case 1:
                return 100;
              case 2:
                return 80;
              case 3:
                return 70;
              case 4:
                return 60;
              case 5:
                return 50;
              default:
                return 40;
            }
          })
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      tooltips: {
        mode: "x-axis",
        callbacks: {
          label: ({ yLabel }) => `${yLabel}%`
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Vote Percentage %"
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Artists"
            }
          }
        ]
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 0
        }
      }
    }
  });
};

const submit = () => {
  document.querySelector(".section .rank").style.display = "none";
  document.querySelector("#submit").style.display = "none";
  const chartContainer = document.querySelector(".section-two");
  chartContainer.style.display = "block";
  chartContainer.innerHTML = `
                <img class="chartLogo" src="https://res.cloudinary.com/shaolinmkz/image/upload/v1565611351/Hennessey/henessy.png" />
  <canvas id="myChart" width="400" height="280"></canvas>
  <div class="social-media-container">
  <img class="social-media-icon" src="https://res.cloudinary.com/shaolinmkz/image/upload/v1565615952/Hennessey/Facebook.png" onclick="share('facebook')" />
  <img class="social-media-icon" src="https://res.cloudinary.com/shaolinmkz/image/upload/v1565615952/Hennessey/Twitter_A.png" onclick="share('twitter')" />
  <img class="social-media-icon" src="https://res.cloudinary.com/shaolinmkz/image/upload/v1565616139/Hennessey/whatsapp.png" onclick="share('whatsapp')" />
  </div>
                <button id="share" onclick="showMediaShare()">Share On Social Media</button>`;
  drawBarChart();
};

activateEvent();
//-------------------------------------

$(document).ready(function() {
  const bannerContainer = $("#banner-container");
  let banner = ($("#banner-container").width() / $(window).width()) * 100;
  console.log("document loaded1", banner);

  banner = ($("#banner-container").width() / $(window).width()) * 100;
  console.log("document loaded2", banner);
  $("#start-btn").click(function() {
    $("#floor-close-btn").css({ visibility: "hidden" });
    $("#top-content").css({ display: "grid" });
    $("#top-content").addClass("animate-top");
  });

  $("#floor-close-btn").click(function() {
    $("#banner-container").css({ display: "none" });
  });
  $("#top-close-btn").click(function() {
    $("#top-content").css({ display: "none" });
    $("#top-content").removeClass("animate-top");
    $(".animate-top").css({ visibility: "hidden" });
    $("#floor-close-btn").css({ visibility: "visible" });
  });
});
