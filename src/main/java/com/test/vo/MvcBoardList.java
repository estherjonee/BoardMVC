package com.test.vo;

import java.util.ArrayList;


// 페이징처리를 위한 클래스
public class MvcBoardList {
	
	private ArrayList<MvcBoardVO> mvcBoardList = new ArrayList<MvcBoardVO>();
	
	private int pageSize;		// 한 페이지당 보여줄 개수
	private int totalCount;		// 총 데이터개수
	private int totalPage;		// 총 페이지개수 totalCount/pageSize
	private int currentPage;	// 현재페이지 번호
	private int startNo;		// 시작 글 일련번호
	private int endNo;			// 끝 글 일련번호
	private int startPage;		// 시작 페이지 번호
	private int endPage;		// 끝 페이지 번호

	
	
	
	public void initMvcBoardList(int pageSize, int totalCount, int currentPage) {
		this.pageSize = pageSize;
		this.totalCount = totalCount;
		this.currentPage = currentPage;
		
		calculator();
		
	}
	
	private void calculator() {
		totalPage = (totalCount - 1) / pageSize + 1;
		currentPage = currentPage > totalPage ? totalPage : currentPage;
		startNo = (currentPage - 1) * pageSize + 1; // oracle은 1부터 시작하기 때문에 startNo를 계산할 때 1을 더해줌.
		endNo = startNo + pageSize - 1;
		endNo = endNo > totalCount ? totalCount : endNo;
		startPage = (currentPage - 1) / 10 * 10 + 1;
		endPage = startPage + 9;
		endPage = endPage > totalPage ? totalPage : endPage;
	}

	public ArrayList<MvcBoardVO> getMvcBoardList() {
		return mvcBoardList;
	}

	public void setMvcBoardList(ArrayList<MvcBoardVO> mvcBoardList) {
		this.mvcBoardList = mvcBoardList;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getStartNo() {
		return startNo;
	}

	public void setStartNo(int startNo) {
		this.startNo = startNo;
	}

	public int getEndNo() {
		return endNo;
	}

	public void setEndNo(int endNo) {
		this.endNo = endNo;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	@Override
	public String toString() {
		return "MvcBoardList [mvcBoardList=" + mvcBoardList + ", pageSize=" + pageSize + ", totalCount=" + totalCount
				+ ", totalPage=" + totalPage + ", currentPage=" + currentPage + ", startNo=" + startNo + ", endNo="
				+ endNo + ", startPage=" + startPage + ", endPage=" + endPage + "]";
	}


	
	
	
}




