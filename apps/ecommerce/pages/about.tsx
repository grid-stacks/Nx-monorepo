import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import './about.module.scss';
import { SharedUi } from '@test/internal-ui';
import { countActions, wrapper } from '@test/stores';

/* eslint-disable-next-line */
export interface AboutProps {
  name?: string;
  id?: Record<string, unknown>;
}

export function About({ name, id }: AboutProps) {
  // console.log(id)

  return (
    <div>
      <h1>Welcome to About! {name}</h1>

      <Link href="/">Home</Link>

      <SharedUi />
    </div>
  );
}

export default About;

// export const getStaticProps: GetStaticProps<AboutProps> = async context => {
//   console.log(context)
//   return {
//     props: {
//       name: "DHN"
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(
      countActions.add({ id: Math.floor(Math.random() * 50) })
    );

    // console.log('State on server about', store.getState());

    return {
      props: {
        id: store.getState(),
        name: 'DHN',
      },
    };
  });
