import Parser from 'rss-parser';

export interface Post {
  title: string;
  link: string;
  thumbnail: string | null;
  date: string;
  excerpt: string;
}

export async function fetchVelog(username: string): Promise<Post[]> {
  const parser = new Parser();
  const FEED_URL = `https://v2.velog.io/rss/${username}`;

  try {
    const feed = await parser.parseURL(FEED_URL);

    return feed.items.map((item: any) => {
      // 디버깅을 위한 로그
      // 썸네일 추출
      const content = item['content:encoded'] || item.content || '';
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : null;

      // 요약글(Excerpt) 처리 (HTML 태그 제거 및 길이 제한)
      const contentSnippet = item.contentSnippet || '';
      const excerpt = contentSnippet.length > 100 ? contentSnippet.substring(0, 100) + '...' : contentSnippet;

      return {
        title: item.title,
        link: item.link,
        thumbnail: thumbnail,
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
        excerpt: excerpt,
      };
    });
  } catch (error) {
    console.error('Velog RSS fetch failed:', error);
    return [];
  }
}
