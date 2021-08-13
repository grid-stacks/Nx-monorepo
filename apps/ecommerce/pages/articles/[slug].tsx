import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import './[slug].module.scss';

/* eslint-disable-next-line */
export interface SlugProps extends ParsedUrlQuery {
  slug: string
}

export function Slug(props: SlugProps) {
  return (
    <div>
      <h1>Welcome to Slug {props.slug}!</h1>
    </div>
  );
}

export default Slug;

export const getStaticPaths: GetStaticPaths<SlugProps> = async () => {
  return {
    paths: [1, 2, 3].map(idx => {
      return {
        params: {
          slug: `page${idx}`
        }
      }
    }),
    fallback: false // if false only accepts provided paths
  }
}

export const getStaticProps: GetStaticProps<SlugProps> = async ({params}: {params: SlugProps}) => {
  return {
    props: {
      slug: params.slug
    }
  }
}
