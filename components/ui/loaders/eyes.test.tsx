import { render } from '@testing-library/react';
import { Eyes } from './';

describe('<Eyes>', () => {
  it('should render', () => {
    const { asFragment } = render(<Eyes />);
    expect(asFragment()).toMatchSnapshot();
  });
});
