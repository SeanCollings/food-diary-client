import { render } from '@testing-library/react';
import { MenuContextProvider, initialState, useMenuContext } from '.';
import { useEffect, useRef } from 'react';

const TestComponent = () => <div>Test component</div>;

const MockToggleMenuComponent: React.FC<{ toggleTotal: number }> = ({
  toggleTotal,
}) => {
  const toggleRef = useRef(1);
  const { isOpen, toggleMenu } = useMenuContext();

  useEffect(() => {
    if (toggleRef.current <= toggleTotal) {
      toggleMenu();
      toggleRef.current += 1;
    }
  }, [isOpen, toggleMenu, toggleTotal]);

  return <div>Open: {isOpen.toString()}</div>;
};

describe('store - menu-context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { isOpen, toggleMenu } = initialState;

    expect(isOpen).toBeFalsy();
    expect(toggleMenu()).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <MenuContextProvider>
        <TestComponent />
      </MenuContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle menu open', () => {
    const { asFragment } = render(
      <MenuContextProvider>
        <MockToggleMenuComponent toggleTotal={1} />
      </MenuContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle menu closed after being opened', () => {
    const { asFragment } = render(
      <MenuContextProvider>
        <MockToggleMenuComponent toggleTotal={2} />
      </MenuContextProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
