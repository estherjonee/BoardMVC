package com.test.vo;

import java.util.ArrayList;

public class UserList {

	private ArrayList<UserVO> userVOList = new ArrayList<UserVO>();

	public ArrayList<UserVO> getUserVOList() {
		return userVOList;
	}

	public void setUserVOList(ArrayList<UserVO> userVOList) {
		this.userVOList = userVOList;
	}

	@Override
	public String toString() {
		return "UserList [userVOList=" + userVOList + "]";
	}
	
	
	
}
