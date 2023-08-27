import { render } from '@testing-library/react';
import { SpinnerLine } from './';

describe('<SpinnerLine>', () => {
  it('should render', () => {
    const { asFragment } = render(<SpinnerLine />);
    expect(asFragment()).toMatchSnapshot();
  });
});
