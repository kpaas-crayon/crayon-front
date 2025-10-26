/**
 * API 프록시 유틸리티 함수들
 * 
 * 프론트엔드에서 백엔드 API를 호출할 때 사용하는 헬퍼 함수들입니다.
 * 모든 요청은 /api/proxy를 통해 프록시됩니다.
 */

const API_BASE = '/api/proxy';

/**
 * API 요청을 위한 기본 헤더
 */
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

/**
 * GET 요청
 */
export async function apiGet<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'GET',
    headers: getDefaultHeaders(),
  });

  if (!response.ok) {
    throw new Error(`API GET 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * POST 요청
 */
export async function apiPost<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API POST 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * PUT 요청
 */
export async function apiPut<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'PUT',
    headers: getDefaultHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API PUT 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * PATCH 요청
 */
export async function apiPatch<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'PATCH',
    headers: getDefaultHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API PATCH 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * DELETE 요청
 */
export async function apiDelete<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'DELETE',
    headers: getDefaultHeaders(),
  });

  if (!response.ok) {
    throw new Error(`API DELETE 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * 파일 업로드 요청
 */
export async function apiUpload<T = unknown>(endpoint: string, file: File, additionalData?: Record<string, unknown>): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
  }

  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    body: formData,
    // Content-Type을 설정하지 않음 (FormData가 자동으로 설정)
  });

  if (!response.ok) {
    throw new Error(`API 업로드 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * AI 생기부 생성 요청
 */
export async function generateRecordContent(templateId: string, studentId: string, prompt: string): Promise<{
  content: string;
  status: 'success' | 'error';
  message?: string;
}> {
  try {
      const response = await apiPost<{ content: string }>('ai/generate-record', {
        templateId,
        studentId,
        prompt,
      });

      return {
        content: response.content,
        status: 'success' as const,
      };
  } catch (error) {
    return {
      content: '',
      status: 'error',
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

/**
 * 학생 목록 조회
 */
export async function getStudents(): Promise<Array<{
  id: string;
  name: string;
  studentNumber: string;
  grade: number;
  class: number;
}>> {
  return apiGet<Array<{
    id: string;
    name: string;
    studentNumber: string;
    grade: number;
    class: number;
  }>>('students');
}

/**
 * 생기부 템플릿 목록 조회
 */
export async function getRecordTemplates(): Promise<Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  popularity: number;
  recentlyUsed: boolean;
}>> {
  return apiGet<Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    features: string[];
    popularity: number;
    recentlyUsed: boolean;
  }>>('records/templates');
}

/**
 * 최종 결과 저장
 */
export async function saveFinalResult(data: {
  studentId: string;
  templateId: string;
  content: string;
}): Promise<{
  id: string;
  success: boolean;
}> {
  return apiPost<{
    id: string;
    success: boolean;
  }>('records/save', data);
}
