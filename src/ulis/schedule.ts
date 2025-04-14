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
        dayTitle: '21.08 Thursday',
      },
      ru: {
        dayTitle: '21.08 Четверг',
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
        teachersPriceGroup: 'group1',
      },
      {
        id: 3,
        start: '12:15',
        end: '13:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Dariya Babak',
            description: 'Iraqi choreography',
          },
          ru: {
            title: 'Дарья Бабак',
            description: 'Хореография Iraqi',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 4,
        start: '14:00',
        end: '15:30',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aliah',
            description: 'Shaabi choreography',
          },
          ru: {
            title: 'Aliah',
            description: 'Хореография Shaabi',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 5,
        start: '15:45',
        end: '17:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Pablo Acosta',
            description: 'Flamenco fusion choreography',
          },
          ru: {
            title: 'Pablo Acosta',
            description: 'Хореография Flamenco fusion',
          },
        },
        teachersPriceGroup: 'group1',
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
        dayTitle: '22.08 Friday',
      },
      ru: {
        dayTitle: '22.08 Пятница',
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
            description: 'Pop song choreography',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Хореография Pop song',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 8,
        start: '12:15',
        end: '14:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Marta Korzun',
            description: 'Graceful Arms & Expressive Hands',
          },
          ru: {
            title: 'Марта Корзун',
            description: 'Грациозные руки и выразительные кисти',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 9,
        start: '14:30',
        end: '17:00',
        type: 'workshop',
        translations: {
          en: {
            title: 'Khader Ahmad',
            description: 'Live tabla improvisation (practice)',
          },
          ru: {
            title: 'Khader Ahmad',
            description: 'Live tabla импровизация (практика)',
          },
        },
        teachersPriceGroup: 'group1',
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
        dayTitle: '23.08 Saturday',
      },
      ru: {
        dayTitle: '23.08 Суббота',
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
            title: 'Marta Korzun',
            description: 'Classical oriental choreography',
          },
          ru: {
            title: 'Марта Корзун',
            description: 'Хореография Classical oriental',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 13,
        start: '11:15',
        end: '13:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Levana',
            description: 'Baladi choreography',
          },
          ru: {
            title: 'Levana',
            description: 'Хореография Baladi',
          },
        },
        teachersPriceGroup: 'group2',
      },
      {
        id: 14,
        start: '15:30',
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
        dayTitle: '24.08 Sunday',
      },
      ru: {
        dayTitle: '24.08 Воскресенье',
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
            title: 'Pablo Acosta',
            description: 'Mejance choreography',
          },
          ru: {
            title: 'Pablo Acosta',
            description: 'Хореография Mejance',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 16,
        start: '11:15',
        end: '13:15',
        type: 'workshop',
        translations: {
          en: {
            title: 'Aliah',
            description: 'Drum\u00A0solo choreography',
          },
          ru: {
            title: 'Aliah',
            description: 'Хореография Drum\u00A0solo',
          },
        },
        teachersPriceGroup: 'group1',
      },
      {
        id: 17,
        start: '15:30',
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
