import styles from './index.module.scss';
import {countActions, fetchCount, selectAllCount, wrapper, useGetTodosQuery} from "@test/stores";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link'

export function Index({id}) {
  const dispatch = useDispatch();

  const {data, error, isLoading } = useGetTodosQuery(null);

  const entities = useSelector(selectAllCount);
  // console.log(entities)
  console.log(id.count)

  useEffect(() => {
    dispatch(countActions.add({ id: 1 }))
    dispatch(fetchCount())
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <h2>Resources &amp; Tools</h2>
      <p>Thank you for using and showing some ♥ for Nx.</p>

      <Link href="/about">About</Link>

      <h2>Next Steps</h2>
      <p>Here are some things you can do with Nx.</p>
      <details open>
        <summary>Add UI library</summary>
        <pre>
          {`# Generate UI lib
nx g @nrwl/react:lib ui

# Add a component
nx g @nrwl/react:component xyz --project ui`}
        </pre>
      </details>
    </div>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async () => {

  await store.dispatch(countActions.add({id: 5}));

  console.log('State on server', store.getState());

  return {
      props: {
          id: store.getState()
      },
  };
});
