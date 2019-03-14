package com.test.Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.test.dao.UserDAO;
import com.test.vo.UserVO;

@Controller
@SessionAttributes("sessionInfo")
public class UserController {

	@Autowired
	public SqlSession sqlSession;

	AbstractApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationCTX.xml");

	
	@RequestMapping("/login") 
	public String login(HttpServletRequest request, Model model) {
	  
	System.out.println("★UserController의 login메소드");
	  
	return "login";
	
	}
	 
	@RequestMapping("/user/join")
	public String join(HttpServletRequest request, Model model) {

		System.out.println("★UserController의 join메소드");

		return "user/join";
	}

	@RequestMapping("/user/idCheck")
	@ResponseBody
	public int idCheck(Model model,HttpServletResponse response, @RequestParam("id") String id) throws IOException {

		System.out.println("★UserController의 idCheck메소드");
	

		UserVO userVO = ctx.getBean("userVO", UserVO.class);
		UserDAO mapper = sqlSession.getMapper(UserDAO.class);
		userVO = mapper.selectById(id);
		System.out.println(userVO);
		int result=0;
		
		if(userVO != null) {
			result = 1;
		}
		return result;

	}

	@RequestMapping("/user/joinOK")
	public String joinOK(HttpServletRequest request, Model model) {

		System.out.println("★UserController의 joinOK메소드");

		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		String userPassword = request.getParameter("userPassword");
		String userEmail = request.getParameter("userEmail");

		UserVO userVO = ctx.getBean("userVO", UserVO.class);

		userVO.setUserId(userId);
		userVO.setUserName(userName);
		userVO.setUserPassword(userPassword);
		userVO.setUserEmail(userEmail);
		System.out.println(userVO);

		UserDAO mapper = sqlSession.getMapper(UserDAO.class);
		mapper.insert(userVO);

		return "redirect:/";
	}

	@RequestMapping("/user/loginCheck")
	public String loginCheck(HttpServletRequest request, Model model , HttpServletResponse response) throws IOException {
		System.out.println("★UserController의 loginCheck메소드");

		UserDAO mapper = sqlSession.getMapper(UserDAO.class);

		String userId = request.getParameter("userId");
		String userPassword = request.getParameter("userPassword");

		UserVO userVO = ctx.getBean("userVO", UserVO.class);
		userVO = mapper.selectById(userId);
		response.setContentType("text/html ; charset=UTF-8");
		PrintWriter out = response.getWriter();

		if(userVO == null) {
			model.addAttribute("sessionInfo", null);

			out.println("<script> alert('등록되지 않은 id입니다.'); history.go(-1); </script>");
			
		}else {			
			if(userVO.getUserPassword().equals(userPassword)) {
				model.addAttribute("userVO", userVO);
				model.addAttribute("sessionInfo", userVO);
				return "redirect:/board/list";
			}else {
				System.out.println("불일치");
				response.setContentType("text/html ; charset=UTF-8");
				out = response.getWriter();
				out.println("<script> alert('패스워드가 일치하지 않습니다.'); history.go(-1); </script>");
				
			}
		}
		out.close();
		return "login";
		
	}

	@RequestMapping("/board/logout")
	public String logout(HttpServletRequest request, Model model, HttpServletResponse response) throws IOException {

		System.out.println("★UserController의 logout메소드");

		PrintWriter out = response.getWriter();
		out.println("<script> alert('로그아웃되었습니다.');</script>");
		request.getSession().removeAttribute("sessionInfo");

		return "redirect:/";
	}
}