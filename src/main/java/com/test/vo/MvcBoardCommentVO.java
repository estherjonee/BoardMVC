package com.test.vo;

import java.util.Date;

public class MvcBoardCommentVO {
	
	private int commentIdx;			// 글번호
	private int idx;				// 부모글 idx
	private String commentName;		// 작성자
	private String commentId;		// 제목
	private String commentContent;	// 내용
	private Date commentWriteDate;	// 글작성날짜
	private int commentRef;			// 글 그룹 번호
	private int commentLev;			// 글의 레벨
	private int commentSeq;			// 같은 그룹에서 글 출력 순서
	private String commentDeleteCheck; //삭제여부
	
	
	
	public int getCommentIdx() {
		return commentIdx;
	}
	public void setCommentIdx(int commentIdx) {
		this.commentIdx = commentIdx;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getCommentName() {
		return commentName;
	}
	public void setCommentName(String commentName) {
		this.commentName = commentName;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
	public Date getCommentWriteDate() {
		return commentWriteDate;
	}
	public void setCommentWriteDate(Date commentWriteDate) {
		this.commentWriteDate = commentWriteDate;
	}
	public int getCommentRef() {
		return commentRef;
	}
	public void setCommentRef(int commentRef) {
		this.commentRef = commentRef;
	}
	public int getCommentLev() {
		return commentLev;
	}
	public void setCommentLev(int commentLev) {
		this.commentLev = commentLev;
	}
	public int getCommentSeq() {
		return commentSeq;
	}
	public void setCommentSeq(int commentSeq) {
		this.commentSeq = commentSeq;
	}
	public String getCommentDeleteCheck() {
		return commentDeleteCheck;
	}
	public void setCommentDeleteCheck(String commentDeleteCheck) {
		this.commentDeleteCheck = commentDeleteCheck;
	}
	
	
	@Override
	public String toString() {
		return "MvcBoardCommentVO [commentIdx=" + commentIdx + ", idx=" + idx + ", commentName=" + commentName
				+ ", commentId=" + commentId + ", commentContent=" + commentContent + ", commentWriteDate="
				+ commentWriteDate + ", commentRef=" + commentRef + ", commentLev=" + commentLev + ", commentSeq="
				+ commentSeq + ", commentDeleteCheck=" + commentDeleteCheck + "]";
	}
	
	

	
	
	

	
}
