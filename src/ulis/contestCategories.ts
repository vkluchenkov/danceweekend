import { SupportedLangs } from '@/src/types';

type Level = 'beginners' | 'intermediate' | 'risingStar' | 'professionals' | 'openLevel';
type CategoryType = 'live' | 'online';

interface Category {
  translations: {
    [lang in SupportedLangs]: {
      categoryTitle: string;
    };
  };
  types: CategoryType[];
}

interface ContestCategory {
  description?: string;
  age: string;
  levels: Level[];
  types: CategoryType[];
  translations: {
    [lang in SupportedLangs]: {
      title: string;
    };
  };
  categories?: Category[];
}

const soloSet: Category[] = [
  {
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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

const groupSet: Category[] = [
  {
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
    translations: {
      en: {
        categoryTitle: 'Tribal',
      },
      ru: {
        categoryTitle: 'Трайбл',
      },
    },
  },
];

export const contestCategories: ContestCategory[] = [
  {
    age: '4-6',
    levels: ['openLevel'],
    types: ['live', 'online'],
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
        types: ['live', 'online'],
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
    types: ['live', 'online'],
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
    types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
    types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
        types: ['live', 'online'],
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
    levels: ['risingStar', 'professionals'],
    types: ['live', 'online'],
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
    types: ['live', 'online'],
    translations: {
      en: {
        title: 'Juniors duos',
      },
      ru: {
        title: 'Юниоры дуэты',
      },
    },
    categories: groupSet,
  },

  {
    age: '12-15',
    levels: ['openLevel'],
    types: ['live', 'online'],
    translations: {
      en: {
        title: 'Juniors groups',
      },
      ru: {
        title: 'Юниоры группы',
      },
    },
    categories: groupSet,
  },

  {
    age: '12+',
    description: 'descriptionQueen',
    levels: ['openLevel'],
    types: ['live'],
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
    levels: ['risingStar', 'professionals'],
    types: ['live', 'online'],
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
    types: ['live', 'online'],
    translations: {
      en: {
        title: 'Adults duos',
      },
      ru: {
        title: 'Взрослые дуэты',
      },
    },
    categories: groupSet,
  },

  {
    age: '16+',
    levels: ['openLevel'],
    types: ['live', 'online'],
    translations: {
      en: {
        title: 'Adults groups',
      },
      ru: {
        title: 'Взрослые группы',
      },
    },
    categories: groupSet,
  },

  {
    age: '40+',
    description: 'descriptionSeniors',
    levels: ['openLevel'],
    types: ['live', 'online'],
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
