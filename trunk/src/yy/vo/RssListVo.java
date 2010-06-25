package yy.vo;

import java.io.Serializable;

public class RssListVo implements Serializable {
    private static final long serialVersionUID = 1L;

    private String articleTitle;

    private String articleDigest;

    private String articleMyUrl;

    private String articleSrcUrl;

    private String pubDate;

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getArticleDigest() {
        return articleDigest;
    }

    public void setArticleDigest(String articleDigest) {
        this.articleDigest = articleDigest;
    }

    public String getArticleMyUrl() {
        return articleMyUrl;
    }

    public void setArticleMyUrl(String articleMyUrl) {
        this.articleMyUrl = articleMyUrl;
    }

    public String getArticleSrcUrl() {
        return articleSrcUrl;
    }

    public void setArticleSrcUrl(String articleSrcUrl) {
        this.articleSrcUrl = articleSrcUrl;
    }

    public String getPubDate() {
        return pubDate;
    }

    public void setPubDate(String pubDate) {
        this.pubDate = pubDate;
    }

}
