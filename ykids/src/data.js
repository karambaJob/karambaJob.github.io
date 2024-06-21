const LINKS =
  "https://www.youtube.com/watch?v=CCgXO54tru0,https://www.youtube.com/watch?v=Q-3b5CT4Axo,https://www.youtube.com/watch?v=JMrxdpQblJY,https://www.youtube.com/watch?v=62piQhWPiYc,https://www.youtube.com/watch?v=9T34-TvC_eI,https://www.youtube.com/watch?v=OCba9KOS1lk,https://www.youtube.com/watch?v=IOKu2WkO1v8,https://www.youtube.com/watch?v=YLLrPNcS-_M,https://www.youtube.com/watch?v=k_bPBsprMLI,https://www.youtube.com/watch?v=aqdLeWu9Iek,https://www.youtube.com/watch?v=24DEuZL-8zs,https://www.youtube.com/watch?v=H4bhtsPSn8w,https://www.youtube.com/watch?v=zn-WjcBSCyA,https://www.youtube.com/watch?v=ipLbst-yENs,https://www.youtube.com/watch?v=JTEOJtobmOE,https://www.youtube.com/watch?v=sf2k0vkE7RM,https://www.youtube.com/watch?v=-wDNVY8CcpI,https://www.youtube.com/watch?v=vKOquqNuoNw,https://www.youtube.com/watch?v=vlQzGUUgajw,https://www.youtube.com/watch?v=wtF--lG5sSM,https://www.youtube.com/watch?v=8YUoFbeEWbU,https://www.youtube.com/watch?v=bEpP3ube-uM,https://www.youtube.com/watch?v=P0enXHMINTk,https://www.youtube.com/watch?v=oSXttPjjb4I";

const DEFAULT_DATA = [
  {
    url: "https://www.youtube.com/watch?v=HDCfAR8uqt8",
  },
  {
    url: "https://www.youtube.com/watch?v=ezb55xSinoY",
    title: "Машинки бип бип",
    tags: [0],
  },
  {
    url: "https://www.youtube.com/watch?v=LbOve_UZZ54",
    title: "Синий трактор По полям",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=q4x5u0Xn0oA",
    title: "Насекомые",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=nb3Er4FFxDE",
    title: "Бабайка",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=wxASnLPMYow",
    title: "Ягодки",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=LqjEFouRNMc",
    title: "Микробы",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=0tSBxGHcaFA",
    title: "Песенка про акуленка",
  },
  {
    url: "https://www.youtube.com/watch?v=4iHQev6oHEo",
    title: "Песенка про тракторенка",
  },
  {
    url: "https://www.youtube.com/watch?v=1TYl3jhfEDA",
    title: "Маша и медведь мультик про хрюшку",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=KYniUCGPGLs",
    title: "Маша и каша",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=CU5o1wGnHsY&t=33s",
    title: "Маша и дед мороз",
    img: process.env.PUBLIC_URL + `/images/маша и дед мороз.png`,
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=lMKqlFRCiu8",
    title: "Маша про японию",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=wnapUUjPGJw",
    title: "Маша и китайский новый год",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=lr28F6E3H_o",
    title: "смешарики нюша на велосипеде",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=1WyUN66MMlc",
    title: "смешарики лосяш и бутерброд",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=qpw-7O72DP8",
    title: "смешарики ля",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=ACKYp0lfP3o",
    title: "смешарики лосяш и привязанность",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=wC-mrwnfQZ0",
    title: "смешарики про финтики",
    tags: [4],
  },
  // {
  //   url: "https://www.youtube.com/watch?v=sIygYJTLr7A",
  //   title: "мэтр и нло",
  //   tags: [2],
  // },
  {
    url: "https://www.youtube.com/watch?v=ghewt4GdSMU",
    title: "мэтр детектив",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=qcHE5dh9dws",
    title: "мэтр на луне",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=dA5wFDP1SkQ&list=PL8XzBNh9xhcz2XwhGg7etnDGZHXRvRhId&index=5",
    tags: [5],
    title: "Бибика про большие машины",
    img: "https://i.ytimg.com/vi/dA5wFDP1SkQ/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCv1YfhbvIPaTA20c7qvufm4NYF3w",
  },
  {
    url: "https://www.youtube.com/watch?v=vLJahVX2nx0&t",
    tags: [5],
    title: "Бибика про погоду",
    img: "https://i.ytimg.com/vi/vLJahVX2nx0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD-u4P5CT2OM7wZwAkAmOy3kHPRow",
  },
  {
    url: "https://www.youtube.com/watch?v=MVGEY3HOy2E",
    tags: [5],
    title: "Бибика животные африки",
  },
  {
    url: "https://www.youtube.com/watch?v=WyeTqzcD8yo&t=81s",
    tags: [5],
    title: "Бибика про овощи",
    img: process.env.PUBLIC_URL + `/images/bibika vegetable.jfif`,
  },
  {
    url: "https://www.youtube.com/watch?v=8oJ0ldbIA3I",
    tags: [5],
    title: "Бибика домашние животные",
  },
  {
    title: "говорящие буквы",
    url: "https://www.youtube.com/watch?v=wtF--lG5sSM",
  },
  {
    title: "считалочка кенгуренка",
    url: "https://www.youtube.com/watch?v=_IuHXKaPJ_g",
  },
  {
    title: "бибика",
    url: "https://www.youtube.com/watch?v=MQyEySdw4bI",
  },
  {
    title: "чик чирикино ла ла ла",
    url: "https://www.youtube.com/watch?v=_EWVDa7UiYs",
  },
  {
    title: "смешарики алфавит",
    url: "https://www.youtube.com/watch?v=bEpP3ube-uM",
  },
  {
    title: "песня про числа",
    url: "https://www.youtube.com/watch?v=uJdObWuZfW8",
  },
  {
    title: "танец акуленка",
    url: "https://www.youtube.com/watch?v=XqZsoesa55w",
  },
  {
    title: "синий трактор про мусоровоз",
    url: "https://www.youtube.com/watch?v=LG6jaTbxiFs",
  },
  {
    title: "смешарики город омск",
    url: "https://www.youtube.com/watch?v=Wl1NCmgXptY",
  },
];

const PROCESS_DATA = [
  ...LINKS.split(",").map((link) => {
    return {
      url: link,
    };
  }),
  ...DEFAULT_DATA,
];

export const DATA = PROCESS_DATA.map((item, index) => {
  const newData = { ...item };

  if (!newData.title) {
    newData.title = "title_" + index;
  }

  return newData;
});

console.log("DATA: ", DATA);

export const TOP_SCROLL = [
  {
    title: "теремок тв",
    isTag: true,
    img: "https://www.novochag.ru/upload/img_cache/479/479de871dbc335c7c125380b3411e472_ce_1899x1265x176x0_cropped_666x444.png",
  },
  {
    title: "синий трактор",
    isTag: true,
    img: "https://avatars.yandex.net/get-music-content/5412783/a09cf826.p.4355577/m1000x1000",
  },
  {
    isTag: true,
    title: "байки мэтра",
    img: "https://media.myshows.me/shows/760/a/97/a97c038b7c6ce14f96d8a0022a4b87b0.jpg",
  },
  {
    isTag: true,
    title: "маша и медведь",
    img: "https://cdnn21.img.ria.ru/images/152264/38/1522643869_0:0:1600:900_600x0_80_0_0_1643e97c321f8bc6d1442cf5a5954071.jpg",
  },
  {
    isTag: true,
    title: "смешарики",
    img: "https://www.karusel-tv.ru/media/suit/preview_full/media/image/2020/09/1599471598116137_1.png",
  },
  {
    isTag: true,
    title: "Бибика",
    img: "https://i.ytimg.com/vi/g8AVQXoYWs4/maxresdefault.jpg",
  },
];
