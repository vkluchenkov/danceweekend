import { SupportedLangs } from '../types/langs';

interface MenuItem {
  link: string;
  translations: {
    [lang in SupportedLangs]: {
      title: string;
    };
  };
  subItems?: MenuItem[];
}

export const menu: MenuItem[] = [
  {
    link: '/registration',
    translations: {
      en: {
        title: 'Registration',
      },
      ru: {
        title: 'Регистрация',
      },
    },
  },
  {
    link: '/price',
    translations: {
      en: {
        title: 'Price',
      },
      ru: {
        title: 'Цены',
      },
    },
    subItems: [
      {
        link: '/price/live',
        translations: {
          en: {
            title: 'Live version',
          },
          ru: {
            title: 'Live версия',
          },
        },
      },
      {
        link: '/price/online',
        translations: {
          en: {
            title: 'Online Version',
          },
          ru: {
            title: 'Online версия',
          },
        },
      },
    ],
  },
  {
    link: '/competition',
    translations: {
      en: {
        title: 'Competition',
      },
      ru: {
        title: 'Конкурс',
      },
    },
  },
  {
    link: '/shows',
    translations: {
      en: {
        title: 'Shows',
      },
      ru: {
        title: 'Шоу',
      },
    },
    subItems: [
      {
        link: '/shows/arabic-dreams',
        translations: {
          en: {
            title: 'Arabic Dreams',
          },
          ru: {
            title: 'Arabic Dreams',
          },
        },
      },
      {
        link: '/shows/world-show',
        translations: {
          en: {
            title: 'World show',
          },
          ru: {
            title: 'World show',
          },
        },
      },
    ],
  },
  {
    link: '/info',
    translations: {
      en: {
        title: 'Info',
      },
      ru: {
        title: 'Информация',
      },
    },
    subItems: [
      {
        link: '/info/photo-video',
        translations: {
          en: {
            title: 'Photo & video',
          },
          ru: {
            title: 'Фото и видео съемка',
          },
        },
      },
      {
        link: '/info/bazaar',
        translations: {
          en: {
            title: 'Bazaar',
          },
          ru: {
            title: 'Базар',
          },
        },
      },
      {
        link: '/info/accomodation',
        translations: {
          en: {
            title: 'Accommodation',
          },
          ru: {
            title: 'Проживание',
          },
        },
      },
    ],
  },
];
