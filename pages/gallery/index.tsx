import { GetStaticProps, NextPage } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/src/components/Layout';
import styles from '@/styles/Gallery.module.css';
import textStyles from '@/styles/Text.module.css';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { WordpressApi } from '@/src/api/wordpressApi';
import Image from 'next/image';

interface ImageProps {
  caption?: string | null | undefined;
  altText?: string | null | undefined;
  large?: string | null | undefined;
  small?: string | null | undefined;
  title?: string | null | undefined;
  srcSet?: string | null | undefined;
}

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

  const [images, setImages] = useState<ImageProps[] | undefined>(
    data?.galleryImagesGroup?.images?.nodes
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (data?.galleryImagesGroup?.images?.nodes) setImages(data?.galleryImagesGroup?.images?.nodes);
  }, [data]);

  const itemTemplate = (item: ImageProps) => {
    return <img src={item.large!} alt={item.title!} style={{ width: '100%', display: 'block' }} />;
  };

  const imageList = images!.map((image: ImageProps, index: number) => {
    return (
      <li
        key={'photo' + index}
        className={styles.photo__wrapper}
        onClick={(e) => {
          setActiveIndex(index);
          galleria.current!.show();
        }}
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
  });

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
