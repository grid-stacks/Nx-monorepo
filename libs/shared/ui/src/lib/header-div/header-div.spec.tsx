import { render } from '@testing-library/react';

import HeaderDiv from './header-div';

describe('HeaderDiv', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderDiv />);
    expect(baseElement).toBeTruthy();
  });
});
