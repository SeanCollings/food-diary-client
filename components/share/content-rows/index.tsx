import { FC } from 'react';
import { useTheme } from '@hooks/use-theme';
import {
  EMealType,
  EWellnessTypes,
  TMealType,
  TWellnessTypes,
} from '@utils/interfaces';
import { getUniqueId } from '@utils/unique-id';
import { formatFullDate } from '@utils/date-utils';
import styled from 'styled-components';
import { ThemeBackgroundSecondary } from '@components/ui/style-themed';

const MARGIN = 20;

interface ISDateHeader {
  primary: string;
}
interface ISContentRow {
  primary: string;
  bottomRadius?: boolean;
  hideBorderBottom?: boolean;
  borderTop?: boolean;
  padBottom?: boolean;
}
interface ISContentTypeHeader {
  primary: string;
}

const SDateHeader = styled.div<ISDateHeader>`
  font-size: 18px;
  text-align: center;
  padding: 4px;
  font-weight: 600;
  margin-top: ${MARGIN}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background-color: ${({ primary }) => primary};
  border: 1px solid ${({ primary }) => primary};
`;
const SContentRow = styled.div<ISContentRow>`
  display: grid;
  grid-template-columns: 110px 1fr;

  ${ThemeBackgroundSecondary}

  border-left: 1px solid ${({ primary }) => primary};
  border-right: 1px solid ${({ primary }) => primary};
  ${({ borderTop, primary }) =>
    borderTop && `border-top: 1px solid ${primary}`};
  border-bottom: solid
    ${({ primary, hideBorderBottom }) =>
      `${hideBorderBottom ? '0' : '1'}px ${primary}`};

  ${({ padBottom }) => padBottom && `margin-bottom: ${MARGIN}px`};
  ${({ bottomRadius }) =>
    bottomRadius &&
    `border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px`}
`;
const SContentTypeHeader = styled.div<ISContentTypeHeader>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-weight: 600;

  border-right: 1px solid ${({ primary }) => primary};
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

type TMealContents = { [key in EMealType]: string[] };
type TWellnessContents = { [key in EWellnessTypes]: number };

interface IDateHeaderRowProps {
  dates: string[];
  data: {
    [key: string]: TMealContents | TWellnessContents;
  };
}
export const DateHeaderRow: FC<IDateHeaderRowProps> = ({ dates, data }) => {
  const theme = useTheme();

  return (
    <>
      {dates.map((date) => {
        if (!date || !data[date]) {
          return <SEmptyDiv key={`${getUniqueId()}-header`} />;
        }

        return (
          <SDateHeader key={`${date}-${getUniqueId()}`} primary={theme.primary}>
            {formatFullDate(date)}
          </SDateHeader>
        );
      })}
    </>
  );
};

interface IMealDataRowProps {
  id: TMealType;
  dates: string[];
  title: string;
  data: {
    [key: string]: TMealContents;
  };
}
export const MealDataRow: FC<IMealDataRowProps> = ({
  id,
  dates,
  title,
  data,
}) => {
  const theme = useTheme();

  return (
    <>
      {dates.map((date) => {
        const listItems = data[date]?.[id];

        if (!date || !listItems) {
          return <SEmptyDiv key={`${getUniqueId()}-meal`} />;
        }

        return (
          <SContentRow
            key={`${date}-${id}-${getUniqueId()}`}
            primary={theme.primary}
          >
            <SContentTypeHeader primary={theme.primary}>
              {title}
            </SContentTypeHeader>
            <SMealValuesList>
              {listItems.map((item) => (
                <SMealValue key={getUniqueId()}>{item}</SMealValue>
              ))}
            </SMealValuesList>
          </SContentRow>
        );
      })}
    </>
  );
};

interface IWellnessDataRowProps {
  id: TWellnessTypes;
  dates: string[];
  title: string;
  firstIndex: boolean;
  lastIndex: boolean;
  data: {
    [key: string]: TWellnessContents;
  };
}
export const WellnessDataRow: FC<IWellnessDataRowProps> = ({
  id,
  dates,
  title,
  data,
  firstIndex,
  lastIndex,
}) => {
  const theme = useTheme();
  const borderTop = firstIndex;
  const bottomRadius = lastIndex;
  const hideBorderBottom = !lastIndex;

  return (
    <>
      {dates.map((date) => {
        const value = data[date]?.[id] ?? 0;

        if (!date || !data[date]) {
          return <SEmptyDiv key={`${getUniqueId()}-wellness`} />;
        }

        return (
          <SContentRow
            key={`${date}-${id}-${getUniqueId()}`}
            primary={theme.primary}
            borderTop={borderTop}
            bottomRadius={bottomRadius}
            hideBorderBottom={hideBorderBottom}
            padBottom={lastIndex}
          >
            <SContentTypeHeader primary={theme.primary}>
              {title}
            </SContentTypeHeader>
            <SWellnessValue>{value}</SWellnessValue>
          </SContentRow>
        );
      })}
    </>
  );
};
