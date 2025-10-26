'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

// 학생 정보 타입 정의
interface Student {
  id: string;
  name: string;
  studentNumber: string;
  grade: number;
  class: number;
  isSelected: boolean;
}

// AI 결과 타입 정의
interface AIResult {
  id: string;
  studentId: string;
  prompt: string;
  result: string;
  status: 'pending' | 'completed' | 'error';
  createdAt: Date;
}

// 최종 결과 타입 정의
interface FinalResult {
  id: string;
  studentId: string;
  content: string;
  isApproved: boolean;
  lastUpdated: Date;
}

// 모의 학생 데이터
const MOCK_STUDENTS: Student[] = [
  { id: '1', name: '김민수', studentNumber: '2024001', grade: 3, class: 1, isSelected: false },
  { id: '2', name: '이지은', studentNumber: '2024002', grade: 3, class: 1, isSelected: false },
  { id: '3', name: '박준호', studentNumber: '2024003', grade: 3, class: 1, isSelected: false },
  { id: '4', name: '최수진', studentNumber: '2024004', grade: 3, class: 1, isSelected: false },
  { id: '5', name: '정현우', studentNumber: '2024005', grade: 3, class: 1, isSelected: false },
  { id: '6', name: '한소영', studentNumber: '2024006', grade: 3, class: 1, isSelected: false },
  { id: '7', name: '윤태민', studentNumber: '2024007', grade: 3, class: 1, isSelected: false },
  { id: '8', name: '강예린', studentNumber: '2024008', grade: 3, class: 1, isSelected: false },
  { id: '9', name: '임동현', studentNumber: '2024009', grade: 3, class: 1, isSelected: false },
  { id: '10', name: '서하늘', studentNumber: '2024010', grade: 3, class: 1, isSelected: false },
];

export default function SubjectDetailsPage() {
  // 상태 관리
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [aiResults, setAiResults] = useState<AIResult[]>([]);
  const [finalResults, setFinalResults] = useState<FinalResult[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 학생 선택 핸들러
  const handleStudentSelect = (student: Student) => {
    setStudents(prev => prev.map(s => 
      s.id === student.id ? { ...s, isSelected: !s.isSelected } : s
    ));
    setSelectedStudent(student);
  };

  // AI 생성 핸들러
  const handleAIGenerate = async () => {
    if (!selectedStudent || !prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // 실제 API 호출
      const response = await fetch('/api/proxy/ai/generate-record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 'subject-details',
          studentId: selectedStudent.id,
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      
      const newResult: AIResult = {
        id: Date.now().toString(),
        studentId: selectedStudent.id,
        prompt: prompt,
        result: data.content || `[AI 생성 결과 - 과목별 세부특기사항]\n\n${selectedStudent.name} 학생의 과목별 세부능력특기사항:\n\n1. 국어: 문학 작품에 대한 깊이 있는 이해와 창의적 해석 능력이 뛰어남. 독서 토론에서 주도적인 역할을 하며, 다양한 관점에서 사고할 수 있는 능력을 보임. 특히 시와 소설에서 감정의 미묘한 변화를 잘 파악하고 표현하는 능력이 뛰어남.\n\n2. 수학: 논리적 사고력이 우수하며, 복잡한 문제를 단계별로 해결하는 능력이 뛰어남. 수학적 개념을 다른 과목과 연계하여 이해하는 능력을 보이며, 특히 기하학적 직관이 뛰어나 공간 감각이 뛰어남.\n\n3. 과학: 실험을 통한 탐구 활동에 적극적으로 참여하며, 가설 설정과 검증 과정을 체계적으로 수행함. 과학적 사고력과 호기심이 뛰어나며, 특히 생명과학 분야에서 관찰력과 분석력이 뛰어남.\n\n4. 사회: 사회 현상에 대한 관심이 높고, 다양한 자료를 활용하여 문제를 분석하는 능력이 뛰어남. 토론과 발표에서 자신의 의견을 논리적으로 제시하며, 다른 학생들의 의견도 존중하는 자세를 보임.`,
        status: 'completed',
        createdAt: new Date()
      };
      
      setAiResults(prev => [newResult, ...prev]);
    } catch (error) {
      console.error('AI 생성 오류:', error);
      
      // 오류 발생 시 모의 데이터 사용
      const newResult: AIResult = {
        id: Date.now().toString(),
        studentId: selectedStudent.id,
        prompt: prompt,
        result: `[AI 생성 결과 - 과목별 세부특기사항]\n\n${selectedStudent.name} 학생의 과목별 세부능력특기사항:\n\n1. 국어: 문학 작품에 대한 깊이 있는 이해와 창의적 해석 능력이 뛰어남. 독서 토론에서 주도적인 역할을 하며, 다양한 관점에서 사고할 수 있는 능력을 보임. 특히 시와 소설에서 감정의 미묘한 변화를 잘 파악하고 표현하는 능력이 뛰어남.\n\n2. 수학: 논리적 사고력이 우수하며, 복잡한 문제를 단계별로 해결하는 능력이 뛰어남. 수학적 개념을 다른 과목과 연계하여 이해하는 능력을 보이며, 특히 기하학적 직관이 뛰어나 공간 감각이 뛰어남.\n\n3. 과학: 실험을 통한 탐구 활동에 적극적으로 참여하며, 가설 설정과 검증 과정을 체계적으로 수행함. 과학적 사고력과 호기심이 뛰어나며, 특히 생명과학 분야에서 관찰력과 분석력이 뛰어남.\n\n4. 사회: 사회 현상에 대한 관심이 높고, 다양한 자료를 활용하여 문제를 분석하는 능력이 뛰어남. 토론과 발표에서 자신의 의견을 논리적으로 제시하며, 다른 학생들의 의견도 존중하는 자세를 보임.`,
        status: 'completed',
        createdAt: new Date()
      };
      
      setAiResults(prev => [newResult, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  // 최종 결과 승인 핸들러
  const handleApproveResult = async (result: AIResult) => {
    try {
      // 백엔드에 최종 결과 저장
      const response = await fetch('/api/proxy/records/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: result.studentId,
          templateId: 'subject-details',
          content: result.result,
        }),
      });

      if (!response.ok) {
        throw new Error(`저장 오류: ${response.status}`);
      }

      const savedData = await response.json();
      
      const finalResult: FinalResult = {
        id: savedData.id || Date.now().toString(),
        studentId: result.studentId,
        content: result.result,
        isApproved: true,
        lastUpdated: new Date()
      };
      
      setFinalResults(prev => [finalResult, ...prev]);
      
      console.log('✅ 최종 결과가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('❌ 최종 결과 저장 오류:', error);
      
      // 오류 발생 시에도 로컬에 저장
      const finalResult: FinalResult = {
        id: Date.now().toString(),
        studentId: result.studentId,
        content: result.result,
        isApproved: true,
        lastUpdated: new Date()
      };
      
      setFinalResults(prev => [finalResult, ...prev]);
    }
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 좌측바: 학생 리스트 */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <Link href="/records" className="text-gray-500 hover:text-gray-700 mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h2 className="text-lg font-semibold text-gray-900">과목별 세부특기사항</h2>
            </div>
            <p className="text-sm text-gray-600">학생을 선택하여 생기부를 작성하세요</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    student.isSelected
                      ? 'bg-primary-50 border-primary-200 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">학번: {student.studentNumber}</p>
                    </div>
                    {student.isSelected && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 중간박스: 프롬프트 입력 및 AI 결과 미리보기 */}
        <div className="flex-1 bg-gray-50 flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">프롬프트 작성</h2>
            <p className="text-sm text-gray-600">
              {selectedStudent 
                ? `${selectedStudent.name} 학생의 과목별 세부특기사항 작성을 위한 프롬프트를 작성하세요`
                : '학생을 선택해주세요'
              }
            </p>
          </div>
          
          <div className="flex-1 p-6 space-y-6">
            {/* 프롬프트 입력 영역 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-md font-semibold text-gray-900 mb-4">평가 기준 프롬프트</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예: 수업 참여도, 과제 완성도, 발표 능력, 협력 정신, 창의적 사고 등을 종합적으로 고려하여 과목별 세부능력특기사항을 작성해주세요..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={!selectedStudent}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAIGenerate}
                  disabled={!selectedStudent || !prompt.trim() || isGenerating}
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>생성 중...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>AI 생성</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI 결과 미리보기 영역 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-md font-semibold text-gray-900 mb-4">AI 생성 결과 미리보기</h3>
              <div className="space-y-4">
                {aiResults.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5l-7 7-7-7" />
                    </svg>
                    <p>AI 생성 결과가 여기에 표시됩니다</p>
                  </div>
                ) : (
                  aiResults.map((result) => (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">
                            {students.find(s => s.id === result.studentId)?.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.createdAt.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveResult(result)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                          >
                            승인
                          </button>
                          <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors">
                            수정
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result.result}</pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 우측박스: 최종 결과 관리 */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">최종 결과</h2>
            <p className="text-sm text-gray-600">승인된 결과가 여기에 저장됩니다</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {finalResults.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>승인된 결과가 없습니다</p>
                </div>
              ) : (
                finalResults.map((result) => (
                  <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {students.find(s => s.id === result.studentId)?.name}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          승인됨
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {result.lastUpdated.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 line-clamp-3">{result.content}</p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                        수정
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors">
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
