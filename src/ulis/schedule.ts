import { SupportedLangs } from '@/src/types';

interface Event {
  start: string;
  end?: string;
  translations: {
    [lang in SupportedLangs]: {
      title: string;
      description?: string;
    };
  };
}

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
        start: '8:30',
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
        start: '9:00',
        end: '11:00',
        translations: {
          en: {
            title: 'Aleksey Riaboshapka',
            description: 'Classical oriental choreography',
          },
          ru: {
            title: 'Алексей Рябошапка',
            description: 'Хореография Classical oriental',
          },
        },
      },
      {
        start: '11:15',
        end: '13:15',
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
        start: '13:30',
        end: '16:00',
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
        start: '16:15',
        end: '18:15',
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
        start: '20:00',
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
        start: '9:00',
        end: '11:30',
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
        start: '11:45',
        end: '13:45',
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
        start: '14:00',
        end: '15:30',
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
        start: '16:45',
        end: '18:15',
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
        start: '20:00',
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
        start: '9:00',
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
        start: '9:00',
        end: '11:00',
        translations: {
          en: {
            title: 'Aleksey Riaboshapka',
            description: 'Dabke choreography',
          },
          ru: {
            title: 'Алексей Рябошапка',
            description: 'Хореография Dabke',
          },
        },
      },
      {
        start: '11:15',
        end: '13:45',
        translations: {
          en: {
            title: 'Diana Gnatchenko',
            description: '???',
          },
          ru: {
            title: 'Диана Гнатченко',
            description: '???',
          },
        },
      },
      {
        start: '14:00',
        end: '16:00',
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
        start: '16:15',
        end: '18:15',
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
        start: '19:00',
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
