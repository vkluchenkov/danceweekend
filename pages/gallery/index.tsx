import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

import { Layout } from '@/src/components/Layout';
import styles from '@/styles/Gallery.module.css';
import textStyles from '@/styles/Text.module.css';
import { WordpressApi } from '@/src/api/wordpressApi';
import { ImageDto } from '@/src/types/gallery.types';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['gallery'],
    queryFn: () => WordpressApi.getGalleryBySlug('test-gallery-post'),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

const GalleryTest: NextPage = () => {
  const { t, lang } = useTranslation('price');

  const { data, isLoading, status, error } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => WordpressApi.getGalleryBySlug('test-gallery-post'),
    refetchOnMount: false,
  });

  const galleria = useRef<Galleria>(null);

  const [images, setImages] = useState<ImageDto[] | undefined>(undefined);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const imagesList = data?.galleryImagesGroup?.images?.nodes;
    if (imagesList) setImages(imagesList);
  }, [data]);

  const imageClickHandler = (index: number) => {
    setActiveIndex(index);
    if (galleria.current) galleria.current.show();
  };

  const itemTemplate = (item: ImageDto) => {
    return (
      <div className={styles.photo__wrapper_large}>
        <Image
          src={item.large!}
          alt={item.title!}
          style={{ display: 'block', objectFit: 'contain' }}
          fill
        />
      </div>
    );
  };

  const imageList = images ? (
    images.map((image: ImageDto, index: number) => {
      return (
        <li
          key={'photo' + index}
          className={styles.photo__wrapper}
          onClick={() => imageClickHandler(index)}
        >
          <Image
            src={image.small!}
            alt={image.altText!}
            className={styles.photo}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            sizes='
          (max-width: 768px) 450px,
          80vw'
          />
        </li>
      );
    })
  ) : (
    <></>
  );

  return (
    <>
      <Layout title={t('pageTitle')}>
        <h1 className={textStyles.h1}>{t('pageTitle')}</h1>
        <ul className={styles.photos}>{imageList}</ul>
        <Galleria
          ref={galleria}
          value={images}
          style={{ maxWidth: '1500px' }}
          activeIndex={activeIndex}
          onItemChange={(e) => setActiveIndex(e.index)}
          circular
          fullScreen
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
        />
      </Layout>
    </>
  );
};

export default GalleryTest;
