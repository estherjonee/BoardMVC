package com.test.dao;

import java.util.HashMap;

import com.test.vo.UserVO;

public interface UserDAO {
	// 회원가입
	void insert(UserVO userVO);

	// 한 명 정보 가져오기
	UserVO selectById(String userId);

	
	


}
