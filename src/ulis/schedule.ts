import { SupportedLangs } from '@/src/types';

export interface Workshop {
  id: number;
  start: string;
  end: string;
  translations: {
    [lang in SupportedLangs]: {
      title: string;
      description?: string;
    };
  };
  type: 'workshop';
}

interface OtherEvent {
  id: number;
  start: string;
  end?: string;
  translations: {
    [lang in SupportedLangs]: {
      title: string;
      description?: string;
    };
  };
  type: 'show' | 'contest' | 'other';
}

type Event = Workshop | OtherEvent;

interface Day {
  translations: {
    [lang in SupportedLangs]: {
      dayTitle: string;
    };
  };
  dayEvents: Event[];
}

export const schedule: Day[] = [
  {
    translations: {
      en: {
        dayTitle: '22.08 Thursday',
      },
      ru: {
        dayTitle: '22.08 Четверг',
      },
    },
    dayEvents: [
      {
        id: 1,
        start: '8:30',
        type: 'other',
        translations: {
          en: {
            title: 'Check-in',
          },
          ru: {
            title: 'Регистрация',
          },
        },
      },
      {
        id: 2,
        start: '9:00',
        end: '11:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: 'TBA',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Будет объявлено позднее',
          },
        },
      },
      {
        id: 3,
        start: '11:45',
        end: '13:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Kate Ksenzova',
            description: 'Dabke choreography',
          },
          ru: {
            title: 'Екатерина Ксензова',
            description: 'Хореография Dabke',
          },
        },
      },
      {
        id: 4,
        start: '13:30',
        end: '15:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aliah',
            description: 'Pop\u00A0song choreography',
          },
          ru: {
            title: 'Aliah',
            description: 'Хореография Pop song',
          },
        },
      },
      {
        id: 5,
        start: '15:45',
        end: '17:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Alex Delora',
            description: 'Shimmy technique',
          },
          ru: {
            title: 'Alex Delora',
            description: 'Техника Shimmy',
          },
        },
      },
      {
        id: 6,
        start: '20:00',
        type: 'show',
        translations: {
          en: {
            title: 'World show',
            description: 'Gala show with festival\u00A0participants',
          },
          ru: {
            title: 'World show',
            description: 'Гала шоу с\u00A0участницами фестиваля',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '23.08 Friday',
      },
      ru: {
        dayTitle: '23.08 Пятница',
      },
    },
    dayEvents: [
      {
        id: 7,
        start: '9:00',
        end: '11:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: 'Drum solo choreography',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Хореография Drum\u00A0solo',
          },
        },
      },
      {
        id: 8,
        start: '11:45',
        end: '13:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Levana',
            description: 'Shaabi choreography',
          },
          ru: {
            title: 'Levana',
            description: 'Хореография Shaabi',
          },
        },
      },
      {
        id: 9,
        start: '13:30',
        end: '15:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Mohanned Hawaz',
            description: 'Iraqi Al-Khashaba style choreography',
          },
          ru: {
            title: 'Mohanned Hawaz',
            description: 'Хореография Iraqi Al-Khashaba style',
          },
        },
      },
      {
        id: 10,
        start: '15:45',
        end: '17:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Khader Ahmad',
            description: 'Live tabla improvisation for competitions',
          },
          ru: {
            title: 'Khader Ahmad',
            description: 'Live tabla — конкурсная импровизация',
          },
        },
      },
      {
        id: 11,
        start: '20:00',
        type: 'show',
        translations: {
          en: {
            title: 'Arabic\u00A0Dreams gala\u00A0show',
            description: 'with festival stars',
          },
          ru: {
            title: 'Гала\u00A0шоу Arabic\u00A0Dreams',
            description: 'со звездами фестиваля',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '24.08 Saturday',
      },
      ru: {
        dayTitle: '24.08 Суббота',
      },
    },
    dayEvents: [
      {
        id: 12,
        start: '09:00',
        end: '11:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aida Bogomolova',
            description: 'Baladi choreography',
          },
          ru: {
            title: 'Аида Богомолова',
            description: 'Хореография Baladi',
          },
        },
      },
      {
        id: 13,
        start: '11:15',
        end: '13:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Mohanned Hawaz',
            description: 'Iraqi Kawliya style choreography',
          },
          ru: {
            title: 'Mohanned Hawaz',
            description: 'Хореография Iraqi Kawliya style',
          },
        },
      },
      {
        id: 14,
        start: '15:00',
        type: 'contest',
        translations: {
          en: {
            title: 'Competition part 1',
          },
          ru: {
            title: 'Конкурс часть 1',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '25.08 Sunday',
      },
      ru: {
        dayTitle: '25.08 Воскресенье',
      },
    },
    dayEvents: [
      {
        id: 15,
        start: '9:00',
        end: '11:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aida Bogomolova',
            description: 'Tarab choreography',
          },
          ru: {
            title: 'Аида Богомолова',
            description: 'Хореография Tarab',
          },
        },
      },
      {
        id: 16,
        start: '11:15',
        end: '13:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Alex Delora',
            description: 'Drum\u00A0solo choreography',
          },
          ru: {
            title: 'Alex Delora',
            description: 'Хореография Drum\u00A0solo',
          },
        },
      },
      {
        id: 17,
        start: '15:00',
        type: 'contest',
        translations: {
          en: {
            title: 'Competition part 2',
          },
          ru: {
            title: 'Конкурс часть 2',
          },
        },
      },
    ],
  },
];
