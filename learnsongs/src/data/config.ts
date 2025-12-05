import { AppConfig } from "../types/song";

export const appConfig: AppConfig = {
  songs: [
    {
      id: "tractor",
      title: "Синий трактор",
      lines: [
        [
          { text: "Что", audio: "/audio/tractor/chto.mp3", id: "t1" },
          { text: "ты", audio: "/audio/tractor/ty.mp3", id: "t2" },
          { text: "делал", audio: "/audio/tractor/delal.mp3", id: "t3" },
          { text: "Синий", audio: "/audio/tractor/sinii.mp3", id: "t4" },
          { text: "трактор", audio: "/audio/tractor/traktor.mp3", id: "t5" }
        ],
        [
          { text: "Ездил", audio: "/audio/tractor/ezdil.mp3", id: "t6" },
          { text: "по", audio: "/audio/tractor/po.mp3", id: "t7" },
          { text: "каким", audio: "/audio/tractor/kakim.mp3", id: "t8" },
          { text: "делам", audio: "/audio/tractor/delam.mp3", id: "t9" }
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