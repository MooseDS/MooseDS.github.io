
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 게시글 메타데이터 타입 정의
export interface PostData {
  id: string; // URL slug (예: android/bluetoothle)
  modulePath: string; // src/app/posts 기준 mdx 상대 경로
  slugSegments: string[];
  title: string;
  description: string;
  category: string;
  date: string;
}

// posts 폴더의 절대 경로
const postsDirectory = path.join(process.cwd(), 'src/app/posts');

function normalizeSlugSegment(segment: string): string {
  return segment.trim().toLowerCase();
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // 폴더인 경우 재귀 호출
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // md 또는 mdx 파일만 배열에 추가
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

export function getSortedPostsData(): PostData[] {
    // 1. posts 폴더 내의 파일 이름들 읽기
    const allFilePaths = getAllFiles(postsDirectory);
  
    const allPostsData = allFilePaths.map((filePath) => {
        // 2. id 생성: posts 폴더 기준 상대 경로에서 확장자 제거
        // 예: /Users/project/posts/tech/nextjs.md -> tech/nextjs
      const modulePath = path.relative(postsDirectory, filePath).replace(/\\/g, '/');
      const relativePathWithoutExt = modulePath.replace(/\.mdx?$/, '');
      const slugSegments = relativePathWithoutExt
        .split('/')
        .filter(Boolean)
        .map(normalizeSlugSegment);
      const id = slugSegments.join('/');

        // 3. 파일 내용 읽기 및 파싱
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);

        return {
      id,
      modulePath,
      slugSegments,
      ...(matterResult.data as Omit<PostData, 'id' | 'modulePath' | 'slugSegments'>),
        };
    });
    
    // 6. 날짜순(최신순)으로 정렬하여 반환
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1;
        } else {
        return -1;
        }
    });
}

export function getPostBySlugSegments(slugSegments: string[]): PostData | undefined {
  const normalizedSlug = slugSegments.map(normalizeSlugSegment).join('/');
  return getSortedPostsData().find((post) => post.id === normalizedSlug);
}
