package com.test.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.test.vo.CategoryVO;
import com.test.vo.MvcBoardCommentVO;
import com.test.vo.MvcBoardList;
import com.test.vo.MvcBoardVO;

public interface BoardDAO {

	// 전체글 개수
	int selectCount();
	
	// 한 화면에 보여줄 페이지 량
	ArrayList<MvcBoardVO> selectList(HashMap<String, Integer> hmap);

	// 글 한 건 가져오기
	MvcBoardVO selectByIdx(int idx);
	
	// 글 한 건 저장하기
	void insert(MvcBoardVO mvcBoardVO);
	
	// 글 한 건 삭제하기
	void delete(int idx);
	
	// 글 한 건 수정하기
	void update(MvcBoardVO mvcBoardVO);
	

	// 댓글전체 가져오기
	ArrayList<MvcBoardCommentVO> selectCommentList(int idx);

	// 코멘트개수222
	int selectCommentCount(int idx);

	// 코멘트추가
	void commentinsert(MvcBoardCommentVO mvcBoardCommentVO);

	// 코멘트삭제
	void commentdelete(int commentIdx);
	
	// 조회수 증가
	void increment(int idx);
	
	// 코멘트개수
	int commentCount(int idx);

	// 검색개수
	int selectCountMulti(HashMap<String, String> hmap);
	// 검색목록
	ArrayList<MvcBoardVO> selectListMulti(CategoryVO categoryVO);

	
	

}
