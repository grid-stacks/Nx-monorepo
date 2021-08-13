import { render } from '@testing-library/react';

import InputControl from './input-control';

describe('InputControl', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputControl />);
    expect(baseElement).toBeTruthy();
  });
});
