import { SupportedLangs } from '../types/langs';

type Level = 'beginners' | 'allStyles' | 'intermediate' | 'professionals' | 'openLevel';

interface Category {
  translations: {
    [lang in SupportedLangs]: {
      categoryTitle: string;
    };
  };
}

interface ContestCategory {
  age: string;
  levels: Level[];
  translations: {
    [lang in SupportedLangs]: {
      title: string;
    };
  };
  categories: Category[];
}

export const contestCategories: ContestCategory[] = [
  {
    age: '4-6',
    levels: ['allStyles'],
    translations: {
      en: {
        title: 'Baby',
      },
      ru: {
        title: 'Беби',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'All styles',
          },
          ru: {
            categoryTitle: 'Все стили',
          },
        },
      },
    ],
  },

  {
    age: '7-11',
    levels: ['beginners', 'intermediate'],
    translations: {
      en: {
        title: 'Kids solo',
      },
      ru: {
        title: 'Дети начинающие',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Solo classic',
          },
          ru: {
            categoryTitle: 'Соло классика',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo folk',
          },
          ru: {
            categoryTitle: 'Соло фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla CD',
          },
          ru: {
            categoryTitle: 'Соло табла CD',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla live',
          },
          ru: {
            categoryTitle: 'Соло табла live',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo show/fusion',
          },
          ru: {
            categoryTitle: 'Соло шоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo bollywood',
          },
          ru: {
            categoryTitle: 'Соло болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo pop song',
          },
          ru: {
            categoryTitle: 'Соло эстрадная песня',
          },
        },
      },
    ],
  },

  {
    age: '7-11',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Kids duos',
      },
      ru: {
        title: 'Дети дуэты',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'All styles',
          },
          ru: {
            categoryTitle: 'Все стили',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bbollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '7-11',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Kids groups',
      },
      ru: {
        title: 'Дети группы',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Oriental',
          },
          ru: {
            categoryTitle: 'Ориентал',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Folklore',
          },
          ru: {
            categoryTitle: 'Фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tabla solo',
          },
          ru: {
            categoryTitle: 'Табла соло',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Щоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '12-15',
    levels: ['beginners', 'professionals'],
    translations: {
      en: {
        title: 'Juniors',
      },
      ru: {
        title: 'Юниоры',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Solo classic',
          },
          ru: {
            categoryTitle: 'Соло классика',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo folk',
          },
          ru: {
            categoryTitle: 'Соло фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla CD',
          },
          ru: {
            categoryTitle: 'Соло табла CD',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla live',
          },
          ru: {
            categoryTitle: 'Соло табла live',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo show/fusion',
          },
          ru: {
            categoryTitle: 'Соло шоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo bollywood',
          },
          ru: {
            categoryTitle: 'Соло болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo pop song',
          },
          ru: {
            categoryTitle: 'Соло эстрадная песня',
          },
        },
      },
    ],
  },

  {
    age: '12-15',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Juniors duos',
      },
      ru: {
        title: 'Юниоры дуэты',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Oriental',
          },
          ru: {
            categoryTitle: 'Ориентал',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Folklore',
          },
          ru: {
            categoryTitle: 'Фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tabla solo',
          },
          ru: {
            categoryTitle: 'Табла соло',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Щоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '12-15',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Juniors groups',
      },
      ru: {
        title: 'Юниоры группы',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Oriental',
          },
          ru: {
            categoryTitle: 'Ориентал',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Folklore',
          },
          ru: {
            categoryTitle: 'Фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tabla solo',
          },
          ru: {
            categoryTitle: 'Табла соло',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Щоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '16+',
    levels: ['beginners', 'professionals'],
    translations: {
      en: {
        title: 'Adults',
      },
      ru: {
        title: 'Взрослые',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Solo classic',
          },
          ru: {
            categoryTitle: 'Соло классика',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo folk',
          },
          ru: {
            categoryTitle: 'Соло фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla CD',
          },
          ru: {
            categoryTitle: 'Соло табла CD',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla live',
          },
          ru: {
            categoryTitle: 'Соло табла live',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo show/fusion',
          },
          ru: {
            categoryTitle: 'Соло шоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo bollywood',
          },
          ru: {
            categoryTitle: 'Соло болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo pop song',
          },
          ru: {
            categoryTitle: 'Соло эстрадная песня',
          },
        },
      },
    ],
  },

  {
    age: '16+',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Adults duos',
      },
      ru: {
        title: 'Взрослые дуэты',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Oriental',
          },
          ru: {
            categoryTitle: 'Ориентал',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Folklore',
          },
          ru: {
            categoryTitle: 'Фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tabla solo',
          },
          ru: {
            categoryTitle: 'Табла соло',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Щоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '16+',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Adults groups',
      },
      ru: {
        title: 'Взрослые группы',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Oriental',
          },
          ru: {
            categoryTitle: 'Ориентал',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Folklore',
          },
          ru: {
            categoryTitle: 'Фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tabla solo',
          },
          ru: {
            categoryTitle: 'Табла соло',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Щоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Bollywood',
          },
          ru: {
            categoryTitle: 'Болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Tribal',
          },
          ru: {
            categoryTitle: 'Трайбл',
          },
        },
      },
    ],
  },

  {
    age: '40+',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Seniors',
      },
      ru: {
        title: 'Сеньоры',
      },
    },
    categories: [
      {
        translations: {
          en: {
            categoryTitle: 'Solo classic',
          },
          ru: {
            categoryTitle: 'Соло классика',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo folk',
          },
          ru: {
            categoryTitle: 'Соло фольклор',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla CD',
          },
          ru: {
            categoryTitle: 'Соло табла CD',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo tabla live',
          },
          ru: {
            categoryTitle: 'Соло табла live',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo show/fusion',
          },
          ru: {
            categoryTitle: 'Соло шоу/фьюжн',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo bollywood',
          },
          ru: {
            categoryTitle: 'Соло болливуд',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Solo pop song',
          },
          ru: {
            categoryTitle: 'Соло эстрадная песня',
          },
        },
      },
    ],
  },
];
