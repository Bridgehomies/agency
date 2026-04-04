import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITE_HOST = 'www.bridgehomies.com';

if (!INDEXNOW_KEY) {
  console.error('❌ INDEXNOW_KEY is not set in environment variables');
}

export async function POST(request: NextRequest) {
  try {
    const { url, urls } = await request.json();   // Support single url or array of urls

    const urlList = urls || (url ? [url] : []);

    if (urlList.length === 0) {
      return NextResponse.json({ error: 'At least one URL is required' }, { status: 400 });
    }

    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      urlList: urlList,
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `Submitted ${urlList.length} URL(s) to IndexNow`,
        status: response.status,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: response.status,
        message: 'IndexNow API returned error',
      }, { status: response.status });
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json({ error: 'Failed to submit to IndexNow' }, { status: 500 });
  }
}