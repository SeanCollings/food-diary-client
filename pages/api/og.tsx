import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title =
      searchParams.get('title') ?? 'One step at a time. Towards wellness.';
    const path = searchParams.get('path') ? `/${searchParams.get('path')}` : '';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-.02em',
            fontWeight: 400,
            background: '#121212',
            borderLeft: '2px solid #2B9348',
            borderRight: '2px solid #2B9348',
          }}
        >
          <div
            style={{
              left: 42,
              top: 42,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundImage: 'linear-gradient(to right,#55A630,#2B9348)',
              }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                color: '#ffffffe6',
              }}
            >
              {`foodandwellnessdiary.vercel.com${path}`}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '100px 50px',
              margin: '0 42px',
              fontSize: 40,
              width: 'auto',
              maxWidth: 550,
              textAlign: 'center',
              backgroundColor: '#55A630',
              lineHeight: 1.4,
              color: '#ffffffe6',
              borderRadius: '8px',
            }}
          >
            {title}
          </div>
        </div>
      ),
      { width: 800, height: 600 },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
