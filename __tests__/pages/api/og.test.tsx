import handler, { config } from '../../../pages/api/og';

jest.mock('@vercel/og', () => ({
  ImageResponse: jest.fn().mockImplementation((element: any) => element),
}));

describe('/api - og', () => {
  const mockError = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(mockError);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUrl = 'https://mock.com';

  it('should return og image-response with no search-params', async () => {
    const actual = handler({
      method: 'GET',
      url: mockUrl,
    } as any);

    expect(actual).toMatchSnapshot();
  });

  it('should return og image-response with custom params', async () => {
    const actual = handler({
      method: 'GET',
      url: `${mockUrl}?title=a_new_title&path=a_new_path`,
    } as any);

    expect(actual).toMatchSnapshot();
  });

  it('should handle errors', async () => {
    try {
      handler({
        method: 'GET',
        url: '/',
      } as any);
    } catch (err) {
      expect(mockError).toHaveBeenCalled();
      expect((err as any).message).toMatchInlineSnapshot;
    }
  });

  it('should return config', () => {
    expect(config).toMatchInlineSnapshot(`
      {
        "runtime": "edge",
      }
    `);
  });
});
