import { FC, memo } from 'react';
import { TMealType, TWellnessTypes } from '@utils/interfaces';
import { getUniqueId } from '@utils/unique-id';
import { formatFullDate } from '@utils/date-utils';
import styled from 'styled-components';
import { MEDIA_MOBILE_TABLET } from '@utils/constants';
import { getClassNames } from '@utils/string-utils';
import { TMealWellnessContents } from '@client/interfaces/user-summary-data';

const MARGIN = 20;

interface ISContentRow {
  bottomRadius?: boolean;
  hideBorderBottom?: boolean;
  borderTop?: boolean;
  padBottom?: boolean;
  gridArea?: TMealType | TWellnessTypes;
}

const SDateHeader = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 4px;
  font-weight: 600;
  margin-top: ${MARGIN}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background-color: var(--th-primary);
  border: 1px solid var(--th-primary);

  ${MEDIA_MOBILE_TABLET} {
    &.grid-area {
      grid-area: date;
    }
  }
`;
const SContentRow = styled.div<ISContentRow>`
  display: grid;
  grid-template-columns: 110px 1fr;

  background-color: var(--bg-secondary);

  border-left: 1px solid var(--th-primary);
  border-right: 1px solid var(--th-primary);
  ${({ borderTop }) => borderTop && `border-top: 1px solid var(--th-primary)`};
  border-bottom: solid
    ${({ hideBorderBottom }) =>
      `${hideBorderBottom ? '0' : '1'}px var(--th-primary)`};

  ${({ padBottom }) => padBottom && `margin-bottom: ${MARGIN}px`};
  ${({ bottomRadius }) =>
    bottomRadius &&
    `border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;`}

  ${MEDIA_MOBILE_TABLET} {
    ${({ gridArea }) => gridArea && `grid-area: ${gridArea};`}
  }
`;
const SContentTypeHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-weight: 600;

  border-right: 1px solid var(--th-primary);
`;
const SMealValuesList = styled.ul`
  margin: 0;
  padding: 4px 4px 4px 40px;
  font-weight: 200;
  font-size: 15px;
`;
const SMealValue = styled.li`
  padding: 0px 8px;
`;
const SWellnessValue = styled.div`
  font-weight: 200;
  padding: 4px 4px 4px 20px;
`;
const SEmptyDiv = styled.div`
  height: 0;
`;

interface IDateHeaderRowProps {
  dates: string[];
  data: TMealWellnessContents;
}
export const DateHeaderRow: FC<IDateHeaderRowProps> = memo(
  ({ dates, data }) => {
    return (
      <>
        {dates.map((date, index) => {
          if (!date) {
            return <SEmptyDiv key={`${getUniqueId()}-header`} />;
          }
          const classNames = getClassNames({
            'grid-area': index === 0,
            empty: !Object.keys(data[date] || {}).length,
          });

          return (
            <SDateHeader
              key={`${date}-${getUniqueId()}`}
              className={classNames}
            >
              {formatFullDate(date)}
            </SDateHeader>
          );
        })}
      </>
    );
  }
);
DateHeaderRow.displayName = 'DateHeaderRow';

interface IMealDataRowProps {
  id: TMealType;
  dates: string[];
  title: string;
  data: TMealWellnessContents;
}
export const MealDataRow: FC<IMealDataRowProps> = memo(
  ({ id, dates, title, data }) => {
    return (
      <>
        {dates.map((date, index) => {
          const listItems = data[date]?.[id] || [];

          if (!date) {
            return <SEmptyDiv key={`${getUniqueId()}-meal`} />;
          }

          return (
            <SContentRow
              key={`${date}-${id}-${getUniqueId()}`}
              gridArea={(index === 0 && id) || undefined}
              className={!Object.keys(data[date] || {}).length ? 'empty' : ''}
            >
              <SContentTypeHeader>{title}</SContentTypeHeader>
              <SMealValuesList>
                {listItems?.map((item) => (
                  <SMealValue key={getUniqueId()}>{item}</SMealValue>
                ))}
              </SMealValuesList>
            </SContentRow>
          );
        })}
      </>
    );
  }
);
MealDataRow.displayName = 'MealDataRow';

interface IWellnessDataRowProps {
  id: TWellnessTypes;
  dates: string[];
  title: string;
  firstIndex: boolean;
  lastIndex: boolean;
  data: TMealWellnessContents;
}
export const WellnessDataRow: FC<IWellnessDataRowProps> = memo(
  ({ id, dates, title, data, firstIndex, lastIndex }) => {
    const borderTop = firstIndex;
    const bottomRadius = lastIndex;
    const hideBorderBottom = !lastIndex;

    return (
      <>
        {dates.map((date, index) => {
          const value = data[date]?.[id] ?? '';

          if (!date) {
            return <SEmptyDiv key={`${getUniqueId()}-wellness`} />;
          }

          const gridArea = index === 0 ? id : undefined;

          return (
            <SContentRow
              key={`${date}-${id}-${getUniqueId()}`}
              borderTop={borderTop}
              bottomRadius={bottomRadius}
              hideBorderBottom={hideBorderBottom}
              padBottom={lastIndex}
              gridArea={gridArea}
              className={!Object.keys(data[date] || {}).length ? 'empty' : ''}
            >
              <SContentTypeHeader>{title}</SContentTypeHeader>
              <SWellnessValue>{value || '-'}</SWellnessValue>
            </SContentRow>
          );
        })}
      </>
    );
  }
);
WellnessDataRow.displayName = 'WellnessDataRow';
