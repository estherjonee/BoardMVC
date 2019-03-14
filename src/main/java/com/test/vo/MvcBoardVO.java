package com.test.vo;

import java.util.Date;

public class MvcBoardVO {

	private int idx;			// 글번호
	private String name;		// 작성자
	private String subject;		// 제목
	private String content;		// 내용
	private int ref;			// 글 그룹 번호
	private int lev;			// 글의 레벨
	private int seq;			// 같은 그룹에서 글 출력 순서
	private int hit;			// 조회수
	private Date writeDate;		// 작성일
	private int commentCount ;	// 댓글개수
	
	
	public MvcBoardVO() {}


	public MvcBoardVO(String name, String subject, String content) {
		this.name = name;
		this.subject = subject;
		this.content = content;
	}


	public int getIdx() {
		return idx;
	}


	public void setIdx(int idx) {
		this.idx = idx;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public int getRef() {
		return ref;
	}


	public void setRef(int ref) {
		this.ref = ref;
	}


	public int getLev() {
		return lev;
	}


	public void setLev(int lev) {
		this.lev = lev;
	}


	public int getSeq() {
		return seq;
	}


	public void setSeq(int seq) {
		this.seq = seq;
	}


	public int getHit() {
		return hit;
	}


	public void setHit(int hit) {
		this.hit = hit;
	}


	public Date getWriteDate() {
		return writeDate;
	}


	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	
	
	public int getCommentCount() {
		return commentCount;
	}


	public void setCommentCount(int commentCount) {
		this.commentCount = commentCount;
	}


	@Override
	public String toString() {
		return "MvcBoardVO [idx=" + idx + ", name=" + name + ", subject=" + subject + ", content=" + content + ", ref="
				+ ref + ", lev=" + lev + ", seq=" + seq + ", hit=" + hit + ", writeDate=" + writeDate + ",commentCount=" + commentCount + "]";
	}
	

	
	
	
	
	
}
