const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * 블로그 글 생성 API
 * Vercel Serverless Function
 */
module.exports = async (req, res) => {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, mainKeyword, subKeywords } = req.body;

    // API 키 검증
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY가 설정되지 않았습니다.');
      return res.status(500).json({ 
        error: '서버 설정 오류: OpenAI API 키가 설정되지 않았습니다.' 
      });
    }

    if (!topic || !mainKeyword || !subKeywords || subKeywords.length === 0) {
      return res.status(400).json({ 
        error: '주제, 메인키워드, 서브키워드는 필수 입력 항목입니다.' 
      });
    }

    // 프롬프트 생성
    const subKeywordsText = subKeywords.join(', ');
    const prompt = `주제: ${topic}\n메인키워드: ${mainKeyword}\n서브키워드: ${subKeywordsText}\n\n위 정보를 바탕으로 SEO에 최적화된 고품질 블로그 포스팅을 작성해주세요. 다음 구조를 따라주세요:\n\n1. 제목 (H1)\n2. 서론 (200-300자)\n3. 본문 (각 서브키워드를 자연스럽게 포함하여 2000-3000자)\n4. 결론 (200-300자)\n\nHTML 형식으로 작성해주되, 제목은 <h1>, 소제목은 <h2>, 본문은 <p> 태그를 사용해주세요.`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 전문 블로그 작가이자 SEO 전문가입니다. 주어진 키워드를 자연스럽게 포함하면서도 독자에게 유용한 정보를 제공하는 고품질 블로그 포스팅을 작성해주세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 3000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const blogContent = response.data.choices[0].message.content.trim();

    res.status(200).json({ 
      content: blogContent,
      topic,
      mainKeyword,
      subKeywords
    });
  } catch (error) {
    console.error('블로그 생성 오류:', error.response?.data || error.message);
    res.status(500).json({ 
      error: '블로그 글 생성 중 오류가 발생했습니다.',
      details: error.response?.data || error.message
    });
  }
};

