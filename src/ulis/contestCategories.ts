import { SupportedLangs, AgeGroup } from '@/src/types';

export type Level = 'beginners' | 'intermediate' | 'risingStar' | 'professionals' | 'openLevel';
type CategoryType = 'live' | 'online';

export interface Category {
  translations: {
    [lang in SupportedLangs]: {
      categoryTitle: string;
    };
  };
  types: CategoryType[];
  isSolo?: boolean;
  isSoloPass?: boolean;
}

export interface ContestCategory {
  ageGroup: AgeGroup;
  ageGroups?: AgeGroup[];
  description?: string;
  age: string;
  levels: Level[];
  types: CategoryType[];
  translations: {
    [lang in SupportedLangs]: {
      title: string;
    };
  };
  categories: Category[];
}

const soloSet: Category[] = [
  {
    types: ['live', 'online'],
    isSolo: true,
    isSoloPass: true,
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
    isSolo: true,
    isSoloPass: true,
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
    isSolo: true,
    isSoloPass: true,
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
    isSolo: true,
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
    isSolo: true,
    isSoloPass: true,
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
    isSolo: true,
    isSoloPass: true,
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
    isSolo: true,
    isSoloPass: true,
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
    ageGroup: 'baby',
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
        isSolo: true,
        isSoloPass: true,
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
    ageGroup: 'kids',
    levels: ['beginners', 'intermediate'],
    types: ['live', 'online'],
    translations: {
      en: {
        title: 'Kids solo',
      },
      ru: {
        title: 'Дети соло',
      },
    },
    categories: soloSet,
  },

  {
    age: '7-11',
    ageGroup: 'kids',
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
    age: '7-11',
    ageGroup: 'kids',
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
    categories: groupSet,
  },

  {
    age: '12-15',
    ageGroup: 'juniors',
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
    ageGroup: 'juniors',
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
    ageGroup: 'juniors',
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
    ageGroup: 'adults',
    ageGroups: ['adults', 'juniors', 'seniors'],
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
    categories: [
      {
        types: ['live'],
        isSolo: true,
        translations: {
          en: {
            categoryTitle: 'Queen of live tabla solo',
          },
          ru: {
            categoryTitle: 'Королева live табла соло',
          },
        },
      },
    ],
  },

  {
    age: '16+',
    ageGroup: 'adults',
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
    ageGroup: 'adults',
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
    ageGroup: 'adults',
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
    ageGroup: 'seniors',
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
