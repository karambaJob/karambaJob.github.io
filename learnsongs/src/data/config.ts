import { AppConfig } from "../types/song";

export const appConfig: AppConfig = {
  songs: [
    {
      id: "tractor",
      title: "Синий трактор",
      lines: [
        [
          { text: "Что", audio: "/audio/tractor/1.mp3", id: "t1" },
          { text: "ты", audio: "/audio/tractor/2.mp3", id: "t2" },
          { text: "делал", audio: "/audio/tractor/3.mp3", id: "t3" },
          { text: "Синий", audio: "/audio/tractor/4.mp3", id: "t4" },
          { text: "трактор", audio: "/audio/tractor/5.mp3", id: "t5" }
        ],
        [
          { text: "Ездил", audio: "/audio/tractor/6.mp3", id: "t6" },
          { text: "по", audio: "/audio/tractor/7.mp3", id: "t7" },
          { text: "каким", audio: "/audio/tractor/8.mp3", id: "t8" },
          { text: "делам", audio: "/audio/tractor/9.mp3", id: "t9" }
        ],
        [
          { text: "Нам", audio: "/audio/tractor/10.mp3", id: "t10" },
          { text: "ужасно", audio: "/audio/tractor/11.mp3", id: "t11" },
          { text: "интересно", audio: "/audio/tractor/12.mp3", id: "t12" }
        ],
        [
          { text: "Просто", audio: "/audio/tractor/13.mp3", id: "t13" },
          { text: "очень", audio: "/audio/tractor/14.mp3", id: "t14" },
          { text: "интересно", audio: "/audio/tractor/15.mp3", id: "t12-2" }
        ],
        [
          { text: "Просто", audio: "/audio/tractor/16.mp3", id: "t13-2" },
          { text: "дико", audio: "/audio/tractor/17.mp3", id: "t15" },
          { text: "интересно", audio: "/audio/tractor/18.mp3", id: "t12-3" }
        ],
        [
          { text: "Расскажи", audio: "/audio/tractor/19.mp3", id: "t16" },
          { text: "скорее", audio: "/audio/tractor/20.mp3", id: "t17" },
          { text: "нам", audio: "/audio/tractor/21.mp3", id: "t10-2" }
        ]
      ],
      metadata: {
        difficulty: "easy",
        duration: 30,
        tags: ["транспорт", "животные"]
      }
    }
  ],
  defaultSongId: "tractor"
};