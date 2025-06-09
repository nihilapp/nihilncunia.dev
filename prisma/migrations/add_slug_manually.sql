-- 기존 포스트들에 slug 추가
-- 1. 먼저 slug 컬럼을 nullable로 추가
ALTER TABLE posts ADD COLUMN slug VARCHAR(255);
ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0;
ALTER TABLE posts ADD COLUMN likes INTEGER DEFAULT 0;

-- 2. 임시로 id를 기반으로 slug 생성
UPDATE posts SET slug = 'post-' || SUBSTRING(id, 1, 8) WHERE slug IS NULL;

-- 3. 이제 slug를 NOT NULL과 UNIQUE로 설정
ALTER TABLE posts ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX posts_slug_unique ON posts(slug);
