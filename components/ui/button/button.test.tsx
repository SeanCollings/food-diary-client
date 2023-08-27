import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './';

describe('<Button/>', () => {
  it('should render', () => {
    const { asFragment } = render(
      <Button height={50} width={150}>
        Test
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render in loading state', () => {
    const { asFragment } = render(<Button loading>Test</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const { asFragment } = render(
      <Button background="secondary" borderWidth={8} fontSize={12} color="red">
        Test
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onclick', async () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick}>Test</Button>);

    fireEvent.click(await screen.findByRole('button', { name: 'Test' }));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
