import { render } from '@testing-library/react';

import HeaderTitle from './header-title';

describe('HeaderTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderTitle />);
    expect(baseElement).toBeTruthy();
  });
});
