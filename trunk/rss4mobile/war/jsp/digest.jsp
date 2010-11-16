<%@page language="java"
	import="yy.service.DigestListService,yy.vo.RssListVo,java.util.List,yy.util.CommonUtil"
	contentType="text/html; charset=UTF-8"%>
<div id="content">
<%
    String groupId = request.getParameter("GROUP_ID");
    String pageId = request.getParameter("PAGE_ID");
    if (pageId == null) {
        pageId = "1";
    }
    DigestListService digestListService = new DigestListService();
    List<RssListVo> rssListVoList = digestListService.getRssData(groupId, pageId);
    if (rssListVoList != null) {
        for (int i = 0; i < rssListVoList.size(); i++) {
            RssListVo rssListVo = rssListVoList.get(i);
%>
<div style="border: 2px solid #C4E4E4; width: 90%">
<%=(i + 1) + "  "%><%=rssListVo.getArticleTitle()%>&nbsp;&nbsp;&nbsp;&nbsp;<%=rssListVo.getPubDate()%>
<hr />
<%=rssListVo.getArticleDigest()%><br/>
<a href="<%=rssListVo.getArticleSrcUrl()%>">原文</a>&nbsp;&nbsp;<a href="<%=rssListVo.getArticleMyUrl()%>">站内阅读</a>
</div>
<br />
<br />
<%
    }
    }
%> <%
     String prePage = CommonUtil.calcPage(pageId, true);
     if (prePage != null) {
 %> <a href="digest.jsp?GROUP_ID=<%=groupId%>&PAGE_ID=<%=prePage%>">上一页</a>
<%
    }
    String aftPage = CommonUtil.calcPage(pageId, false);
    if (!digestListService.isEndPageFlg() && aftPage != null) {
%> <a href="digest.jsp?GROUP_ID=<%=groupId%>&PAGE_ID=<%=aftPage%>">下一页</a>
<%
    }
%>
<a href="main.jsp">回目录</a>
</div>
