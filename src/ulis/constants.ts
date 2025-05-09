import { createTheme } from '@mui/material';
import { montserrat } from '@/src/ulis/font';

// Age groups
export const babyMinAge = 4;
export const babyMaxAge = 6;
export const kidsMinAge = 7;
export const kidsMaxAge = 11;
export const juniorsMinAge = 12;
export const juniorsMaxAge = 15;
export const adultsMinAge = 16;
export const adultsMaxAge = 39;

// Minimum numbers of workshops to be eligible for compatition or World Show
export const minWsKids = 1;
export const minWsAdults = 3;

// Number of performances for solo pass to be profitable (blocks the form if less)
export const minSoloPass = 4;

// Maximum number of groups to register for one person
export const maxGroups = 3;

// Music limits (sec)
export const soloLimit = 210;
export const soloProfessionalsLimit = 240;
export const groupsLimit = 240;
export const worldShowLimit = 240;
export const margin = 1.1; //percent

// Photo file size limit in bytes
export const photoFileSizeLimit = 10485760;

// Default website url
export const defaultUrl = 'https://danceweekend.art';

// emails
export const senderEmail = 'danceweekend@aliah.dance';
export const senderName = 'Dance Weekend in Warsaw festival';

// talegram
export const telegramUrl = 'https://t.me/+RYwBbu9w0GVkMmY0';

// Social links
export const facebookUrl = 'https://www.facebook.com/danceweekendwarsaw';
export const instagramUrl = 'https://www.instagram.com/danceweekendwarsaw';
export const emailUrl = 'mailto:danceweekend@aliah.dance';

// map links
export const cpkUrl = 'https://goo.gl/maps/SnjPT318FQs6SeTW8';

// Animation preset for all transitions
export const motionVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

// Forms theme
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#eec571',
    },
    mode: 'dark',
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
});

export const currencySymbol = '€';

type CurrencyCodes = 'PLN' | 'EUR';
export const currencyCode: CurrencyCodes = 'EUR';
