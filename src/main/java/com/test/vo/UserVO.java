package com.test.vo;

import java.util.Date;

public class UserVO {
	
	
	private String userId;				// 회원id
	private String userPassword;		// 회원pw
	private String userName;			// 회원이름
	private String userEmail;			// 회원email
	private Date userJoinDate;			// 회원가입날짜
	private Date userLoginDate;			// 최종로그인날짜
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Date getUserJoinDate() {
		return userJoinDate;
	}
	public void setUserJoinDate(Date userJoinDate) {
		this.userJoinDate = userJoinDate;
	}
	public Date getUserLoginDate() {
		return userLoginDate;
	}
	public void setUserLoginDate(Date userLoginDate) {
		this.userLoginDate = userLoginDate;
	}
	@Override
	public String toString() {
		return "UserVO [userId=" + userId + ", userPassword=" + userPassword + ", userName=" + userName + ", userEmail="
				+ userEmail + ", userJoinDate=" + userJoinDate + ", userLoginDate=" + userLoginDate + "]";
	}


	
	
	
	
}
