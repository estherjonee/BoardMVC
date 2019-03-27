package com.test.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.test.dao.BoardDAO;
import com.test.vo.CategoryVO;
import com.test.vo.MvcBoardCommentList;
import com.test.vo.MvcBoardCommentVO;
import com.test.vo.MvcBoardList;
import com.test.vo.MvcBoardVO;

@Controller
@SessionAttributes("sessionInfo")
public class BoardController {
	
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@RequestMapping(value = "/")
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );

		return "login";
	}
	
	
	
	
	//mybatis mapper bean 자동으로 읽어오기
	@Autowired
	public SqlSession sqlSession;
	
	// 클래스 경로에 있는 xml설정파일 load (스프링 컨테이너 구동)
	AbstractApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationCTX.xml");

	
	
	@RequestMapping("inputVal_guide")
	public String valcheck(HttpServletRequest request, Model model) {
		
		logger.info("★BoardController의 valcheck메소드");
		
		return "inputVal_guide";
	}
	
	/**************
	 * 	글 쓰기 화면
	 * *************/
	@RequestMapping("board/write")
	public String write(HttpServletRequest request, Model model) {
		
		System.out.println("★BoardController의 write메소드");
		
		return "board/write";
	}
	
	/**************
	 * 	글 쓰기완료
	 * *************/
	@RequestMapping("/board/writeOK")
	public String writeOK(HttpServletRequest request, Model model) {
		
		System.out.println("★BoardController의 writeOK메소드");
		
		String name = request.getParameter("name");
		String subject = request.getParameter("subject");
		String content = request.getParameter("content");
		
		MvcBoardVO mvcBoardVO = ctx.getBean("mvcBoardVO", MvcBoardVO.class);
		mvcBoardVO.setName(name);
		mvcBoardVO.setSubject(subject);
		mvcBoardVO.setContent(content);		
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		mapper.insert(mvcBoardVO);
		
		
		
		return "redirect:list";
	}

	/**************
	 * 	글 목록 화면
	 * *************/	
	@RequestMapping("/board/list")
	public String list(HttpServletRequest request, Model model) {
		
		System.out.println("★BoardController의 list메소드");
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		
		MvcBoardList mvcBoardList = ctx.getBean("mvcBoardList", MvcBoardList.class);	
		
		int totalCount;
		int pageSize = 10;
		

		
		
		
		// 카테고리관련
		String category = request.getParameter("category");
		String item = request.getParameter("item");

//		넘어온 검색어가 있으면 카테고리와 검색어를 세션에 저장하고 넘어온 검색어가 없으면 세션에 저장된 카테고리와 검색어를
//		읽는다.
		if(item != null) {
			
			
			int currentPage = 1;
			
			try {
				currentPage = Integer.parseInt(request.getParameter("currentPage"));

			} catch(Exception e) { }
			
			
			model.addAttribute("category", category);
			item = item.trim().length() == 0 ? "" : item;
			model.addAttribute("item", item);
			
		
			
//			테이블에 저장된 전체 글 중에서 카테고리 별 검색어를 포함한 글의 개수를 얻어온다.
			HashMap<String, String> hmap = new HashMap<String, String>();
			hmap.put("item", item);
			hmap.put("category", category);
			totalCount = mapper.selectCountMulti(hmap);
			
			mvcBoardList.initMvcBoardList(pageSize, totalCount, currentPage);
			
			CategoryVO categoryVO= ctx.getBean("categoryVO", CategoryVO.class);
			categoryVO.setStartNo(mvcBoardList.getStartNo());
			categoryVO.setEndNo(mvcBoardList.getEndNo());
			categoryVO.setItem(item);
			categoryVO.setCategory(category);
			
			System.out.println(totalCount);
			System.out.println(mapper.selectListMulti(categoryVO));
			mvcBoardList.setMvcBoardList(mapper.selectListMulti(categoryVO));
			System.out.println(mvcBoardList);
			
			// 전체 글 model에 담아서 보낸다.
			model.addAttribute("mvcBoardList", mvcBoardList);
			
			//댓글 개수 가져오기
			for(MvcBoardVO vo : mvcBoardList.getMvcBoardList()) {
				vo.setCommentCount(mapper.commentCount(vo.getIdx()));
			}

		} else {
			
			int currentPage = 1;
			
			try {
				currentPage = Integer.parseInt(request.getParameter("currentPage"));

			} catch(Exception e) { }
			
			
			category = request.getParameter("category");
			item = request.getParameter("item");
			
			totalCount = mapper.selectCount(); //전체글 개수를 가져온다.
	
			mvcBoardList.initMvcBoardList(pageSize, totalCount, currentPage);
			
			HashMap<String, Integer> hmap = new HashMap<String, Integer>();
			hmap.put("startNo", mvcBoardList.getStartNo());
			hmap.put("endNo", mvcBoardList.getEndNo());
			
			mvcBoardList.setMvcBoardList(mapper.selectList(hmap)); // 한 페이지
			
			// 전체 글 model에 담아서 보낸다.
			model.addAttribute("mvcBoardList", mvcBoardList);
			
			//댓글 개수 가져오기
			for(MvcBoardVO vo : mvcBoardList.getMvcBoardList()) {
				vo.setCommentCount(mapper.commentCount(vo.getIdx()));
			}
		}
		//--카테고리관련

		return "board/list";
	}
	
	@RequestMapping("/board/searchOK")
	public String searchOK(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 searchOK메소드");
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		
		
		String category = request.getParameter("category");
		String item = request.getParameter("item");

//		넘어온 검색어가 있으면 카테고리와 검색어를 세션에 저장하고 넘어온 검색어가 없으면 세션에 저장된 카테고리와 검색어를
//		읽는다.
		if(item != null) {
			model.addAttribute("category", category);
			item = item.trim().length() == 0 ? "" : item;
			model.addAttribute("item", item);
		} else {
			category = request.getParameter("category");
			item = request.getParameter("item");
		}
		
		int currentPage = 1;
		try {
			currentPage = Integer.parseInt(request.getParameter("currentPage"));
		} catch(NumberFormatException e) { }

		if(item == null || item.trim().length() == 0) {
//			검색어가 입력되지 않은 경우
		//	guestbookList = SelectService.getInstance().selectList(currentPage);
			return "redirect:list";
		} else {
			int pageSize = 10;
			
//			테이블에 저장된 전체 글 중에서 카테고리 별 검색어를 포함한 글의 개수를 얻어온다.
			HashMap<String, String> hmap = new HashMap<String, String>();
			hmap.put("item", item);
			hmap.put("category", category);
			int totalCount = mapper.selectCountMulti(hmap);
			System.out.println(totalCount);
			
			
			//------------여기부터 문제얌 ----
			MvcBoardList mvcBoardList = ctx.getBean("mvcBoardList", MvcBoardList.class);
			//mvcBoardList.initMvcBoardList(pageSize, totalCount, currentPage);
			//System.out.println(mvcBoardList);
			
			CategoryVO categoryVO= ctx.getBean("categoryVO", CategoryVO.class);
			categoryVO.setStartNo(mvcBoardList.getStartNo());
			categoryVO.setEndNo(mvcBoardList.getEndNo());
			categoryVO.setItem(item);
			categoryVO.setCategory(category);
			
			
			System.out.println(mapper.selectListMulti(categoryVO));
			//mvcBoardList.setMvcBoardList(mapper.selectListMulti(categoryVO));
			
		}
		return "board/list";
		
	}
	
	/**************
	 * 	글 상세 화면
	 * *************/
	@RequestMapping("/board/view")
	public String view(HttpServletRequest request, Model model) {
		
		System.out.println("★BoardController의 view메소드");
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		
		MvcBoardVO mvcBoardVO = ctx.getBean("mvcBoardVO", MvcBoardVO.class);
		
		int currentPage = Integer.parseInt(request.getParameter("currentPage"));
		int idx = Integer.parseInt(request.getParameter("idx"));

		mvcBoardVO = mapper.selectByIdx(idx);

		
		MvcBoardCommentList mvcBoardCommentList = ctx.getBean("mvcBoardCommentList", MvcBoardCommentList.class);
		mvcBoardCommentList.setMvcBoardCommentList(mapper.selectCommentList(idx));
	
		model.addAttribute("vo", mvcBoardVO);
		model.addAttribute("mvcBoardCommentList", mvcBoardCommentList);
		model.addAttribute("currentPage", currentPage);
	
		return "board/view";
	}
	
	
	/**************
	 * 	글 한건 삭제
	 * *************/
	@RequestMapping("/board/delete")
	public String delete(HttpServletRequest request, Model model,HttpServletResponse response) throws IOException {
		System.out.println("★BoardController의 delete메소드");


		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		int idx = Integer.parseInt(request.getParameter("idx"));
		
		int commentCount  = mapper.commentCount(idx);
		
		response.setContentType("text/html ; charset=UTF-8");
		PrintWriter out = response.getWriter();

		if(commentCount <= 0 ) {
		mapper.delete(idx);
		}else {
			out.println("<script> alert('댓글이 존재합니다. 그래도 삭제 하시겠습니가?'); history.go(-1); </script>");
			
		}
		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));

		return "redirect:list";
	}
	
	/**************
	 * 	글 수정 페이지
	 * *************/
	@RequestMapping("/board/update")
	public String update(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 update메소드");
		
		int idx = Integer.parseInt(request.getParameter("idx"));
		String name = request.getParameter("name");
		String subject = request.getParameter("subject");
		String content = request.getParameter("content");		
		
		MvcBoardVO mvcBoardVO = ctx.getBean("mvcBoardVO", MvcBoardVO.class);
		mvcBoardVO.setIdx(idx);
		mvcBoardVO.setName(name);
		mvcBoardVO.setSubject(subject);
		mvcBoardVO.setContent(content);
		
		model.addAttribute("vo", mvcBoardVO);
		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));
		
		return "board/update";
		
	}
	/**************
	 * 	글 한건 수정
	 * *************/
	@RequestMapping("/board/updateOK")
	public String updateOK(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 updateOK메소드");
		
		int idx = Integer.parseInt(request.getParameter("idx"));
		String name = request.getParameter("name");
		String subject = request.getParameter("subject");
		String content = request.getParameter("content");
		
		MvcBoardVO mvcBoardVO = ctx.getBean("mvcBoardVO", MvcBoardVO.class);
		mvcBoardVO.setIdx(idx);
		mvcBoardVO.setName(name);
		mvcBoardVO.setSubject(subject);
		mvcBoardVO.setContent(content);
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		mapper.update(mvcBoardVO);

		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));

		return "redirect:list";
	}
	
	/**************
	 * 	조회수 증가
	 * *************/
	@RequestMapping("/board/increment")
	public String increment(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 increment() 메소드");

		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		int idx = Integer.parseInt(request.getParameter("idx"));
		mapper.increment(idx);

		model.addAttribute("idx", idx);
		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));

		return "redirect:view";
	}

	
	
	/**************
	 * 	댓글 삽입
	 * *************/	
	@RequestMapping("/board/commentOK")
	public String commentOK(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 commentOK메소드");
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		
		
		int idx = Integer.parseInt(request.getParameter("idx"));
		String commentName = request.getParameter("commentName");
		String commentId = request.getParameter("commentId");
		String commentContent = request.getParameter("commentContent");
		
		
		MvcBoardCommentVO mvcBoardCommentVO = ctx.getBean("mvcBoardCommentVO", MvcBoardCommentVO.class);
		mvcBoardCommentVO.setIdx(idx);
		mvcBoardCommentVO.setCommentName(commentName);
		mvcBoardCommentVO.setCommentId(commentId);
		mvcBoardCommentVO.setCommentContent(commentContent);
		
		MvcBoardVO mvcBoardVO = ctx.getBean("mvcBoardVO", MvcBoardVO.class);	
		mvcBoardVO = mapper.selectByIdx(idx);

		
		mvcBoardVO.setCommentCount(mvcBoardVO.getCommentCount()+1);
		mapper.commentinsert(mvcBoardCommentVO);
		
		
		model.addAttribute("vo", mvcBoardVO);
		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));
		model.addAttribute("idx", Integer.parseInt(request.getParameter("idx")));
		
		return "redirect:view";
	}
	
	/**************
	 * 	댓글 삭제
	 * *************/
	@RequestMapping("/board/deleteOK")
	public String deleteOK(HttpServletRequest request, Model model) {
		System.out.println("★BoardController의 deleteOK메소드");
		
		int commentIdx = Integer.parseInt(request.getParameter("commentIdx"));
		
		BoardDAO mapper = sqlSession.getMapper(BoardDAO.class);
		mapper.commentdelete(commentIdx);
		
		// 상세페이지에서 currentPage 받아서 써놓음.
		model.addAttribute("currentPage", Integer.parseInt(request.getParameter("currentPage")));
		model.addAttribute("idx", Integer.parseInt(request.getParameter("idx")));
		return "redirect:view";
	}
}
