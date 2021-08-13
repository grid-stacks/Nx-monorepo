import { GetStaticProps } from 'next';
import './about.module.scss';
import {SharedUi} from "@test/internal-ui"

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export function About({name}: AboutProps) {
  return (
    <div>
      <h1>Welcome to About! {name}</h1>
      <SharedUi />
    </div>
  );
}

export default About;

export const getStaticProps: GetStaticProps<AboutProps> = async context => {
  console.log(context)
  return {
    props: {
      name: "DHN"
    }
  }
}
