import { AppConfig } from "../types/song";

export const appConfig: AppConfig = {
  songs: [
    {
      id: "tractor",
      title: "Синий трактор",
      lines: [
        [
          { text: "Что", audio: "/audio/tractor/1.mp3", id: "t1", image: "/images/placeholder.svg" },
          { text: "ты", audio: "/audio/tractor/2.mp3", id: "t2", image: "/images/placeholder.svg" },
          { text: "делал", audio: "/audio/tractor/3.mp3", id: "t3", image: "/images/placeholder.svg" },
          { text: "Синий", audio: "/audio/tractor/4.mp3", id: "t4", image: "/images/placeholder.svg" },
          { text: "трактор", audio: "/audio/tractor/5.mp3", id: "t5", image: "/images/placeholder.svg" }
        ],
        [
          { text: "Ездил", audio: "/audio/tractor/6.mp3", id: "t6", image: "/images/placeholder.svg" },
          { text: "по", audio: "/audio/tractor/7.mp3", id: "t7", image: "/images/placeholder.svg" },
          { text: "каким", audio: "/audio/tractor/8.mp3", id: "t8", image: "/images/placeholder.svg" },
          { text: "делам", audio: "/audio/tractor/9.mp3", id: "t9", image: "/images/placeholder.svg" }
        ],
        [
          { text: "Нам", audio: "/audio/tractor/10.mp3", id: "t10", image: "/images/placeholder.svg" },
          { text: "ужасно", audio: "/audio/tractor/11.mp3", id: "t11", image: "/images/placeholder.svg" },
          { text: "интересно", audio: "/audio/tractor/12.mp3", id: "t12", image: "/images/placeholder.svg" }
        ],
        [
          { text: "Просто", audio: "/audio/tractor/13.mp3", id: "t13", image: "/images/placeholder.svg" },
          { text: "очень", audio: "/audio/tractor/14.mp3", id: "t14", image: "/images/placeholder.svg" },
          { text: "интересно", audio: "/audio/tractor/15.mp3", id: "t12-2", image: "/images/placeholder.svg" }
        ],
        [
          { text: "Просто", audio: "/audio/tractor/16.mp3", id: "t13-2", image: "/images/placeholder.svg" },
          { text: "дико", audio: "/audio/tractor/17.mp3", id: "t15", image: "/images/placeholder.svg" },
          { text: "интересно", audio: "/audio/tractor/18.mp3", id: "t12-3", image: "/images/placeholder.svg" }
        ],
        [
          { text: "Расскажи", audio: "/audio/tractor/19.mp3", id: "t16", image: "/images/placeholder.svg" },
          { text: "скорее", audio: "/audio/tractor/20.mp3", id: "t17", image: "/images/placeholder.svg" },
          { text: "нам", audio: "/audio/tractor/21.mp3", id: "t10-2", image: "/images/placeholder.svg" }
        ]
      ],
      metadata: {
        difficulty: "easy",
        duration: 30,
        tags: ["транспорт", "животные"]
      }
    },
    {
      id: "ded-moroz",
      title: "Дед мороз несет игрушки",
      lines: [
        [
          { text: "Дед мороз", audio: "/audio/ded-moroz/1.mp3", id: "Дед мороз", image: "/images/ded-moroz/1.png" },
          { text: "несет", audio: "/audio/ded-moroz/2.mp3", id: "несет", image: "/images/ded-moroz/2.jfif" },
          { text: "игрушки", audio: "/audio/ded-moroz/3.mp3", id: "игрушки", image: "/images/ded-moroz/3.jfif" }
        ],
        [
          { text: "И", audio: "/audio/ded-moroz/4.mp3", id: "И1", image: "/images/ded-moroz/4.png" },
          { text: "гирлянды", audio: "/audio/ded-moroz/5.mp3", id: "гирлянды", image: "/images/ded-moroz/5.jfif" },
          { text: "и", audio: "/audio/ded-moroz/4.mp3", id: "и2", image: "/images/ded-moroz/4.png" },
          { text: "хлопушки", audio: "/audio/ded-moroz/6.mp3", id: "хлопушки", image: "/images/ded-moroz/6.jfif" }
        ],
        [
          { text: "Хороши", audio: "/audio/ded-moroz/7.mp3", id: "Хороши", image: "/images/ded-moroz/8.png" },
          { text: "подарки", audio: "/audio/ded-moroz/8.mp3", id: "подарки", image: "/images/ded-moroz/9.jfif" }
        ],
        [
          { text: "Праздник", audio: "/audio/ded-moroz/9.mp3", id: "праздник", image: "/images/ded-moroz/10.jfif" },
          { text: "Будет", audio: "/audio/ded-moroz/10.mp3", id: "Будет", image: "/images/ded-moroz/11.png" },
          { text: "яркий", audio: "/audio/ded-moroz/11.mp3", id: "яркий", image: "/images/ded-moroz/12.png" }
        ]
      ],
      metadata: {
        difficulty: "easy",
        duration: 20,
        tags: ["новый год", "праздник"]
      }
    }
  ],
  defaultSongId: "tractor"
};