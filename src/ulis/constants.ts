import { createTheme } from '@mui/material';
import { montserrat } from '@/src/ulis/font';

// Age groups
export const babyMinAge = 4;
export const babyMaxAge = 6;
export const kidsMinAge = 5;
export const kidsMaxAge = 11;
export const juniorsMinAge = 12;
export const juniorsMaxAge = 15;
export const adultsMinAge = 16;
export const adultsMaxAge = 39;

// Minimum numbers of workshops to be eligible for compatition or World Show
export const minWsKids = 1;
export const minWsAdults = 3;

// Maximum number of groups to register for one person
export const maxGroups = 3;

// Music limits (sec)
export const soloLimit = 180;
export const groupsLimit = 210;
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
export const telegramUrl = 'https://t.me/+isxRvGCBaf9jMjQ0';

// Revolut payment link
export const revolutUrl = 'https://revolut.me/aliahbellydance/eur/';

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
