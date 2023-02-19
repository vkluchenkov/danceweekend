import styles from '@/styles/Home.module.css';
import { Layout } from '@/src/components/Layout';
import { useEffect } from 'react';
import { Divider } from '@/src/components/Divider';
import Image from 'next/image';
import teachers from 'public/images/teachers.png';
import { Cta } from '@/src/components/CTA';

export default function Home() {
  return (
    <Layout>
      <div className={styles.coverContainer}>
        <div className={styles.imageContainer}>
          <Image src={teachers} alt='Dance weekend in Warsaw artists' fill />
        </div>
        <div className={styles.imageDivider}>
          <Divider />
        </div>
      </div>
      <Cta />
      <section className={styles.content}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia obcaecati, necessitatibus,
          molestias aperiam sunt, ab ipsa ex nisi voluptatibus explicabo facilis nulla dolor sint et
          minus eius deserunt non ullam!
        </p>
      </section>
    </Layout>
  );
}
