import { render } from '@testing-library/react';
import { SpinnerFade } from './';

describe('<SpinnerFade>', () => {
  it('should render', () => {
    const { asFragment } = render(<SpinnerFade />);
    expect(asFragment()).toMatchSnapshot();
  });
});
