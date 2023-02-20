interface Event {
  start: string;
  end?: string;
  titleEn: string;
  titleRu: string;
  descriptionEn?: string;
  descriptionRu?: string;
}

interface Day {
  dayTitleEn: string;
  dayTitleRu: string;
  dayEvents: Event[];
}

export const schedule: Day[] = [
  {
    dayTitleEn: '17.08 Thursday',
    dayTitleRu: '17.08 Четверг',
    dayEvents: [
      {
        start: '8:30',
        titleEn: 'Check-in',
        titleRu: 'Регистрация',
      },
      {
        start: '9:00',
        end: '11:00',
        titleEn: 'Aleksey Riaboshapka',
        titleRu: 'Алексей Рябошапка',
        descriptionEn: 'Classical oriental choreography',
        descriptionRu: 'Хореография Classical oriental',
      },
      {
        start: '11:15',
        end: '13:15',
        titleEn: 'Eva Charkina',
        titleRu: 'Ева Чаркина',
        descriptionEn: 'Muwashahat choreography',
        descriptionRu: 'Хореография Muwashahat',
      },
      {
        start: '13:30',
        end: '16:00',
        titleEn: 'Aliah & Chronis Taxidis',
        titleRu: 'Aliah & Chronis Taxidis',
        descriptionEn: 'Tarab choreography with live music',
        descriptionRu: 'Хореография Tarab под живую музыку',
      },
      {
        start: '16:15',
        end: '18:15',
        titleEn: 'Leandro Ferreyra',
        titleRu: 'Leandro Ferreyra',
        descriptionEn: 'Latin drum solo choreography',
        descriptionRu: 'Хореография Latin drum solo',
      },
      {
        start: '20:00',
        titleEn: 'Welcome party',
        titleRu: 'Welcome party',
      },
    ],
  },
  {
    dayTitleEn: '18.08 Friday',
    dayTitleRu: '18.08 Пятница',
    dayEvents: [
      {
        start: '9:00',
        end: '11:30',
        titleEn: 'Diana Gnatchenko',
        titleRu: 'Диана Гнатченко',
        descriptionEn: 'Drum solo choreography',
        descriptionRu: 'Хореография Drum solo',
      },
      {
        start: '11:45',
        end: '13:45',
        titleEn: 'Pablo Acosta',
        titleRu: 'Pablo Acosta',
        descriptionEn: 'Modern balady choreography',
        descriptionRu: 'Хореография Modern balady',
      },
      {
        start: '14:00',
        end: '15:30',
        titleEn: 'Polina Ostrovska',
        titleRu: 'Полина Островская',
        descriptionEn: 'Mejanse choreography',
        descriptionRu: 'Хореография Mejanse',
      },
      {
        start: '16:45',
        end: '18:15',
        titleEn: 'Chronis Taxidis',
        titleRu: 'Chronis Taxidis',
        descriptionEn: 'Live tabla improvisation for competitions',
        descriptionRu: 'Live tabla — конкурсная импровизация',
      },
      {
        start: '20:00',
        titleEn: 'Arabic Dreams gala show',
        titleRu: 'Гала шоу Arabic Dreams',
        descriptionEn: 'with festival stars',
        descriptionRu: 'со звездами фестиваля',
      },
    ],
  },
  {
    dayTitleEn: '19.08 Saturday',
    dayTitleRu: '19.08 Суббота',
    dayEvents: [
      {
        start: '9:00',
        titleEn: 'Competition',
        titleRu: 'Конкурс',
      },
    ],
  },
  {
    dayTitleEn: '20.08 Sunday',
    dayTitleRu: '20.08 Воскресенье',
    dayEvents: [
      {
        start: '9:00',
        end: '11:00',
        titleEn: 'Aleksey Riaboshapka',
        titleRu: 'Алексей Рябошапка',
        descriptionEn: 'Dabke choreography',
        descriptionRu: 'Хореография Dabke',
      },
      {
        start: '11:15',
        end: '13:45',
        titleEn: 'Diana Gnatchenko',
        titleRu: 'Диана Гнатченко',
        descriptionEn: '???',
        descriptionRu: '???',
      },
      {
        start: '14:00',
        end: '16:00',
        titleEn: 'Levana',
        titleRu: 'Levana',
        descriptionEn: 'Shaaby choreography',
        descriptionRu: 'Хореография Shaaby',
      },
      {
        start: '16:15',
        end: '18:15',
        titleEn: 'Pablo Acosta',
        titleRu: 'Pablo Acosta',
        descriptionEn: 'Fusion tango oriental choreography',
        descriptionRu: 'Хореография Fusion tango oriental',
      },
      {
        start: '19:00',
        titleEn: 'World show',
        titleRu: 'World show',
        descriptionEn: 'Gala show with festival participants',
        descriptionRu: 'Гала шоу с участницами фестиваля',
      },
    ],
  },
];
