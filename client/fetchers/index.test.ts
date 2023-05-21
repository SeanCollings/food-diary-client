import axios from 'axios';
import {
  calendarEntriesFetcher,
  diaryEntryFetcher,
  shareFetcher,
  summaryFetcher,
  trendFetcher,
  userProfileFetcher,
} from '.';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('client - fetchers', () => {
  const mockResponse = { data: { mock: 'response' } };
  const mockUrl = '/mock_url';
  const mockDate = '01-02-2023';
  const mockDate2 = '02-02-2023';

  beforeEach(() => {
    mockAxios.get.mockResolvedValue(mockResponse);
  });

  afterEach(() => jest.clearAllMocks());

  describe('userProfileFetcher', () => {
    it('should fetch', async () => {
      const result = await userProfileFetcher(mockUrl);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith('/mock_url');
    });
  });

  describe('diaryEntryFetcher', () => {
    it('should fetch', async () => {
      const result = await diaryEntryFetcher(mockUrl, mockDate);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith('/mock_url?date=01-02-2023');
    });
  });

  describe('calendarEntriesFetcher', () => {
    it('should fetch', async () => {
      const result = await calendarEntriesFetcher(mockUrl, mockDate, 4);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith(
        '/mock_url?date=01-02-2023&months=4',
      );
    });
  });

  describe('summaryFetcher', () => {
    it('should fetch', async () => {
      const result = await summaryFetcher(mockUrl, mockDate, mockDate2);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith(
        '/mock_url?dateFrom=01-02-2023&dateTo=02-02-2023',
      );
    });
  });

  describe('shareFetcher', () => {
    it('should fetch', async () => {
      const result = await shareFetcher(
        mockUrl,
        'mock_guid',
        mockDate,
        mockDate2,
      );

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith(
        '/mock_url?link=mock_guid&dateFrom=01-02-2023&dateTo=02-02-2023',
      );
    });
  });

  describe('trendFetcher', () => {
    it('should fetch', async () => {
      const result = await trendFetcher(mockUrl, 'week');

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.get).toHaveBeenCalledWith('/mock_url?type=week');
    });
  });
});
