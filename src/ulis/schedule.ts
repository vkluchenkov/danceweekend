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
        end: '12:30',
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
        id: 3,
        start: '12:15',
        end: '13:45',
        type: 'workshop',
        translations: {
          en: {
            title: 'Dariya Babak',
            description: 'TBA',
          },
          ru: {
            title: 'Дарья Бабак',
            description: 'Будет объявлено позже',
          },
        },
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
      },
      {
        id: 9,
        start: '14:30',
        end: '17:30',
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
      },
      {
        id: 14,
        start: '15:30',
        type: 'contest',
        translations: {
          en: {
            title: 'Competition (Baby, Kids, Juniors, Adults beginners)',
          },
          ru: {
            title: 'Конкурс (Беби, Дети, Юниоры, Взрослые начинающие)',
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
      },
      {
        id: 17,
        start: '15:30',
        type: 'contest',
        translations: {
          en: {
            title: 'Competition (Adults semi-professionals, Professionals)',
          },
          ru: {
            title: 'Конкурс (Взрослые продолжающие, Профессионалы)',
          },
        },
      },
    ],
  },
];
