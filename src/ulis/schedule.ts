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
  teachersPriceGroup: 'group1' | 'group2';
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
        dayTitle: '20.08 Thursday',
      },
      ru: {
        dayTitle: '20.08 Четверг',
      },
    },
    dayEvents: [
      {
        id: 1,
        start: '9:00',
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
        start: '9:30',
        end: '12:00',
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
        teachersPriceGroup: 'group2',
      },
      {
        id: 3,
        start: '12:15',
        end: '13:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Romina Maluf',
            description: 'Flamenco oriental choreography',
          },
          ru: {
            title: 'Romina Maluf',
            description: 'Хореография Flamenco oriental',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 4,
        start: '14:00',
        end: '15:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aliah',
            description: 'Mejance choreography',
          },
          ru: {
            title: 'Aliah',
            description: 'Хореография Mejance',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 5,
        start: '15:45',
        end: '17:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Kazafy',
            description: 'Muwashahat choreography',
          },
          ru: {
            title: 'Kazafy',
            description: 'Хореография Muwashahat',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 6,
        start: '20:00',
        type: 'show',
        translations: {
          en: {
            title: 'World show',
            description: 'Gala show with festival\u00A0participants. Free entrance',
          },
          ru: {
            title: 'World show',
            description: 'Гала шоу с\u00A0участницами фестиваля. Вход свободный',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '21.08 Friday',
      },
      ru: {
        dayTitle: '21.08 Пятница',
      },
    },
    dayEvents: [
      {
        id: 7,
        start: '9:30',
        end: '12:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: 'To be announced',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Будет объявлено позже',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 8,
        start: '12:15',
        end: '13:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aleksandra Dorofeeva',
            description: 'Drum solo fusion choreography',
          },
          ru: {
            title: 'Александра Дорофеева',
            description: 'Хореография Drum\u00A0solo fusion',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 9,
        start: '14:00',
        end: '16:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Leandro Ferreyra',
            description: 'Pop shaaby choreography',
          },
          ru: {
            title: 'Leandro Ferreyra',
            description: 'Хореография Pop shaaby',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 10,
        start: '16:15',
        end: '18:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Khader Ahmad',
            description: 'Live tabla improvisation (theory and practice)',
          },
          ru: {
            title: 'Khader Ahmad',
            description: 'Live tabla импровизация (теория и практика)',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 11,
        start: '20:00',
        type: 'show',
        translations: {
          en: {
            title: 'Arabic\u00A0Dreams gala\u00A0show',
            description: 'With festival stars. Free entrance',
          },
          ru: {
            title: 'Гала\u00A0шоу Arabic\u00A0Dreams',
            description: 'Cо звездами фестиваля. Вход свободный',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '22.08 Saturday',
      },
      ru: {
        dayTitle: '22.08 Суббота',
      },
    },
    dayEvents: [
      {
        id: 12,
        start: '9:00',
        end: '11:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Kazafy',
            description: 'Classical oriental choreography',
          },
          ru: {
            title: 'Kazafy',
            description: 'Хореография Classical oriental',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 13,
        start: '11:15',
        end: '12:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Levana',
            description: 'Shaaby choreography',
          },
          ru: {
            title: 'Levana',
            description: 'Хореография Shaaby',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 14,
        start: '14:30',
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
        dayTitle: '23.08 Sunday',
      },
      ru: {
        dayTitle: '23.08 Воскресенье',
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
            title: 'Leandro Ferreyra',
            description: 'Classical oriental choreography',
          },
          ru: {
            title: 'Leandro Ferreyra',
            description: 'Хореография Classical oriental',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 16,
        start: '11:15',
        end: '12:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aliah',
            description: 'Lyrical\u00A0pop song choreography',
          },
          ru: {
            title: 'Aliah',
            description: 'Хореография Lyrical\u00A0pop song',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 17,
        start: '14:30',
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
