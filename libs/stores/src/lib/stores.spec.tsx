import { render } from '@testing-library/react';

import Stores from './stores';

describe('Stores', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stores />);
    expect(baseElement).toBeTruthy();
  });
});
