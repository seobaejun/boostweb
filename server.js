const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001;

// 미들웨어
app.use(cors());
app.use(express.json());

// 상수 정의
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_PROMPT1 = process.env.OPENAI_PROMPT1;
const OPENAI_PROMPT2 = process.env.OPENAI_PROMPT2;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API 서버가 정상적으로 실행 중입니다.',
    timestamp: new Date().toISOString()
  });
});

// 서브키워드 추천 API
app.post('/api/recommend-keywords', async (req, res) => {
  try {
    const { topic, mainKeyword } = req.body;

    // API 키 검증
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

    // 프롬프트1을 사용하여 서브키워드 추천
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

    res.json({ keywords });
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
});

// 블로그 글 생성 API
app.post('/api/generate-blog', async (req, res) => {
  try {
    const { topic, mainKeyword, subKeywords } = req.body;

    if (!topic || !mainKeyword || !subKeywords || subKeywords.length === 0) {
      return res.status(400).json({ 
        error: '주제, 메인키워드, 서브키워드는 필수 입력 항목입니다.' 
      });
    }

    // 프롬프트2를 사용하여 블로그 글 생성
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

    res.json({ 
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
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ 블로그 생성 API 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`   API 엔드포인트:`);
  console.log(`   - POST http://localhost:${PORT}/api/recommend-keywords`);
  console.log(`   - POST http://localhost:${PORT}/api/generate-blog`);
});

