import { SupportedLangs } from '@/src/types';

type Level = 'beginners' | 'intermediate' | 'professionals' | 'openLevel';

interface Category {
  translations: {
    [lang in SupportedLangs]: {
      categoryTitle: string;
    };
  };
}

interface ContestCategory {
  description?: string;
  age: string;
  levels: Level[];
  translations: {
    [lang in SupportedLangs]: {
      title: string;
    };
  };
  categories?: Category[];
}

const soloSet: Category[] = [
  {
    translations: {
      en: {
        categoryTitle: 'Classic',
      },
      ru: {
        categoryTitle: 'Классика',
      },
    },
  },
  {
    translations: {
      en: {
        categoryTitle: 'Folk',
      },
      ru: {
        categoryTitle: 'Фольклор',
      },
    },
  },
  {
    translations: {
      en: {
        categoryTitle: 'Tabla solo CD',
      },
      ru: {
        categoryTitle: 'Табла соло CD',
      },
    },
  },
  {
    translations: {
      en: {
        categoryTitle: 'Tabla solo live',
      },
      ru: {
        categoryTitle: 'Табла соло live',
      },
    },
  },
  {
    translations: {
      en: {
        categoryTitle: 'Show/fusion',
      },
      ru: {
        categoryTitle: 'Шоу/фьюжн',
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
        categoryTitle: 'Pop song',
      },
      ru: {
        categoryTitle: 'Эстрадная песня',
      },
    },
  },
];

export const contestCategories: ContestCategory[] = [
  {
    age: '4-6',
    levels: ['openLevel'],
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
    categories: soloSet,
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
            categoryTitle: 'Tabla solo CD',
          },
          ru: {
            categoryTitle: 'Табла соло CD',
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
    description: 'descriptionJuniors',
    levels: ['beginners', 'professionals'],
    translations: {
      en: {
        title: 'Juniors',
      },
      ru: {
        title: 'Юниоры',
      },
    },
    categories: soloSet,
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
            categoryTitle: 'Tabla solo CD',
          },
          ru: {
            categoryTitle: 'Табла соло CD',
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
            categoryTitle: 'Tabla solo CD',
          },
          ru: {
            categoryTitle: 'Табла соло CD',
          },
        },
      },
      {
        translations: {
          en: {
            categoryTitle: 'Show/fusion',
          },
          ru: {
            categoryTitle: 'Шоу/фьюжн',
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
    age: '12+',
    description: 'descriptionQueen',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Queen of live tabla solo',
      },
      ru: {
        title: 'Королева live табла соло',
      },
    },
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
    categories: soloSet,
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
    description: 'descriptionSeniors',
    levels: ['openLevel'],
    translations: {
      en: {
        title: 'Seniors',
      },
      ru: {
        title: 'Сеньоры',
      },
    },
    categories: soloSet,
  },
];
