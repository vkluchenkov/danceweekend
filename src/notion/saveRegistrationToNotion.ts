import { Client } from '@notionhq/client';
import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';
import { Translate } from 'next-translate';

import { OrderPayload } from '../components/FormRegistration/types';
import { contestCategories } from '../ulis/contestCategories';
import { configServer } from '../configServer';

interface saveRegistrationToNotionProps {
  form: OrderPayload;
  t: Translate;
}

export const saveRegistrationToNotion = async (props: saveRegistrationToNotionProps) => {
  const { form, t } = props;

  const notion = new Client({ auth: configServer.notion.token });

  const fullPassDiscountSelect = () => {
    switch (form.fullPassDiscount) {
      case 'group':
        return '20% Group';

      case '30%':
        return '30% Certificate';

      case '50%':
        return '50% Certificate';

      case 'free':
        return '100% Certificate';

      default:
        'none';
        return null;
    }
  };

  const wsSelected = form.workshops.filter((ws) => ws.selected);

  const singleWs = wsSelected.map((ws) => {
    const title = ws.translations.en.title;
    const description = ws.translations.en.description;
    return { name: title + ' – ' + description };
  });

  const selectedStyles = form.soloContest.filter((cat) => cat.selected);
  const contestSoloStyles = selectedStyles.map((category) => {
    return { name: category.translations.en.categoryTitle };
  });

  const yearsSelected = form.yearsBefore2.filter((year) => year.selected);
  const yearsSelectedValues = yearsSelected.map((year) => {
    return { name: year.year };
  });

  const contestGroups = form.groupContest.map((group, index) => {
    // Category style translation
    const contestCategory = contestCategories.find(
      (cat) =>
        cat.ageGroup === form.groupContest[index].ageGroup &&
        (cat.isDuoCategory || cat.isGroupCategory)
    );
    const catStyle = contestCategory?.categories.find(
      (style) => style.translations.en.categoryTitle === group.style
    );

    const ageGroup = t(`form.contest.ageGroups.${group.ageGroup}`);

    return {
      name:
        t(`form.contest.groups.${group.type}`) +
        ' | ' +
        group.name +
        ' | ' +
        group.qty +
        ' pers. | ' +
        ageGroup +
        ' | ' +
        catStyle?.translations.en.categoryTitle,
    };
  });

  const worldShowGroup = form.isWorldShowGroup
    ? form.worldShowGroup?.name + ' | ' + form.worldShowGroup?.qty + ' pers.'
    : '';

  const livePayload: CreatePageParameters = {
    parent: {
      database_id: configServer.notion.liveDbId,
      type: 'database_id',
    },
    properties: {
      Name: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: { content: form.name.trim() },
          },
        ],
      },
      Surname: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: { content: form.surname.trim() },
          },
        ],
      },
      'Stage name': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: { content: form.stageName.trim() },
          },
        ],
      },
      Age: {
        type: 'number',
        number: Number.parseInt(form.age as unknown as string),
      },
      Social: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: { content: form.social.trim() },
          },
        ],
      },
      From: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: { content: form.city.trim() + ', ' + form.country.trim() },
          },
        ],
      },
      Years: {
        type: 'multi_select',
        multi_select: yearsSelectedValues,
      },
      Phone: {
        type: 'phone_number',
        phone_number: form.tel,
      },
      Email: {
        type: 'email',
        email: form.email,
      },
      FullPass: {
        type: 'checkbox',
        checkbox: form.isFullPass,
      },
      Discount: {
        type: 'select',
        select: fullPassDiscountSelect() ? { name: fullPassDiscountSelect()! } : null,
      },
      'Group name': {
        type: 'select',
        select: form.fullPassGroupName ? { name: form.fullPassGroupName } : null,
      },
      'Certificate source': {
        type: 'rich_text',
        rich_text: [
          {
            text: {
              content: form.fullPassDiscountSource || '',
            },
          },
        ],
      },
      'Single WS': {
        type: 'multi_select',
        multi_select: singleWs,
      },
      'Solo Contest': {
        type: 'checkbox',
        checkbox: !!form.isSoloContest,
      },
      'Age group': {
        type: 'select',
        select: form.isSoloContest
          ? { name: t(`form.contest.ageGroups.${form.contestAgeGroup}`)! }
          : null,
      },
      Level: {
        type: 'select',
        select:
          form.isSoloContest && form.contestLevel
            ? { name: t(`form.contest.levels.${form.contestLevel}`)! }
            : null,
      },
      'Solo Pass': {
        type: 'checkbox',
        checkbox: !!form.isSoloPass,
      },
      Styles: {
        type: 'multi_select',
        multi_select: contestSoloStyles!,
      },
      'Group / Duo contest': {
        type: 'checkbox',
        checkbox: !!form.isGroupContest,
      },
      'Groups/Duos': {
        type: 'multi_select',
        multi_select: contestGroups,
      },
      'World Show solo': {
        type: 'checkbox',
        checkbox: !!form.isWorldShowSolo,
      },
      'World Show group': {
        type: 'rich_text',
        rich_text: [
          {
            text: {
              content: worldShowGroup.trim(),
            },
          },
        ],
      },
      Installments: {
        type: 'checkbox',
        checkbox: !!form.isInstallments,
      },
      Total: {
        type: 'number',
        number: form.total,
      },
    },
  };

  try {
    await notion.pages.create(livePayload);
  } catch (error) {
    console.log(error);
    throw new Error('Notion save failed');
  }
};
