import { render } from '@testing-library/react';
import { SpinnerDots } from './';

describe('<SpinnerDots>', () => {
  it('should render', () => {
    const { asFragment } = render(<SpinnerDots />);
    expect(asFragment()).toMatchSnapshot();
  });
});
