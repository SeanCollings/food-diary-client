import { render } from '@testing-library/react';
import { Ellipsis } from './';

describe('<Ellipsis>', () => {
  it('should render', () => {
    const { asFragment } = render(<Ellipsis />);
    expect(asFragment()).toMatchSnapshot();
  });
});
