import styles from './index.module.scss';
import {countActions, fetchCount, selectAllCount} from "@test/stores";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export function Index() {
  const dispatch = useDispatch();

  const entities = useSelector(selectAllCount);
  console.log(entities)

  useEffect(() => {
    // dispatch(countActions.add({ id: 1 }))
    dispatch(fetchCount())
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <h2>Resources &amp; Tools</h2>
      <p>Thank you for using and showing some ♥ for Nx.</p>

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
