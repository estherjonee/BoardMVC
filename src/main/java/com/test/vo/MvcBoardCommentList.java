package com.test.vo;

import java.util.ArrayList;

public class MvcBoardCommentList {

	private ArrayList<MvcBoardCommentVO> mvcBoardCommentList = new ArrayList<MvcBoardCommentVO>();

	public ArrayList<MvcBoardCommentVO> getMvcBoardCommentList() {
		return mvcBoardCommentList;
	}

	public void setMvcBoardCommentList(ArrayList<MvcBoardCommentVO> mvcBoardCommentList) {
		this.mvcBoardCommentList = mvcBoardCommentList;
	}

	@Override
	public String toString() {
		return "MvcBoardCommentList [mvcBoardCommentList=" + mvcBoardCommentList + "]";
	}


	
}
