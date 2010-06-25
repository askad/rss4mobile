package yy.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.cache.Cache;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.jdom.Element;
import org.jdom.input.DOMBuilder;
import org.xml.sax.SAXException;

import yy.YyConst;
import yy.entity.EntitySite;
import yy.vo.RssListVo;

public class ParserRss {

    Cache cache;

    public ParserRss() {
        cache = CacheManagerYy.getCacheInstance();
    }

    /**
     * 根据group id 取得group下所有site
     * 
     * @param groupId
     * @param querySite
     * @return
     */
    public List<RssListVo> getRssDataFromSite(List<EntitySite> resultSite) {

        List<RssListVo> rssListVoList = new ArrayList<RssListVo>();
        if (resultSite.size() > 0) {
            for (EntitySite entitySite : resultSite) {
                List<RssListVo> rssListVoListTemp = parserListRssData(entitySite.getSiteUrl());
                rssListVoList.addAll(rssListVoListTemp);
            }
        }
        return rssListVoList;
    }

    /**
     * 
     * @param url
     * @param rssListVoList
     *            the Result Container
     */
    private List<RssListVo> parserListRssData(String url) {
        Element rootElement = getRootElement(url);

        if (CommonUtil.checkHasCache(YyConst.CACHE_KEY_LIST, url)) {
            if (!checkModified(rootElement, url)) {
                String urlKey = UserInfor.getUserId() + YyConst.CACHE_KEY_LIST + url;
                return (List<RssListVo>) cache.get(urlKey);
            }
        }
        return getRssVO(rootElement, url);
    }

    /**
     * Rss frame: <?xml?><rss><channel>...
     * <item><title/><link/><description/></item>... Root element:<channel>
     * 
     * @param rssurl
     * @return null or <channel>
     */
    private Element getRootElement(String rssurl) {
        org.jdom.Document document;
        org.jdom.Element rootElement = null;
        org.w3c.dom.Document myDoc;
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db;
        try {
            db = dbf.newDocumentBuilder();
            myDoc = db.parse(rssurl);
            DOMBuilder builder = new DOMBuilder();
            document = builder.build(myDoc);
            if (document.hasRootElement()) {
                Element temp = document.getRootElement();
                if (temp.getChildren().size() > 0) {
                    // <channel>
                    rootElement = (Element) temp.getChildren().get(0);
                }
            }
            return rootElement;
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private List<RssListVo> getRssVO(Element rootElement, String url) {
        List<RssListVo> rssListVoList = new ArrayList<RssListVo>();
        if (rootElement != null) {
            List<Element> el = rootElement.getChildren("item");
            if (el != null) {
                for (Element e : el) {
                    if (checkAllreadyRead(e)) {
                        continue;
                    }
                    RssListVo newsVO = new RssListVo();
                    newsVO.setArticleTitle(e.getChildText("title"));
                    newsVO.setArticleSrcUrl(e.getChildText("link"));
                    newsVO.setArticleDigest(e.getChildText("description"));
                    newsVO.setArticleMyUrl("/srcArticle?url=" + e.getChildText("link"));
                    newsVO.setPubDate(CommonUtil.getFormatterDate(e.getChildText("pubDate")));
                    rssListVoList.add(newsVO);
                }

                // ///////////////////////PUT CACHE
                String urlKey = UserInfor.getUserId() + YyConst.CACHE_KEY_LIST + url;
                cache.put(urlKey, rssListVoList);
                List<Element> pubDate = rootElement.getChildren("pubDate");
                if (pubDate != null && pubDate.size() > 0) {
                    String urlPubDateKey = UserInfor.getUserId() + YyConst.CACHE_KEY_MODIFIED + url;
                    cache.put(urlPubDateKey, pubDate.get(0).getText());
                }
            }
        }
        return rssListVoList;
    }

    /**
     * 
     * @param
     * @return when false means Not change
     */
    private boolean checkModified(Element rootElement, String urlStr) {

        String urlKey = UserInfor.getUserId() + YyConst.CACHE_KEY_MODIFIED + urlStr;
        if (!cache.containsKey(urlKey)) {
            return true;
        }
        String imsDateTimeOld = (String) cache.get(urlKey);

        if (rootElement != null) {
            List<Element> el = rootElement.getChildren("pubDate");
            if (el != null && el.size() > 0) {
                if (!imsDateTimeOld.equals(el.get(0).getText())) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean checkAllreadyRead(Element e) {
        String url = e.getChildText("link");
        return CommonUtil.checkHasCache(YyConst.CACHE_KEY_ALLREADY_READ, url);
    }
}
