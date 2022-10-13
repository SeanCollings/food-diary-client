import {
  ThemeBackgroundSecondary,
  ThemeTextColor,
} from '@components/ui/style-themed';
import { useTheme } from '@hooks/use-theme';
import { DOTS, getPaginationRange } from '@utils/get-pagination-range';
import { memo } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styled from 'styled-components';

const WIDTH = 35;

interface ISButton {
  primary?: string;
}

const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;
const SButton = styled.button<ISButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  min-width: ${WIDTH}px;
  height: ${WIDTH}px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: 0.1s;
  ${ThemeBackgroundSecondary}
  ${ThemeTextColor}

  &.active {
    border: 1px solid;
    color: ${({ primary }) => primary};
    box-shadow: inset 0px 0px 1px 1px ${({ primary }) => primary};
    font-weight: 600;
  }
  :hover:not(&.disabled) {
    border: 1px solid;
  }
  &.disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
const SDots = styled.div`
  cursor: default;
  text-align: center;
  width: ${WIDTH}px;
`;

interface IPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  siblingCount?: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = memo(
  ({ itemsPerPage, currentPage, totalItems, siblingCount = 1, onChange }) => {
    const theme = useTheme();
    const paginationRange = getPaginationRange({
      currentPage,
      siblingCount,
      totalItems,
      itemsPerPage,
    });
    const lastPage = paginationRange[paginationRange.length - 1];

    const onPreviousHandler = () => {
      if (currentPage > 1) {
        onChange(currentPage - 1);
      }
    };
    const onNextHandler = () => {
      if (currentPage < lastPage) {
        onChange(currentPage + 1);
      }
    };
    const onChangeHandler = (value: number) => {
      onChange(value);
    };

    if (paginationRange.length < 2) {
      return null;
    }

    return (
      <SContainer>
        <SButton
          onClick={onPreviousHandler}
          disabled={currentPage < 2}
          className={currentPage < 2 ? 'disabled' : ''}
        >
          <MdNavigateBefore size={24} />
        </SButton>
        {paginationRange.map((value, index) => {
          if (value === DOTS) {
            return <SDots key={`paginate-${value}-${index}`}>{'\u2026'}</SDots>;
          }

          return (
            <SButton
              key={`paginate-${value}-${index}`}
              onClick={() => onChangeHandler(value)}
              className={currentPage === value ? 'active' : ''}
              primary={theme.primary}
            >
              {value}
            </SButton>
          );
        })}
        <SButton
          onClick={onNextHandler}
          disabled={currentPage >= lastPage}
          className={currentPage >= lastPage ? 'disabled' : ''}
        >
          <MdNavigateNext size={24} />
        </SButton>
      </SContainer>
    );
  }
);
Pagination.displayName = 'Pagination';

export default Pagination;
