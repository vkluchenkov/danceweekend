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
        dayTitle: '17.08 Thursday',
      },
      ru: {
        dayTitle: '17.08 Четверг',
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
        end: '11:00',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: 'Mejanse choreography',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Хореография Mejanse',
          },
        },
      },
      {
        id: 3,
        start: '11:15',
        end: '13:15',
        type: 'workshop',
        teachersPriceGroup: 'group2',
        translations: {
          en: {
            title: 'Eva Charkina',
            description: 'Muwashahat choreography',
          },
          ru: {
            title: 'Ева Чаркина',
            description: 'Хореография Muwashahat',
          },
        },
      },
      {
        id: 4,
        start: '13:30',
        end: '16:00',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Aliah & Chronis Taxidis',
            description: 'Tarab choreography with live music',
          },
          ru: {
            title: 'Aliah & Chronis Taxidis',
            description: 'Хореография Tarab под живую музыку',
          },
        },
      },
      {
        id: 5,
        start: '16:15',
        end: '18:15',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Leandro Ferreyra',
            description: 'Latin drum solo choreography',
          },
          ru: {
            title: 'Leandro Ferreyra',
            description: 'Хореография Latin drum solo',
          },
        },
      },
      {
        id: 6,
        start: '20:00',
        type: 'other',
        translations: {
          en: {
            title: 'Welcome party',
          },
          ru: {
            title: 'Welcome party',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '18.08 Friday',
      },
      ru: {
        dayTitle: '18.08 Пятница',
      },
    },
    dayEvents: [
      {
        id: 7,
        start: '9:00',
        end: '11:30',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: 'Drum solo choreography',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: 'Хореография Drum solo',
          },
        },
      },
      {
        id: 8,
        start: '11:45',
        end: '13:45',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Pablo Acosta',
            description: 'Modern balady choreography',
          },
          ru: {
            title: 'Pablo Acosta',
            description: 'Хореография Modern balady',
          },
        },
      },
      {
        id: 9,
        start: '14:00',
        end: '15:30',
        type: 'workshop',
        teachersPriceGroup: 'group2',
        translations: {
          en: {
            title: 'Polina Ostrovska',
            description: 'Mejanse choreography',
          },
          ru: {
            title: 'Полина Островская',
            description: 'Хореография Mejanse',
          },
        },
      },
      {
        id: 10,
        start: '15:45',
        end: '18:15',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Chronis Taxidis',
            description: 'Live tabla improvisation for competitions',
          },
          ru: {
            title: 'Chronis Taxidis',
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
            title: 'Arabic Dreams gala show',
            description: 'with festival stars',
          },
          ru: {
            title: 'Гала шоу Arabic Dreams',
            description: 'со звездами фестиваля',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '19.08 Saturday',
      },
      ru: {
        dayTitle: '19.08 Суббота',
      },
    },
    dayEvents: [
      {
        id: 12,
        start: '9:00',
        type: 'contest',
        translations: {
          en: {
            title: 'Competition',
          },
          ru: {
            title: 'Конкурс',
          },
        },
      },
    ],
  },
  {
    translations: {
      en: {
        dayTitle: '20.08 Sunday',
      },
      ru: {
        dayTitle: '20.08 Воскресенье',
      },
    },
    dayEvents: [
      {
        id: 13,
        start: '9:00',
        end: '11:00',
        type: 'workshop',
        teachersPriceGroup: 'group1',
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
      },
      {
        id: 14,
        start: '11:15',
        end: '13:45',
        type: 'workshop',
        teachersPriceGroup: 'group1',
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
        id: 15,
        start: '14:00',
        end: '16:00',
        type: 'workshop',
        teachersPriceGroup: 'group2',
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
      },
      {
        id: 16,
        start: '16:15',
        end: '18:15',
        type: 'workshop',
        teachersPriceGroup: 'group1',
        translations: {
          en: {
            title: 'Pablo Acosta',
            description: 'Fusion tango oriental choreography',
          },
          ru: {
            title: 'Pablo Acosta',
            description: 'Хореография Fusion tango oriental',
          },
        },
      },
      {
        id: 17,
        start: '19:30',
        type: 'show',
        translations: {
          en: {
            title: 'World show',
            description: 'Gala show with festival participants',
          },
          ru: {
            title: 'World show',
            description: 'Гала шоу с участницами фестиваля',
          },
        },
      },
    ],
  },
];
