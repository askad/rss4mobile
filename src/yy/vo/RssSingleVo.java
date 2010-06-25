package yy.vo;

public class RssSingleVo {
	private String articleTitle;
	
	private String articleContent;
	
	private String[] articleComments;

	public String getArticleTitle() {
		return articleTitle;
	}

	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}

	public String getArticleContent() {
		return articleContent;
	}

	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}

	public String[] getArticleComments() {
		return articleComments;
	}

	public void setArticleComments(String[] articleComments) {
		this.articleComments = articleComments;
	}

}
