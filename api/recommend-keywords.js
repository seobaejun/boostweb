const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * 서브키워드 추천 API
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
    const { topic, mainKeyword } = req.body;

    // API 키 검증
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY가 설정되지 않았습니다.');
      return res.status(500).json({ 
        error: '서버 설정 오류: OpenAI API 키가 설정되지 않았습니다.' 
      });
    }

    if (!topic || !mainKeyword) {
      return res.status(400).json({ 
        error: '주제와 메인키워드는 필수 입력 항목입니다.' 
      });
    }

    // 프롬프트 생성
    const prompt = `주제: ${topic}\n메인키워드: ${mainKeyword}\n\n위 주제와 메인키워드를 기반으로 블로그 포스팅에 적합한 서브키워드 10개를 추천해주세요. 각 키워드는 쉼표로 구분하여 한 줄로 작성해주세요.`;

    console.log('OpenAI API 호출 시작...');
    console.log('주제:', topic);
    console.log('메인키워드:', mainKeyword);

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 SEO 전문가입니다. 주어진 주제와 메인키워드를 기반으로 블로그 포스팅에 적합한 서브키워드를 추천해주세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30초 타임아웃
      }
    );

    console.log('OpenAI API 응답 받음');

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('OpenAI API 응답 형식이 올바르지 않습니다.');
    }

    const keywordsText = response.data.choices[0].message.content.trim();
    console.log('추천된 키워드 텍스트:', keywordsText);

    const keywords = keywordsText
      .split(/[,\n]/)
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .slice(0, 10);

    console.log('파싱된 키워드:', keywords);

    if (keywords.length === 0) {
      throw new Error('추천된 키워드를 파싱할 수 없습니다.');
    }

    res.status(200).json({ keywords });
  } catch (error) {
    console.error('서브키워드 추천 오류 상세:');
    console.error('에러 타입:', error.constructor.name);
    console.error('에러 메시지:', error.message);
    
    if (error.response) {
      console.error('응답 상태:', error.response.status);
      console.error('응답 데이터:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('요청 전송 실패:', error.request);
    }

    // 사용자에게 보여줄 에러 메시지
    let errorMessage = '서브키워드 추천 중 오류가 발생했습니다.';
    
    if (error.response?.status === 401) {
      errorMessage = 'OpenAI API 인증 오류: API 키를 확인해주세요.';
    } else if (error.response?.status === 429) {
      errorMessage = 'API 사용량 한도 초과: 잠시 후 다시 시도해주세요.';
    } else if (error.response?.status === 500) {
      errorMessage = 'OpenAI 서버 오류: 잠시 후 다시 시도해주세요.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '요청 시간 초과: 네트워크 연결을 확인해주세요.';
    }

    res.status(500).json({ 
      error: errorMessage,
      details: error.response?.data?.error?.message || error.message
    });
  }
};

